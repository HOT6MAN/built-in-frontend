<script setup>
import { ref } from 'vue';
import ChatView from '@/views/ChatView.vue';
import NavigationBarView from '@/views/Bars/NavigationBarView.vue';
import SideBarView from './views/Bars/SideBarView.vue';
import userInfoTest from './components/login/userInfoTest.vue';
</script>

<template>
  <div>
   <NavigationBarView />
    <!-- <ChatView></ChatView> -->

  </div>
  <userInfoTest/>
  <router-view></router-view>
</template>

<style scoped>

</style>
