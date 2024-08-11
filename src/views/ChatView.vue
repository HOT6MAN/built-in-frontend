<script setup>
import { ref, onMounted, computed } from 'vue';
import ChatButton from '@/components/chat/ChatButton.vue';
import ChatModal from '@/components/chat/ChatModal.vue';
import { storeToRefs } from 'pinia';
import { useChatStore } from '../stores/chatStore';

const chatStore = useChatStore();
const {chatOpen} = storeToRefs(chatStore);
const {changeChatOpenStatus} = chatStore;

const showChat = computed(() => chatOpen.value);
const showAlert = ref(false);
const alertMessage = ref('');


const toggleChat = () => {
  changeChatOpenStatus();
};

</script>

<template>
  <ChatButton @click="toggleChat"/>
    <ChatModal v-if="showChat" :showChat="showChat" :toggleChat="toggleChat"/>
    <ChatButton @click="toggleChat"/>
    <transition name="fade">

    <div v-if="showAlert" class="alert">
      {{ alertMessage }}
    </div>

  </transition>
</template>

<style scoped>
.alert {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  z-index: 1000;
  transition: opacity 1s ease-in-out;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>