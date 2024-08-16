<template>
  <div class="navigationBar">
      <RouterLink :to="{name: 'home'}" class="logo">
        <img class="logoIcon" alt="로고" src="@/icons/Navbar/Logo.svg" />
        <div class="logoText">Built-In</div>
      </RouterLink>
      <div class="menu">
        <RouterLink :to="{name: 'teambuilding'}" class="menuButton">팀빌딩</RouterLink>
        <RouterLink v-if="userId" :to="{name: 'myteam'}" class="menuButton">팀 / 프로젝트 관리</RouterLink>
        <RouterLink v-if="userId" :to="{name: 'resumes'}" class="menuButton">이력서</RouterLink>
      </div>
    <div class="rightMenu">
    <div v-if="userId" class="afterLoginContainer">
      <!-- 알람 여부에 따른 상태 변화 -->
      <img v-if="unreadNotificationSize != 0" class="alarmicon" alt="알림" src="@/icons/Navbar/alarm.svg" @click="toggleNotificationModal" />
      <img v-if="unreadNotificationSize == 0" class="alarmicon" alt="알림" src="@/icons/Navbar/state=off.svg" @click="toggleNotificationModal" />
      <b-button @click="clickLogout">로그아웃</b-button>
      <div @click="routeToMemberProfile">
        <b-button><RouterLink :to="{name:'member'}">마이페이지</RouterLink></b-button>
      </div>
    </div>
      <div v-else>
        <b-button class="rightButtons" @click="toggleLoginModal()">로그인</b-button>
      </div>
    </div>
  </div>
  <LoginModal :showLoginModal="showLoginModal" :toggleLoginModal="toggleLoginModal"/>
  <NotificationModal :showNotificationModal="showNotificationModal" :toggleNotificationModal="toggleNotificationModal"></NotificationModal>
</template>


<script setup>
  import { defineComponent, ref } from 'vue'
  import { useRoute } from 'vue-router';
  import { RouterLink, RouterView } from 'vue-router'
  import { useAuthStore } from '@/stores/authStore.js';
  import LoginModal from '@/components/login/LoginModal.vue';
  import NotificationModal from '../../components/notification/NotificationModal.vue';
  import { storeToRefs } from 'pinia';
  import {useNotificationStore} from '@/stores/notificationStore.js';

  const notificationStore = useNotificationStore();
  const {unreadNotificationSize} = storeToRefs(notificationStore);
  
  const authStore = useAuthStore()
  const {authLogout} = authStore
  const showLoginModal = ref(false);
  const {userId, userName, userEmail} = storeToRefs(authStore);
  
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


    const showNotificationModal = ref(false);
    const toggleNotificationModal = ()=>{
      showNotificationModal.value = !showNotificationModal.value;
    }
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
  color: white;
}
.logo:hover {
  color: #6c757d;
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
	color : white;
	font-size: var(--font-size-menu);
	font-family: var(--font-roboto);
}
.menuButton:hover {
  color: #6c757d;
}
/* 메뉴 우측 */
.rightMenu {
  margin-left: auto;
  right: 30px;
}
.afterLoginContainer {
  display: flex;
  gap : 40px;
  width: auto;
  margin-right: 30px;
}
.afterLoginContainer a {
  color: white;
}
.alarmicon {
	right : 70px;
	width : 40px;
	height : 40px;
}
.rightButtons {
  position: relative;
  display: flex;
  /* right: 37px; */
  border-radius: var(--radius-200);
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  right: 30px;
  align-items: center;
  justify-content: center;
  padding: var(--space-300);
  gap: var(--space-200);
}
</style>
