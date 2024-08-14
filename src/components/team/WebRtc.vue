<script setup>
import { onMounted,ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useTeamMeetingStore } from '@/stores/teamMeetingStore';
import { useAuthStore } from '@/stores/authStore.js';
import { storeToRefs } from 'pinia';

const { VITE_WEBRTC_URL } = import.meta.env;

const router = useRouter()
const currentRoute = useRoute()
const teamId = ref(currentRoute.params.teamId)
const authStore = useAuthStore();
const teamMeetingStore = useTeamMeetingStore()
const {getTeamMeeting: team, sessionId } = storeToRefs(teamMeetingStore)
const {createMeeting, getMeeting} = teamMeetingStore
const {userId} = storeToRefs(authStore);
const isCreated = ref(false);

onMounted( async ()=> {
    
    await getMeeting(teamId.value);
    if (sessionId.value) { // sessionId가 존재할 경우 isCreated = true
        isCreated.value = true;
    } 
})


const initializeMeeting = async () => {
    await createMeeting(teamId.value, userId.value);
    if (sessionId.value) {
        window.open(`${VITE_WEBRTC_URL}/#/${sessionId.value}`, '_blank');
    } else {
        console.error('Session ID not available after meeting creation.');
    }
};

const connectMeeting = async () => {
    await getMeeting(teamId.value);
    if (sessionId.value) {
        window.open(`${VITE_WEBRTC_URL}/#/${sessionId.value}`, '_blank');
    } else {
        console.error('Session ID not available for connecting to meeting.');
    }
};

</script>

<template>
    <div class="meeting-container">
    <div class="header">
      <label class="link-label">화상회의</label>
    </div>
    <div class="button-group">
      <b-button 
        :disabled="isCreated" 
        @click="initializeMeeting"
        :class="{ 'active': isCreated }"
      >
        회의생성
      </b-button>
      <b-button 
        :disabled="!isCreated" 
        @click="connectMeeting"
        :class="{ 'active': !isCreated }"
      >
        참여하기
      </b-button>
    </div>
    
    <div v-if="isCreated" class="status on-air">
      <b-icon icon="battery-full" style="color: #7952b3;"></b-icon>
      <span class="badge badge-onair">회의 진행 중</span>
    </div>
  </div>
</template>

<style scoped>
.badge-onair{
  background-color: red; /* Leader 배경 색상 */
    color: #fff; /* Leader 텍스트 색상 */
    padding: 5px 10px;
    border-radius: 12px; /* 배지 둥근 모서리 */
    font-size: 0.875rem; /* 배지 폰트 크기 */
    font-weight: 600; /* 배지 폰트 두께 */
}

.meeting-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* 중앙 정렬 */
  gap: 16px; /* 요소 사이의 간격 설정 */
}

.header {
  text-align: center; /* 텍스트 중앙 정렬 */
}

.link-label {
  font-weight: bold;
    font-size: 1.250rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 70px; /* label의 고정 너비 설정 */
}

.button-group {
  display: flex;
  gap: 10px; /* 버튼 간의 간격 설정 */
}

button{
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #4299e1;
  color: #ffffff;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;


}

button.active {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #5e81ac;
  color: #ffffff;
}

.button.active:hover {
  background-color: #81a1c1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status.on-air {
  color: red;
  font-weight: bold;
  margin-top: 0px;
}
</style>
