import api from "@/util/axios-common";

const local = api

export function getImageFromUrl(url, successCB, failCB) {
  local.get(url, {responseType: 'blob'}).then(successCB).catch(failCB)
}

export function findMyResumeList(successCB, failCB) {
  local.get('/resumes').then(successCB).catch(failCB)
}

export function registerResume(formData, successCB, failCB) {
  local.post('/resume', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export async function findResumeById(id) {
  const res = await local.get('/resume/' + id);
  return res.data;
}

export function updateResume(id, formData, successCB, failCB) {
  local.patch('/resume/' + id, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export function deleteResumeById(id, successCB, failCB) {
  local.delete('/resume/'+id).then(successCB).catch(failCB);
}

export function applyTeamByResumeId(json, successCB, failCB) {
  local.post('/apply', json).then(successCB).catch(failCB);
}

export async function findApplyList(teamId) {
  const res = await local.get(`/applications/team/${teamId}`);
  return res.data.data;
}

export function acceptApplication(json, successCB, failCB) {
  local.patch('/approve', json).then(successCB).catch(failCB);
}

export function rejectApplication(json, successCB, failCB) {
  local.patch('/reject', json).then(successCB).catch(failCB);
}

export function deleteApplication(teamId, resumeId, successCB, failCB) {
  local.delete(`/apply/team/${teamId}/application/${resumeId}`).then(successCB).catch(failCB);
}