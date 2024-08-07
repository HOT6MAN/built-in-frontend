<script setup>
import { ref } from 'vue';
import SideBarView from '../Bars/SideBarView.vue';
import ProjectBuildStartComponent from '@/components/ProjectManagement/ProjectBuildStartComponent.vue';
import ProjectBuildStartDataCheck from '@/components/ProjectManagement/ProjectBuildStartDataCheck.vue';


const dataLoaded = ref(false);
const selectedConfig = ref(null);

const handleConfigSelect = (config) => {
  selectedConfig.value = config;
  dataLoaded.value = true;
};
</script>

<template>
  <div class="container">
    <div class="content">
      <br>
      <br>
      <br>
      <ProjectBuildStartComponent @configSelect="handleConfigSelect" />
    </div>
    <div class="content" v-if="dataLoaded">
      <br>
      <br>
      <br>
      <ProjectBuildStartDataCheck :config="selectedConfig" />
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

.container {
  display: flex;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}

.sidebar {
  width: 250px;
  background-color: #2d3648;
  height: 100%;
}

.content {
  flex: 1;
  padding: 20px;
  overflow: auto;
}
</style>
