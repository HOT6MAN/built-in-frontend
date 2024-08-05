<script setup>
import { ref, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useProjectStore } from '@/stores/projectStore.js';


const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId, storeBuildStart } = store;
const { projectInfos } = storeToRefs(store);

const allConfigs = ref([]);
const selectedConfigId = ref(null);

onMounted(async () => {
  await storeFindAllProjectInfosByTeamId(1);
  allConfigs.value = projectInfos.value;
  console.log(allConfigs.value);
});

const emits = defineEmits(["configSelect"]);

const handleSelectChange = () => {
  console.log("selectedConfig id = ", selectedConfigId.value);
  const selectedConfig = allConfigs.value.find(config => config.id === selectedConfigId.value);
  console.log("selectedConfig = ", selectedConfig);
  emits("configSelect", selectedConfig);
};

// Watch for changes in selectedConfigId to ensure handleSelectChange is called
watch(selectedConfigId, (newId) => {
  handleSelectChange();
});

const startBuild = () => {
  if(confirm("이 설정으로 빌드를 실시하시겠습니까?")){
    const projectInfoId = selectedConfigId.value;
    console.log("projectInfoId = ",projectInfoId);
    storeBuildStart(1, projectInfoId);
  }
  else{

  }
};
</script>

<template>
  <div class="config-selector">
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
