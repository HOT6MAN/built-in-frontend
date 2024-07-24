<template>
  <!-- 1. :class="$style.으로 시작할텐데, 바인딩(':')과 .style 모두 삭제" -->
  <div class="navigationBarBeforeLogged">
      <div class="navigationBarBeforeLoggedInner">
          <div class="navigationBarLoginParent">
              <div class="navigationBarLoginParent">
                  <div class="navigationBarLoginChild" />
                  <div class="menuWrapper">
                      <div class="menu">
                          <div class="about">홈</div>
                          <RouterLink :to="{name: 'teambuilding'}">팀빌딩</RouterLink>
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
             
              <img class="icon" alt="" src="@/icons/Navbar/alarm.svg" />
          </div>
      </div>
      <template v-if="authStore.isLogin">
        <div class="login" @click="clickLogout">
          <div class="profile">Logout</div>
        </div>
      </template>
      <template v-else>
        <div class="login" @click="$emit('toggleLoginModal')">
          <div class="profile">Login</div>
        </div>
      </template>
      
      <div class="signUp">
          <div class="profile">Sign-up</div>
      </div>

  </div>
  <RouterView />
</template>

<script lang="ts" setup>
    import { defineComponent, ref } from 'vue'
    import { RouterLink, RouterView } from 'vue-router'
    import { useAuthStore } from '@/stores/auth.js';
    import refreshAxios from "@/util/axios-refresh"


    const authStore = useAuthStore()
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
    const showLoginModal = ref(false);
</script>

<style>
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
          z-index: 999;
      }
  
  </style>