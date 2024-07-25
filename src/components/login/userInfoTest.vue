<script setup>
import { my} from '@/api/Refresh'
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()

function myfunc(){
    my()
}

</script>

<template>
    <div class="info">
        
      
        <div>
            <button @click="myfunc">my</button>
            id : {{authStore.user.id }}<br>
            이름 : {{ authStore.user.name }}  <br>
            accessToken :{{ authStore.token }} <br>
        </div>

    </div>
</template>

<style scoped>
.info{
   margin-top: 100px;
   
}
</style>