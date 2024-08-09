<script setup>
import { ref, onMounted } from 'vue';
import SideBarView from '../Bars/SideBarView.vue';
import ProjectBuildResult from '@/components/ProjectManagement/ProjectBuildResult.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';
import { findNPrevLogs } from '@/api/project.js';
import { useAuthStore } from '../../stores/authStore';
import {getAllMyTeamByUserId} from '@/api/team.js';

const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);

const projectStore = useProjectStore();
const { usedProjectInfos } = storeToRefs(projectStore);
const { storeFindUsedProjectInfosByTeamId, storeFindAllProjectInfosByTeamId } = projectStore;
const allConfigs = ref([]);
const selectedConfigId = ref(null);

const teamOptions = ref([]);
const selectedTeam = ref({});
const dataLoaded = ref(false);
const selectedIndex = ref(0);

const handleTeamSelection = async (event) => {
  const teamId = parseInt(event.target.value, 10);
  selectedTeam.value = teamOptions.value.find(team => team.id === teamId);
  console.log("선택 이후 selectedTeam = ", selectedTeam.value);
  await storeFindUsedProjectInfosByTeamId(selectedTeam.value.id);
  console.log("storeFindUsedProjectInfosByTeamId 이후 usedProjectInfos = ", usedProjectInfos.value);
  allConfigs.value = usedProjectInfos.value;
  console.log("all = ", allConfigs.value);
  dataLoaded.value = true;
};

onMounted(async () => {
  await getAllMyTeamByUserId(userId.value, (response)=>{
    console.log(response);
    teamOptions.value = response.data.data;
  }, (error)=>{
    console.log("get All My Team By User Id Error", error);
  });
});

const viewLogs = (dataObject) => {
    openLogWindow(dataObject);
};

const openLogWindow = (dataObject) => {
  console.log("openLog object = ",dataObject);
  dataObject.teamId = selectedTeam.value.id;
  const stringify = JSON.stringify(dataObject);
  const url = `/log-window?data=${stringify}`;
  window.open(url, '_blank', 'width=1200,height=600');
};

</script>

<template>
  <div class="container">
    <div class="team-select" v-if="teamOptions.length > 0">
      <label for="teamSelect">팀 선택:</label>
      <select id="teamSelect" @change="handleTeamSelection">
        <option disabled selected>설정 선택</option>
        <option v-for="team in teamOptions" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>
    <div v-if="dataLoaded" class="content">
      <ProjectBuildResult :allConfigs="allConfigs" @viewLogs="viewLogs"></ProjectBuildResult>
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
