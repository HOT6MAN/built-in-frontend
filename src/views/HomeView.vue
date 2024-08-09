<template>
  <div class="home">
      <div class="intro">
      <div class="introContainer">
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
.intro {
  width : 100vw;
  height : 100vh;
  background-color: #2d3648;
}
.introContainer {
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
</style>