// localAxios는 http-commons로부터 axios를 받아오는 것
// # VITE_VUE_API_URL=http://localhost:8080
// VITE_VUE_API_URL=http://i11a606.p.ssafy.io:8080/hot6man

import { localAxios } from '@/util/http-commons'

const local = localAxios()

export function sendBuildConfigForm(formData, success, fail) {
  local.post('/project/config', formData, {headers: {'Content-Type': 'application/json'}})
    .then(success)
    .catch(fail);
}

export function receiveBuildResult(formData, success, fail) {
  local.get('/team/{teamid}/lastBuild').then(success).catch(fail);
}