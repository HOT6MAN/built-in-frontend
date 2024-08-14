<script setup>
import { ref, watch, onMounted } from 'vue';
import {useTeamStore} from '@/stores/teamStore';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const {userId} = storeToRefs(authStore)
const teamStore = useTeamStore()
const { fetchAllTeamsForUser} = teamStore
const {getTeams: teams} = storeToRefs(teamStore)

const selectedTeam = ref('');
const router = useRouter();

onMounted(  async()=> {
  await fetchAllTeamsForUser(userId.value)

})

watch(selectedTeam, (newTeamId) => {
  if (newTeamId) {
    router.push({ name: 'myTeamDetail', params: { teamId: newTeamId } });
  }
});


</script>

<template>
    <div>
        <select v-model="selectedTeam" class="team-select">
            <option value="" disabled selected>팀을 선택해주세요</option>
            <option v-for="team in teams" :key="team.id" :value="team.id">
                    {{ team.name }}
            </option>
        </select>
    </div>
</template>

<style scoped>

</style>