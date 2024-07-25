<script setup>
//import {saveJwtLocal} from '@/api/Refresh'
import { Button } from 'bootstrap';
import { onMounted } from 'vue';
import refreshAxios from "@/util/axios-refresh"
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()

onMounted(()=> convert())

function convert(){
  //console.log("JWT 헤더 변환 요청");
  refreshAxios.get('/convert')
  .then(response => {
      const accessToken = response.headers['authorization'];
      //console.log(accessToken);
      if (accessToken) {
          localStorage.setItem('access_token', accessToken.split(' ')[1]);
          authStore.token = accessToken.split(' ')[1]
          authStore.getUser()
          //console.log("액세스토큰 로컬스토리지에 저장");

      }
      // '/'로 리디렉트
      router.replace({path:'/'})
  })
  .catch(error => {
      console.error('Error:', error);
  
  });
}




</script>

<template>
  <div>
    <!-- <h1>After Login</h1>
    <button @click="convertJwt()">헤더로 받아오기</button> -->
  </div >
</template>

<style scoped>

</style>

