import { localAxios } from '@/util/http-commons'

const local = localAxios()

export function findRecruitList(params, successCB, failCB) {
  local.get('/teambuilding/recruits', { params }).then(successCB).catch(failCB)
}

export async function findTeamList(params, successCB, failCB) {
  await local.get('/team', { params }).then(successCB).catch(failCB)
}

export async function registerRecruit(params, successCB, failCB) {
  await local.post('/teambuilding/recruit', params).then(successCB).catch(failCB)
}
