<template>
  <div>
    <b-tabs content-class="mt-3" pills align="center" class="teambuilding-tabbar">
      <b-tab title="Recruit" active>
        <RecruitView :data/>
      </b-tab>
      <b-tab title="Self-Introduction">
        
      </b-tab>
    </b-tabs>
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  import RecruitView from './TeamBuildingRecruitView.vue'

  const data = ref([
    { id: 1, teamName: "ssafy", imgUrl: "https://picsum.photos/600/300/?image=25", introduction: "hello", domain: "ai", desiredPositions: ["FE", "BE", "ML"], author: "ssafy kim"},
  ])
</script>
<style scoped>
  .teambuilding-tabbar {
    margin-top: 100px;
  }
</style>