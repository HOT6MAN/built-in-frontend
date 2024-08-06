<script setup>
import { ref } from 'vue';
import ChatView from '@/views/ChatView.vue';
import NavigationBarView from '@/views/Bars/NavigationBarView.vue';
import SideBarView from './views/Bars/SideBarView.vue';
import userInfoTest from './components/login/userInfoTest.vue';
import {useRoute} from 'vue-router';

const route = useRoute();
</script>

<template>
  <div>
   <NavigationBarView v-if="route.meta.showNavbar"/>
    <!-- <ChatView></ChatView> -->
    
  </div>
  <!-- <userInfoTest/> -->
  <router-view></router-view>

</template>

<style scoped>

</style>
