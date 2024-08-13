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

</script>

<template>
  <ChatButton @click="toggleChat"/>
  <ChatModal :showChat="showChat" :toggleChat="toggleChat"/>
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