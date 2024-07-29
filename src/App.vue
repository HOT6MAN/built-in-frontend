<script setup>
import { ref } from 'vue';
import ChatView from '@/views/ChatView.vue';
import NavigationBarView from '@/views/Bars/NavigationBarView.vue';
import SideBarView from '@/views/Bars/SideBarView.vue';
import userInfoTest from './components/login/userInfoTest.vue';
</script>

<template>
   <NavigationBarView/>
  <div id="app">
    <NavigationBarView @toggleLoginModal="toggleLoginModal" />

  </div>


</template>

<style scoped>

</style>
