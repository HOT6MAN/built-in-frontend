import { localAxios } from "@/util/http-commons";

const local = localAxios()

export function findRecruitList(successCB, failCB) {
    local.get("/teambuilding/recruits").then(successCB).catch(failCB);
}