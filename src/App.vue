<script setup>
import { ref, watch } from 'vue';
import ChatView from '@/views/ChatView.vue';
import NavigationBarView from '@/views/Bars/NavigationBarView.vue';
import SideBarView from './views/Bars/SideBarView.vue';
import userInfoTest from './components/login/userInfoTest.vue';
import {useRoute} from 'vue-router';
import { storeToRefs } from 'pinia';
import {useAuthStore} from '@/stores/authStore.js';
import { useNotificationStore } from "@/stores/notificationStore.js";
import { useChatStore } from './stores/chatStore';
import { useProjectStore } from './stores/projectStore';

const notificationStore = useNotificationStore();
const { storeFindAllUnreadNotificationByUserId } = notificationStore;
const authStore = useAuthStore();
const {userId, isLogined} = storeToRefs(authStore);
const chatStore = useChatStore();
const {chatOpen} = storeToRefs(chatStore);

const { storeServiceScheduleInfo, storeBuildBackendJenkinsJob, storeBuildFrontendJenkinsJob, storeBuildDatabaseJenkinsJob, storeBuildFinalJenkinsJob } = useProjectStore();

const route = useRoute();

const eventSource = ref(null);
const eventSourceReadyState = ref(0);
const reconnectAttempts = ref(0);
const reconnectInterval = ref(null);

const showAlert = ref(false);
const alertMessage = ref('');
let alertTimeout = null;

watch(isLogined, (newValue)=>{
  if(newValue){
    console.log("로그인 완료. (토큰 저장 이후)");
    console.log("userID in store = ",userId.value);
    connectToSSE(userId);
  }
});


watch(eventSourceReadyState, (newState, oldState) => {
  if (newState === EventSource.CLOSED && oldState !== EventSource.CLOSED) {
    console.log('Connection closed. Attempting to reconnect...');
    startReconnectAttempts();
  } else if (newState === EventSource.OPEN && oldState !== EventSource.OPEN) {
    console.log('Connection opened. Stopping reconnect attempts.');
    stopReconnectAttempts();
  }
});

const connectToSSE = async(userId)=>{
  console.log("connectToSSE Call By AfterLogin.vue UserId = ",userId);
  await storeFindAllUnreadNotificationByUserId(userId.value);
  const { unreadNotificationSize } = storeToRefs(notificationStore);
  console.log("pinia update value = ", unreadNotificationSize.value);
  const url = import.meta.env.VITE_VUE_API_URL;
  const token = localStorage.getItem('access_token');
  const eventSourceUrl = `${url}/notify/subscribe/${userId.value}`;
  console.log("event source url = ",eventSourceUrl);
  
  if (eventSource.value) {
    eventSource.value.close();
  }

  eventSource.value = new EventSource(`${eventSourceUrl}`);
  console.log("source = ",eventSource.value);
  eventSourceReadyState.value = eventSource.value.readyState;

  eventSource.value.addEventListener('open', async () => {
    console.log('Connection opened');
    showAlertMessage(`총 ${unreadNotificationSize.value} 건의 알림이 존재합니다.`);
    await storeFindAllUnreadNotificationByUserId(userId.value);
    eventSourceReadyState.value = EventSource.OPEN;
  });
  eventSource.value.onerror = (error) => {
    console.error('EventSource failed:', error);
    eventSourceReadyState.value = EventSource.CLOSED;
  };

  eventSource.value.addEventListener('chat', async (event) => {
    console.log('New message:', event.data);
    showAlertMessage('새로운 채팅 알림이 도착했습니다.');
    await storeFindAllUnreadNotificationByUserId(userId.value);
  });

  eventSource.value.addEventListener('setup', (event) => {
    const data = JSON.parse(event.data);
    console.log('setup data: ', data);
    console.log("jenkins 알림이 도착했습니다 - type: setup");

    const response = data.response;
    console.log("response = ", response);
    if (response.result === "SUCCESS") {
      storeBuildBackendJenkinsJob();
    }
    else {
      // 이 부분 추가 필요
    }
    
  });

  eventSource.value.addEventListener('backend', (event) => {
    const data = JSON.parse(event.data);
    console.log('backend data: ', data);
    console.log("jenkins 알림이 도착했습니다 - type: backend");

    const response = data.response;
    console.log("response = ", response);
    if (response.result === "SUCCESS") {
      storeBuildFrontendJenkinsJob();
    }
    else {
      // 이 부분 추가 필요
    }
    
  });

  eventSource.value.addEventListener('frontend', (event) => {
    const data = JSON.parse(event.data);
    console.log('FRONTEND data: ', data);
    console.log("jenkins 알림이 도착했습니다 - type: FRONTEND");

    const response = data.response;
    console.log("response = ", response);
    if (response.result === "SUCCESS") {
      // 이 부분 추가 필요
      storeBuildDatabaseJenkinsJob();
    }
    else {
      // 이 부분 추가 필요
    }
  });



  eventSource.value.addEventListener('database', (event) => {
    const data = JSON.parse(event.data);
    console.log('DATABASE data: ', data);
    console.log("jenkins 알림이 도착했습니다 - type: DATABASE");

    const response = data.response;
    console.log("response = ", response);
    if (response.result === "SUCCESS") {
      // 이 부분 추가 필요
      storeBuildFinalJenkinsJob();
    }
    else {
      // 이 부분 추가 필요
    }
  });

  eventSource.value.addEventListener('final', (event) => {
    console.log('final까진 도달...');

    const response = event.data.response;
    console.log("response = ", response);
    if (response.result === "SUCCESS") {
      // 이 부분 추가 필요
      console.log("final 작업 성공");
      storeServiceScheduleInfo(response.serviceNum);
    }
    else {
      // 이 부분 추가 필요
      console.log("작업 실패");
    }
  });

  eventSource.value.addEventListener('RTC', async (event)=>{
    console.log("RTC 이벤트 도착");
    showAlertMessage("새로운 팀 화상회의 알림이 도착했습니다.");
    await storeFindAllUnreadNotificationByUserId(userId.value);
  })

  eventSource.value.addEventListener('sse', async (event) => {
    let data;
    try {
      console.log(event);
      console.log("event call by sse");
      if(!lastEventId.value){
        lastEventId.value = event.lastEventId;
      }
    } catch (e) {
      console.error('Failed to parse message as JSON:', event.data);
      return;
    }
    showAlertMessage('새로운 SSE 이벤트가 도착했습니다.');
    await storeFindAllUnreadNotificationByUserId(userId.value);
  });

  eventSource.value.addEventListener('error', async (event) => {
    if (eventSource.value.readyState === EventSource.CLOSED) {
      console.log('Connection closed');
    } else {
      console.error('EventSource error:', event);
    }
    showAlertMessage('새로운 Error 이벤트가 도착했습니다.');
    await storeFindAllUnreadNotificationByUserId(userId.value);
    eventSourceReadyState.value = EventSource.CLOSED;
  });
}

const startReconnectAttempts = () => {
  if (reconnectInterval.value === null) {
    reconnectAttempts.value = 0;
    reconnectInterval.value = setInterval(() => {
      if (reconnectAttempts.value < 10) {
        reconnectAttempts.value++;
        console.log(`Reconnect attempt ${reconnectAttempts.value}`);
        connectToSSE(userId.value);
      } else {
        console.log('Max reconnect attempts reached. Stopping reconnect attempts.');
        stopReconnectAttempts();
      }
    }, 100);
  }
};

const stopReconnectAttempts = () => {
  if (reconnectInterval.value !== null) {
    clearInterval(reconnectInterval.value);
    reconnectInterval.value = null;
    reconnectAttempts.value = 0;
  }
};


const showAlertMessage = (message) => {
  if (alertTimeout) {
    clearTimeout(alertTimeout);
  }
  console.log("event message = ",message);
  alertMessage.value = message;
  showAlert.value = true;
  alertTimeout = setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

const reconnectSSE = () => {
  if (userId.value) {
    setTimeout(() => {
      connectToSSE(userId.value);
    }, 5000);
  }
};

</script>

<template>
  <div>
    <NavigationBarView v-if="route.meta.showNavbar"/>
    <router-view></router-view>
    <ChatView v-if="userId"></ChatView>
    
    
    <transition name="fade">
      <div v-if="showAlert" class="alert-message">
        {{ alertMessage }}
      </div>
    </transition>
  </div>
</template>

<style scoped>
.alert-message {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>