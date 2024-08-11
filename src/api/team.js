import api from "../util/axios-common";

async function setTeam(param, success, fail){
    await api.post('/teams', param).then(success).catch(fail);
}

async function deleteTeamById(teamId,success, fail){
    await api.delete(`/teams/${teamId}`).then(success).catch(fail);
}


async function getAllMyTeamByUserId(memberId,success, fail){
    await api.get(`/teams/${memberId}`).then(success).catch(fail);
}

async function getMyTeamById(teamId,success, fail){
    await api.get(`/teams/${teamId}/detail`).then(success).catch(fail);
}


async function setJiraUrl(param, success, fail){
    await api.patch(`/teams/jira`, param).then(success).catch(fail);
}

async function setGitUrl(param, success, fail){
    await api.patch(`/teams/git`, param).then(success).catch(fail);
}

async function setStatus(param, success, fail){
    await api.patch(`/teams/status`, param).then(success).catch(fail);
}


export{
    setTeam,
    deleteTeamById,
    getAllMyTeamByUserId,
    getMyTeamById,
    setJiraUrl,
    setGitUrl,
    setStatus,

}