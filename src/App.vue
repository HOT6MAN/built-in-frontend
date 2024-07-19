<script setup>
import { ref } from 'vue';
import ChatButton from './components/chat/ChatButton.vue';
import ChatModal from './components/chat/ChatModal.vue';

const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};
const userid = ref('');
</script>

<template>
  <div id="app">
    <ChatButton @click="toggleChat"/>
    <ChatModal :showChat="showChat" :toggleChat="toggleChat" :userid="userid" />
    {{ showChat }}
    <div>
      <input type="text" v-model="userid">
      {{ userid }}
    </div>
  </div>
</template>

<style scoped>
</style>
