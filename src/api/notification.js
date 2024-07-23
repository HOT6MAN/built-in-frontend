import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function send(notiObject, success, fail){
    await local.post("/notify/"+notiObject.receiver, notiObject).then(success).catch(fail);
}



export {send};