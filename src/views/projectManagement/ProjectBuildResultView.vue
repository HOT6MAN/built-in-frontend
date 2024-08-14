<template>
  <!-- <SideBarView /> -->
  <div class="config-header">
    <h2>프로젝트 빌드 세팅 선택</h2>
  </div>
  <div class="config-selection">
    <div class="input-group">
      <select v-model="selectedConfigId" class="form-select config-select">
        <option value="" disabled selected>설정 선택</option>
        <option v-for="(config, index) in allConfigs" :key="config.id" :value="config.id">
          {{ config.title }}
        </option>
      </select>
      <b-button class="btn btn-primary" @click="showModal">+ 추가</b-button>
    </div>
  </div>
  <div class="buildResultContainer">
    <div class="boxContainer">
      <div class="menuboxWrapper">
        <div class="menuBoxBlank"><p>전체 빌드 횟수 : {{ filteredResponse.totalCount }}</p></div>
        <div v-for="menu in menuBuilds" :key="menu">
          <div class="menuBox"><p>{{ menu.name }}</p></div>
        </div>
      </div>
      <div v-for="build in pageBuilds.slice().reverse()" :key="build" class="boxWrapper">
        <div class="buildRow">
          <p class="dateCss">{{ formatDate(build.buildTime).year }}.{{ formatDate(build.buildTime).month }}.{{ formatDate(build.buildTime).day }} {{ formatDate(build.buildTime).hour }}:{{ formatDate(build.buildTime).minute }}:{{ formatDate(build.buildTime).second }}</p>
          <p>현재 빌드 : {{ build.buildId }}</p>
        </div>
        <div v-for="(buildStage, index) in build.buildStages" :key="index">
          <div v-if="buildStage.status === 'SUCCESS'">
            <b-button @click="toggleModal(build.buildId, index)" class="boxSuccess">{{ milToSec(buildStage.duration) }}s</b-button>
            <b-modal 
              :id="`modal-${build.buildId}-${index}`"
              v-model="modalShow[`${build.buildId}-${index}`]"
              hide-backdrop content-class="shadow" 
              title="Stage Logs">
              <div v-for="log in buildStage.buildLogs" :key="log" class="logWrapper">
                <b-button squared v-b-toggle="`${log.id}`" class="logButton">{{ log.title }}</b-button>
                <b-collapse :id="`${log.id}`" v-for="logMessage in log.description" :key="logMessage">
                  <b-card class="logCard">{{ logMessage }}</b-card>
                </b-collapse>
              </div>
            </b-modal>
          </div>
          <div v-else>
            <b-button @click="toggleModal(build.buildId, index)" class="boxFailed">{{ milToSec(buildStage.duration) }}s</b-button>
            <b-modal 
              :id="`modal-${build.buildId}-${index}`"
              v-model="modalShow[`${build.buildId}-${index}`]"
              hide-backdrop content-class="shadow" 
              title="Stage Logs">
              <div v-for="log in buildStage.buildLogs" :key="log" class="logWrapper">
                <b-button squared v-b-toggle="`${log.id}`" class="logButton">{{ log.title }}</b-button>
                <b-collapse :id="`${log.id}`" v-for="logMessage in log.description" :key="logMessage">
                  <b-card class="logCard">{{ logMessage }}</b-card>
                </b-collapse>
              </div>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
    <!-- 페이지네이션 -->
    <div class="d-flex justify-content-center mt-1 pageNation">
      <b-pagination class="mb-0"
        v-model="currentPage"
        :total-rows="totalPages"
        :per-page="perPage"
        aria-controls="my-table">
      </b-pagination>
    </div>
  </div>
</template>


<script setup>
import { ref, watch, onMounted, computed } from 'vue'
import { receiveBuildResult } from '@/api/build.js'
import { useProjectStore } from '@/stores/projectStore.js'
import { useRoute } from 'vue-router'
import { ref, watch, onMounted, computed } from 'vue'
import { receiveBuildResult } from '@/api/build.js'
import { useProjectStore } from '@/stores/projectStore.js'
import { useRoute } from 'vue-router'

const response = ref([]);
const builds = ref([]);
const menuBuilds = ref([]);
const selectedConfigId = ref(1);
const dataLoaded = ref(false);
const currentPage = ref(1);
const perPage = ref(5);

const store = useProjectStore();
const route = useRoute();
const teamId = route.params.teamId;

const allConfigs = ref([]);
const selectedIndex = computed(() => {
  return allConfigs.value.findIndex(config => config.id === selectedConfigId.value);2
});

const curConfig = computed(() => {
  if (selectedIndex.value !== -1) {
    return allConfigs.value[selectedIndex.value];
  } else {
    return null;
  }
});

const filteredResponse = computed(() => {
  if (!selectedConfigId.value) return { totalCount: 0, buildResults: [] };

  // 필터링 기준을 설정
  const filteredBuilds = builds.value.filter(build => build.configId === selectedConfigId.value);
  return { totalCount: filteredBuilds.length, buildResults: filteredBuilds };
});

const pageBuilds = computed(() => {
  const pageStart = (currentPage.value - 1) * perPage.value;
  const pageEnd = currentPage.value * perPage.value;
  return filteredResponse.value.buildResults.slice(pageStart, pageEnd);
});

const response = ref([]);
const builds = ref([]);
const menuBuilds = ref([]);
const selectedConfigId = ref(null);
const dataLoaded = ref(false);
const currentPage = ref(1);
const perPage = ref(5);

const store = useProjectStore();
const route = useRoute();
const teamId = route.params.teamId;

const allConfigs = ref([]);
const selectedIndex = computed(() => {
  return allConfigs.value.findIndex(config => config.id === selectedConfigId.value);
});

const curConfig = computed(() => {
  if (selectedIndex.value !== -1) {
    return allConfigs.value[selectedIndex.value];
  } else {
    return null;
  }
});

const filteredResponse = computed(() => {
  if (!selectedConfigId.value) return { totalCount: 0, buildResults: [] };

  // 필터링 기준을 설정
  const filteredBuilds = builds.value.filter(build => build.configId === selectedConfigId.value);
  return { totalCount: filteredBuilds.length, buildResults: filteredBuilds };
});

const pageBuilds = computed(() => {
  const pageStart = (currentPage.value - 1) * perPage.value;
  const pageEnd = currentPage.value * perPage.value;
  return filteredResponse.value.buildResults.slice(pageStart, pageEnd);
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return {
    year: date.getUTCFullYear(),
    month: String(date.getUTCMonth() + 1).padStart(2, '0'),
    day: String(date.getUTCDate()).padStart(2, '0'),
    hour: String(date.getUTCHours()).padStart(2, '0'),
    minute: String(date.getUTCMinutes()).padStart(2, '0'),
    second: String(date.getUTCSeconds()).padStart(2, '0')
  };
};

const modalShow = ref({});

  const date = new Date(dateString);
  return {
    year: date.getUTCFullYear(),
    month: String(date.getUTCMonth() + 1).padStart(2, '0'),
    day: String(date.getUTCDate()).padStart(2, '0'),
    hour: String(date.getUTCHours()).padStart(2, '0'),
    minute: String(date.getUTCMinutes()).padStart(2, '0'),
    second: String(date.getUTCSeconds()).padStart(2, '0')
  };
};

const modalShow = ref({});

const toggleModal = (buildId, index) => {
  const modalKey = `${buildId}-${index}`;
  modalShow.value[modalKey] = !modalShow.value[modalKey];
};
  const modalKey = `${buildId}-${index}`;
  modalShow.value[modalKey] = !modalShow.value[modalKey];
};

const milToSec = (milliSecond) => {
  const second = milliSecond / 100;
  return Math.floor(second) / 10;
};

const fetchBuildResults = () => {
  receiveBuildResult(
    (data) => {
      response.value = data;
      builds.value = data.buildResults;
      menuBuilds.value = data.buildResults[0]?.buildStages || [];
      dataLoaded.value = true;
    },
    (error) => {
      console.error('Error fetching build results:', error);
      dataLoaded.value = false;
    }
  );
};


watch(selectedConfigId, () => {
  currentPage.value = 1; // 설정 변경 시 페이지를 첫 페이지로 리셋
  fetchBuildResults(); // 설정 변경 시 빌드 결과를 다시 가져옵니다.
});
</script>

<style scoped>
.config-header {
  background-color: #102a43;
  color: #ffffff;
  padding: 20px;
  text-align: center;
}
.config-selection {
	padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}
.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}
.config-select {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
}

.btn-primary {
  background-color: #4299e1;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #3182ce;
}

.config-header {
  background-color: #102a43;
  color: #ffffff;
  padding: 20px;
  text-align: center;
}
.config-selection {
	padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}
.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}
.config-select {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
}

.btn-primary {
  background-color: #4299e1;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #3182ce;
}

.boxSuccess {
	position: relative;
  width: 7vw;
  height : 90px;
  color: black;
  border: 2px solid white;
	background-color: #c3e7cb;
  margin : 3px;
  background-size: 100%;
}
.boxSuccess:hover {
	background-color: green;
	border: none;
}
.boxFailed {
	position: relative;
  width: 7vw;
  height : 90px;
  color: #EC221F;
  background-size: 100%;
	background-color: #f2dede;
  border: 2px solid white;
  margin : 3px;
}
.boxFailed:hover {
	background-color: red;
	border: none;
}
.buildResultContainer {
  width: 100%;
	font: var(--font-roboto);
	z-index: 1;
}
.boxContainer {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.menuboxWrapper {
  display: flex;
	align-items:start;
	width: 100%;
	flex-direction: row;
  border : 1px solid black;
  border-width: 0 0 3px;
}
.menuBox {
	display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #F7F9FC;
	width: 7vw;
  height : 120px;
  margin : 3px;
	border-radius: 3%;
	padding: 6px 12px;
	font-weight: 600;
	font-size: 15px;
}
.menuBox p {
	padding: 5px;
	text-align: center;
}
/* 메뉴 옆에 빈 공백 영역 */
.menuBoxBlank {
	/* position: relative; */
	display: flex;
	align-items: center;
	height: 120px;
	width: 8vw;
	color: black;
	font-weight: 600;
}
.menuBoxBlank p {
	margin: 0px auto;
}
.boxWrapper {
  display: flex;
	width: 100%;
}
.buildCount {
  position: relative;
  height: auto;
  width: auto;
  border: solid black;
  border-width: 0px 0.1px 0px 0px;
	color: black;
}
.buildRow {
	width: 8vw;
	margin : auto;
	font-weight: 600;
}
.buildRow p {
	margin: 2px;
}
img {
	position: relative;
}
/* 로그모달 관련 */
.logWrapper {
	margin-bottom: 3px;	
}
.logButton {
	width: 100%;
	font-family: var(--font-roboto);
	text-align: left;
}
.logCard {
	margin-top: 0px;
	border-radius: 0%;
}
.pageNation {
	position: relative;
}
</style>