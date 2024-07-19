<script setup>
import { ref } from 'vue';

const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};
</script>

<template>
    <div class="chat-button" @click="toggleChat">
    채팅
  </div>
</template>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 50px;
  cursor: pointer;
}
</style>