import { localAxios } from "@/util/http-commons";
import api from '@/util/axios-common.js';
const local = localAxios();

async function findMemberProfileByMemberId(userId, success, fail){
    await api.get("/member/"+userId).then(success).catch(fail);
}

async function findMemberProfileImageByMemberId(userId, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    console.log('Current headers:', local.defaults.headers);
    console.log('Authorization header:', local.defaults.headers.Authorization);

    await api.get(`/member/image/${userId}`, { 
        responseType: 'blob',
    }).then(success).catch(fail);
}

async function deleteMemberByMemberId(userId, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    await api.delete("/member/"+userId).then(success).catch(fail);
}

async function updateMemberProfileByMemberId(memberObject, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    await local.put("/member/"+memberObject.id, memberObject).then(success).catch(fail);
}

async function updateMemberProfileImageByMemberId(formData, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    console.log("/member/image/"+formData.get("memberId"));
    await local.put("/member/image/"+formData.get("memberId"), formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    }).then(success).catch(fail);
}

export {findMemberProfileByMemberId,
     deleteMemberByMemberId,
      updateMemberProfileByMemberId,
      updateMemberProfileImageByMemberId,
      findMemberProfileImageByMemberId};