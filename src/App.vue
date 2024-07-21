<template>
  <div>
    <h1>오류</h1>
    <div v-if="errorMessage">
      <p>Error: {{ errorMessage }}</p>
      <img src="https://ghchart.rshah.org/socialworkprogrammer" />
    </div>
    <div v-else>
      <ul>
        <p>여기에다가 원하는걸 쓰시면 됩니다</p>
        <img src="https://ghchart.rshah.org/socialworkprogrammar" />
      </ul>
    </div>
    <ChatButton @click="toggleChat"/>
    <ChatModal :showChat="showChat" :toggleChat="toggleChat" :userid="userid" />
    {{ showChat }}
    <div>
      <input type="text" v-model="userid">
      {{ userid }}
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ChatButton from './components/chat/ChatButton.vue';
import ChatModal from './components/chat/ChatModal.vue';


const data = ref([])
const statusCode = ref(null)
const errorMessage = ref(null)

onMounted(() => {
  axios
    .get('http://localhost:3000/api/data')
    .then((response) => {
      const resobj = response.data
      if (resobj.status === 200) {
        data.value = resobj.data
      } else {
        statusCode.value = response.data.status
        errorMessage.value = resobj.message
      }
    })
    .catch((error) => {
      errorMessage.value = error
      console.log(error)
      console.log(error.constructor.ECONNABORTED)
    })
})

// 채팅 구현 코드
const showChat = ref(false);

const toggleChat = () => {
  showChat.value = !showChat.value;
};
const userid = ref('');
//
</script>
