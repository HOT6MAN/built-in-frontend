<template>
  <div>
  <div class="home">
    <section>
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
    </section>
    <section>
    <div class="intro2">
      <img class="imageIcon1" alt="" src="@/icons/Home/teambuilding-image.png" />
      <div class="intro2Box">
        <h5>프로젝트 빌드부터 테스트까지</h5>
        <h1>모두 Built-in에서</h1>
        <b-button class="enterButton" href="/teambuilding">팀빌딩 시작하기</b-button>
      </div>
    </div>
    </section>
    <section>
    <div class="intro3">
      <img class="imageIcon2" alt="" src="@/icons/Home/pipeline-image.png" />
      <div class="intro3Box">
      <h5>팀 빌딩부터 빌드까지, 이 모든 것을 한번에</h5>
      <h1>Built-in</h1>
      <p>※ 팀 빌딩이 된 상태에서만 들어갈 수 있습니다</p>
      <!-- 프로젝트 관리 url 추가한 아래 href 수정 필요 -->
      <b-button class="enterButton" :to="{name : 'projectManagementView'}">프로젝트 관리 시작하기</b-button>
    </div>
    </div>
  </section>
  </div>
</div>
<router-view></router-view>
</template>

<script setup>
import { RouterView } from 'vue-router';
// querySelectorALl을 쓰기 위해서는 onMounted 함수를 써야함.
import { onMounted } from 'vue';
// onMounted를 통해 DOM 추가 이후 바로 작동
onMounted(() => {
  // sections라는 변수를 추가하여 위의 'section'을 대변함
  const sections = document.querySelectorAll("section");
  // 사용자의 스크롤 위치 기억하기(manual을 했을 때 사용자가 잠시 다른 페이지를 갔다 돌아왔을 때 초기화됨. auto는 기억됨)
  history.scrollRestoration = "manual";
  // 휠을 굴릴 때의 함수를 만들기
  document.addEventListener("wheel", (event) => {
    const clientHeight = window.innerHeight; // window.innerHeight는 사용자 모니터의 높이를 의미함.
    let currentScrollPosition = window.scrollY; // 사용자가 한 페이지에서 얼마나 스크롤 했는지를 의미함

    // deltaY는 마우스 스크롤 방향. 일반적인 경우 100은 밑, -100은 위를 의미.
    if (event.deltaY > 0) { // 만약 마우스 스크롤 방향이 0보다 크다면
      // Scroll down
      for (let i = 0; i < sections.length; i++) { // 한 section의 높이까지 i를 추가(다음 섹션으로 이동하라는 의미)
        if (currentScrollPosition < clientHeight * (i + 1) && currentScrollPosition >= clientHeight * i) {
          scrollTo({
            top: clientHeight * (i + 1),
            behavior: "smooth",
          });
          break;
        }
      }
    } else if (event.deltaY < 0) {
      // Scroll up
      for (let i = 0; i < sections.length; i++) {
        if (currentScrollPosition <= clientHeight * (i + 1) && currentScrollPosition > clientHeight * i) {
          scrollTo({
            top: clientHeight * (i - 1),
            behavior: "smooth",
          });
          break;
        }
      }
    }
  });
});

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