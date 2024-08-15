<template>
  <div class="page">
    <div :style="headerStyle" class="header">
      <h1 class="page-title">모집</h1>
    </div>

    <div class="auth-buttons d-flex justify-content-end mb-2 w-100">
      <b-button class="mx-1" @click="startChat">1:1 채팅</b-button>
      <b-button v-if="isMine" variant="success" class="mx-1" @click.prevent="upd">수정</b-button>
      <b-button v-if="isMine" variant="danger" class="delete-btn" @click.prevent="del">삭제</b-button>
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
import { sweetAlert, sweetConfirm } from '../../api/sweetAlert'

import { createRoomByTeamId } from '@/api/chat.js';

import defaultThumbnail from '@/icons/default-thumbnail.svg';

const route = useRoute()
const router = useRouter()
const id = route.params.id

const chatStore = useChatStore();
const authStore = useAuthStore();
const {chatOpen} = storeToRefs(chatStore);
const {userId} = storeToRefs(authStore);

const board = ref({})
const headerStyle = computed(() => (
  {'--background-image': `url(${board.value.thumbnailUrl || defaultThumbnail})`}
));
const isMine = ref(false)
const showModal = ref(false);
const teamId = ref('')

findRecruit(id, (resp) => {
  board.value = resp.data.data
  teamId.value = board.value.teamId;
  isMine.value = userId.value && userId.value === board.value.authorId
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
  sweetConfirm('정말 삭제하시겠습니까?', '', () => deleteRecruit(id, (resp) => {
    if (resp.status !== 204) return;
    
    router.push({path: '/teambuilding'}).then(() => sweetAlert('삭제되었습니다.', ''));    
  }, (err) => console.error(err))
  , (err) => console.error(err))
}

const onApplyClick = () => {
  showModal.value = true;
}

const checkEligibleToApply = async (resolve) => {
  const checks = [
    {func: () => checkMyResumeExists(), condition: res => !res, errorMsg: "지원할 이력서가 없습니다. (지원할 이력서 생성하세요)"},
    {func: () => checkMyTeam(teamId.value), condition: res => res, errorMsg: "당신은 이미 팀원입니다."},
    {func: () => checkMyApplicationApplied(teamId.value), condition: res => res, errorMsg: "당신은 이미 지원하였습니다. (심사중)"},
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
      router.push("/teambuilding").then(() => sweetAlert('',"지원 완료"));    
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