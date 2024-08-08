<script setup>
import { ref } from 'vue';
import ChatButton from '@/components/chat/ChatButton.vue';
import ChatModal from '@/components/chat/ChatModal.vue';
import {send} from "@/api/notification.js";
import {createRoom} from "@/api/chat.js"
import {findAllUnreadNotificationByUserId} from "@/api/notification.js";
import { useNotificationStore } from "@/stores/notificationStore.js";
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../stores/authStore';

const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);
const receiverUser = ref("");
const notiContent = ref("");
const receiver = ref("");
const showChat = ref(false);
const eventSource = ref(null);
const notificationStore = useNotificationStore();
const lastEventId = ref('');
const { storeFindAllUnreadNotificationByUserId } = notificationStore;
const { unreadNotificationSize } = storeToRefs(notificationStore);
const showAlert = ref(false);
const alertMessage = ref('');
let alertTimeout = null;

const sendNoti = ()=>{
    const notiObject = {
      receiver : receiver.value,
      content : notiContent.value,
      notificationType : "chat",
      url : "/",
    };
    console.log("notiObject = ",notiObject);
    send(notiObject, (response)=>{
      console.log(response);
    }, (error)=>{
      console.log("error", error);
    });
  }

const toggleChat = () => {
  showChat.value = !showChat.value;
};


const createRooms = ()=>{
  createRoom(userid.value, receiverUser.value, (response)=>{
    console.log(response);
    
  },(error)=>{

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


const login = async () => {
  console.log("login call");
  
  await storeFindAllUnreadNotificationByUserId(userid.value);
  console.log("pinia update value = ", unreadNotificationSize.value);

  // http://i11a606.p.ssafy.io:8080/
  // eventSource.value = new EventSource('http://localhost:8080/notify/subscribe/' + userid.value);
  eventSource.value = new EventSource('http://i11a606.p.ssafy.io:8080//notify/subscribe/' + userid.value);
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
};
</script>

<template>
  <ChatButton @click="toggleChat"/>
    <ChatModal :showChat="showChat" :toggleChat="toggleChat"/>
    <ChatButton @click="toggleChat"/>
    <transition name="fade">
    <!-- <div v-if="showAlert" class="alert">
      {{ alertMessage }}
    </div> -->
  </transition>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 1s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>