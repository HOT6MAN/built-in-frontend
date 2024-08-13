<template>
  <div class="page">
    <div :style="headerStyle" class="header">
      <h1 class="page-title">모집</h1>
    </div>

    <div v-if="isAuth" class="auth-buttons d-flex justify-content-end mb-2 w-100">
      <b-button class="mx-1" @click="startChat">1:1 채팅</b-button>
      <b-button variant="success" class="mx-1" @click.prevent="upd">수정</b-button>
      <b-button variant="danger" class="delete-btn" @click.prevent="del">삭제</b-button>
    </div>
    
    <b-card class="board">
      <b-card-header class="d-flex justify-content-between align-items-center py-3">
        <b-card-title class="h2">
          {{ board.teamName }}
          <h6 class="domain"><b-badge class="mx-1" variant="primary">{{ board.domain }}</b-badge></h6>
          <h6 class="desired-pos-list">
            <b-badge 
              v-for="pos in board.desiredPosList" :key="pos.id"  
              class="desired-pos" 
              variant="secondary" 
              >{{ pos }}
            </b-badge>
          </h6>
        </b-card-title>          
        <b-card-sub-header><b-badge class="mx-2" variant="info">{{ board.authorName }}</b-badge> {{ board.createdDate }} </b-card-sub-header>
      </b-card-header>
      <b-card-body class="left-aligned">          
        <b-card-title class="h4 my-1">{{ board.introduction }} </b-card-title>          
        <b-card-text class="mt-3"> {{ board.content }} </b-card-text>
      </b-card-body>
      <b-card-body class="d-flex justify-content-end">          
        <b-button variant="primary" @click.prevent="onApplyClick">지원하기</b-button>
      </b-card-body>
    </b-card>    

    <ResumeListModal v-model="showModal" @apply="onApply" @apply:isEligibleToApply="checkEligibleToApply" />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { findRecruit, deleteRecruit, checkMyTeam, checkMyResumeExists, checkMyApplicationApplied } from '@/api/teambuilding.js'
import { applyTeamByResumeId } from '@/api/resume.js'
import ResumeListModal from '@/modals/resume/ResumeListModal.vue'
import {useChatStore} from '@/stores/chatStore.js';
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';
import { sweetAlert } from '../../api/sweetAlert'

import { createRoomByTeamId } from '@/api/chat.js';

const route = useRoute()
const router = useRouter()
const id = route.params.id

const chatStore = useChatStore();
const authStore = useAuthStore();
const {chatOpen} = storeToRefs(chatStore);
const {userId} = storeToRefs(authStore);

const board = ref({})
const headerStyle = computed(() => ({
  '--background-image': `url(${board.value.thumbnailUrl})`
}));
const isAuth = ref(true)
const showModal = ref(false);
const teamId = ref('')

findRecruit(id, (resp) => {
  board.value = resp.data.data
  teamId.value = board.value.teamId;
}, (err) => console.error(err))

const upd = () => {
  router.push({
    name: 'teambuildingRecruitUpdate',
    params: {
      id
    },
    query: {
      board: JSON.stringify(board.value)
    }
  })
}

const del = () => {
  deleteRecruit(id, (resp) => {
    if (resp.status === 204) {
      router.push({path: '/teambuilding', query: {redirectYN: true, msg: 'Success Delete'}})        
      .then(() => router.replace({path: '/teambuilding'}))
    }
  }, (err) => console.error(err))
}

const onApplyClick = () => {
  showModal.value = true;
}

const checkEligibleToApply = async (resolve) => {
  const checks = [
    {func: () => checkMyResumeExists(), condition: res => !res, errorMsg: "you don't have resume to apply"},
    {func: () => checkMyTeam(teamId.value), condition: res => res, errorMsg: "you already teammate"},
    {func: () => checkMyApplicationApplied(teamId.value), condition: res => res, errorMsg: "you already applied (under review)"},
  ]

  for (const check of checks) {
    const {func, condition, errorMsg} = check
    const result = await func();

    if (condition(result)) {
      resolve(errorMsg)
      return;
    }
  }

  resolve("")
}

const onApply = (resumeId) => {
  applyTeamByResumeId({'teamId': teamId.value, 'resumeId': resumeId}, (resp) => {
    if (resp.status === 201) {
      showModal.value = false
      sweetAlert('',"지원 완료")
      router.push("/teambuilding")
    }
  }, (err) => console.error(err))
}

const startChat = async ()=>{
  console.log("chat start");
  await createRoomByTeamId(id, userId.value, (response)=>{
    
  },(error)=>{
    console.log(error);
  })
  chatOpen.value = true;
}
</script>
<style scoped>
  .header {
    display: flex;
    justify-content: center;
    height: 300px;
    background-image: var(--background-image);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: white;
    margin: 10px;
  }

  .page {
    margin-top: 100px;
  }  

  .page-title {
    margin-top: 70px;
  }

  .auth-buttons > .delete-btn {
    margin-right: 15px;
  }

  .domain {
    display: inline;
    margin-right: 5px;
  }

  .desired-pos {
    margin-right: 3px;
  }

  .desired-pos-list {
    display: inline;
  }

  .left-aligned {
    text-align: left;
  }
</style>