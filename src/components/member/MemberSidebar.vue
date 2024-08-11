<template>
  <!-- 사이드바 영역 -->
  <div class="sideBar">
    <div class="sidebar-position">
      <!-- 대시보드 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/MemberSidebar/member.svg" />
          <p>회원</p>
      </div>
            <div class="dropdownContainer">
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">계정</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">관심</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">메신저</b-button></RouterLink></div>
      </div>

      <!-- 환경설정 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/MemberSidebar/team.svg" />
          <p>팀</p>
      </div>
      <div class="dropdownContainer">
        <div><RouterLink :to="{name: 'myteam'}"><b-button class="dropdownItem">나의 팀</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">모집공고</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'member'}"><b-button class="dropdownItem">팀원관리</b-button></RouterLink></div>
      </div>
      <div class="main-category">
          <img class="sidebar-icon" alt="" src="@/icons/MemberSidebar/resume.svg" />
            <p>이력서</p>
      </div>
      <div class="dropdownContainer">
        <RouterLink :to="{name: 'projectGrafanaServiceView'}"><b-button class="dropdownItem">프로필</b-button></RouterLink>
        <RouterLink :to="{name: 'projectGrafanaServiceView'}"><b-button class="dropdownItem">멀티이력서</b-button></RouterLink>
        <RouterLink :to="{name: 'projectGrafanaServiceView'}"><b-button class="dropdownItem">팀원관리</b-button></RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

</script>

<style scoped>
.sideBar {
  width: 220px;
  top: 0px;
  left: 0px;
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
  display: flex;
  top: 80px;
  margin: 0px;
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
  margin-top: 30px;
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
  margin-bottom: 15px;
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
  padding: 18px;
}


.main-category:hover {
  color: #5c636a;
}
.collab:hover {
  background-color: #5c636a;
}

</style>