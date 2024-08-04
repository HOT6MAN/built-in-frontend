<script setup>
import { my} from '@/api/Refresh'
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore()

const {token, getUserId:userId, getUserName: userName, getUserEmail: userEmail }  = storeToRefs(authStore)

function myfunc(){
    my()
}

</script>

<template>
    <div class="info">
        
      
        <div>
            <button @click="myfunc">my</button>
            id : {{userId }}<br>
            이름 : {{ userName }}  <br>
            accessToken :{{ token }} <br>
        </div>

    </div>
</template>

<style scoped>
.info{
   margin-top: 100px;
   
}
</style>