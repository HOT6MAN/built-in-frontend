<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  chatroomList: Array
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
          <span class="chat-name">{{ chat.sender }}</span>
          <span class="chat-date">{{ chat.sendDate }}</span>
        </div>
        <div class="chat-content">
          {{ chat.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-list {
  overflow-y: auto;
  height: 100%;
  padding: 10px;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer; /* Add cursor pointer for clickable items */
}

.chat-item:hover {
  background-color: #f0f0f0; /* Add hover effect */
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
