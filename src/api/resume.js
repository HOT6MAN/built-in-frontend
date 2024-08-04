import { localAxios } from '@/util/http-commons'

const local = localAxios()

export function findMyResumeList(successCB, failCB) {
  local.get('/resumes').then(successCB).catch(failCB)
}