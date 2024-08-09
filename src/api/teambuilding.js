import { localAxios } from '@/util/http-commons'
import api from '@/util/axios-common.js';
const local = localAxios()

export function findRecruitList(params, successCB, failCB) {
  api.get('/teambuilding/recruits', { params }).then(successCB).catch(failCB)
}

export async function findTeamList(params, successCB, failCB) {
  console.log(" findTeamList before Send params = ", params);
  await api.get('/team', { params }).then(successCB).catch(failCB)
}

export function registerRecruit(formData, successCB, failCB) {
  api.post('/teambuilding/recruit', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export async function findRecruit(id, successCB, failCB) {
  await api.get('/teambuilding/recruit/' + id).then(successCB).catch(failCB)
}

export function deleteRecruit(id, successCB, failCB) {
  api.delete('/teambuilding/recruit/'+ id).then(successCB).catch(failCB)
}

export function getImageFromUrl(url, successCB, failCB) {
  api.get(url, {responseType: 'blob'}).then(successCB).catch(failCB)
}

export function updateRecruit(id, formData, successCB, failCB) {
  api.patch('/teambuilding/recruit/'+id, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}