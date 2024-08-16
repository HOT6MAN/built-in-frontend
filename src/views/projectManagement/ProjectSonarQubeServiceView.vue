<template>
  <div id="app">
    <div>
      {{ serviceScheduleInfo }}
    </div>
    <div v-if="serviceScheduleInfo.id">
      <iframe ref="sonarQubeDashboard" width="100%" height="800" frameborder="0"></iframe>
    </div>
    <div v-else>
      <hr />
      <p style="font-size: 20px;">빌드된 프로젝트가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useProjectStore } from '../../stores/projectStore';
import { storeToRefs } from 'pinia';

const { serviceScheduleInfo } = storeToRefs(useProjectStore());
const sonarQubeDashboard = ref(null);

// Watcher to track changes in serviceScheduleInfo.value.id
watch(
  () => serviceScheduleInfo.value.id,
  (newId) => {
    if (newId) {
      const dashboardURL = `https://sonarqube.hot6man.duckdns.org/dashboard?id=sonarqube_${newId}`;
      const apiToken = 'Bearer sqa_62b2bc5a57c05a977ec55752d70a5a5b105c9d51';

      sonarQubeDashboard.value.src = dashboardURL;

      sonarQubeDashboard.value.onload = function () {
        sonarQubeDashboard.value.contentWindow.postMessage(
          { message: 'Authorization', token: apiToken },
          '*'
        );
      };
    }
  },
  { immediate: true }
);
</script>

<style scoped>
#app {
  text-align: center;
}
</style>
