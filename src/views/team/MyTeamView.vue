<script setup>
import { ref } from 'vue';
import MemberSidebar from '@/components/member/MemberSidebar.vue';
import { onMounted } from 'vue';
import {useTeamStore} from '@/stores/teamStore';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import {setTeam, getAllMyTeamByUserId} from '@/api/team';
import TeamCard from '@/components/team/TeamCard.vue';
import SidebarView from '@/views/Bars/SideBarView.vue'

const authStore = useAuthStore()
const {token,userId} = storeToRefs(authStore)
const teamStore = useTeamStore()
const { fetchAllTeamsForUser} = teamStore
const {getTeams: teams} = storeToRefs(teamStore)

//온마운트해서 팀리스트 가져오고
//있으면 TeamList.vue for반복해서 그려주고 없으면 없습니ㅏㄷ.

const teamsList = ref([])
const isTeamsEmpty = ref(true)

onMounted(  async()=> {
  await fetchAllTeamsForUser(userId.value)

  if(teams.value.length>0){
    isTeamsEmpty.value=false
  }

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
    <div class="content">
      <div class="header">
        
        <b-button class="add-button">
          <router-link :to="{ name: 'myTeamRegister' }" style="text-decoration: none; color: white">새 팀 등록</router-link>
        </b-button>
      </div>
      <!-- 팀이 있을 때 팀 카드 목록 표시 -->
      <div v-if="!isTeamsEmpty" class="teams">
        <div v-for="(item, index) in teams" :key="index">
          <TeamCard :team="item"/>
        </div>
      </div>
      <!-- 팀이 없을 때 표시되는 메시지 -->
      <div v-else>
        <p class="no-teams-message">아직 가입한 팀이 없습니다.
          팀을 새로 만들어보세요!</p>
      </div>
    </div>
  </div>
</template>
  
<style scoped>
  .container {
    display: flex;
    padding-top: 75px;
    padding-left: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 100%; /* 컨테이너의 높이를 100%로 설정 */
    margin-left: 220px;
    width: 80%;
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

.add-button {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  background-color: #5e81ac;
  color: #ffffff;
}

.add-button:hover {
  background-color: #81a1c1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  gap: 0px;
  width: 100%;
}

.teams > div {
  flex: 1 1 calc(50% - 20px);;
  box-sizing: border-box;
}
  
  </style>