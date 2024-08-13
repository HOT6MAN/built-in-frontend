import api from "@/util/axios-common";

const local = api

export function findRecruitList(params, successCB, failCB) {
  local.get('/teambuilding/recruits', { params }).then(successCB).catch(failCB)
}

export function findMyTeamList(successCB, failCB) {
  local.get('/myteam').then(successCB).catch(failCB)
}

export function registerRecruit(formData, successCB, failCB) {
  local.post('/teambuilding/recruit', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export function findRecruit(id, successCB, failCB) {
  local.get('/teambuilding/recruit/' + id).then(successCB).catch(failCB)
}

export function deleteRecruit(id, successCB, failCB) {
  local.delete('/teambuilding/recruit/'+ id).then(successCB).catch(failCB)
}

export function getImageFromUrl(url, successCB, failCB) {
  local.get(url, {responseType: 'blob'}).then(successCB).catch(failCB)
}

export function updateRecruit(id, formData, successCB, failCB) {
  local.patch('/teambuilding/recruit/'+id, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export async function checkMyResumeExists() {
  const result = await local.get(`/check/myresume`);
  return result.data.data;
}

export async function checkMyTeam(teamId) {
  const result = await local.get(`/check/myteam/${teamId}`);
  return result.data.data;
}

export async function checkMyApplicationApplied(teamId) {
  const result = await local.get(`/check/application/status/team/${teamId}`);
  return result.data.data;
}
