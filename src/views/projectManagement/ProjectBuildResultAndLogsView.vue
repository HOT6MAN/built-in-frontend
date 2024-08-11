<script setup>
import { ref, onMounted } from 'vue';
import ProjectBuildResult from '@/components/ProjectManagement/ProjectBuildResult.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
const route = useRoute();
const teamId = route.params.teamId;

const projectStore = useProjectStore();
const { usedProjectInfos } = storeToRefs(projectStore);
const { storeFindUsedProjectInfosByTeamId } = projectStore;
const allConfigs = ref([]);

const selectedTeam = ref({});
const dataLoaded = ref(false);


onMounted(async () => {
  await storeFindUsedProjectInfosByTeamId(teamId);
  console.log("team Id = ",teamId);
  console.log("onMount Build result and logs view UsedProjectInfo = ",usedProjectInfos.value);
  allConfigs.value = usedProjectInfos.value;
  console.log("Result and Logs all Configs. value = ",allConfigs.value);
  dataLoaded.value = true;
});

const viewLogs = (dataObject) => {
    openLogWindow(dataObject);
};

const openLogWindow = (dataObject) => {
  console.log("openLog object = ",dataObject);
  dataObject.teamId = teamId;
  const stringify = JSON.stringify(dataObject);
  const url = `/log-window?data=${stringify}`;
  window.open(url, '_blank', 'width=1200,height=600');
};

</script>

<template>
  <div class="container">
    <div class="content">
      <ProjectBuildResult v-if="dataLoaded" :allConfigs="allConfigs" @viewLogs="viewLogs"></ProjectBuildResult>
    </div>
  </div>
</template> 

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  height: 100vh;
  overflow: auto;
}

.content {
  width: 80vw;
  max-width: 100vw;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
</style>