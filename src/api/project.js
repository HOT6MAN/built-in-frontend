import { localAxios } from "@/util/http-commons";
import api from '@/util/axios-common'
const local = localAxios();

async function receiveBuildResult(teamProjectInfoId, success, fail){
    await api.get(`/build/deploy/result/team_project_info/${teamProjectInfoId}`).then(success).catch(fail);
};


async function findServiceScheduleById(serviceNum, success, fail){
    await api.get(`/build/service-schedule/${serviceNum}`).then(success).catch(fail);
}

async function findAllProjectInfosByTeamId(teamId, success, fail){
    await api.get("/build/project/"+teamId).then(success).catch(fail);
}

async function findUsedProjectInfosByTeamId(teamId, success, fail){
    await api.get("/build/project/use/"+teamId).then(success).catch(fail);
}

async function insertNewProjectInfo(teamId, title, success, fail){
    await api.post(`/build/project/team/${teamId}/title/${title}`).then(success).catch(fail);
}

async function updateProjectInfoNameByProjectInfoId(projectInfoId, updateConfigName, success, fail){
    console.log("put call");
    await api.put("/build/project/"+projectInfoId, { 'updateProjectInfoName' : updateConfigName}).then(success).catch(fail);
}

async function saveBackendConfigs(projectInfoId, backendConfigs, success, fail){
    console.log("Before Save BackendConfig, value = ",backendConfigs);
    await api.post("/build/project/backend/"+projectInfoId, backendConfigs).then(success).catch(fail);
}

async function saveFrontendConfigs(projectInfoId, frontendConfigs, success, fail){
    await api.post("/build/project/frontend/"+projectInfoId, frontendConfigs).then(success).catch(fail);
}

async function saveDatabaseConfigs(projectInfoId, formData, success, fail) {

      await api.post(`/build/project/database/${projectInfoId}`, formData, {        headers: {
          'Content-Type': 'multipart/form-data'
        }}).
        then(success).fail(fail);
  }



async function buildStart(teamId, projectInfoId, success, fail) {
    const data = {
      records: [{
        value: {
          teamId: teamId,
          projectInfoId: projectInfoId
        }
      }]
    };
  
    await api.post("/build/deploy", data)
      .then(success)
      .catch(fail);
  }

function buildCheck(memberId, projectInfoId, success, fail){
    api.get(`/build/deploy/member/${memberId}/project-info/${projectInfoId}`).then(success).catch(fail);
}

async function addBuildResult(teamProjectInfoId, deployNum, success, fail){
    await api.post(`/build/project/team-project-info/${teamProjectInfoId}/deployNum/${deployNum}`).then(success).catch(fail);
}

function startJenkinsJob(jobType, config, success, fail) {
    api.post(`/build/project/${jobType}`, config).then(success).catch(fail);
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

export {
    receiveBuildResult,
    findServiceScheduleById,
    findAllProjectInfosByTeamId,
    findUsedProjectInfosByTeamId,
    insertNewProjectInfo, 
    updateProjectInfoNameByProjectInfoId,
    saveBackendConfigs, 
    saveFrontendConfigs, 
    saveDatabaseConfigs,
    buildCheck,
    addBuildResult,
    startJenkinsJob,
    buildStart,
    buildStop,
    findNPrevLogs,
    addDynamicListener
};