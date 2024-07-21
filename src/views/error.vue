<template>
  <div>
    <h1>Hello, Vue!</h1>
  </div>
</template>
<script lang="ts">
  import axios from 'axios';
  import { onMounted, ref } from 'vue';
  import { useCounterStore} from '@/stores/counter'
  import { useRoute } from 'vue-router';

  const store = useCounterStore()
  const route = useRoute()
  let variable = '' // 변수 이름

  onMounted(()=> {
    axios({
      // API 방식
      method: 'get',
      // 백엔드에 요청할 API_URL 주소
      url: `${API_URL}`
    }) // 만약 요청에 제대로 왔을 경우
    .then((response) => {
      // variable = 변수, response.data를 JSON 파일로 받음
      variable = response.data
    }) // 오류가 발생했을 경우
    .catch((error) => {
      // errorMessage라는 변수를 생성
      let errorMessage = ''
      if (error) {
      // 에러메built-in-pjt/src/App.vue시지는 에러코드 + 에러내용을 포함
        errorMessage = `Error: ${error.response.status} - ${error.response.statusText}` // 자세한 이유를 포함하는 코드를 작성할 필요가 있다 400 -> 왜 떴는지
      } else if (error.request) {
      // 만일 전송 자체에 문제가 생겼을 경우 
        errorMessage = 'Error: No response from server'
      } else {
      // 그 이외
        errorMessage = `Error : ${error.message}`
      }
      // 윈도우 alert 창으로 에러를 표시함
      window.alert('에러 발생!' + errorMessage)
    })
  })

</script>

<style>
  
</style>