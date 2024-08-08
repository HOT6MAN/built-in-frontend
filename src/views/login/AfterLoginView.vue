<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useNotificationStore } from "@/stores/notificationStore.js";
import { storeToRefs } from 'pinia';
import EventSourcePolyfill from 'event-source-polyfill';
const authStore = useAuthStore()
const {authSaveAccessLocalStorage} = authStore

onMounted(async ()=> {
  console.log("afterLogin");
  await authSaveAccessLocalStorage();
})




</script>

<template>
  <div>
  </div >
</template>

<style scoped>

</style>

