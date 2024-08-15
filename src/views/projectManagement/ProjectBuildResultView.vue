<template>
  <!-- <SideBarView /> -->
   <div>
	selectConfigId = {{ selectedConfigId }}
   </div>
	<div class="buildResultContainer">
			<div class="boxContainer">
			 <div class="menuboxWrapper">
				 <div class="menuBoxBlank"><p>전체 빌드 횟수 : {{response.totalCount}}</p></div>
				 	<div v-for="menu in menuBuilds" :key="menu"><div class="menuBox"><p>{{ menu.name }}</p></div></div>
				</div>
				<div v-for= "build in pageBuilds.slice().reverse()" :key="build" class="boxWrapper">
					<div class="buildRow">
						<p class="dateCss">{{formatDate(build.buildTime).year}}.{{formatDate(build.buildTime).month}}.{{ formatDate(build.buildTime).day }} {{ formatDate(build.buildTime).hour }}:{{ formatDate(build.buildTime).minute }}:{{formatDate(build.buildTime).second}}</p>
						<p>현재 빌드 : {{ build.buildId }}</p>
					</div>
							<!-- v-if를 이용해 만약 success면 success 버튼으로, fail이라면 fail 버튼을 보여줌 -->
					<div v-for="(buildStage, index) in build.buildStages" :key="index">
						<div v-if="`${buildStage.status}`==='SUCCESS'"><b-button @click="toggleModal(build.buildId, index)" class="boxSuccess">{{milToSec(buildStage.duration)}}s</b-button>
							<b-modal 
							:id="`modal-${build.buildId}-${index}`"
							v-model="modalShow[`${build.buildId}-${index}`]"
							hide-backdrop content-class="shadow" 
							title="Stage Logs">
							<div v-for="log in buildStage.buildLogs" :key="log" class="logWrapper">
							<b-button squared v-b-toggle="`${log.id}`" class="logButton">{{log.title}}</b-button>
							<b-collapse :id="`${log.id}`" v-for="logMessage in log.description" :key="logMessage">
								<b-card class="logCard">{{ logMessage }}</b-card>
							</b-collapse>
						</div>
						</b-modal>
					</div>
						<div v-else><b-button @click="toggleModal(build.buildId, index)" class="boxFailed">{{milToSec(buildStage.duration)}}s</b-button>
							<b-modal 
							:id="`modal-${build.buildId}-${index}`"
							v-model="modalShow[`${build.buildId}-${index}`]"
							hide-backdrop content-class="shadow" 
							title="Stage Logs">
							<div v-for="log in buildStage.buildLogs" :key="log" class="logWrapper">
							<b-button squared v-b-toggle="`${log.id}`" class="logButton">{{log.title}}</b-button>
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
						:total-rows="pages"
						:per-page="perPage"
						aria-controls="my-table">
					</b-pagination>
				</div>
	</div>
</template>



<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import SideBarView from '@/views/Bars/SideBarView.vue'
import { receiveBuildResult, testObject } from '@/api/build.js'

// 드롭다운 창 관련
import ProjectBackendDataCheck from '../../components/ProjectManagement/ProjectBackendDataCheck.vue';
import ProjectFrontendDataCheck from '../../components/ProjectManagement/ProjectFrontendDataCheck.vue';
import ProjectDatabaseDataCheck from '../../components/ProjectManagement/ProjectDatabaseDataCheck.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { buildStart } from '@/api/project.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import { useRoute } from 'vue-router';
import { updateProjectInfoNameByProjectInfoId, saveBackendConfigs, saveFrontendConfigs, saveDatabaseConfigs } from '@/api/project.js';
import { addBuildResult, buildCheck, startJenkinsJob } from '../../api/project';
import { errorMessages } from 'vue/compiler-sfc';
import { sweetAlert } from '../../api/sweetAlert';



const response = ref([])
const builds = ref([])
const successOrNot = ref(null)
const menuBuilds = ref(null)

// 환경설정 드롭다운 박스
const route = useRoute();
const teamId = route.params.teamId;
const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId, receiveBuildResult } = store;
const { projectInfos, buildResultInfo } = storeToRefs(store);
const dataLoaded = ref(false);
const allConfigs = ref([]);
const selectedConfigId = ref(0);
const updateConfigName = ref("");
const selectedIndex = computed(() => {
  return allConfigs.value.findIndex(config => config.id === selectedConfigId.value);
});


onMounted(() => {
	receiveBuildResult(selectedConfigId.value);
	response.value = buildResultInfo.value;


	// response.value가 비어 있지 않은 경우에만 작업 실행
	if (response.value) {
		pages.value = response.value.totalCount;
		builds.value = response.value.buildResults;
		successOrNot.value = response.value;
		menuBuilds.value = response.value.buildResults[0].buildStages;
	}
})

// paginatin 관련
const currentPage = ref(1)
const pages = ref(0)
const perPage = ref(5)
const pageBuilds = computed (() => {
	const pageStart = (pages.value) - ((currentPage.value) * perPage.value)
	const pageEnd = (pages.value) - ((currentPage.value-1) * perPage.value)
	return builds.value.slice(pageStart, pageEnd)
})

// 빌드 시작 시간 나타내는 함수
const formatDate = (dateString) => {
	const date = new Date(dateString)
	return {
		year : date.getUTCFullYear(),
		month: String(date.getUTCMonth()+1).padStart(2, '0'),
		day: String(date.getUTCDate()).padStart(2,'0'),
		hour: String(date.getUTCHours()).padStart(2,'0'),
		minute: String(date.getUTCMinutes()).padStart(2,'0'),
		second: String(date.getUTCSeconds()).padStart(2,'0')
	}
}
// Stage Error 모달 창
const modalShow = ref({})
// buildId와 index는 위의 html에서 가져오는 것.
// 위에서 v-for문으로 해서 생긴 buildId와 index를 아래 가져온 후, toggleModal model을 실행시킨다.
// modalKey는 각 모달의 ID를 판별하기 위해 만든 것. buildId만 있어도 무방하나, 혹시 몰라 index도 추가한 것 같다.
// 따라서 modalShow.value[modalKey]로 각 모달을 구분한다.
// 다만 이렇게 되면 modalShow 변수는 ref(false)로 하면 true인지 아닌지 알 수 없기 때문에, toogleModal = !toggleModal로 click 시마다
// true와 false를 왔다갔다 하는 것이 아니라 toggleModal(buildId, index)로 해서 함수에 매개변수 값을 내려보내줘야 한다.

const toggleModal = (buildId, index) => {
	const modalKey = `${buildId}-${index}`
	modalShow.value[modalKey] = !modalShow.value[modalKey]
}
// 로그 관련 모달 창
const openIndex = ref(null);
const toggleLog = (index) => {
	openIndex.value = openIndex.value === index? null: index;
}
const isLogOpen = (index) => openIndex.value === index

const milToSec = (milliSecond) => {
	const second = milliSecond / 100
	return Math.floor(second) /10
}


const curConfig = computed(() => {
  if (selectedIndex.value !== -1) {
    return allConfigs.value[selectedIndex.value];
  } else {
    return null; // 선택된 config가 없을 때 처리할 값
  }
});

onMounted(async () => {
  await storeFindAllProjectInfosByTeamId(teamId);
  allConfigs.value = projectInfos.value;
  dataLoaded.value = true;
});


watch(selectedConfigId, (newId) => {
//   selectedIndex.value = allConfigs.value.findIndex(config => config.id === newId);
//   updateConfigName.value = allConfigs.value[selectedIndex.value]?.title || "";
	receiveBuildResult(newId);
	response.value = buildResultInfo.value;


	// response.value가 비어 있지 않은 경우에만 작업 실행
	if (response.value) {
		pages.value = response.value.totalCount;
		builds.value = response.value.buildResults;
		successOrNot.value = response.value;
		menuBuilds.value = response.value.buildResults[0].buildStages;
	}
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
