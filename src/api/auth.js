import refreshAxios from "@/util/axios-refresh"
import {localAxios} from "../util/http-commons";
const local = localAxios();
async function saveAccessLocalStorage(success,fail){
    console.log("JWT 헤더 변환 요청");
    await refreshAxios.get('/convert').then(success).catch(fail);
  }

async function logout(success,fail){
    //로그아웃(access + refresh 전송)
    await refreshAxios.post('/logout', {}, {headers: {Authorization: localStorage.getItem("access_token")},})
    .then(success).catch(fail);
  }

async function getEmailLink(email, success, fail){
    await refreshAxios.post('/email-link', email).then(success).catch(fail);
}

async function setUserProfile(param, success, fail){
  await local.post('/signup', param).then(success).catch(fail);
}



  export {
    saveAccessLocalStorage,
    logout,
    getEmailLink,
    setUserProfile,
  }