import { startMeetingByTeamId, getMeetingByTeamId } from '@/api/teamMeeting'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

export const useTeamMeetingStore = defineStore('teamMeeting', ()=>{
    const router = useRouter()
    const team = ref({})
    const sessionId = ref('')

    const getTeamMeeting = computed(()=>team.value)


    const createMeeting = async (teamId) => {
        try {
            await startMeetingByTeamId(
                teamId,
                (response) => {
                    team.value.sessionId = response.data.data.sessionId;
                    sessionId.value = response.data.data.sessionId;
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.error('Failed to create meeting:', error);
        }
    };

    
    const getMeeting = async (teamId) => {
        try {
            await getMeetingByTeamId(
                teamId,
                (response) => {
                    team.value.sessionId = response.data.data.sessionId;
                    sessionId.value = response.data.data.sessionId;
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (error) {
            console.error('Failed to get meeting:', error);
        }
    };


    return{
        team,
        getTeamMeeting,
        sessionId,
        createMeeting,
        getMeeting,
    }
})



