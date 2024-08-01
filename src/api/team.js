import api from "../util/axios-common";

async function setTeam(param, success, fail){
    await api.post('/teams', param).then(success).catch(fail);
}




export{
    setTeam

}