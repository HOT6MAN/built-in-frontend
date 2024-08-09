<template>
  <div class="home">
      <div class="intro1">
      <div class="introTextBox">
        <div class="textBoxP"><p>팀빌딩부터 빌드까지, 이 모든 것을 한번에</p></div>
        <div class="textBoxH1"><p>Built-In</p></div>
      </div>
      <img class="githubIcon" alt="" src="@/icons/Home/github-icon.svg" />
      <img class="jiraIcon" alt="" src="@/icons/Home/jira-image.png" />
      <img class="dockerIcon" alt="" src="@/icons/Home/docker-icon.svg" />
      <img class="gitlabIcon" alt="" src="@/icons/Home/gitlab-icon.svg" />
    </div>
  </div>
<router-view></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router';
// querySelectorALl을 쓰기 위해서는 onMounted 함수를 써야함.

</script>



<style scoped>
.home {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  text-align: center;
  color: var(--color-black);
  font-family: var(--font-roboto);
}
section {
  box-sizing: border-box;
}
/* 첫 페이지 구성요소들 */
.intro1 {
  width : 100vw;
  height : 100vh;
  background-color: #2d3648;

}
.introTextBox {
  position : relative;
  top : 40%;
  /* z-index: 2;  */
  color : white;
  font-weight : 600;
}
.textBoxP {
  font : var(--font-roboto);
  font-size : 30px;
}
.textBoxH1 {
  font : var(--font-roboto);
  font-size : 50px;
}

/* 두 번째 페이지 구성요소들 */
.intro2 {
  position : relative;
  width : 100vw;
  height : 100vh;
  z-index : 0;
  background-color: #2d3648;
}
.intro2Box {
  position : absolute;
  top : 50vh;
  left : 50vw;
  width : 400px;
  z-index: 1;
  color : white;
  font-weight : 600;
  transform : translate3d(-50%, -50%, 0);
  font : var(--font-roboto);
  justify-content: center;
}

/* 세 번째 페이지 구성요소들 */
.intro3 {
  position : relative;
  z-index : 0;
  width : 100vw;
  height : 100vh;
  background-color: #2d3648;
}
.intro3Box {
  position : absolute;
  top : 50vh;
  left : 50vw;
  z-index: 1;
  color : white;
  font-weight : 600;
  transform : translate3d(-50%, -50%, 0);
  font : var(--font-roboto);
}

/* 2페이지, 3페이지에 들어가는 배경사진 */
.imageIcon1 {
  position: relative;
  width: 80%;
  height : 100%;
  overflow: hidden;
  z-index : 0;
  opacity : 0.5;
}

.imageIcon2 {
  position: relative;
  width: 80%;
  height : 100%;
  overflow: hidden;
  z-index : 0;
  opacity : 0.5;
}

/* 각 프로그램 로고 -> 맨 위 화면에 들어감 */
.jiraIcon {
  position: absolute;
  top: 80%;
  left: 70%;
}
.dockerIcon {
  position: absolute;
  top: 70%;
  left: 15%;
}
.githubIcon {
  position: absolute;
  top : 15%;
  left: 15%;
}
.gitlabIcon {
  position: absolute;
  top: 30%;
  left: 80%;
}

/* 2,3 페이지의 들어가기 버튼 */
.enterButton  {
  position: relative;
  border-radius: var(--radius-200);
  color: black;
  font-weight: 600;
  background-color: #A0ABC0;
  border: 1px solid #ffedad;
  box-sizing: border-box;
  width: 201px;
  height: 40px;
  align-items: center;
}
</style>