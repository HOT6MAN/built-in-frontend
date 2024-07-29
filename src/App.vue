<script setup>
import { ref } from 'vue';
import ChatView from '@/views/ChatView.vue';
import NavigationBarView from '@/views/Bars/NavigationBarView.vue';
</script>

<template>
  <div>
   <NavigationBarView />
    <!-- <ChatView></ChatView> -->

  </div>
  <router-view></router-view>
</template>

<style scoped>

</style>
