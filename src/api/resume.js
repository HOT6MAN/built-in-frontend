import { localAxios } from '@/util/http-commons'

const local = localAxios()

export function findMyResumeList(successCB, failCB) {
  local.get('/resumes').then(successCB).catch(failCB)
}

export function registerResume(formData, successCB, failCB) {
  local.post('/resume', formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(successCB)
    .catch(failCB);
}

export function findResumeById(id, successCB, failCB) {
  local.get('/resume/' + id).then(successCB).catch(failCB)
}

export function deleteResumeById(id, successCB, failCB) {
  local.delete('/resume/'+id).then(successCB).catch(failCB);
}