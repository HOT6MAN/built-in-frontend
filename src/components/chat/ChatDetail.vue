<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import {findAllMessageByChatroomId} from '@/api/chat.js';
const props = defineProps({
  chatroomId: String,
  messages: Array,
  userid : String
});

const emit = defineEmits(['back']);

const messageArray = ref([]);
const chatroomObject = ref({});
const newMessage = ref('');
let stompClient = null;

const handleBack = () => {
  emit('back');
  disconnect();
};

const scrollToBottom = () => {
  nextTick(() => {
    const messageList = document.querySelector('.message-list');
    messageList.scrollTop = messageList.scrollHeight;
  });
};

onMounted(() => {
  connect();
  scrollToBottom();  // 처음 입장 시 스크롤을 아래로
});

onBeforeUnmount(() => {
  console.log("onBeforeUnmount Chat Detail");
  disconnect();
  messageArray.value = [];
});

const sendMessage = () => {
  console.log("sendMessage call");
  if (newMessage.value.trim() !== '') {
    chatroomObject.value.chatroomId = props.chatroomId;
    chatroomObject.value.content = newMessage.value;
    chatroomObject.value.sender = props.userid;
    chatroomObject.value.receiver = "ssafy";
    chatroomObject.value.type = "chat";
    console.log(chatroomObject.value);
    stompClient.send(`/pub/${props.chatroomId}`, {}, JSON.stringify(chatroomObject.value));
    newMessage.value = ''; // 메시지 전송 후 입력 필드 초기화
    scrollToBottom();  // 메시지 전송 후 스크롤을 아래로
  }
};

function connect() {
  const socket = new SockJS(`http://localhost:8080/ws/chat`);
  stompClient = Stomp.over(socket);
  const headers = {
    userId: props.userid
  };
  findAllMessageByChatroomId(props.chatroomId, (response) => {
    messageArray.value = response.data.data;
  }, (error) => {
    console.error('API 호출 오류:', error);
  });
  stompClient.connect(headers, async function (frame) {
    console.log("Connect : " + frame);
    console.log("connect success");
    stompClient.subscribe('/sub/' + props.chatroomId, function (message) {
      console.log("receive OK : " + message);
      const receivedMessage = JSON.parse(message.body);
      console.log("array = ",messageArray.value);
      messageArray.value.push(receivedMessage);
      console.log("convert Message : ", receivedMessage);
      console.log(messageArray.value);
      scrollToBottom();  // 새로운 메시지를 받을 때 스크롤을 아래로
    });
  });
}

function disconnect() {
  if (stompClient !== null) {
    stompClient.disconnect(() => {
      console.log('Disconnected');
    });
    messageArray.value = [];
  }
}

</script>

<template>
  <div class="chat-detail">
    <button @click="handleBack"><-</button>
    <div class="message-list">
      <div v-for="message in messageArray" :key="message.id" class="message-item">
        <div class="message-sender">{{ message.sender }}</div>
        <div class="message-content">{{ message.content }}</div>
        <div class="message-date">{{ message.sendDate }}</div>
      </div>
    </div>
    <div class="message-input">
      <input v-model="newMessage" placeholder="메시지를 입력하세요." @keyup.enter="sendMessage"/>
      <button @click="sendMessage">전송</button>
    </div>
  </div>
</template>

<style scoped>
.chat-detail {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
}

.message-item {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
}

.message-sender {
  font-weight: bold;
}

.message-content {
  font-size: 14px;
  color: #333;
}

.message-date {
  color: #888;
  font-size: 12px;
}

.message-input {
  display: flex;
  padding: 10px;
  border-top: 1px solid #e0e0e0;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
}

.message-input button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

.message-input button:hover {
  background-color: #0056b3;
}
</style>
