import { localAxios } from "@/util/http-commons";
import api from '@/util/axios-common.js';

const local = localAxios();

async function findAllRoomByUserId(userId, success, fail){    
    await api.get("/chat/list/"+userId).then(success).catch(fail);
}
async function findAllMessageByChatroomId(chatroomId, success, fail){
    await api.get("/chat/room/"+chatroomId).then(success).catch(fail);
}

async function findReceiver(chatroomId, userId, success, fail){
    await api.get("/chat/receiver/"+chatroomId+"/"+userId).then(success).catch(fail);
}

async function sendMessage(chatMessage, success, fail){
    await api.post("/chat/room/"+chatMessage.chatroomId).then(success).catch(fail);
}


async function createRoom(userAId, userBId, success, fail) {
    const data = {
        userAId: userAId,
        userBId: userBId
    };
    await api.post("/chat/room", data).then(success).catch(fail);
}

async function createRoomByTeamId(boardId, userId, success, fail){
    await api.post("/chat/room/"+boardId, JSON.stringify(userId)).then(success).catch(fail);
}



export {findAllRoomByUserId,findAllMessageByChatroomId, sendMessage, createRoom, findReceiver, createRoomByTeamId};