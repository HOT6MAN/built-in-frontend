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
const { teams, members, team} = teamStore

//온마운트해서 팀리스트 가져오고
//있으면 TeamList.vue for반복해서 그려주고 없으면 없습니ㅏㄷ.

const teamsList = ref([])
const memberLlist = ref([])
onMounted(  ()=> {
  console.log("마이팀 리슨트");
  fetchAllTeamsForUser(userId.value)


})

const fetchAllTeamsForUser = async(memberId) =>{
  await getAllMyTeamByUserId(
      memberId,
      (response)=>{
          console.log(response.data);
          console.log(response.data.data);
          teamsList.value = response.data.data;
          
      },
      (error)=>{
          console.log(error);
      }
  )
}


</script>

<template>
    <div class="container">
      <MemberSidebar class="sidebar" />
      <div class="content">
        <button><router-link :to="{name:'myTeamRegister'}">팀생성</router-link></button>
        <div v-for="(item, index) in teamsList" :key="index">
          <TeamCard :team="item"/>

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
  }
  
  </style>