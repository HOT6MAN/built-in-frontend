import {setTeam, getAllMyTeamByUserId, getMyTeamById, setJiraUrl, setGitUrl,setStatus
} from '@/api/team'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { computed, ref } from 'vue';

export const useTeamStore = defineStore('team', ()=>{
    const router = useRouter()
    const teams= ref([])
    const members = ref([])
    const team = ref({})

    const getTeam = computed(()=>team.value)
    const getTeams = computed(()=>teams.value)

    const isTeamsEmpty = computed(() => teams.value.length === 0);

    const createTeam = async(team) =>{
        await setTeam(
            team,
            (response)=>{
                console.log(response.data);
                team.name = response.data

                router.replace({ path: '/teams' });
            },
            (error)=>{
                console.log(error);
            }
        )
    }


    const fetchAllTeamsForUser = async(memberId) =>{

        await getAllMyTeamByUserId(
            memberId,
            (response)=>{
                teams.value = response.data.data;
                console.log("팀 스토어 올팀");
                return response.data.data
            },
            (error)=>{
                console.log(error);
            }
        )
    }

    const fetchOneTeamsForUser = async(teamId) =>{

        await getMyTeamById(
            teamId,
            (response)=>{
                team.value = response.data.data;
                return response.data.data
            },
            (error)=>{
                console.log("store", error.response);
                throw error;
            }
        )
    }



    
    const updateJiraUrl = async(team) =>{

        await setJiraUrl(
            team,
            (response)=>{

            },
            (error)=>{
                console.log(error);
            }
        )
    }

    const updateGitUrl = async(team) =>{

        await setGitUrl(
            team,
            (response)=>{

            },
            (error)=>{
                console.log(error);
            }
        )
    }

    const updateStatus = async(teamParam) =>{

        await setStatus(
            teamParam,
            (response)=>{
                team.value.status = response.data.data.status
            },
            (error)=>{
                console.log(error);
            }
        )
    }




    return{
        teams,members, team,getTeam,getTeams,
        createTeam,
        fetchAllTeamsForUser,
        fetchOneTeamsForUser,
        updateJiraUrl,
        updateGitUrl,
        updateStatus,
        isTeamsEmpty
    }
})



