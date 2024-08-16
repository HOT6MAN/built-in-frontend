<template>
  <div class="main-content">
    <div class="config-container">
      <div class="row config-header">
        <h2>프로젝트 빌드 시작</h2>
      </div>
      <div v-if="dataLoaded" class="row config-selection">
        <div class="input-group">
          <select v-model="selectedConfigId" class="form-select config-select">
            <option value="">설정 선택</option>
            <option v-for="(config, index) in allConfigs" :key="config.id" :value="config.id">
              {{ config.title }}
            </option>
          </select>
        </div>
      </div>

        <!-- 동적으로 컴포넌트를 렌더링하며, teamProjectInfoId를 prop으로 전달 -->
        <ProjectBuildResultUI 
          v-if="selectedConfigId"
          :is="currentComponent" 
          :allConfigs="allConfigs"
          :selectedConfigId="selectedConfigId" 
          :selectedIndex="selectedIndex"
          :teamProjectInfoId="teamProjectInfoId"
        />
      </div>
  </div>
</template>

<script setup>
import ProjectBackendDataCheck from '../../components/ProjectManagement/ProjectBackendDataCheck.vue';
import ProjectFrontendDataCheck from '../../components/ProjectManagement/ProjectFrontendDataCheck.vue';
import ProjectDatabaseDataCheck from '../../components/ProjectManagement/ProjectDatabaseDataCheck.vue';

import { ref, watch, onMounted, computed, shallowRef, markRaw } from 'vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { buildStart } from '@/api/project.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import { useRoute } from 'vue-router';
import { updateProjectInfoNameByProjectInfoId, saveBackendConfigs, saveFrontendConfigs, saveDatabaseConfigs } from '@/api/project.js';
import { addBuildResult, buildCheck, startJenkinsJob } from '../../api/project';
import { sweetAlert } from '../../api/sweetAlert';
import ProjectBuildResultUI from '@/components/ProjectManagement/ProjectBuildResultUI.vue'

const route = useRoute();
const teamId = route.params.teamId;

const authStore = useAuthStore();
const { userId } = storeToRefs(authStore);

const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId } = store;
const { deployConfig } = storeToRefs(store);

const { projectInfos } = storeToRefs(store);
const dataLoaded = ref(false);
const activeTab = ref(0);
const currentComponent = shallowRef(markRaw(ProjectBackendDataCheck));

const allConfigs = ref([]);
const selectedConfigId = ref(0);

const updateConfigName = ref("");

const selectedIndex = computed(() => {
  return allConfigs.value.findIndex(config => config.id === selectedConfigId.value);
});

const curConfig = computed(() => {
	if (selectedIndex.value !== -1) {
		return allConfigs.value[selectedIndex.value];
	} else {
		return null; // 선택된 config가 없을 때 처리할 값
	}
});

const teamProjectInfoId = computed(() => {
  return curConfig.value ? Number(curConfig.value.id) : 0;
});

const componentBuildStart = () => {
  sweetAlert('',"빌드, 배포 시작");

  // 1. {projectInfoId}에 해당하는 서비스를, 배포할 수 있는지 여부를 판단한다
  buildCheck(userId.value, selectedConfigId.value, (response) => {
    const data = response.data.data;
    console.log(data);
    console.log("asdfasdfdas", curConfig.value);

    // 배포할 수 없는 경우(모든 포트가 사용 중인 경우)
    if (data === null) {
      sweetAlert('',"현재 서비스의 모든 포트가 사용 중입니다");
    }
    else {
      addBuildResult(selectedConfigId.value, data.deployNum, (response) => {
        console.log(response);
      }, (error) => {
        console.log(error);
      });

      console.log("buildResult 추가 완료");

      deployConfig.value = {
        ...curConfig.value,
        deployNum: data.deployNum,
        memberId: userId.value,
        teamProjectInfoId: selectedConfigId.value,
        serviceNum: data.serviceNum,
        accessToken: localStorage.getItem("access_token")
      };

      console.log("deployConfig = ", deployConfig.value);

      buildSetupJenkinsJob();
    }
  }, (error) => {
    console.log(error);
  })
}

const buildSetupJenkinsJob = () => {
  console.log("setup job 시작");

  startJenkinsJob("setup", deployConfig.value, 
    (response) => console.log(response),
    (error) => console.log(error)
  );
}

onMounted(async () => {
  await storeFindAllProjectInfosByTeamId(teamId);
  allConfigs.value = projectInfos.value;
  console.log("All Config Value = ",allConfigs.value);
  dataLoaded.value = true;
});

watch(selectedConfigId, (newId) => {
  selectedIndex.value = allConfigs.value.findIndex(config => config.id === newId);
  updateConfigName.value = allConfigs.value[selectedIndex.value]?.title || "";
});

watch(activeTab, (newValue) => {
  onTabChange(newValue);
});

const onTabChange = (newTabIndex) => {
  console.log("탭 체인지", newTabIndex);
  activeTab.value = newTabIndex;
  switch (newTabIndex) {
    case 0:
      currentComponent.value = markRaw(ProjectBackendDataCheck);
      break;
    case 1:
      currentComponent.value = markRaw(ProjectFrontendDataCheck);
      break;
    case 2:
      currentComponent.value = markRaw(ProjectDatabaseDataCheck);
      break;
  }
};
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
	height: 90px;
	color: black;
	border: 2px solid white;
	background-color: #c3e7cb;
	margin: 3px;
	background-size: 100%;
}

.boxSuccess:hover {
	background-color: green;
	border: none;
}

.boxFailed {
	position: relative;
	width: 7vw;
	height: 90px;
	color: #EC221F;
	background-size: 100%;
	background-color: #f2dede;
	border: 2px solid white;
	margin: 3px;
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
	align-items: start;
	width: 100%;
	flex-direction: row;
	border: 1px solid black;
	border-width: 0 0 3px;
}

.menuBox {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: #F7F9FC;
	width: 7vw;
	height: 120px;
	margin: 3px;
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
	margin: auto;
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
