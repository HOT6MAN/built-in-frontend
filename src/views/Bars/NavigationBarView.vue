<template>
  <div class="navigationBar">
	<div class="sitelogo">
	  <img class="logoIcon" alt="로고" src="@/icons/Navbar/Logo.svg" />
	  <div class="logoText">Built-In</div>
	</div>
	<div class="menu">
	  <RouterLink :to="{name : 'home'}" class="menuButton">홈</RouterLink>
	  <RouterLink :to="{name: 'teambuilding'}" class="menuButton">팀빌딩</RouterLink>
	</div>
	<img class="alarmicon" alt="알림" src="@/icons/Navbar/alarm.svg" />
	  <div v-if="authStore.isLogin">
      	<div class="login" @click="clickLogout">
      	<div class="profile">로그아웃</div>
      	</div>
      </div>
    <div v-else>
      <div class="login" @click="toggleLoginModal()">
      <div class="profile">로그인</div>
      </div>
    </div>
  </div>
  <LoginModal :showLoginModal="showLoginModal" :toggleLoginModal="toggleLoginModal"/>
</template>


<script setup>
  import { defineComponent, ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from '@/stores/auth.js';
  import refreshAxios from "@/util/axios-refresh"
  import LoginModal from '@/components/login/LoginModal.vue';

  const authStore = useAuthStore()
  const showLoginModal = ref(false);
  const toggleLoginModal = () => {
      showLoginModal.value = !showLoginModal.value;
  };
  function clickLogout(){
    //로그아웃(access + refresh 전송)
    refreshAxios.post('/logout', {},   
    {
        headers: {Authorization: localStorage.getItem("access_token")},
    }
    )
    .then(response => {
        console.log(response);
        localStorage.removeItem('access_token')
        authStore.token=''
        authStore.user={
            id:'',
            name:'',
            email:''
        }
        alert("로그아웃 완료")
    })
    .catch(error => {
        console.error('Error:', error);
    });
  }


    defineComponent({
    name: "NavigationBarBeforeLogged"
    })
    
</script>

<style scoped>
	/* 현재 각 요소들이 top, left를 이용해 위치를 잡고 있음. 코드를 쉽게 만들기 위해 div로 분류된 아이템들을 align-items를 통해 해결해야 함 */
.sitelogo {
	position: relative;
	left: 9px;
	width : auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 15px;
	font-size: 22px;
}
.logoIcon {
	width: 58px;
	height: 58px;
	position: relative;
}
.logoText {
	position: relative;
	font-weight: 700;
}
.menu {
	position: absolute;
	display: flex;
	flex-direction: row;
	gap: 40px;
	position : relative;
  left: 80px;
  width: 80%;
}
.menuButton {
	color : white;
	font-size: var(--font-size-menu);
	font-family: var(--font-roboto);

}
.alarmicon {
  position: relative;
	right : 70px;
	width : 40px;
	height : 40px;
}
.login {
  position: relative;
  /* right: 37px; */
  border-radius: var(--radius-200);
  background-color: rgba(255, 212, 58, 0.99);
  border: 1px solid #ffedad;
  box-sizing: border-box;
  width: 101px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-300);
  gap: var(--space-200);
	right : 30px;
}
.navigationBar{
	width: 100%;
  position: fixed;
  height: 80px;
  top: 0px;
  overflow: hidden;
  text-align: left;
	/* 아래 color와 font-family는 버튼 글자 색상과 폰트 스타일. 차후 버튼에 직접 넣을 것 */
  color: var(--color-buttons);
  font-family: var(--font-roboto);
	background-color: #2d3648;
	display : flex;
	flex-direction : row;
	align-items : center;
  z-index: 999;
}
/* .login:active {
  margin-left:2px;
  margin-top:2px;
  box-shadow:none;
} */

</style>
