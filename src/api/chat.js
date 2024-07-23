import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function findAllRoomByUserId(userId, success, fail){
    await local.get("/chat/list/"+userId).then(success).catch(fail);
}
async function findAllMessageByChatroomId(chatroomId, success, fail){
    await local.get("/chat/room/"+chatroomId).then(success).catch(fail);
}

async function sendMessage(chatMessage, success, fail){
    await local.post("/chat/room/"+chatMessage.chatroomId).then(success).catch(fail);
}

async function createRoom(userAId, userBId, success, fail) {
    const data = {
        userAId: userAId,
        userBId: userBId
    };
    await local.post("/chat/room", data).then(success).catch(fail);
}

export {findAllRoomByUserId,findAllMessageByChatroomId, sendMessage, createRoom};