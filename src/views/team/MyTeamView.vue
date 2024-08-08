<script setup>
import { ref } from 'vue';
import MemberSidebar from '@/components/member/MemberSidebar.vue';
import { onMounted } from 'vue';
import {useTeamStore} from '@/stores/teamStore';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import {setTeam, getAllMyTeamByUserId} from '@/api/team';
import TeamCard from '@/components/team/TeamCard.vue';

const authStore = useAuthStore()
const {token,userId} = storeToRefs(authStore)
const teamStore = useTeamStore()
const { fetchAllTeamsForUser, isTeamsEmpty} = teamStore
const {getTeams: teams} = storeToRefs(teamStore)

//온마운트해서 팀리스트 가져오고
//있으면 TeamList.vue for반복해서 그려주고 없으면 없습니ㅏㄷ.

const teamsList = ref([])

onMounted(  async()=> {
  console.log('올팀');
  await fetchAllTeamsForUser(userId.value)
  console.log("마이팀 리스트: ",teams.value);

})

// const fetchAllTeamsForUser = async(memberId) =>{
//   await getAllMyTeamByUserId(
//       memberId,
//       (response)=>{
//           teamsList.value = response.data.data;
          
//       },
//       (error)=>{
//           console.log(error);
//       }
//   )
// }


</script>
<template>
  <div class="container">
    <MemberSidebar class="sidebar" />
    <div class="content">
      <div class="header">
        <button class="create-button">
          <router-link :to="{ name: 'myTeamRegister' }" style="text-decoration: none; color: white">팀 생성</router-link>
        </button>
      </div>
      <!-- 팀이 없을 때 표시되는 메시지 -->
      <p v-if="teams.value" class="no-teams-message">팀이 없습니다.</p>
      <!-- 팀이 있을 때 팀 카드 목록 표시 -->
      <div v-else class="teams">
        <div v-for="(item, index) in teams" :key="index">
          <TeamCard :team="item" />
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
  .container {
    display: flex;
    padding-top: 120px;
    padding-left: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .sidebar {
    width: 200px;
    padding: 20px;
    border-right: 1px solid #ddd;
    margin-right: 20px;
  }
  
  .content {
  flex-grow: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: flex-end;
}

.create-button {
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background-color: #007BFF;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

.create-button:hover {
  background-color: #0056b3;
}

.no-teams-message {
  font-size: 1.2rem;
  color: #999;
  text-align: center;
  margin-top: 50px;
}

.teams {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.teams > div {
  flex: 1 1 calc(50% - 20px);;
  box-sizing: border-box;
}
  
  </style>