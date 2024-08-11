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

const notificationStore = useNotificationStore();
const { storeFindAllUnreadNotificationByUserId } = notificationStore;
const authStore = useAuthStore();
const {userId, isLogined} = storeToRefs(authStore);
const chatStore = useChatStore();
const {chatOpen} = storeToRefs(chatStore);


const route = useRoute();

const eventSource = ref(null);

const showAlert = ref(false);
const alertMessage = ref('');
let alertTimeout = null;

watch(isLogined, (newValue)=>{
  if(newValue){
    console.log("로그인 완료. (토큰 저장 이후)");
    console.log("userID in store = ",userId.value);
    connectToSSE(userId);
  }
})


const connectToSSE = async(userId)=>{
  console.log("connectToSSE Call By AfterLogin.vue");
  await storeFindAllUnreadNotificationByUserId(userId.value);
  const { unreadNotificationSize } = storeToRefs(notificationStore);
  console.log("pinia update value = ", unreadNotificationSize.value);
  const url = import.meta.env.VITE_VUE_API_URL;
  const token = localStorage.getItem('access_token');
  const eventSourceUrl = `${url}/notify/subscribe/${userId.value}`;
  console.log("event source url = ",eventSourceUrl);

  eventSource.value = new EventSource(`${eventSourceUrl}`);
  console.log("source = ",eventSource.value);

  eventSource.value.addEventListener('open', () => {
    console.log('Connection opened');
    showAlertMessage(`총 ${unreadNotificationSize.value} 건의 알림이 존재합니다.`);
  });

  eventSource.value.addEventListener('chat', (event) => {
    console.log('New message:', event.data);
    showAlertMessage('새로운 채팅 알림이 도착했습니다.');
  });

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
  });

  eventSource.value.addEventListener('error', (event) => {
    if (eventSource.value.readyState === EventSource.CLOSED) {
      console.log('Connection closed');
    } else {
      console.error('EventSource error:', event);
    }
    showAlertMessage('새로운 Error 이벤트가 도착했습니다.');
  });
}

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