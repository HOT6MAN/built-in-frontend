<script setup>
import { ref, watch, onMounted } from 'vue';
import SideBarView from '../Bars/SideBarView.vue';
import ProjectBuildBackendConfig from '@/components/ProjectManagement/ProjectBuildBackendConfig.vue';
import ProjectBuildFrontendConfig from '@/components/ProjectManagement/ProjectBuildFrontendConfig.vue';
import ProjectBuildDBConfig from '@/components/ProjectManagement/ProjectBuildDBConfig.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';
import {useAuthStore} from '@/stores/authStore.js';
import {getAllMyTeamByUserId} from '@/api/team.js';

const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);

const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId,
  storeInsertNewProjectInfo, storeSaveBackendConfigs, storeSaveFrontendConfigs, storeSaveDatabaseConfigs } = store;

const { projectInfos } = storeToRefs(store);
const dataLoaded = ref(false);
const activeTab = ref(0);
const currentComponent = ref(ProjectBuildBackendConfig);

const allConfigs = ref([]);
const selectedConfigId = ref(0);
const selectedIndex = ref(0);

const teamOptions = ref([]);
const selectedTeam = ref({});

const handleTeamSelection = async (event) => {
  const teamId = parseInt(event.target.value, 10);
  selectedTeam.value = teamOptions.value.find(team => team.id === teamId);
  console.log("선택 이후 selectedTeam = ", selectedTeam.value);
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
  allConfigs.value = projectInfos.value;
  if (allConfigs.value.length > 0) {
    selectedConfigId.value = allConfigs.value[0].id;
    selectedIndex.value = 0;
  }
  dataLoaded.value = true;
};
onMounted(async () => {
  await getAllMyTeamByUserId(userId.value, (response)=>{
    console.log(response);
    teamOptions.value = response.data.data;
  }, (error)=>{
    console.log("get All My Team By User Id Error", error);
  })
});

const onTabChange = () => {
  switch (activeTab.value) {
    case 0:
      currentComponent.value = ProjectBuildBackendConfig;
      break;
    case 1:
      currentComponent.value = ProjectBuildFrontendConfig;
      break;
    case 2:
      currentComponent.value = ProjectBuildDBConfig;
      break;
  }
};
watch(activeTab, onTabChange);

const saveBackendData = async (backendConfigArray) => {
  if(!selectedConfigId){
    alert("설정을 먼저 선택해주세요.");
    return;
  }
  console.log("emits array = ", backendConfigArray);
  const projectInfoId = selectedConfigId.value;
  console.log(selectedConfigId.value);
  await storeSaveBackendConfigs(projectInfoId, backendConfigArray);
  await alert("변경 이후 불러오기");
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
};
const saveFrontendData = async (frontendConfigArray) => {
  if(!selectedConfigId){
    alert("설정을 먼저 선택해주세요.");
    return;
  }
  console.log("Emit frontend data = ", frontendConfigArray);
  const projectInfoId = selectedConfigId.value;
  console.log("before save front id = ", projectInfoId, " frontend config Array = ", frontendConfigArray);
  await storeSaveFrontendConfigs(projectInfoId, frontendConfigArray);
  await alert("변경 이후 불러오기");
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
};
const saveDBData = async (DBConfigArray) => {
  if(!selectedConfigId){
    alert("설정을 먼저 선택해주세요.");
    return;
  }
  const projectInfoId = selectedConfigId.value;
  console.log("emits db config = ", DBConfigArray);
  await storeSaveDatabaseConfigs(projectInfoId, DBConfigArray);
};

const addNewConfig = async () => {
  await storeInsertNewProjectInfo(selectedTeam.value.id);
  console.log("Insert 이후 Find 차례 selectedTeam id = ",selectedTeam.value.id);
  console.log("selectedTeam만 = ",selectedTeam.value);
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
  allConfigs.value = projectInfos.value;
  console.log("After Insert All Configs = ", allConfigs.value);
  
};

watch(selectedConfigId, (newId) => {
  selectedIndex.value = allConfigs.value.findIndex(config => config.id === newId);
});
</script>

<template>
  <div class="main-content">
    <div class="team-select" v-if="teamOptions.length > 0">
      <label for="teamSelect">팀 선택:</label>
      <select id="teamSelect" @change="handleTeamSelection">
        <option disabled selected>설정 선택</option>
        <option v-for="team in teamOptions" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>
    <b-tabs v-model="activeTab" @input="onTabChange">
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
    <component v-if="dataLoaded" :is="currentComponent" :allConfigs="allConfigs" :selectedConfigId="selectedConfigId"
      :selectedIndex="selectedIndex" @saveBackendData="saveBackendData" @saveFrontendData="saveFrontendData"
      @saveDBData="saveDBData"></component>
    <div v-if="dataLoaded" style="margin-top: 20px;">
      <select v-model="selectedConfigId">
        <option disabled selected>설정 선택</option>
        <option v-for="(config, index) in allConfigs" :key="config.id" :value="config.id">
          {{ config.title }}
        </option>
      </select>
      <button @click="addNewConfig">+ 추가</button>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>

.main-content {
  padding-top: 20px;
}
.team-select {
  margin-top: 20px;
}
</style>
