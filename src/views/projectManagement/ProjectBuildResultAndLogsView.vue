<script setup>
import { ref, onMounted } from 'vue';
import SideBarView from '../Bars/SideBarView.vue';
import ProjectBuildResult from '@/components/ProjectManagement/ProjectBuildResult.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';
import { findNPrevLogs } from '@/api/project.js';

const projectStore = useProjectStore();
const { usedProjectInfos } = storeToRefs(projectStore);
const { storeFindUsedProjectInfosByTeamId } = projectStore;
const allConfig = ref([]);
const dataLoaded = ref(false);

onMounted(async () => {
    await storeFindUsedProjectInfosByTeamId(1);
    allConfig.value = usedProjectInfos.value;
    console.log("all = ", allConfig.value);
    dataLoaded.value = true;
});

const viewLogs = (dataObject) => {
    openLogWindow(dataObject);
};

const openLogWindow = (dataObject) => {
  console.log("openLog object = ",dataObject);
  const stringify = JSON.stringify(dataObject);
  const url = `/log-window?data=${stringify}`;
  window.open(url, '_blank', 'width=1200,height=600');
};
</script>

<template>
  <div class="container">
    <div class="sidebar">
      <SideBarView></SideBarView>
    </div>
    <div v-if="dataLoaded" class="content">
      <ProjectBuildResult :allConfig="allConfig" @viewLogs="viewLogs"></ProjectBuildResult>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 250px 1fr;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.sidebar {
  background-color: #f4f4f4;
}

.content {
  padding: 20px;
}
</style>
