import { localAxios } from "@/util/http-commons";

const local = localAxios()

export function findRecruitList(params, successCB, failCB) {
    local.get("/teambuilding/recruits", {params}).then(successCB).catch(failCB);
}