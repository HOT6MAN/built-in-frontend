<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  showLoginModal: Boolean,
  toggleLoginModal: Function
});

</script>

<template>
    <!-- 모달 창 -->
    <div v-if="showLoginModal" class="modal">
      <div class="modalContent">
        <span class="close" @click="toggleLoginModal">&times;</span>
        <p>로그인 폼 여기에 추가</p>
        <button type="button"  class="btn btn-secondary" onclick="location.href='http://localhost:8080/oauth2/authorization/naver'">Naver Login</button>
        <button type="button" class="btn btn-primary"  onclick="location.href='http://localhost:8080/oauth2/authorization/google'">Google Login</button>        
      </div>
    </div>
</template>

<style scoped>
.modal {
    position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* 중앙 정렬을 위한 변환 */
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 500px;
  background-color: #fefefe;
  border: 1px solid #888;
  border-radius: 10px;
  padding: 20px;
}

.modalContent {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>