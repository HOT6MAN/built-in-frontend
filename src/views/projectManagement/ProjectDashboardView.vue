<template>
  <div>
    <SideBarView class="sidebar"/>
    <article class="project-dashboard">
      <div class="dashboard">
        <div class="jira-graph">
          <div class="jira-detail"></div>
          <div class="jira-issue"></div>
          <div class="jira-stick"></div>
          <div class="jira-sprint"></div>
        </div>
        <div class="graphs">
          <div class="gitcommit"></div>
        <div>
        <div class="git-graph">
          <div class="private-container">
            <div class="membercommit-textbox">나의 커밋 그래프</div>
            <img src="https://ghchart.rshah.org/socialworkprogrammer" />
          </div>
        </div>
          <div class="team-container">
          <div class="teamcommit-textbox">${팀  이름}의 커밋 그래프</div>
          </div>
        </div>
      </div>
        </div>
      </article>
      </div>
</template>

<script setup>
import SideBarView from '../Bars/SideBarView.vue';
</script>

<style scoped>
.project-dashboard{
  position: absolute;
  top : 80px;
  left: 220px;
  height: calc(100vh - 80px);
  width: calc(100vw - 220px);
  justify-content: center;
}
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
.dashboard {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #4a5468;
  box-sizing: border-box;
  width: 1100px;
  height: 550px;
  color : black;
  font-size: 18px;
  font-family: var(--font-roboto);
}
/* jira 영역 */
.jira-graph {
  display: flex;
  flex-direction: row;
}
.jira-detail {
  position: relative;
  background-color: #4A5468;
  box-sizing: border-box;
  width: 220px;
  height: 120px;
  border: 1px solid white;
}
.jira-issue {
  position: relative;
  background-color: var(--color-gainsboro);
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  width: 220px;
  height: 120px;
  border: 3px solid white;
}
.jira-stick {
  position: relative;
  background-color: var(--color-gainsboro);
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  width: 440px;
  height: 120px;
  border: 3px solid white;
}
.jira-sprint {
  position: relative;
  background-color: var(--color-gainsboro);
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  width: 220px;
  height: 120px;
  border: 3px solid white;
}
.graphs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
/* 깃 영역 */
.git-graph {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  height: 110px;
}
.gitcommit {
  position: relative;
  background-color: var(--color-gainsboro);
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  width: 220px;
  height: 430px;
  border: 3px solid white;
}
/* 나의 커밋 그래프 */
.private-container {
  position: relative;
  background-color: var(--color-gainsboro);
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  width: 880px;
  height: 110px;
}
.membercommit-textbox {
  position: relative;
  display: inline-block;
  width: 169px;
  height: 39px;
  border: 3px solid white;
}
/* 팀 커밋 그래프 */
.team-container {
  position: relative;
  width: 880px;
  height: 320px;
  background-color: var(--color-gainsboro);
  border: 1px solid var(--color-black);
  box-sizing: border-box;
  border: 3px solid white;
}
.teamcommit-textbox {
  position: relative;
  white-space: pre-wrap;
  display: inline-block;
  width: 169px;
  height: 39px;
  border: 3px solid white;
}
</style>
