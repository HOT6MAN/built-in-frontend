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