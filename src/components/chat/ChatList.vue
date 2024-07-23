<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  chatroomList: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['chatSelected']);

const handleChatClick = (chatroomId) => {
  emit('chatSelected', chatroomId);
};
</script>

<template>
  <div class="chat-list">
    <div v-for="chat in chatroomList" :key="chat.chatroomId" class="chat-item" @click="handleChatClick(chat.chatroomId)">
      <div class="chat-details">
        <div class="chat-header">
          <span>{{ chat.chatroomId }}</span>
          <span class="chat-name">{{ chat.latestMessage.sender }}</span>
          <span class="chat-date">{{ chat.latestMessage.sendDate }}</span>
          <span class="chat-isRead">{{ chat.unreadCount }}</span>
        </div>
        <div class="chat-content">
          {{ chat.latestMessage.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-list {
  overflow-y: auto;
  height: calc(100% - 50px);
  padding: 10px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}

.chat-item:hover {
  background-color: #f0f0f0;
}

.chat-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.chat-details {
  flex: 1;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.chat-name {
  font-weight: bold;
}

.chat-date {
  color: #888;
  font-size: 12px;
}

.chat-content {
  font-size: 14px;
  color: #333;
}
</style>
