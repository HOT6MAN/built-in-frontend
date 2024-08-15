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
  <div class="main-content">     
    <div class="config-container">  
      <label class="title">나의 팀 목록</label>
      <hr class="mb-2">
      <div v-if="isTeamsEmpty">
        <p class="no-teams-message">아직 가입한 팀이 없습니다.
          팀을 새로 만들어보세요!</p>
      </div>


      <!-- 팀이 있을 때 팀 카드 목록 표시 -->
      <div class="teams">
        <div class="card card-margin"><router-link :to="{name: 'myTeamRegister'}" class="add-card"><img src="@/icons/addButton.svg" alt=""></router-link></div>
        <div class="card-margin" v-for="(item, index) in teams" :key="index">
          <TeamCard :team="item"/>
        </div>
      </div>
    </div>
  </div>
</template>
  
<style scoped>

.title {
    font-weight: bold;
    font-size: 1.7rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 200px; /* label의 고정 너비 설정 */
    margin-top: 20px;
  }
  .main-content {
    display: flex;
    margin-top: 80px;
    padding: 20px;
    justify-content: center;
    background-color: #f0f4f8;
    min-height: 100vh;
    font-family: var(--font-roboto);
  }
  .config-container {
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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
  }

  .teams > div {
    flex: calc(50% - 20px);
    box-sizing: border-box;
  }
  .card {
      border: 1px solid #ddd;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      transition: box-shadow 0.3s, transform 0.3s;
      max-width: 500px;
      height: 150px;
  }
  .add-card {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card-margin {
    max-width: calc(50% - 20px);
    margin: 10px;
  }

  </style>