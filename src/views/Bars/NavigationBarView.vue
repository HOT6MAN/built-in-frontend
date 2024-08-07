<template>
  <div class="navigationBar">
      <RouterLink :to="{name: 'home'}" class="logo">
        <img class="logoIcon" alt="로고" src="@/icons/Navbar/Logo.svg" />
        <div class="logoText">Built-In</div>
      </RouterLink>
      <div class="menu">
        <RouterLink :to="{name: 'teambuilding'}" class="menuButton">팀빌딩</RouterLink>
        <RouterLink :to="{name: 'dashboard'}" class="menuButton">프로젝트 관리</RouterLink>
        <RouterLink :to="{name: 'resumes'}" class="menuButton">이력서</RouterLink>
      </div>
    <div class="rightMenu">
      <img class="alarmicon" alt="알림" src="@/icons/Navbar/alarm.svg" />
      <div v-if="authStore.isLogin">
          <div class="login" @click="clickLogout">
          <div class="profile">로그아웃</div>
          </div>
      </div>
      <div v-else>
        <b-button class="login" @click="toggleLoginModal()">
            <div class="profile">로그인</div>
        </b-button>
      </div>
      <div @click="routeToMemberProfile">
        <b-button variant="secondary"><RouterLink :to="{name:'member'}">마이페이지</RouterLink></b-button>
      </div>
    </div>
  </div>
  <LoginModal :showLoginModal="showLoginModal" :toggleLoginModal="toggleLoginModal"/>
</template>


<script setup>
  import { defineComponent, ref } from 'vue'
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore.js';
  import refreshAxios from "@/util/axios-refresh"
  import LoginModal from '@/components/login/LoginModal.vue';
  import ProjectBuildConfigView from '../projectManagement/ProjectBuildConfigView.vue';
  import {createJenkinsJob, updateJenkinsJob, createJenkinsCredential, jenkinsTest, deployTest, find400Log
    ,addDynamicListener} from '@/api/jenkins.js';

    
    const authStore = useAuthStore()
    const {authLogout} = authStore
    const showLoginModal = ref(false);
    const toggleLoginModal = () => {
        showLoginModal.value = !showLoginModal.value;
    };

    const routeToMemberProfile = ()=>{

    }

    function clickLogout(){
        //로그아웃(access + refresh 전송)
        authLogout()
    }
    

    defineComponent({
    name: "NavigationBarBeforeLogged"
    })
</script>

<style scoped>
	/* 현재 각 요소들이 top, left를 이용해 위치를 잡고 있음. 코드를 쉽게 만들기 위해 div로 분류된 아이템들을 align-items를 통해 해결해야 함 */
.navigationBar{
  position: fixed;
  display : flex;
  flex-direction : row;
  align-items: center;
  width: 100%;
  height: 80px;
  top: 0px;
  text-align: left;
  /* 아래 color와 font-family는 버튼 글자 색상과 폰트 스타일. 차후 버튼에 직접 넣을 것 */
  font-family: var(--font-roboto);
  background-color: #2d3648;
  z-index: 10;
}
/* 로고 */
.logo {
	position: relative;
	left: 9px;
	width : 200px;
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
/* 메뉴 */
.menu {
	position: relative;
	display: flex;
	flex-direction: row;
  width: auto;
  gap: 40px;
}
/* a는 routerlink의 밑줄 없애는 용으로 만듦 */
a {
  text-decoration: none;
}
.menuButton {
	color : #EDF0F7;
	font-size: var(--font-size-menu);
	font-family: var(--font-roboto);
}

/* 메뉴 우측 */
.rightMenu {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-left: auto;
  right: 30px;
  gap : 15px;
}
.alarmicon {
	right : 70px;
	width : 40px;
	height : 40px;
}
.login {
  position: relative;
  display: flex;
  /* right: 37px; */
  border-radius: var(--radius-200);
  box-sizing: border-box;
  width: 101px;
  height: 40px;
  align-items: center;
  justify-content: center;
  padding: var(--space-300);
  gap: var(--space-200);
}
</style>
