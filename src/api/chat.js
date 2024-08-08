import { localAxios } from "@/util/http-commons";
import api from '@/util/axios-common.js';

const local = localAxios();

async function findAllRoomByUserId(userId, success, fail){
    console.log('Current headers before request:', api.defaults.headers);
    console.log('Authorization header before request:', api.defaults.headers.Authorization);
    
    await api.get("/chat/list/"+userId, {
        beforeSend: (request) => {
            console.log('Final request headers:', request.headers);
            console.log('Final Authorization header:', request.headers.Authorization);
        }
    }).then(success).catch(fail);
}
async function findAllMessageByChatroomId(chatroomId, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    console.log('Current headers:', local.defaults.headers);
    console.log('Authorization header:', local.defaults.headers.Authorization);
    await local.get("/chat/room/"+chatroomId).then(success).catch(fail);
}

async function findReceiver(chatroomId, userId, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    console.log('Current headers:', local.defaults.headers);
    console.log('Authorization header:', local.defaults.headers.Authorization);
    await local.get("/chat/receiver/"+chatroomId+"/"+userId).then(success).catch(fail);
}

async function sendMessage(chatMessage, success, fail){
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    console.log('Current headers:', local.defaults.headers);
    console.log('Authorization header:', local.defaults.headers.Authorization);
    await local.post("/chat/room/"+chatMessage.chatroomId).then(success).catch(fail);
}


async function createRoom(userAId, userBId, success, fail) {
    local.defaults.headers["Authorization"] = localStorage.getItem("access_token");
    console.log('Current headers:', local.defaults.headers);
    console.log('Authorization header:', local.defaults.headers.Authorization);
    const data = {
        userAId: userAId,
        userBId: userBId
    };
    await local.post("/chat/room", data).then(success).catch(fail);
}



export {findAllRoomByUserId,findAllMessageByChatroomId, sendMessage, createRoom, findReceiver};