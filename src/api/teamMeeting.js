import api from "../util/axios-common";

async function startMeetingByTeamId(teamId, userId, success, fail){
    await api.patch(`/meeting/api/sessions/${teamId}/create/${userId}`).then(success).catch(fail);
}

async function getMeetingByTeamId(teamId, success, fail){
    await api.get(`/meeting/api/sessions/${teamId}/get`).then(success).catch(fail);
}

export{
    startMeetingByTeamId,
    getMeetingByTeamId
}