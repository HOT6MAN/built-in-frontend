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

<script>
export default {
  name: 'App',
  mounted() {
    const iframe = this.$refs.sonarQubeDashboard;
    const dashboardURL = "https://sonarqube.hot6man.duckdns.org/dashboard?id=sonarqube_4"; // 원복
    const apiToken = 'Bearer sqa_62b2bc5a57c05a977ec55752d70a5a5b105c9d51';
    
    iframe.src = dashboardURL;

    iframe.onload = function() {
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
