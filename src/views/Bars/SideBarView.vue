<template>
  <!-- 사이드바 영역 -->
  <div class="sideBar">
    <div class="sidebar-position">
      <!-- 대시보드 영역 -->
      <div class="main-category" :to="{name: 'dashboard'}">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/DashBoard.svg" />
          <p>대시보드</p>
      </div>
      <!-- 환경설정 영역 -> 5개의 드랍다운 메뉴가 있음-->
      <div class="main-category" @click="toggleDropdown">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/Config.svg" />
          <p>환경설정</p>
      </div>
      <div class="dropdownBuild">
        <div><RouterLink :to="{name: 'projectbuildconfig'}"><b-button class="collab">빌드 환경 설정</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'projectBuildStart'}"><b-button class="collab">빌드 시작</b-button></RouterLink></div>
        <div><RouterLink :to="{name: 'projectBuildResultAndLogs'}"><b-button class="collab">배포 보기</b-button></RouterLink></div>
      </div>
      <!-- 빌드 기록 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/Build.svg" />
        <div><RouterLink :to="{name : 'projectbuildresult'}">빌드 기록</RouterLink></div>
      </div>
      <!-- 서버 모니터링 영역 -->
      <div class="main-category">
          <img class="sidebar-icon" alt="" src="@/icons/Sidebar/ServerMornitoring.svg" />
            <p>서버 모니터링</p>
      </div>
      <div class="dropdownBuild">
        <div><RouterLink :to="{name: 'projectGrafanaServiceView'}"><b-button class="collab">서비스 메트릭</b-button></RouterLink></div>
      </div>
    </div>
  </div>
</template>
<script>
  import { defineComponent, ref } from 'vue'
  export default defineComponent({
  name: 'VerticalDropdownMenu',
  setup() {
    const isOpen = ref(false);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    return {
      isOpen,
      toggleDropdown,
    };
  },
});

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
  top: 120px; 
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
}

.main-category {
  width: 160px;
  display: flex;
  flex-direction: row;
  /* 문제 : display를 flex로 한 후 flex-direction을 row로 하면 메뉴 그림와 메뉴 이름(ex : 환경설정)이
  수평으로 나옴. 하지만 드랍다운 메뉴를 클릭하면 드랍다운이 오른쪽에 뜨는 문제가 있었음*/
  /* 원인 : 드랍다운 메뉴가 위 main-category에 종속되어 있어서 그림 + 메뉴 + 드랍다운 메뉴가 수평으로
  나오는 거였음 */
  /* 해결 : 드랍다운 메뉴를 main-category로부터 독립시켰음 */
  position : relative;
  justify-content: left;
  /* align-items: center; */
  /* align-items를 통해 각 메뉴 그림을 중앙에 위치시킴 */
  box-sizing: border-box;
  gap: 20px;
  font-weight: 600;
  cursor : pointer;
  margin-top: 30px;
}
a {
  text-decoration: none;
}
.collab {
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

.dropdownBuild {
  width: 188px;
  background-color: rgba(238, 238, 238, 0.03);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  color: white;
  font-family: var(--font-roboto);
  z-index: 1;
  margin-bottom: 30px;
}

.main-category:hover {
  color: #5c636a;
}
.collab:hover {
  background-color: #5c636a;
}
</style>
