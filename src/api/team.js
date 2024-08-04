import api from "../util/axios-common";

async function setTeam(param, success, fail){
    await api.post('/teams', param).then(success).catch(fail);
}


async function getAllMyTeamByUserId(memberId,success, fail){
    await api.get(`/teams/${memberId}`).then(success).catch(fail);
}

async function getMyTeamById(teamId,success, fail){
    await api.get(`/teams/${teamId}/detail`).then(success).catch(fail);
}




export{
    setTeam,
    getAllMyTeamByUserId,
    getMyTeamById

}