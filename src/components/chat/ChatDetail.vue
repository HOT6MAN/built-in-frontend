<script setup>
import { defineProps, defineEmits, ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import {findAllMessageByChatroomId, findReceiver} from '@/api/chat.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '../../stores/authStore';
const props = defineProps({
  chatObject: Object,
  messages: Array,
  userid: {
      type: [String, Number],
      required: true
    }
});
const authStore = useAuthStore();
const {userId, userName} = storeToRefs(authStore);
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
    console.log("All message = ",messageArray.value);
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
    <div class="chat-header">
      <button @click="handleBack" class="back-button">&larr;</button>
      <h2>{{ props.chatObject.roomName }}</h2>
    </div>
    <div class="message-list" ref="messageList">
      <div v-for="message in messageArray" :key="message.descSendDate" 
        :class="['message-item', { 'sent': String(message.sender) === String(userId), 'received': String(message.sender) !== String(userId) }]">
        <div class="message-content">
          <p>{{ message.content }}</p>
        </div>
        <div class="message-info">
          <span class="message-sender">{{ message.sender === userId ? 'You' : message.senderName }}</span>
          <span class="message-date">{{ message.sendDate }}</span>
        </div>
      </div>
    </div>
    <div class="message-input">
      <input v-model="newMessage" placeholder="메시지를 입력하세요." @keyup.enter="sendMessage"/>
      <button @click="sendMessage" class="send-button">전송</button>
    </div>
  </div>
</template>



<style scoped>
.chat-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #f0f2f5;
  font-family: 'Noto Sans KR', sans-serif;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #ffffff;
  border-bottom: 1px solid #e0e0e0;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  margin-right: 10px;
}

.chat-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
}

.message-item {
  max-width: 70%;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.message-item.sent {
  align-self: flex-end;
}

.message-item.received {
  align-self: flex-start;
}

.message-content {
  padding: 10px;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message-item.sent .message-content {
  background-color: #F7F8E0;
  color: black;
  border-bottom-right-radius: 4px;
}

.message-item.received .message-content {
  background-color: #ffffff;
  border-bottom-left-radius: 4px;
}

.message-info {
  font-size: 12px;
  margin-top: 5px;
  color: #8e8e8e;
}

.message-item.sent .message-info {
  text-align: right;
}

.message-input {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
}

.message-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-button:hover {
  background-color: #0056b3;
}
</style>
