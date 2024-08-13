<template>
  <div id="app">
    <div v-if="isServiceIdValid">
      <iframe ref="sonarQubeDashboard" width="100%" height="800" frameborder="0"></iframe>
    </div>
    <div v-else>
      <p>빌드된 프로젝트가 없습니다.</p>
    </div>
  </div>
</template>

<script>
import { ref, defineProps, onMounted } from 'vue';

const props = defineProps({
  allConfigs: Array,
});

const allConfigByComponent = ref([]);
const isServiceIdValid = ref(false);
const serviceScheduleId = ref(null);

function validateServiceScheduleId() {
  allConfigByComponent.value = props.allConfigs;
  const id = allConfigByComponent.value[0]?.serviceScheduleId;

  if (id >= 0 && id <= 10) { // test 0, 나중에 1로 수정
    serviceScheduleId.value = id;
    isServiceIdValid.value = true;
  } else {
    isServiceIdValid.value = false;
  }
}

onMounted(() => {
  allConfigByComponent.value = props.allConfigs;
  validateServiceScheduleId();
});


export default {
  name: 'App',
  mounted() {
    const serviceScheduleId = allConfigByComponent.value[0].serviceScheduleId;
    const iframe = this.$refs.sonarQubeDashboard;
    const dashboardURL = `https://sonarqube.hot6man.duckdns.org/dashboard?id=${serviceScheduleId}.`; // 동적으로 서비스 Id 받아와서 조회
    const apiToken = 'Bearer sqa_62b2bc5a57c05a977ec55752d70a5a5b105c9d51';

    iframe.src = dashboardURL;

    iframe.onload = function () {
      iframe.contentWindow.postMessage({ message: 'Authorization', token: apiToken }, '*');
    };
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>