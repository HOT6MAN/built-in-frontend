<template>
    <div id="app">
      <iframe ref="sonarQubeDashboard" width="100%" height="600" frameborder="0"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    mounted() {
      const iframe = this.$refs.sonarQubeDashboard;
      const dashboardURL = "https://sonarqube.hot6man.duckdns.org/dashboard?id=test"; // 수정
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