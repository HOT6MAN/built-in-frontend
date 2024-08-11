<script setup>
import { ref } from 'vue';
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
  <div class="row asdf">
    <div class="col-5 content">
      <div class="row">
        <ProjectBuildStartComponent @configSelect="handleConfigSelect" />
      </div>
      <div class="row">
        
      </div>
    </div>
    <div class="col-7 content" v-if="dataLoaded">
      <ProjectBuildStartDataCheck :config="selectedConfig" />
    </div>
  </div>
</template>

<style scoped>
* {
  border: 1px solid red;
}

.asdf {
  border: 1px solid green;
}

html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}

/* .content {
  flex: 1;
  padding: 20px;
  overflow: auto;
} */
</style>
