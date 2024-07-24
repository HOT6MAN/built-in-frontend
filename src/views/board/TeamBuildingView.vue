<template>
  <div>
    <b-tabs content-class="mt-3" pills align="center" class="teambuilding-tabbar">
      <b-tab title="Recruit" active>
        <RecruitView />
      </b-tab>
      <b-tab title="Self-Introduction">
        
      </b-tab>
    </b-tabs>
  </div>
</template>
<script setup>
  import RecruitView from './TeamBuildingRecruitView.vue'
</script>
<style scoped>
  .teambuilding-tabbar {
    margin-top: 100px;
  }
</style>