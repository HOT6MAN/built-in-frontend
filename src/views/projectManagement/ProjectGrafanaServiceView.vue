<template>
    <div id="app">
      <iframe ref="grafanaDashboard" width="100%" height="600" frameborder="0"></iframe>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
    mounted() {
      const iframe = this.$refs.grafanaDashboard;
      const dashboardURL = "https://grafana.hot6man.duckdns.org/d/mU7NJ3242g8Gk/cddba4f5-4e76-59e5-a8e7-6a053ee68c1a?orgId=1&refresh=5s";
      const apiToken = 'Bearer glsa_4spgxgWayJiRV79eM28Lss3kUdRTUtEs_5b55abbf';
      
      iframe.src = dashboardURL;
  
      iframe.onload = function() {
        iframe.contentWindow.postMessage({ message: 'set_token', token: apiToken }, '*');
      };
    }
  };
  </script>
  
  <style>
  #app {
    text-align: center;
  }
  </style>