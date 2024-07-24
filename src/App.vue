<script setup>
import { ref } from 'vue';
import ChatView from '@/views/ChatView.vue';
import NavigationBar from '@/views/Bars/NavigationBar.vue';
import SideBar from '@/views/Bars/SideBar.vue';

</script>

<template>
   <NavigationBarView @toggleLoginModal="toggleLoginModal" />
  <div id="app">
    <ChatView></ChatView>
  </div>
</template>

<style scoped>

</style>
