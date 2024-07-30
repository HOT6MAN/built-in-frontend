<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';


const authStore = useAuthStore()
const {authSaveAccessLocalStorage} = authStore

onMounted(()=> {
  console.log("afterLogin");
  authSaveAccessLocalStorage()
})

</script>

<template>
  <div>
  </div >
</template>

<style scoped>

</style>

