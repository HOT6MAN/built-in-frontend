<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
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

