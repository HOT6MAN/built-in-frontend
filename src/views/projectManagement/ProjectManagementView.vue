<template>
  <div class="all-container">
    <div class="container">
      <div class="sidebar">
        <SideBarView teamId:teamId></SideBarView>
      </div>
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>

</template>
  
  <script setup>
  import SideBarView from '@/views/Bars/SideBarView.vue';
  import { ref, onMounted, nextTick, defineProps } from 'vue';
  import { useAuthStore } from '../../stores/authStore';
  import { storeToRefs } from 'pinia';
  import { getAllMyTeamByUserId } from '@/api/team.js';
  import { useRoute, useRouter } from 'vue-router';
  import { sweetAlert } from '../../api/sweetAlert';

  const router = useRouter();
  
  const authStore = useAuthStore();
  const { userId } = storeToRefs(authStore);
  
  const isSelecteTeam = ref(false);
  const selectedTeam = ref(null);
  const teamArray = ref([]);
  
  onMounted(async () => {
    await getAllMyTeamByUserId(userId.value, (response) => {
      console.log(response.data.data);
      teamArray.value = response.data.data;
    }, (error) => {
      console.log("error = ", error);
    });
  });
  
  const confirmTeamSelection = () => {
    if (selectedTeam.value) {
      isSelecteTeam.value = true;
      console.log(selectedTeam.value)
      nextTick(() => {
        router.push({
          name: 'projectbuildconfig',
          params: { teamId: selectedTeam.value.id.toString() }
        });
      });
    } else {
      sweetAlert('','팀을 선택해주세요.')
    }
  };

  const currentRoute = useRoute()
  const teamId = ref(currentRoute.params.teamId)

  </script>
  
  <style scoped>
  html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
.all-container {
width: 100%;
height: 100%;
box-sizing: border-box;
font-family: var(--font-roboto);
}
.team-selection-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #f0f2f5;
}

.container {
display: grid;
/* grid-template-columns: 220px 1fr; */
height: 100%;
width: 100%; /* 뷰포트 전체를 차지 */ 
max-width: 100%;
margin: 0;
padding: 0;
overflow-x: hidden; /* 변경된 부분 */
}

.content {
  margin-top: 80px;
  margin-left: 220px;
}

.team-selection {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

h2 {
  color: #333;
  margin-bottom: 20px;
}

.team-select {
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  margin-bottom: 20px;
}

.confirm-button {
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #4CAF50;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.confirm-button:hover {
  background-color: #45a049;
}
</style>

