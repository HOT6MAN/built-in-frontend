<template>
  <div class="main-content" >
    <div class="config-container">
        <RecruitView :data :loading @search="requestRecruitList"/>
      </div>
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
  .main-content {
    display: flex;
    margin-top: 80px;
    padding: 20px;
    justify-content: center;
    background-color: #f0f4f8;
    min-height: 100vh;
  }
  .config-container {
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

</style>