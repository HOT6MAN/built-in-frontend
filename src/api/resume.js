import { localAxios } from '@/util/http-commons'

const local = localAxios()

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