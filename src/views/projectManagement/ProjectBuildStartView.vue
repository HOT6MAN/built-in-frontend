<template>
  <div class="main-content">
    <div class="config-container">
      <div class="row config-header">
        <h2>프로젝트 빌드 시작</h2>
      </div>
      <div v-if="dataLoaded" class="row config-selection">
        <div class="input-group">
          <select v-model="selectedConfigId" class="form-select config-select">
            <option value="" disabled selected>설정 선택</option>
            <option v-for="(config, index) in allConfigs" :key="config.id" :value="config.id">
              {{ config.title }}
            </option>
          </select>
        </div>
      </div>

      <div v-if="selectedConfigId" class="config-content">
        <div class="input-group-container">
          <label for="config-input" class="config-label">빌드할 프로젝트 환경설정 </label>
          <div class="input-group">
            <input id="config-input" v-model="updateConfigName" type="text" class="form-control config-input"
              placeholder="설정 제목" readonly />
          </div>
        </div>

        <b-tabs v-model="activeTab" @input="onTabChange" class="mt-4">
          <b-tab title="Backend">
            <template #title>
              <b>{{ activeTab === 0 ? '▶' : '' }} Backend 설정</b>
            </template>
          </b-tab>
          <b-tab title="Frontend">
            <template #title>
              <b>{{ activeTab === 1 ? '▶' : '' }} Frontend 설정</b>
            </template>
          </b-tab>
          <b-tab title="DB">
            <template #title>
              <b>{{ activeTab === 2 ? '▶' : '' }} DB 설정</b>
            </template>
          </b-tab>
        </b-tabs>

        <component v-if="dataLoaded" :is="currentComponent" :allConfigs="allConfigs"
          :selectedConfigId="selectedConfigId" :selectedIndex="selectedIndex"></component>


      </div>

      <div v-else class="no-selection-message">
        <div class="no-selection-content">
          <i class="fas fa-project-diagram"></i>
          <div class="no-selection-title">프로젝트를 선택해주세요</div>
          <p class="no-selection-description">
            빌드, 배포 프로젝트 환경 설정을 선택해주세요.
          </p>
          <p class="no-selection-description">
            해당 설정을 기반으로 빌드, 배포가 이루어집니다.
          </p>
        </div>
      </div>

      <div v-if="selectedConfigId && dataLoaded" class="build-button-container">
        <button class="build-button" @click="componentBuildStart">
          빌드/배포 시작
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, shallowRef, markRaw } from 'vue';
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
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

.main-content {
  display: flex;
  justify-content: center;
  background-color: #f0f4f8;
  min-height: 100vh;
}

.config-container {
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}


.config-header {
  background-color: #102a43;
  color: #ffffff;
  padding: 20px;
  text-align: center;
}

.config-header h2 {
  margin: 0;
  font-size: 24px;
}

.config-selection {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.input-group-container {
  margin-bottom: 20px;
}

.config-label {
  display: block;
  margin-bottom: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
  text-align: left;
  /* 레이블을 왼쪽으로 정렬 */
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.config-input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  font-size: 16px;
  transition: all 0.3s ease;
}

.config-input:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  outline: none;
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

.config-content {
  padding: 20px;
}

.config-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  transition: border-color 0.3s;
}

.config-input:focus {
  border-color: #4299e1;
  outline: none;
}

.no-selection-message {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #4a5568;
}

.no-selection-message i {
  font-size: 24px;
  margin-right: 10px;
}

.nav-tabs {
  justify-content: center;
  border-bottom: 1px solid #e2e8f0;
}

.nav-tabs .nav-link {
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  margin-bottom: -1px;
  transition: color 0.3s, border-color 0.3s;
}

.nav-tabs .nav-link.active {
  color: #4299e1;
  border-bottom: 2px solid #4299e1;
}

.tab-content {
  padding-top: 20px;
}

.no-selection-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-selection-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.no-selection-description {
  font-size: 16px;
  color: #718096;
  max-width: 400px;
  line-height: 1.5;
}

.no-selection-message i {
  font-size: 48px;
  margin-bottom: 20px;
  color: #4299e1;
}

.no-selection-message {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #4a5568;
  background-color: #edf2f7;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.build-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.build-button {
  background-color: #102a43;
  color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.build-button:hover {
  background-color: #0f1e36;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style>