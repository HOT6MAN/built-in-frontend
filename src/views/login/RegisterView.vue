<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';


const authStore = useAuthStore()
const {authSignUp } = authStore
const route = useRoute();

const email = ref('');

const user = ref({
    email:'',
    nickname:'',
    name:'',
    phone:''
})


onMounted(() => {
  user.value.email = route.query.email;
});

function signUp(){
    console.log(user);
    authSignUp(user.value)
}

</script>

<template>

<div class="main-content">     
    <div class="config-container"> 
        <div class="fYreJO">
            <h1>회원가입</h1>
            <div class="contents">
                <div class="jlNcEk">
                    <div class="sc-crHmcD fLCeMm">
                        <label>이름</label>
                        <div class="group">
                            <div class="input-wrapper">
                                <input name="displayName" v-model="user.name" placeholder="이름을 입력하세요" size="20">
                            </div>
                            <div class="width-maker">이름을 입력하세요</div>
                        </div>
                    </div>
                </div>
        
                <div class="jlNcEk">
                    <div class="sc-crHmcD fLCeMm">
                        <label>닉네임</label>
                        <div class="group">
                            <div class="input-wrapper">
                                <input name="displayName" v-model="user.nickname" placeholder="닉네임을 입력하세요" size="20">
                            </div>
                            <div class="width-maker">닉네임을 입력하세요</div>
                        </div>
                    </div>
                </div>
        
                <div class="jlNcEk">
                    <div class="sc-crHmcD fLCeMm">
                        <label>이메일</label>
                        <div class="group">
                            <div class="input-wrapper">
                                <input name="displayName" disabled v-model="user.email" placeholder="이메일을 입력하세요" size="20">
                            </div>
                            <div class="width-maker">이메일을 입력하세요</div>
                        </div>
                    </div>
                </div>
        
        
                <div class="jlNcEk">
                    <div class="sc-crHmcD fLCeMm">
                        <label>전화번호</label>
                        <div class="group">
                            <div class="input-wrapper">
                                <input name="displayName" v-model="user.phone" placeholder="전화번호을 입력하세요" size="20">
                            </div>
                            <div class="width-maker">전화번호를 입력하세요</div>
                        </div>
                    </div>
                </div>
        
                <div class="jlNcEk">
                    <div class="sc-crHmcD fLCeMm">
                        <label>주소</label>
                        <div class="group">
                            <div class="input-wrapper">
                                <input name="displayName" v-model="user.address" placeholder="주소를 입력하세요" size="20">
                            </div>
                            <div class="width-maker">주소를 입력하세요</div>
                        </div>
                    </div>
                </div>
             
        
                <button class="save-button" color="teal" @click="signUp">가입</button>
                <button class="remove-button" variant="danger" size="sm">
                    <router-link :to="{name:'home'}"
                            style="text-decoration: none; color: white">취소</router-link>
                </button>
        
            </div>
        
         
        
        
        </div>
    </div>
</div>

</template>

<style scoped>
 .main-content {
    display: flex;
    margin-top: 80px;
    padding: 20px;
    justify-content: center;
    background-color: #f0f4f8;
    min-height: 100vh;
  }
  .config-container {
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .save-button {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  background-color: #4c566a;
  color: #ffffff;
}

.save-button:hover {
  background-color: #434c5e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-button {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #bf616a;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 8px;
}

.remove-button:hover {
  background-color: #d08770;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}



/* margin-top을 줘 네비게이션 바가 하단 요소를 잡아먹지 않도록 합니다. */
.signUp {
    margin-top : 100px;
}

.cOBVPj {
    height: 3rem;
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 1.5rem;
    border: none;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    background: #DEE2E6;
    color: #212529;
    transition: 0.125s ease-in;
    cursor: pointer;
}

.fLtQtN {
    height: 3rem;
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 1.5rem;
    border: none;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    background: #12B886;
    color: #FFFFFF;
    transition: 0.125s ease-in;
    cursor: pointer;
}


.fYreJO {
    width: 768px;
    margin: 100px auto 0px;
    line-height: 1.5;
}

.fLCeMm .input-wrapper {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #DEE2E6;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.fLCeMm .width-maker {
    max-width: 100%;
    display: inline-block;
    visibility: hidden;
    font-size: 1.5rem;
    overflow: hidden;
    line-height: 0;
}

.group {
    display: inline-block;
    max-width: 100%;
}

.jINcEk {
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.fLCeMm label {
    font-weight: bold;
    font-size: 1.125rem;
    color: var(--text1);
    margin-bottom: 1rem;
    transition: 0.125s ease-in;
}

.fLCeMm label, .fLCeMm input {
    display: block;
    line-height: 1.5;
}

.fLCeMm input {
    background: transparent;
    font-size: 1.5rem;
    border: none;
    outline: none;
    outline-color: initial;
    outline-style: none;
    outline-width: initial;
    width: 100%;
    color: var(--text2);
    transition: 0.125s ease-in;
}



</style>