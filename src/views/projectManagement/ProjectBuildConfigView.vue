<script setup>
import { ref, watch, onMounted } from 'vue';
import SideBarView from '../Bars/SideBarView.vue';
import ProjectBuildBackendConfig from '@/components/ProjectManagement/ProjectBuildBackendConfig.vue';
import ProjectBuildFrontendConfig from '@/components/ProjectManagement/ProjectBuildFrontendConfig.vue';
import ProjectBuildDBConfig from '@/components/ProjectManagement/ProjectBuildDBConfig.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';

const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId, 
  storeInsertNewProjectInfo,storeSaveBackendConfigs, storeSaveFrontendConfigs, storeSaveDatabaseConfigs } = store;

const { projectInfos } = storeToRefs(store);
const dataLoaded = ref(false);
const activeTab = ref(0);
const currentComponent = ref(ProjectBuildBackendConfig);

const allConfigs = ref([]);
const selectedConfigId = ref(0);
const selectedIndex = ref(0);

onMounted(async () => {
  await storeFindAllProjectInfosByTeamId(1);
  allConfigs.value = projectInfos.value;

  if (allConfigs.value.length > 0) {
    selectedConfigId.value = allConfigs.value[0].id;
    selectedIndex.value = 0;
  }
  dataLoaded.value = true;
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
  console.log("emits array = ",backendConfigArray);
  const projectInfoId = selectedConfigId.value;
  console.log(selectedConfigId.value);
  await storeSaveBackendConfigs(projectInfoId, backendConfigArray);
  await alert("변경 이후 불러오기");
  await storeFindAllProjectInfosByTeamId(1);
};
const saveFrontendData = async (frontendConfigArray) => {
  console.log("Emit frontend data = ",frontendConfigArray);
  const projectInfoId = selectedConfigId.value;
  console.log("before save front id = ", projectInfoId, " frontend config Array = ",frontendConfigArray);
  await storeSaveFrontendConfigs(projectInfoId, frontendConfigArray);
  await alert("변경 이후 불러오기");
  await storeFindAllProjectInfosByTeamId(1);
};
const saveDBData = async (DBConfigArray) => {
  const projectInfoId = selectedConfigId.value;
  console.log("emits db config = ",DBConfigArray);
  await storeSaveDatabaseConfigs(projectInfoId, DBConfigArray);
};

const addNewConfig = async () => {
  await storeInsertNewProjectInfo(1);
  await storeFindAllProjectInfosByTeamId(1);
  const newConfigId = allConfigs.value.length + 1;
  allConfigs.value.push({
    id: newConfigId,
    name: `Configuration ${newConfigId}`,
    backendConfigs: [],
    frontendConfigs: [],
    databaseConfigs: []
  });
  selectedConfigId.value = newConfigId;
  selectedIndex.value = allConfigs.value.length - 1;
};

watch(selectedConfigId, (newId) => {
  selectedIndex.value = allConfigs.value.findIndex(config => config.id === newId);
});
</script>

<template>
  <div>
    <SideBarView class="sidebar" />
    <br><br><br>
    <div class="main-content">
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
      <component v-if="dataLoaded" :is="currentComponent"
                 :allConfigs="allConfigs"
                 :selectedConfigId="selectedConfigId"
                 :selectedIndex="selectedIndex"
                 @saveBackendData="saveBackendData"
                 @saveFrontendData="saveFrontendData"
                 @saveDBData="saveDBData"></component>
      <div v-if="dataLoaded" style="margin-top: 20px;">
        <select v-model="selectedConfigId">
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
  </div>
</template>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
.main-content {
  margin-left: 220px;
  padding: 20px;
}
</style>
