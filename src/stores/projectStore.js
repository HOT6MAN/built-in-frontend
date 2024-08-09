import { ref } from 'vue';
import { defineStore } from 'pinia';
import {findAllProjectInfosByTeamId, 
    findUsedProjectInfosByTeamId,
    insertNewProjectInfo, 
    saveBackendConfigs, 
    saveFrontendConfigs, 
    saveDatabaseConfigs,
    buildStart} from '@/api/project.js';

export const useProjectStore = defineStore('project', () => {
   
    const projectInfos = ref([]);
    const usedProjectInfos = ref([]);

    const storeFindAllProjectInfosByTeamId = async(teamId)=>{
        await findAllProjectInfosByTeamId(teamId, (response)=>{
            projectInfos.value = response.data.data;
            console.log("(Store)After Find All Project Infos By Team Id = ",projectInfos.value);
        },(error)=>{
            console.log("error = ",error);
        })
    }

    const storeFindUsedProjectInfosByTeamId = async (teamId)=>{
        await findUsedProjectInfosByTeamId(teamId, (response)=>{
            alert("불러오기");
            console.log("Used response = ",response);
            usedProjectInfos.value = response.data.data;
        }, (error)=>{
            console.log(error);
        })
    }

    const storeInsertNewProjectInfo = async (teamId)=>{
        await insertNewProjectInfo(teamId, (response)=>{
            alert("생성 완료");
        }, (error)=>{
            console.log(error);
        })
    };

    const storeSaveBackendConfigs = async (projectInfoId, backendConfigs)=>{
        await saveBackendConfigs(projectInfoId, backendConfigs, (response)=>{
            alert("Bakcend 설정 저장 완료");
        }, (error)=>{
            console.log(error);
        })
    };

    const storeSaveFrontendConfigs = async (projectInfoId, frontendConfigs)=>{
        await saveFrontendConfigs(projectInfoId, frontendConfigs, (response)=>{
            alert("Frontend 설정 저장 완료");
        }, (error)=>{
            console.log(error);
        })
    }

    const storeSaveDatabaseConfigs = async(projectInfos, databaseConfigs) =>{
        await saveDatabaseConfigs(projectInfos, databaseConfigs, (response)=>{
            alert("DB 설정 저장 완료");
        },(error)=>{
            console.log(error);
        })
    }

    const storeBuildStart = async (teamId, teamProjectInfoId) =>{
        await buildStart(teamId, teamProjectInfoId, (response)=>{
        
        }, (error)=>{
            console.log(error);
        })
    }

    return {
        projectInfos,
        usedProjectInfos,
        storeFindAllProjectInfosByTeamId,
        storeFindUsedProjectInfosByTeamId,
        storeInsertNewProjectInfo,
        storeSaveBackendConfigs,
        storeSaveFrontendConfigs,
        storeSaveDatabaseConfigs,
        storeBuildStart
    };
})