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
        <RecruitView :data :loading />
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

  const fetchData = (tabName) => {
    let resp;    

    if (tabName === "recruit") {
      // TODO: param(filter, order)
      resp = findRecruitList(
        (res) => {
          data.value = res.data;
          loading.value = false;
        },
        (err) => console.error("response fail!" + err)) 
    }
  }

  watch(activeTab, (newTabIdx) => {
    loading.value = true;
    fetchData(newTabIdx === 0 ? "recruit" : "selfIntroduction")
  }, {immediate: true})
</script>
<style scoped>
  .teambuilding-tabbar {
    margin-top: 100px;
  }
</style>