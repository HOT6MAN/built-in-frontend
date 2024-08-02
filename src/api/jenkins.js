import { localAxios } from "@/util/http-commons";

const local = localAxios();

async function createJenkinsJob(){
    await local.get("/jenkins/createjob");
}

async function updateJenkinsJob(){
    await local.get("/jenkins/updatejob");
}

async function createJenkinsCredential(){
    await local.get("/jenkins/createCredential");
}

async function jenkinsTest(){
    await local.get("/build/test");
}

async function deployTest(){
    await local.get("/build/deploy/1/1");
}

async function find400Log(){
    await local.get("/log/1");
}

export{createJenkinsJob, updateJenkinsJob,createJenkinsCredential,jenkinsTest, deployTest, find400Log};