<template>
  <div >  
    <b-tabs>
      <b-tab title="Recruit">
        <RecruitView :data :loading @search="requestRecruitList"/>
      </b-tab>
    </b-tabs>

  </div>
</template>
<script setup>
  import { ref, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router'
  import { findRecruitList } from '@/api/teambuilding.js'
  import RecruitView from './TeamBuildingRecruitView.vue'
  import { sweetAlert } from '../../api/sweetAlert';

  const router = useRoute()

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
        [key]: value
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

  onMounted(() => {
    const redirectYN = router.query.redirectYN
    if (redirectYN) sweetAlert('',router.query.msg)
  })
</script>
<style scoped>
  .teambuilding-tabbar {
    margin-top: 100px;
  }
</style>