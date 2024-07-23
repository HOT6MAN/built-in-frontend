<script setup>
import { ref, watch } from 'vue';
import { defineProps } from 'vue';
import { findAllRoomByUserId, findAllMessageByChatroomId } from '@/api/chat';
import ChattingList from "@/components/chat/ChatList.vue";
import ChatDetail from "@/components/chat/ChatDetail.vue";
import ChatNavbar from '@/components/chat/ChatNavbar.vue';

const props = defineProps({
  showChat: Boolean,
  toggleChat: Function,
  userid: String
});

const chatroomList = ref([]);
const chatMessageList = ref([]);
const selectedChatroomId = ref(null);

const loadChatRooms = () => {
  findAllRoomByUserId(props.userid, (response) => {
    console.log(response);
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
    selectedChatroomId.value = null;
    loadChatRooms();
  }
});

const handleChatSelected = (chatroomId) => {
  selectedChatroomId.value = chatroomId;
  findAllMessageByChatroomId(chatroomId, (response)=>{
      console.log(response);
      chatMessageList.value = response.data.data;
  }, (error)=>{

  });
};

const handleBackToChatList = () => {
  selectedChatroomId.value = null;
  loadChatRooms();
};
</script>

<template>
  <div v-if="showChat" class="chat-modal">
    <div class="chat-modal-content">
      <span class="close" @click="toggleChat">&times;</span>
      <template v-if="selectedChatroomId">
        <ChatDetail :chatroomId="selectedChatroomId" 
                    :messages="chatMessageList"
                    :userid="props.userid"
                    @back="handleBackToChatList"></ChatDetail>
      </template>
      <template v-else>
        <ChatNavbar></ChatNavbar>
        <ChattingList :chatroomList="chatroomList" 
                      @chatSelected="handleChatSelected"></ChattingList>
      </template>
    </div>
  </div>
</template>

<style scoped>
.chat-modal {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  background-color: #fefefe;
  border: 1px solid #888;
  border-radius: 10px;
  padding: 20px;
}

.chat-modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
}
</style>
