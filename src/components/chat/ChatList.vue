<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  chatroomList: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['chatSelected']);

const handleChatClick = (chat) => {
  emit('chatSelected', chat);
};
</script>

<template>
  <div class="chat-list">
    <div v-if="chatroomList.length === 0" class="no-chat-message">
      현재 참여하신 채팅이 없습니다.
    </div>
    <div v-else>
      <div v-for="chat in chatroomList" :key="chat.id" class="chat-item" @click="handleChatClick(chat)">
        <div class="chat-details">
          <div class="chat-header">
            <span>{{ chat.roomName }}</span>
            <span class="chat-date">{{ chat.chatRoom.last_message_date }}</span>
            <span class="chat-isRead">{{ chat.unreadCount }}</span>
          </div>
          <div class="chat-content">
            {{ chat.chatRoom.last_message }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap');

.chat-list {
  font-family: 'Noto Sans KR', sans-serif;
  overflow-y: auto;
  height: calc(100% - 50px);
  padding: 15px;
  background-color: #f8f9fa;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 12px;
  background-color: #ffffff;
  margin-bottom: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.chat-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.chat-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  object-fit: cover;
}

.chat-details {
  flex: 1;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.chat-name {
  font-weight: 500;
  font-size: 16px;
  color: #333;
}

.chat-date {
  color: #888;
  font-size: 12px;
}

.chat-content {
  font-size: 14px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.chat-unread {
  background-color: #4a90e2;
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding: 2px 8px;
  border-radius: 10px;
  margin-left: 10px;
}

.no-chat-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
  font-size: 18px;
  font-weight: 300;
}
</style>
