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
  <div>
    <h1>화상회의</h1>
    <button 
      :disabled="isCreated" 
      @click="initializeMeeting"
      :class="{ 'active': isCreated }"
    >
      생성
    </button>
    <button 
      :disabled="!isCreated" 
      @click="connectMeeting"
      :class="{ 'active': !isCreated }"
    >
      접속
    </button>
    <div v-if="isCreated" class="status on-air">
      ON-AIR
    </div>
  </div>
</template>

<style scoped>
button {
  background-color: gray;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

button.active {
  background-color: red;
}

.status.on-air {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
