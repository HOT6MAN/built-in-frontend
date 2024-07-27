<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';


const authStore = useAuthStore()
const {authSaveAccessLocalStorage} = authStore

onMounted(()=> {
authSaveAccessLocalStorage()})

</script>

<template>
  <div>
  </div >
</template>

<style scoped>

</style>

