import { localAxios } from "@/util/http-commons";
import api from '@/util/axios-common'
const local = localAxios();

async function findAllProjectInfosByTeamId(teamId, success, fail){
    await api.get("/build/project/"+teamId).then(success).catch(fail);
}

async function findUsedProjectInfosByTeamId(teamId, success, fail){
    await api.get("/build/project/use/"+teamId).then(success).catch(fail);
}

async function insertNewProjectInfo(teamId, success, fail){
    await api.post("/build/project/"+teamId).then(success).catch(fail);
}

async function updateProjectInfoNameByProjectInfoId(projectInfoId, updateConfigName, success, fail){
    console.log("put call");
    await api.put("/build/project/"+projectInfoId, { 'updateProjectInfoName' : updateConfigName}).then(success).catch(fail);
}

async function saveBackendConfigs(projectInfoId, backendConfigs, success, fail){
    await api.post("/build/project/backend/"+projectInfoId, backendConfigs).then(success).catch(fail);
}

async function saveFrontendConfigs(projectInfoId, frontendConfigs, success, fail){
    await api.post("/build/project/frontend/"+projectInfoId, frontendConfigs).then(success).catch(fail);
}

async function saveDatabaseConfigs(projectInfoId, databaseConfigs, success, fail){
    await api.post("/build/project/database/"+projectInfoId, databaseConfigs).then(success).catch(fail);
}

async function buildStart(teamId, projectInfoId, success, fail){
    await api.post("/build/deploy/"+teamId+"/"+projectInfoId).then(success).catch(fail);
}

async function findNPrevLogs(dataObject, success, fail){
    await api.get("/log/"+dataObject.serviceScheduleId+"/"+dataObject.projectInfoId+"/"+dataObject.configId+"/"+dataObject.teamId+"?type="+dataObject.type)
    .then(success).catch(fail);
}

async function addDynamicListener(dataObject, success, fail){
    api.get("/log/active/"+dataObject.serviceScheduleId+"/"+dataObject.projectInfoId+"/"+dataObject.configId+"/"+dataObject.teamId+"?type="+dataObject.type)
    .then(success).catch(fail);
}

async function buildStop(serviceScheduleId, success, fail){
    await api.post("/build/deploy/"+serviceScheduleId).then(success).catch(fail);
}

export {findAllProjectInfosByTeamId,
    findUsedProjectInfosByTeamId,
    insertNewProjectInfo, 
    updateProjectInfoNameByProjectInfoId,
    saveBackendConfigs, 
    saveFrontendConfigs, 
    saveDatabaseConfigs, 
    buildStart,
    buildStop,
    findNPrevLogs,
    addDynamicListener
};