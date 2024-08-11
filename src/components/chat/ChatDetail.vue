<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import {findAllMessageByChatroomId, findReceiver} from '@/api/chat.js';
const props = defineProps({
  chatObject: Object,
  messages: Array,
  userid: {
      type: [String, Number],
      required: true
    }
});

const emit = defineEmits(['back']);

const messageArray = ref([]);
const chatroomObject = ref({});
const newMessage = ref('');
const receiverId = ref('');
const receiverStatus = ref(false);
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
  console.log("receiver Id", receiverId.value);
  if (newMessage.value.trim() !== '') {
    chatroomObject.value.chatroomId = props.chatObject.chatRoom.id;
    chatroomObject.value.content = newMessage.value;
    chatroomObject.value.sender = props.chatObject.userId;
    chatroomObject.value.receiver = receiverId.value;
    chatroomObject.value.type = "chat";
    chatroomObject.value.receiverStatus = receiverStatus.value;
    console.log(chatroomObject.value);
    stompClient.send(`/pub/${props.chatObject.chatRoom.id}`, {}, JSON.stringify(chatroomObject.value));
    newMessage.value = ''; // 메시지 전송 후 입력 필드 초기화
    scrollToBottom();  // 메시지 전송 후 스크롤을 아래로
  }
};

async function connect() {
  // http://i11a606.p.ssafy.io:8080/
  // const socket = new SockJS(`http://localhost:8080/ws/chat`);
  console.log("props object = ",props.chatObject);
  await findAllMessageByChatroomId(props.chatObject.chatRoom.id, (response) => {
    messageArray.value = response.data.data;
  }, (error) => {
    console.error('API 호출 오류:', error);
  });
  await findReceiver(props.chatObject.chatRoom.id, props.chatObject.userId, (response)=>{
     receiverId.value = response.data.data;
  },(error)=>{
    console.log("error = ",error);
  });
  const url = import.meta.env.VITE_VUE_API_URL;
  const socket = new SockJS(`${url}/ws/chat`);
  const headers = {
    'userId': props.chatObject.userId,
    'chatroomId' : props.chatObject.chatRoom.id,
    'receiverId' : receiverId.value,
    'destination': '/ws/chat'
  };
  stompClient = Stomp.over(socket);
  stompClient.connect(headers, async function (frame) {
    console.log("connect Success");
    stompClient.subscribe('/sub/' + props.chatObject.chatRoom.id, function (message) {
      console.log("receive message = ",message.body);
      const receivedMessage = JSON.parse(message.body);
      messageArray.value.push(receivedMessage);
      console.log(messageArray.value);  
      scrollToBottom(); 
    }, function (error){
      console.log("stomp connect error = ",error);
    });

    stompClient.subscribe('/sub/status/' + props.chatObject.chatRoom.id, function (message) {
      console.log("set receiver Status = ",message.body);
      receiverStatus.value = message.body;
    }, headers);
  });
}

function disconnect() {
  if (stompClient !== null) {
    const headers = {
      userId: props.chatObject.userId,
      chatroomId: props.chatObject.chatRoom.id,
      receiverId: receiverId.value
    };


    stompClient.disconnect(() => {
      console.log('Disconnected');
    });
    messageArray.value = [];
    receiverId.value = "";
  }
}

</script>

<template>
  <div class="chat-detail">
    <button @click="handleBack">취소</button>
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
