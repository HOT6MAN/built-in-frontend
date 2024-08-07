<script setup>
import { defineProps, ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { RouterLink } from 'vue-router';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore()
const {authEmailLink } = authStore

const url = import.meta.env.VITE_VUE_API_URL;
console.log("url = ",url);

const props = defineProps({
  showLoginModal: Boolean,
  toggleLoginModal: Function
});

console.log("env url = ",url);

const email = ref('')
const title = ref('로그인')
const showJoin = ref(true)

function sendEmail(){
  authEmailLink(email.value)  
}

function changeTitle(){
  if(title.value=='로그인'){
    title.value='회원가입'
    showJoin.value=false
  }else if(title.value=='회원가입'){
    title.value='로그인'
    showJoin.value=true
  }
}


</script>

<template>
    <!-- 모달 창 -->
<div v-if="showLoginModal" class="modal">
  <div class="modal-content">
    <span class="close" @click="toggleLoginModal">&times;</span>
    <h3>{{title}}</h3>
    
    <form v-on:submit.prevent class="auth-email-form">
      <input type="email" placeholder="이메일을 입력하세요." v-model="email" required
      @keyup.enter="sendEmail()">
      <button type="button" @click="sendEmail()">{{title}}</button>
    </form>
    <div class="social-login">
      <h6>소셜 계정으로 {{title}}</h6>
      <a :href="`${url}/oauth2/authorization/naver`">
        <img class="img-oauth" src="@/icons/Navbar/btn_naver.png" alt="Naver 로그인">
      </a>
      <a :href="`${url}/oauth2/authorization/google`">
        <img class="img-oauth" src="@/icons/Navbar/btn_google.png" alt="Google 로그인">
      </a>
      <a class="github-login" :href="`${url}/oauth2/authorization/github`" tabindex="4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" height="20px" width="20px">
          <mask id="github-icon_svg__a" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse">
            <path fill="#fff" fill-rule="evenodd" d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z" clip-rule="evenodd"></path>
          </mask>
          <g mask="url(#github-icon_svg__a)">
            <path fill="currentColor" d="M0 0h20v20H0z" class="svgPath"></path>
          </g>
        </svg>
      </a>
      <div class="toggle-links">
        <div v-show="showJoin">
          <h6>아직 회원이 아니신가요? <span @click="changeTitle">회원가입</span></h6>
        </div>
        <div v-show="!showJoin">
          <h6>계정이 이미 있으신가요? <span @click="changeTitle">로그인</span></h6>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<!-- 스타일 -->
<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  position: relative;
  background-color: #fff;
  padding: 40px;
  border: 1px solid #888;
  width: 80%;
  max-width: 600px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px; /* Set a height for the modal content */

}

.close {
  position: absolute; /* 절대 위치로 설정 */
  top: 10px; /* 모달 상단에서 10px */
  right: 10px; /* 모달 오른쪽에서 10px */
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  cursor: pointer;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.auth-email-form input {
  width: calc(100% - 20px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.auth-email-form button {
  width: calc(100% - 20px);
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 10px 0;
}

.auth-email-form button:hover {
  background-color: #45a049;
}

.social-login {
  margin-top: 20px;
  text-align: center; /* 가운데 정렬 추가 */
  margin-bottom: 40px;
}

.social-login h3 {
  margin-bottom: 15px;
}

.social-login a {
  display: inline-block;
  margin: 0 10px;
  vertical-align: middle; /* 수직 정렬 맞추기 */
}

.img-oauth {
  width: 40px;
  height: 40px;
}

.github-login {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgb(39, 46, 51);
  color: white;
  cursor: pointer;
  vertical-align: middle; /* 수직 정렬 맞추기 */
}

.github-login svg {
  vertical-align: middle; /* 수직 정렬 맞추기 */
  margin-top: 8px;
}

.toggle-links {
  position: absolute;
  bottom: 20px; /* Adjust as needed */
  right: 20px; /* Adjust as needed */
  text-align: right; /* Align text to the right */
}

.toggle-links h6 {
  margin: 0;
}

.toggle-links span {
  color: #007BFF;
  cursor: pointer;
  text-decoration: underline;
}

.toggle-links span:hover {
  color: #0056b3;
}

</style>
