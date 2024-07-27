import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function send(notiObject, success, fail){
    await local.post("/notify/"+notiObject.receiver, notiObject).then(success).catch(fail);
}

async function findAllUnreadNotificationByUserId(userId, success, fail){
    await local.get("/notify/"+userId).then(success).catch(fail);
}

export {send, findAllUnreadNotificationByUserId}; 