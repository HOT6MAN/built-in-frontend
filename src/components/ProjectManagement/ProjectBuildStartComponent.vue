<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '@/stores/projectStore.js';
import { useAuthStore } from '../../stores/authStore';
import {getAllMyTeamByUserId} from '@/api/team.js';

const props = defineProps({
  teamId: String,
})

const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);
const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId, storeBuildStart } = store;
const { projectInfos } = storeToRefs(store);

const allConfigs = ref([]);
const selectedConfigId = ref(null);
const selectedIndex = ref(0);
const teamOptions = ref([]);
const selectedTeam = ref({});
const dataLoaded = ref(false);

onMounted(async () => {
  await getAllMyTeamByUserId(userId.value, (response)=>{
    console.log(response);
    teamOptions.value = response.data.data;
  }, (error)=>{
    console.log("get All My Team By User Id Error", error);
  });
});

const emits = defineEmits(["configSelect"]);

const handleSelectChange = () => {
  console.log("selectedConfig id = ", selectedConfigId.value);
  const selectedConfig = allConfigs.value.find(config => config.id === selectedConfigId.value);
  console.log("selectedConfig = ", selectedConfig);
  emits("configSelect", selectedConfig);
};

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


watch(selectedConfigId, (newId) => {
  handleSelectChange();
});

const startBuild = () => {
  if(confirm("이 설정으로 빌드를 실시하시겠습니까?")){
    const projectInfoId = selectedConfigId.value;
    console.log("projectInfoId = ",projectInfoId);
    storeBuildStart(selectedTeam.value.id, projectInfoId);
  }
  else{

  }
};
</script>

<template>
  

  <div class="config-selector">
    <div class="team-select" v-if="teamOptions.length > 0">
      <label for="teamSelect">팀 선택:</label>
      <select id="teamSelect" @change="handleTeamSelection">
        <option disabled selected>설정 선택</option>
        <option v-for="team in teamOptions" :key="team.id" :value="team.id">
          {{ team.name }}
        </option>
      </select>
    </div>
    <h3>빌드를 진행할 설정을 골라주세요.</h3>
    <b-form-select v-model="selectedConfigId">
      <option :value="null">Select a config</option>
      <option v-for="config in allConfigs" :key="config.id" :value="config.id">
        {{ config.title }}
      </option>
    </b-form-select>
    <b-button class="start-button" @click="startBuild">빌드 시작</b-button>
  </div>
</template>

<style scoped>
.config-selector {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
}

h3 {
  margin-bottom: 20px;
  color: #333;
}

b-form-select {
  width: 100%;
  margin-bottom: 20px;
}

.start-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.start-button:hover {
  background-color: #0056b3;
}
</style>
