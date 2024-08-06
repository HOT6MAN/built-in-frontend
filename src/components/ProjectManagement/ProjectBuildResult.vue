<script setup>
import { ref, defineProps, defineEmits ,onMounted } from 'vue';

const props = defineProps({
    allConfig: Array,
});
const emits = defineEmits(["viewLogs"]);
const allConfigByComponent = ref([]);

onMounted(() => {
    allConfigByComponent.value = props.allConfig;
    console.log("all Component = ", allConfigByComponent.value);
});

// Method to handle the log viewing action
const viewLogs = (projectInfoId, serviceScheduleId, configId, type) => {
  const dataObject = {
    projectInfoId : projectInfoId,
    serviceScheduleId : serviceScheduleId,
    configId : configId,
    type : type,
  }
  emits("viewLogs", dataObject);
};
</script>

<template>
  <div>
    <br>
    <br>
    <div v-for="configItem in allConfigByComponent" :key="configItem.id">
      <h2>Configuration ID: {{ configItem.id }}</h2>
      <h3>Service Schedule ID: {{ configItem.serviceScheduleId }}</h3>

      <section v-if="configItem.backendConfigs && configItem.backendConfigs.length">
        <h3>Backend Configurations</h3>
        <div v-for="config in configItem.backendConfigs" :key="config.id">
          <p><strong>Build Tool:</strong> {{ config.buildTool }}</p>
          <p><strong>Git URL:</strong> {{ config.gitUrl }}</p>
          <p><strong>Git Branch:</strong> {{ config.gitBranch }}</p>
          <p><strong>Language:</strong> {{ config.language }}</p>
          <p><strong>Language Version:</strong> {{ config.languageVersion }}</p>
          <button @click="viewLogs(configItem.id, configItem.serviceScheduleId, config.id, 'backend')">실시간 로그 보기</button>
        </div>
      </section>

      <section v-if="configItem.frontendConfigs && configItem.frontendConfigs.length">
        <h3>Frontend Configurations</h3>
        <div v-for="config in configItem.frontendConfigs" :key="config.id">
          <!-- Add frontend specific details here -->
          <button @click="viewLogs(configItem.id, configItem.serviceScheduleId, config.id, 'frontend')">실시간 로그 보기</button>
        </div>
      </section>

      <section v-if="configItem.databaseConfigs && configItem.databaseConfigs.length">
        <h3>Database Configurations</h3>
        <div v-for="config in configItem.databaseConfigs" :key="config.id">
          <!-- Add database specific details here -->
          <button @click="viewLogs(configItem.id, configItem.serviceScheduleId, config.id, 'database')">실시간 로그 보기</button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
section {
  margin-bottom: 20px;
}

h2, h3 {
  margin-top: 20px;
}

button {
  margin-top: 10px;
}
</style>
