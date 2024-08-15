<script setup>
import { ref } from 'vue';

const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};
</script>

<template>
    <div class="chat-button"><img src="@/icons/chatButton.svg" @click="toggleChat"></img></div>
</template>

<style scoped>
.chat-button {
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  z-index: 100;
}
</style>