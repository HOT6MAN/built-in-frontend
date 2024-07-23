<script setup>
import { ref } from 'vue';
import ChatButton from './components/chat/ChatButton.vue';
import ChatModal from './components/chat/ChatModal.vue';
import NavigationBar from '@/views/Bars/NavigationBar.vue';
import SideBar from '@/views/Bars/SideBar.vue';
import {send} from "@/api/notification.js";
import {createRoom} from "@/api/chat.js"

const receiverUser = ref("");

const notiContent = ref("");
  const receiver = ref("");
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

const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};

const userid = ref('');
const eventSource = ref(null);

const createRooms = ()=>{
  createRoom(userid.value, receiverUser.value, (response)=>{
    console.log(response);
    
  },(error)=>{

  });
}

const login = () => {
  console.log("login call");
  eventSource.value = new EventSource('http://localhost:8080/subscribe/' + userid.value);

  eventSource.value.addEventListener('open', () => {
    console.log('Connection opened');
  });

  eventSource.value.addEventListener('message', (event) => {
    console.log('New message:', event.data);
  });

  eventSource.value.addEventListener('sse', async (event) => {
    let data;
    console.log(event);
    try {
      console.log(event.data);
      console.log("event call by sse");
    } catch (e) {
      console.error('Failed to parse message as JSON:', event.data);
      return;
    }

    const showNotification = () => {
      const notification = new Notification('코드봐줘', {
        body: data.content
      });

      setTimeout(() => {
        notification.close();
      }, 10 * 1000);

      notification.addEventListener('click', () => {
        window.open(data.url, '_blank');
      });
    };

    if (Notification.permission === 'granted') {
      showNotification();
    } else if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        showNotification();
      }
    }
  });

  eventSource.value.addEventListener('error', (event) => {
    if (eventSource.value.readyState === EventSource.CLOSED) {
      console.log('Connection closed');
    } else {
      console.error('EventSource error:', event);
    }
  });

};
</script>

<template>
  <div id="app">
    <div>
    <h1>오류</h1>
    <div v-if="errorMessage">
      <p>Error: {{ errorMessage }}</p>
      <img src="https://ghchart.rshah.org/socialworkprogrammer" />
    </div>
    <div v-else>
      <ul>
        <p>여기에다가 원하는걸 쓰시면 됩니다</p>
        <img src="https://ghchart.rshah.org/socialworkprogrammar" />
      </ul>
    </div>
    </div>
    <ChatButton @click="toggleChat"/>
    <ChatModal :showChat="showChat" :toggleChat="toggleChat" :userid="userid" />
    {{ showChat }}
    <div>
      <input type="text" v-model="userid">
      {{ userid }}
    </div>
    <ChatButton @click="toggleChat"/>
    <ChatModal :showChat="showChat" :toggleChat="toggleChat" :userid="userid" />
    {{ showChat }}
    <div>
      <input type="text" v-model="userid" placeholder="Enter user ID">
      {{ userid }}
      <button @click="login">로그인</button>
      <br>
      <input type="text" v-model="receiverUser"  placeholder="Send Chatting"/>
      <button @click="createRooms">생성</button>
      <br>
      <input type="text" v-model="receiver"  placeholder="이벤트 전송 대상">
      <input type="text" v-model="notiContent" placeholder="이벤트 내용">
      <button @click="sendNoti">이벤트 전송</button>

    </div>
  </div>
</template>

<style scoped>
</style>
