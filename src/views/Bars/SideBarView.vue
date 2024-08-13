<template>
  <!-- 사이드바 영역 -->
  <div class="sideBar">
    <div class="sidebar-position">
      <!-- 대시보드 영역 -->
      <!-- 환경설정 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/MemberSidebar/team.svg" />
          <p>팀</p>
      </div>
      <div class="dropdownContainer">
        <div><RouterLink :to="{name: 'myTeamDetail', params: {teamId: teamId}}"><b-button class="dropdownItem">나의 팀</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">모집공고</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">팀원관리</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'myTeamApplications'}"><b-button class="dropdownItem">지원 현황</b-button></RouterLink></div>
      </div>

      <div class="main-category-upper">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/Config.svg" />
          <p>환경설정</p>
      </div>
      <div class="dropdownBuild">
        <div><RouterLink :to="{name: 'projectbuildconfig' , params: { teamId: teamId }}"><b-button class="dropdownItem">빌드 환경 설정</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'projectBuildStart', params: { teamId: teamId }}"><b-button class="dropdownItem">빌드 시작</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'projectBuildResultAndLogs', params: { teamId: teamId }}"><b-button class="dropdownItem">배포 보기</b-button></RouterLink></div>
      </div>
      <!-- 빌드 기록 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/Build.svg" />
        <RouterLink :to="{name : 'projectbuildresult'}">빌드 기록</RouterLink>
      </div>
      <!-- 서버 모니터링 영역 -->
      <div class="main-category-upper">
          <img class="sidebar-icon" alt="" src="@/icons/Sidebar/ServerMornitoring.svg" />
            <p>서버 모니터링</p>
      </div>
      <div class="dropdownContainer">
        <RouterLink :to="{name: 'projectGrafanaServiceView'}"><b-button class="dropdownItem">서비스 메트릭</b-button></RouterLink>
        <RouterLink :to="{name: 'projectSonarQubeServiceView'}"><b-button class="dropdownItem">SonarQube </b-button></RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  teamId : Number,
});
const teamId = props.teamId;
</script>

<style scoped>
.sideBar {
  width: 220px;
  position: fixed;
  background-color: #102a43;
  height: 100%;
  color: white;
  font-size: var(--font-size-base);
  font-family: var(--font-roboto);
  z-index: 0;
}
.sidebar-position {
  position: relative;
  top: 80px; 
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sidebar-icon {
  width: 24px;
  height: 24px;
}
a {
  text-decoration: none;
}
.main-category {
  width: 160px;
  display: flex;
  flex-direction: row;
  position : relative;
  justify-content: left;
  box-sizing: border-box;
  gap: 20px;
  font-weight: 600;
  cursor : pointer;
  margin-top: 10%;
}
.main-category-upper {
  width: 160px;
  display: flex;
  flex-direction: row;
  position : relative;
  justify-content: left;
  box-sizing: border-box;
  gap: 20px;
  font-weight: 600;
  cursor : pointer;
  margin-top: 10%;
}
.main-category a {
  text-decoration: none;
  color: white;
}
.main-category a:hover {
  color: #6c757d;
}
.dropdownContainer {
  background-color: rgba(238, 238, 238, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-content: right;
  font-family: var(--font-roboto);
  margin-bottom: 30px;
}
.dropdownItem {
  width: 188px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0%;
  color: white;
  background-color: #6c757d;
  padding: 20px;
}


.main-category:hover {
  color: #5c636a;
}
.collab:hover {
  background-color: #5c636a;
}

</style>
