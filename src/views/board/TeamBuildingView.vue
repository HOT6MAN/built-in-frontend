<template>
  <div>
    <b-tabs 
      class="teambuilding-tabbar"
      content-class="mt-3" 
      pills 
      align="center" 
      v-model="activeTab"
      >
      <b-tab title="Recruit" active>
        <RecruitView :data :loading @search="requestRecruitList"/>
      </b-tab>
      <b-tab title="Self-Introduction">
        
      </b-tab>
    </b-tabs>
  </div>
</template>
<script setup>
  import { ref, watch } from 'vue';
  import { findRecruitList } from '@/api/teambuilding.js'
  import RecruitView from './TeamBuildingRecruitView.vue'

  const activeTab = ref(0)
  const data = ref([])
  const loading = ref(true)

  const requestRecruitList = (key, value) => {
    fetchData("recruit", key, value)
  }

  const fetchData = (tabName, key, value) => {
    if (tabName === "recruit") {
      loading.value = true;
      
      const params = {
        [key]: [value]
      };

      findRecruitList(
        params,
        (res) => {
          data.value = res.data;
          loading.value = false;
        },
        (err) => console.error("response fail!" + err)) 
    }
  }

  watch(activeTab, (newTabIdx) => {
    fetchData(newTabIdx === 0 ? "recruit" : "selfIntroduction")
  }, {immediate: true})
</script>
<style scoped>
  .teambuilding-tabbar {
    margin-top: 100px;
  }
</style>