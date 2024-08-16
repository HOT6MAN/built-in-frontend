import { ref } from 'vue';
import { defineStore } from 'pinia';
import {
    findAllProjectInfosByTeamId,
    findUsedProjectInfosByTeamId,
    insertNewProjectInfo,
    saveBackendConfigs,
    saveFrontendConfigs,
    saveDatabaseConfigs,
    buildStart,
    startJenkinsJob
} from '@/api/project.js';
import { sweetAlert } from '../api/sweetAlert';
import { findServiceScheduleById, receiveBuildResult } from '../api/project';

export const useProjectStore = defineStore('project', () => {

    const projectInfos = ref([]);
    const usedProjectInfos = ref([]);
    const deployConfig = ref("");
    const serviceScheduleInfo = ref("");
    const buildResultInfo = ref("");

    const storeBuildResult = async (teamProjectInfoId) => {
        await receiveBuildResult(teamProjectInfoId, (response) => {
            buildResultInfo.value = response.data.data;
            console.log("(Store) buildResultInfo : ", buildResultInfo.value);
        }, (error) => {
            console.log("error = ", error);
        })
    };

    const storeServiceScheduleInfo = async (serviceNum) => {
        await findServiceScheduleById(serviceNum, (response) => {
            console.log("findServiceScheduleById 실행 결과 response : ", response);
            serviceScheduleInfo.value = response.data.data;
            console.log("serviceScheduleInfo : ", serviceScheduleInfo.value);
        }, (error) => {
            console.log("error = ", error);
        })
    };

    const storeFindAllProjectInfosByTeamId = async (teamId) => {
        await findAllProjectInfosByTeamId(teamId, (response) => {

            projectInfos.value = response.data.data;
            console.log("(Store)After Find All Project Infos By Team Id = ", projectInfos.value);
        }, (error) => {
            console.log("error = ", error);
        })
    }

    const storeFindUsedProjectInfosByTeamId = async (teamId) => {
        await findUsedProjectInfosByTeamId(teamId, (response) => {
            console.log("Used response = ", response);
            usedProjectInfos.value = response.data.data;
        }, (error) => {
            console.log(error);
        })
    }

    const storeFindServiceScheduleInfosById = async (serviceNum) => {
        await findUsedProjectInfosByTeamId(teamId, (response) => {
            console.log("Used response = ", response);
            serviceScheduleInfo.value = response.data.data;
        }, (error) => {
            console.log(error);
        })
    }


    const storeInsertNewProjectInfo = async (teamId, title) => {

        await insertNewProjectInfo(teamId, title, (response) => {
            sweetAlert('', 'projectInfo 생성 완료');
            projectInfos.value.push(response.data.data);
        }, (error) => {
            console.log(error);
        });
    };

    const storeSaveBackendConfigs = async (projectInfoId, backendConfigs) => {
        await saveBackendConfigs(projectInfoId, backendConfigs, (response) => {
            sweetAlert('', "Bakcend 설정 저장 완료");
        }, (error) => {
            console.log(error);
        })
    };

    const storeSaveFrontendConfigs = async (projectInfoId, frontendConfigs) => {
        await saveFrontendConfigs(projectInfoId, frontendConfigs, (response) => {
            sweetAlert('', "Frontend 설정 저장 완료");
        }, (error) => {
            console.log(error);
        })
    }

    const storeSaveDatabaseConfigs = async (projectInfos, databaseConfigs) => {
        await saveDatabaseConfigs(projectInfos, databaseConfigs, (response) => {
            sweetAlert('', "DB 설정 저장 완료");
        }, (error) => {
            console.log(error);
        })
    }

    const storeBuildStart = async (teamId, teamProjectInfoId) => {
        await buildStart(teamId, teamProjectInfoId, (response) => {

        }, (error) => {
            console.log(error);
        })
    }

    // const 
    const storeBuildBackendJenkinsJob = () => {
        console.log("storeBuildBackendJenkinsJob 까지는 무사히 옴...");
        const backendConfigs = deployConfig.value.backendConfigs;
        const frontendConfigs = deployConfig.value.frontendConfigs;
        const databaseConfigs = deployConfig.value.databaseConfigs;
        if (backendConfigs.length > 0) {
            startJenkinsJob("backend", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
        else if (frontendConfigs.length > 0) {
            startJenkinsJob("frontend", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
        else if (databaseConfigs.length > 0) {
            startJenkinsJob("database", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
        else {
            startJenkinsJob("final", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
    };

    const storeBuildFrontendJenkinsJob = () => {
        console.log("storeBuildFrontendJenkinsJob 까지는 무사히 옴...");
        const frontendConfigs = deployConfig.value.frontendConfigs;
        const databaseConfigs = deployConfig.value.databaseConfigs;
        if (frontendConfigs.length > 0) {
            startJenkinsJob("frontend", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
        else if (databaseConfigs.length > 0) {
            startJenkinsJob("database", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
        else {
            startJenkinsJob("final", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
    };

    const storeBuildDatabaseJenkinsJob = () => {
        console.log("storeBuildDatabaseJenkinsJob 까지는 무사히 옴...");
        const databaseConfigs = deployConfig.value.databaseConfigs;
        if (databaseConfigs.length > 0) {
            startJenkinsJob("database", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
        else {
            startJenkinsJob("final", deployConfig.value,
                (response) => {
                    console.log(response);
                }, (error) => {
                    console.log(error);
                }
            );
        }
    };

    const storeBuildFinalJenkinsJob = () => {
        console.log("storeBuildFinalJenkinsJob 까지는 무사히 옴...");
        const databaseConfigs = deployConfig.value.databaseConfigs;
        startJenkinsJob("final", deployConfig.value,
            (response) => {
                console.log(response);
            }, (error) => {
                console.log(error);
            }
        );
    }

    

    return {
        serviceScheduleInfo,
        projectInfos,
        usedProjectInfos,
        deployConfig,
        buildResultInfo,
        storeFindAllProjectInfosByTeamId,
        storeServiceScheduleInfo,
        storeFindUsedProjectInfosByTeamId,
        storeInsertNewProjectInfo,
        storeSaveBackendConfigs,
        storeSaveFrontendConfigs,
        storeSaveDatabaseConfigs,
        storeBuildStart,
        storeBuildBackendJenkinsJob,
        storeBuildFrontendJenkinsJob,
        storeBuildDatabaseJenkinsJob,
        storeBuildFinalJenkinsJob,
        storeBuildResult
    };
})