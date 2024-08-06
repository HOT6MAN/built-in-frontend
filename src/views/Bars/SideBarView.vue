<template>
  <!-- 사이드바 영역 -->
  <div class="sideBar">
    <div class="sidebar-position">
      <!-- 대시보드 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/DashBoard.svg" />
          <p>대시보드</p>
      </div>
      <!-- 환경설정 영역 -> 5개의 드랍다운 메뉴가 있음-->
      <div class="main-category" @click="toggleDropdown">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/Config.svg" />
          <p>환경설정</p>
      </div>
      <div class="dropdown-content" :class="{ show: isOpen }">
        <b-button :to="{name: 'projectbuildconfig'}" class="collab">빌드 환경 설정</b-button>
        <b-button :to="{name: 'projectBuildStart'}"  class="collab">빌드 시작</b-button>
        <!-- <b-button :to="{name: 'projectBuildResultAndLogs'}"  class="collab">배포 보기</b-button> -->
        <b-button class="collab">Jenkins 환경 설정</b-button>
        <b-button class="collab">배포 환경 설정</b-button>
        <b-button :to="{name : 'projectbuildresult'}" class="collab">빌드 결과 확인</b-button>
      </div>
      <!-- 빌드 기록 영역 -->
      <div class="main-category">
        <img class="sidebar-icon" alt="" src="@/icons/Sidebar/Build.svg" />
          <p>빌드 기록</p>
      </div>
      <!-- 서버 모니터링 영역 -->
      <div class="main-category">
          <img class="sidebar-icon" alt="" src="@/icons/Sidebar/ServerMornitoring.svg" />
            <p>서버 모니터링</p>
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
  height: 1024px;
  /* overflow: hidden; */
  font-size: 18px;
  color: white;
  font-family: var(--font-roboto);
  z-index: 5;
}

.sidebar-position {
  position: relative;
  top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
  gap: 25px;
}

.sidebar-icon {
  width: 24px;
  height: 24px;
}

.main-category {
  width: 220px;
  left : 20px;
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
  gap: 8px;
  font-weight: 600;
  cursor : pointer;
}

.collab {
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 18px;
  padding-left : 20px;
  box-sizing: border-box;
  color: white;
}

.dropdown-content {
  width: 220px;
  background-color: rgba(238, 238, 238, 0.03);
  display: none;
  /* position: absolute;-> 이렇게 설정하면 다른 상위메뉴가 밀려나지 않았음 */
  flex-direction: column;
  align-items: center;
  padding: 12px;
  gap: 12px;
  color: white;
  font-family: var(--font-roboto);
  z-index: 5;
}

.dropdown-content.show {
display: flex;
}

.collab.ol:hover {
  background-color: #292525;
}
</style>
