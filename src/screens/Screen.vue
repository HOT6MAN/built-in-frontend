<template>
  <div class="screen">
    <div class="overlap">
      <div class="overlap-group">
        <div class="div">
          <p class="built-in">
            <span class="text-wrapper">
              팀빌딩부터 빌드까지, 이 모든 것을 한번에,
              <br />
            </span>
            <span class="span">
              <br />
            </span>
            <span class="text-wrapper-2">Built-In</span>
          </p>
          <img class="devicon-docker" alt="Devicon docker" src="/img/devicon-docker-wordmark.svg" />
        </div>
        <img class="jira-img" alt="Jira img" src="/img/jira-img.png" />
        <img class="mdi-github" alt="Mdi github" src="/img/mdi-github.svg" />
      </div>
      <img class="devicon-gitlab" alt="Devicon gitlab" src="/img/devicon-gitlab.svg" />
    </div>
    <div class="group-wrapper">
      <div class="group">
        <div class="overlap-2">
          <div class="group-2">
            <div class="overlap-group-wrapper">
              <div class="overlap-group-2">
                <div class="rectangle" />
                <p class="p">
                  <span class="text-wrapper-3">
                    팀원 구하기/&nbsp;&nbsp;팀 만들기
                    <br />
                    <br />
                  </span>
                  <span class="text-wrapper-4">모두 Built-in에서</span>
                </p>
              </div>
            </div>
            <div class="rectangle-2" />
          </div>
          <div class="text-wrapper-5">팀빌딩 시작하기 &gt;</div>
        </div>
      </div>
    </div>
    <div class="overlap-3">
      <div class="group-3">
        <div class="overlap-group-wrapper">
          <div class="overlap-group-2">
            <div class="rectangle" />
            <p class="p">
              <span class="text-wrapper-3">
                프로젝트 빌드부터 테스트까지
                <br />
                <br />
              </span>
              <span class="text-wrapper-4">모두 Built-in에서</span>
            </p>
          </div>
        </div>
        <div class="overlap-4">
          <div class="group-4" />
          <div class="text-wrapper-6">프로젝트 관리 &gt;</div>
        </div>
      </div>
      <p class="text-wrapper-7">※ 팀 빌딩이 된 상태에서만 들어갈 수 있습니다</p>
    </div>
    <img class="navigation-bar" alt="Navigation bar" src="/img/navigation-bar-logged.svg" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Screen",
});
</script>

<style>
.screen {
  height: 3072px;
  position: relative;
  width: 1440px;
}

.screen .overlap {
  background-color: #2d3648;
  height: 1024px;
  left: 0;
  position: absolute;
  top: 0;
  width: 1440px;
}

.screen .overlap-group {
  height: 622px;
  left: 261px;
  position: absolute;
  top: 223px;
  width: 1016px;
}

.screen .div {
  height: 497px;
  left: 16px;
  position: absolute;
  top: 85px;
  width: 791px;
}

.screen .built-in {
  color: #ffffff;
  font-family: "Roboto", Helvetica;
  font-size: 40px;
  font-weight: 400;
  height: 406px;
  left: 94px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 0;
  width: 697px;
}

.screen .text-wrapper {
  font-weight: 300;
}

.screen .span {
  font-size: 22px;
  font-weight: 300;
}

.screen .text-wrapper-2 {
  font-size: 100px;
  font-weight: 700;
}

.screen .devicon-docker {
  height: 128px;
  left: 0;
  position: absolute;
  top: 369px;
  width: 128px;
}

.screen .jira-img {
  height: 80px;
  left: 800px;
  object-fit: cover;
  position: absolute;
  top: 542px;
  width: 216px;
}

.screen .mdi-github {
  height: 100px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100px;
}

.screen .devicon-gitlab {
  height: 128px;
  left: 1176px;
  position: absolute;
  top: 259px;
  width: 128px;
}

.screen .group-wrapper {
  background-image: url(../../static/img/image-22.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 1024px;
  left: 0;
  position: absolute;
  top: 1024px;
  width: 1438px;
}

.screen .group {
  height: 567px;
  left: 361px;
  position: relative;
  top: 228px;
  width: 720px;
}

.screen .overlap-2 {
  height: 567px;
  position: relative;
  width: 718px;
}

.screen .group-2 {
  height: 567px;
  left: 0;
  position: absolute;
  top: 0;
  width: 718px;
}

.screen .overlap-group-wrapper {
  height: 414px;
  left: 0;
  position: absolute;
  top: 0;
  width: 720px;
}

.screen .overlap-group-2 {
  height: 414px;
  position: relative;
  width: 718px;
}

.screen .rectangle {
  background-color: #ffffff33;
  height: 403px;
  left: 0;
  position: absolute;
  top: 0;
  width: 718px;
}

.screen .p {
  color: #000000;
  font-family: "Roboto", Helvetica;
  font-size: 40px;
  font-weight: 300;
  height: 406px;
  left: 11px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 8px;
  width: 697px;
}

.screen .text-wrapper-3 {
  color: #ffffff33;
}

.screen .text-wrapper-4 {
  color: #ffffff33;
  font-size: 60px;
}

.screen .rectangle-2 {
  background-color: #f7f9fc;
  border-radius: 30px;
  height: 110px;
  left: 137px;
  position: absolute;
  top: 457px;
  width: 445px;
}

.screen .text-wrapper-5 {
  color: #000000;
  font-family: "Roboto", Helvetica;
  font-size: 40px;
  font-weight: 300;
  height: 112px;
  left: 135px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 455px;
  width: 447px;
}

.screen .overlap-3 {
  background-image: url(../../static/img/image-21.png);
  background-position: 50% 50%;
  background-size: cover;
  height: 1024px;
  left: 1px;
  position: absolute;
  top: 2048px;
  width: 1438px;
}

.screen .group-3 {
  height: 565px;
  left: 359px;
  position: absolute;
  top: 230px;
  width: 720px;
}

.screen .overlap-4 {
  height: 111px;
  left: 147px;
  position: absolute;
  top: 454px;
  width: 447px;
}

.screen .group-4 {
  background-color: #f7f9fc;
  border-radius: 30px;
  height: 110px;
  left: 2px;
  position: absolute;
  top: 1px;
  width: 445px;
}

.screen .text-wrapper-6 {
  color: #000000;
  font-family: "Roboto", Helvetica;
  font-size: 40px;
  font-weight: 300;
  height: 111px;
  left: 0;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 0;
  width: 447px;
}

.screen .text-wrapper-7 {
  color: #000000;
  font-family: "Roboto", Helvetica;
  font-size: 20px;
  font-weight: 300;
  height: 57px;
  left: 506px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  text-align: center;
  top: 794px;
  width: 433px;
}

.screen .navigation-bar {
  height: 80px;
  left: 0;
  position: fixed;
  top: 0;
  width: 1440px;
}

</style>
