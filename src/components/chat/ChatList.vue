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
            <span>{{ chat.chatRoom.name }}</span>
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

.no-chat-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #888;
  font-size: 18px;
}
</style>
