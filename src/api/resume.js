import { localAxios } from '@/util/http-commons'
import api from '@/util/axios-common.js';
const local = localAxios()

export function getImageFromUrl(url, successCB, failCB) {
  api.get(url, {responseType: 'blob'}).then(successCB).catch(failCB)
}

export function findMyResumeList(successCB, failCB) {
  api.get('/resumes').then(successCB).catch(failCB)
}

export function registerResume(formData, successCB, failCB) {
  api.post('/resume', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export async function findResumeById(id) {
  const res = await api.get('/resume/' + id);
  return res.data;
}

export function updateResume(id, formData, successCB, failCB) {
  api.patch('/resume/' + id, formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export function deleteResumeById(id, successCB, failCB) {
  api.delete('/resume/'+id).then(successCB).catch(failCB);
}