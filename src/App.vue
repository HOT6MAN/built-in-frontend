<script setup>

import NavigationBarView from '@/views/Bars/NavigationBarView.vue';
import userInfoTest from './components/login/userInfoTest.vue';

</script>

<template>

  
  <div id="app">
    <NavigationBarView @toggleLoginModal="toggleLoginModal" />
    <userInfoTest></userInfoTest>

  </div>


</template>

<style scoped>

</style>
