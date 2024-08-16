<template>
  <div id="app">
    <iframe ref="grafanaDashboard" width="100%" height="800" frameborder="0"></iframe>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useProjectStore } from '../../stores/projectStore';
import { storeToRefs } from 'pinia';

const grafanaDashboard = ref(null);

const projectStore = useProjectStore();
const { serviceScheduleInfo } = storeToRefs(projectStore);

onMounted(() => {
  
  const iframe = grafanaDashboard.value;
  const dashboardURL = "https://grafana.hot6man.duckdns.org" + serviceScheduleInfo.value.grafanaUid + "?orgId=1&refresh=5s";
  console.log("dashboardURL : ", dashboardURL);
  const apiToken = 'Bearer glsa_4spgxgWayJiRV79eM28Lss3kUdRTUtEs_5b55abbf';

  iframe.src = dashboardURL;

  iframe.onload = function () {
    iframe.contentWindow.postMessage({ message: 'set_token', token: apiToken }, '*');
  };
});
</script>

<style>
#app {
  text-align: center;
}
</style>
