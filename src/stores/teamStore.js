import {setTeam, getAllMyTeamByUserId} from '@/api/team'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export const useTeamStore = defineStore('team', ()=>{
    const router = useRouter()
    const teams= ref([])
    const members = ref([])
    const team = ref({
        name:'',
        content:'',
        memberTeams:[]
    })

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
                console.log(response.data);
                console.log(response.data.data);
                teams.value = response.data.data;
                return response.data.data
            },
            (error)=>{
                console.log(error);
            }
        )
    }




    return{
        teams,members, team,
        createTeam,
        fetchAllTeamsForUser
    }
})



