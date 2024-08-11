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
  <MemberSidebar />
  <div class="container">
    <div class="content">
      <div class="header">
        <button class="create-button">
          <router-link :to="{ name: 'myTeamRegister' }" style="text-decoration: none; color: white">팀 생성</router-link>
        </button>
      </div>
      <!-- 팀이 있을 때 팀 카드 목록 표시 -->
      <div v-if="teams.value" class="teams">
        <div v-for="(item, index) in teams" :key="index">
          <TeamCard :team="item" />
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

.create-button {
  padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #12B886;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
}

.create-button:hover {
  background-color: #0f926b;;
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