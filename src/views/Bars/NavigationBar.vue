<template>
    <div class="navigationBarBeforeLogged">
        <div class="navigationBarBeforeLoggedInner">
            <div class="navigationBarLoginParent">
                <div class="navigationBarLoginParent">
                    <div class="navigationBarLoginChild" />
                    <div class="menuWrapper">
                        <div class="menu">
                            <div class="about">홈</div>
                            <div class="about">팀빌딩</div>
                        </div>
                    </div>
                    <div class="sitelogo">
                        <img class="buttonslogoIcon" alt="로고" src="@/icons/Navbar/Logo.svg" />
                        <div class="sitelogo1">Built-In</div>
                    </div>
                    <div class="logIn" />
                    <div class="div1" />
                    <div class="navigationBarLoginInner">
                        <div class="navigationBarLoginParent">
                            <div class="navigationBarLoginParent">
                                <div class="navigationBarLoginParent">
                                    <div class="buttonsprofileButton">
                                        <div class="profile">Profile</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="notificationWrapper">
                    <img class="icon" alt="" src="@/icons/Navbar/alarm.svg" />
                    <div v-if="unreadNotifications > 0" class="notificationCount">
                        {{ unreadNotifications }}
                    </div>
                </div>
            </div>
        </div>
        <div class="login">
            <div class="profile">Login</div>
        </div>
        <div class="signUp">
            <div class="profile">Sign-up</div>
        </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: "NavigationBarBeforeLogged",
    data() {
      return {
        unreadNotifications: 0 // 미수신 알림 수를 저장하는 변수
      };
    },
    methods: {
      fetchNotifications() {
        // 여기에 실제로 알림을 가져오는 로직을 구현하세요
        // 예: API 호출을 통해 알림 수를 받아와 unreadNotifications 변수에 할당
        this.unreadNotifications = 5; // 예시로 5개의 미수신 알림이 있다고 설정
      }
    },
    mounted() {
      this.fetchNotifications(); // 컴포넌트가 마운트될 때 알림을 가져옵니다.
    }
  });
  </script>
  
  <style>
  .notificationWrapper {
      position: relative;
      display: inline-block;
  }
  .icon {
      width: 60px;
      height: 60px;
  }
  .notificationCount {
      position: absolute;
      top: 0;
      right: 0;
      background-color: red;
      color: white;
      border-radius: 50%;
      padding: 5px;
      font-size: 14px;
      line-height: 1;
  }
  .navigationBarLoginChild {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0%;
      right: 0%;
      bottom: 0%;
      left: 0%;
      background-color: #2d3648;
  }
  .about {
      position: relative;
  }
  .menu {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 631px;
      height: 29px;
      display: flex;
      flex-direction: row;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 40px;
  }
  .menuWrapper {
      position: absolute;
      top: 23px;
      left: 162px;
      width: 631px;
      height: 29px;
  }
  .buttonslogoIcon {
      width: 52px;
      position: relative;
      height: 58px;
  }
  .sitelogo1 {
      position: relative;
      font-weight: 300;
      text-shadow: 1px 0 0 #fff, 0 1px 0 #fff, -1px 0 0 #fff, 0 -1px 0 #fff;
  }
  .sitelogo {
      position: absolute;
      top: 0px;
      left: 9px;
      width: 142px;
      height: 80px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      gap: 10px;
      font-size: 22px;
  }
  .logIn {
      position: absolute;
      height: 48.75%;
      width: 7.01%;
      top: 26.25%;
      right: 1.53%;
      bottom: 25%;
      left: 91.46%;
  }
  .div1 {
      position: absolute;
      height: 75%;
      width: 4.17%;
      top: 12.5%;
      right: 11.94%;
      bottom: 12.5%;
      left: 83.89%;
      overflow: hidden;
  }
  .profile {
      position: relative;
      line-height: 100%;
  }
  .buttonsprofileButton {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0%;
      right: 0%;
      bottom: 0%;
      left: 0%;
      border-radius: var(--radius-200);
      background-color: var(--color-lightskyblue);
      border: 1px solid var(--color-deepskyblue);
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: var(--space-300);
  }
  .navigationBarLoginInner {
      position: absolute;
      height: 50%;
      width: 7.01%;
      top: 26.25%;
      right: 2.5%;
      bottom: 23.75%;
      left: 90.49%;
      display: none;
      font-size: var(--single-line-body-base-size);
      color: #000;
      font-family: var(--single-line-body-base);
  }
  .icon {
      position: absolute;
      top: 10px;
      right: 295px;
      width: 60px;
      height: 60px;
      overflow: hidden;
  }
  .navigationBarLoginParent {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0%;
      right: 0%;
      bottom: 0%;
      left: 0%;
  }
  .navigationBarBeforeLoggedInner {
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0%;
      right: 0%;
      bottom: 0%;
      left: 0%;
      font-size: var(--font-size-5xl);
      color: var(--color-white);
      font-family: var(--font-roboto);
  }
  .login {
      position: absolute;
      top: 20px;
      right: 37px;
      border-radius: var(--radius-200);
      background-color: rgba(255, 212, 58, 0.99);
      border: 1px solid #ffedad;
      box-sizing: border-box;
      width: 101px;
      height: 40px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: var(--space-300);
      gap: var(--space-200);
  }
  .login:active {
    margin-left:2px;
    margin-top:2px;
    box-shadow:none;
  }
  .signUp {
      position: absolute;
      top: 20px;
      right: 169px;
      border-radius: var(--radius-200);
      background-color: var(--color-deepskyblue);
      border: 1px solid var(--color-lightskyblue);
      box-sizing: border-box;
      width: 101px;
      height: 40px;
      overflow: hidden;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: var(--space-300);
      gap: var(--space-200);
  }
  .signUp:active{
    margin-left:2px;
    margin-top:2px;
    box-shadow:none;
  }
  .navigationBarBeforeLogged {
      width: 100%;
      position: fixed;
      height: 80px;
      overflow: hidden;
      text-align: left;
      font-size: var(--single-line-body-base-size);
      color: var(--text-danger-on-danger);
      font-family: var(--single-line-body-base);
  }
  </style>
  