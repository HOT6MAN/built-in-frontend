<script setup>
import { ref, watch, onMounted } from 'vue';
import { defineProps } from 'vue';
import { findAllRoomByUserId, findAllMessageByChatroomId } from '@/api/chat';
import ChatList from "@/components/chat/ChatList.vue";
import ChatDetail from "@/components/chat/ChatDetail.vue";
import ChatNavbar from '@/components/chat/ChatNavbar.vue';
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);
const props = defineProps({
  showChat: Boolean,
  toggleChat: Function,
});
console.log("store to ref UserId = ",userId.value);
const chatroomList = ref([]);
const chatMessageList = ref([]);
const selectedChatObject = ref(null);

onMounted(async()=>{
  loadChatRooms();
})
const loadChatRooms = () => {
  findAllRoomByUserId(userId.value, (response) => {
    console.log("findAllRoomByUserId = ",response);
    console.log("call find all room by user id");
    if (Array.isArray(response.data.data)) {
      chatroomList.value = response.data.data;
    } else {
      console.error('API 응답이 배열 형식이 아닙니다:', response.data.data);
      chatroomList.value = [];
    }
  }, (error) => {
    console.error('API 호출 오류:', error);
  });
};

watch(() => props.showChat, (newVal, oldVal) => {
  if (newVal === true) {
    selectedChatObject.value = null;
    loadChatRooms();
  }
});

const handleChatSelected = async (chat) => {
  console.log("chat object = ",chat);
  selectedChatObject.value = chat
  await findAllMessageByChatroomId(chat.chatRoom.id, (response)=>{
      console.log(response);
      chatMessageList.value = response.data.data;
  }, (error)=>{

  });
};

const handleBackToChatList = () => {
  selectedChatObject.value = null;
  loadChatRooms();
};
</script>
<template>
  <div v-if="showChat" class="chat-modal-overlay">
    <div class="chat-modal">
      <div class="chat-modal-header">
        <h2>채팅</h2>
        <button @click="toggleChat" class="close-button">&times;</button>
      </div>
      <div class="chat-container">
        <ChatList 
          v-if="!selectedChatObject"
          :chatroomList="chatroomList"
          @chatSelected="handleChatSelected"
        />
        <ChatDetail
          v-else
          :chatObject="selectedChatObject"
          :userid="userId"
          @back="handleBackToChatList"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

.chat-modal-overlay {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.chat-modal {
  background-color: #ffffff;
  border-radius: 12px 12px 0 0;
  width: 350px;
  height: 500px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family: 'Noto Sans KR', sans-serif;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
}

.chat-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f0f2f5;
  border-bottom: 1px solid #e0e0e0;
}

.chat-modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #666;
  padding: 5px;
  line-height: 1;
  transition: color 0.3s ease;
}

.close-button:hover {
  color: #333;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  background-color: #ffffff;
}

/* 스크롤바 스타일링 (WebKit 브라우저용) */
.chat-container::-webkit-scrollbar {
  width: 6px;
}

.chat-container::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.chat-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.chat-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>