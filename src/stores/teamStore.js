import {setTeam, getAllMyTeamByUserId, getMyTeamById} from '@/api/team'
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
                console.log(error);
            }
        )
    }




    return{
        teams,members, team,getTeam,getTeams,
        createTeam,
        fetchAllTeamsForUser,
        fetchOneTeamsForUser
    }
})



