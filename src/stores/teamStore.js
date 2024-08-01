import {setTeam} from '@/api/team'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';

export const useTeamStore = defineStore('team', ()=>{
    const router = useRouter()
    // const team = ref({

    // })

    const createTeam = async(team) =>{
        await setTeam(
            team,
            (response)=>{
                console.log(response.data);
                router.replace({ path: '/teams' });
            },
            (error)=>{
                console.log(error);
            }
        )
    }



    return{
        createTeam
    }
})



