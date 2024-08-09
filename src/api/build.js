// localAxios는 http-commons로부터 axios를 받아오는 것
// # VITE_VUE_API_URL=http://localhost:8080
// VITE_VUE_API_URL=http://i11a606.p.ssafy.io:8080/hot6man

import { localAxios } from '@/util/http-commons'
import api from '@/util/axios-common'
const local = localAxios()

export function sendBuildConfigForm(formData, success, fail) {
    api.post('/project/config', formData, {headers: {'Content-Type': 'application/json'}})
    .then(success)
    .catch(fail);
}


export const testObject = {
  "process": {
      "statusCode": 200,
      "message": "정상적인 응답을 반환하였습니다"
  },
  "data": {
      "totalCount": 2,
      "buildResults": [
          {
              "buildId": 1,
              "teamProjectInfoId": 1,
              "deployNum": 82,
              "status": "SUCCESS",
              "buildTime": "2024-08-06T09:13:10",
              "buildStages": [
                  {
                      "stageId": 1,
                      "name": "Declarative: Tool Install",
                      "status": "SUCCESS",
                      "duration": 2296,
                      "buildLogs": [
                          {
                              "id": 1,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 2,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 3,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 4,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 5,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 6,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 2,
                      "name": "Check Parameters",
                      "status": "SUCCESS",
                      "duration": 2787,
                      "buildLogs": [
                          {
                              "id": 7,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 8,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 9,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 10,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 11,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 12,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 13,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 14,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 15,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 16,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 17,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 18,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 19,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 20,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 21,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 22,
                              "title": "Print Message",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 3,
                      "name": "Git Clone (BE)",
                      "status": "SUCCESS",
                      "duration": 3764,
                      "buildLogs": [
                          {
                              "id": 23,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 24,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 25,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 26,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 27,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 28,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 29,
                              "title": "Shell Script",
                              "description": null
                          },
                          {
                              "id": 30,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 4,
                      "name": "Build with Gradle",
                      "status": "SUCCESS",
                      "duration": 19775,
                      "buildLogs": [
                          {
                              "id": 31,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 32,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 33,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 34,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 35,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 36,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 37,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 5,
                      "name": "Create Dockerfile",
                      "status": "SUCCESS",
                      "duration": 2832,
                      "buildLogs": [
                          {
                              "id": 38,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 39,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 40,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 41,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 42,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 43,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 44,
                              "title": "Write file to workspace",
                              "description": null
                          },
                          {
                              "id": 45,
                              "title": "Print Message",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 6,
                      "name": "Docker Hub Push (BE)",
                      "status": "SUCCESS",
                      "duration": 32209,
                      "buildLogs": [
                          {
                              "id": 46,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 47,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 48,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 49,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 50,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 51,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 52,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 7,
                      "name": "Run Deploy Setup Script",
                      "status": "SUCCESS",
                      "duration": 3484,
                      "buildLogs": [
                          {
                              "id": 53,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 54,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 55,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 56,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 57,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 58,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 59,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 8,
                      "name": "Run Deploy Setup Backend Script",
                      "status": "SUCCESS",
                      "duration": 3160,
                      "buildLogs": [
                          {
                              "id": 60,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 61,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 62,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 63,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 64,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 65,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 66,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 9,
                      "name": "Add Config of Vector to Save Log",
                      "status": "SUCCESS",
                      "duration": 3361,
                      "buildLogs": [
                          {
                              "id": 67,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 68,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 69,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 70,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 71,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 72,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 73,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  }
              ]
          },
          {
              "buildId": 2,
              "teamProjectInfoId": 1,
              "deployNum": 1,
              "status": "SUCCESS",
              "buildTime": "2024-08-06T13:06:11",
              "buildStages": [
                  {
                      "stageId": 10,
                      "name": "Declarative: Tool Install",
                      "status": "FAILED",
                      "duration": 2296,
                      "buildLogs": [
                          {
                              "id": 74,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 75,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 76,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 77,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 78,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 79,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 11,
                      "name": "Check Parameters",
                      "status": "SUCCESS",
                      "duration": 2787,
                      "buildLogs": [
                          {
                              "id": 80,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 81,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 82,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 83,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 84,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 85,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 86,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 87,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 88,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 89,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 90,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 91,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 92,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 93,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 94,
                              "title": "Print Message",
                              "description": null
                          },
                          {
                              "id": 95,
                              "title": "Print Message",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 12,
                      "name": "Git Clone (BE)",
                      "status": "SUCCESS",
                      "duration": 3764,
                      "buildLogs": [
                          {
                              "id": 96,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 97,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 98,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 99,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 100,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 101,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 102,
                              "title": "Shell Script",
                              "description": null
                          },
                          {
                              "id": 103,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 13,
                      "name": "Build with Gradle",
                      "status": "SUCCESS",
                      "duration": 19775,
                      "buildLogs": [
                          {
                              "id": 104,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 105,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 106,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 107,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 108,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 109,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 110,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 14,
                      "name": "Create Dockerfile",
                      "status": "SUCCESS",
                      "duration": 2832,
                      "buildLogs": [
                          {
                              "id": 111,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 112,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 113,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 114,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 115,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 116,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 117,
                              "title": "Write file to workspace",
                              "description": null
                          },
                          {
                              "id": 118,
                              "title": "Print Message",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 15,
                      "name": "Docker Hub Push (BE)",
                      "status": "SUCCESS",
                      "duration": 32209,
                      "buildLogs": [
                          {
                              "id": 119,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 120,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 121,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 122,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 123,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 124,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 125,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 16,
                      "name": "Run Deploy Setup Script",
                      "status": "SUCCESS",
                      "duration": 3484,
                      "buildLogs": [
                          {
                              "id": 126,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 127,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 128,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 129,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 130,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 131,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 132,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 17,
                      "name": "Run Deploy Setup Backend Script",
                      "status": "SUCCESS",
                      "duration": 3160,
                      "buildLogs": [
                          {
                              "id": 133,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 134,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 135,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 136,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 137,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 138,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 139,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  },
                  {
                      "stageId": 18,
                      "name": "Add Config of Vector to Save Log",
                      "status": "SUCCESS",
                      "duration": 3361,
                      "buildLogs": [
                          {
                              "id": 140,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 141,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 142,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 143,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 144,
                              "title": "Use a tool from a predefined Tool Installation",
                              "description": null
                          },
                          {
                              "id": 145,
                              "title": "Fetches the environment variables for a given tool in a list of 'FOO=bar' strings suitable for the withEnv step.",
                              "description": null
                          },
                          {
                              "id": 146,
                              "title": "Shell Script",
                              "description": null
                          }
                      ]
                  }
              ]
          }
      ]
  }
}

export function receiveBuildResult(success, fail) {
  local.get('/build/deploy/result/team_project_info/{teamProjectInfoId}').then(success).catch({'fail' : fail});
}


// export function receiveBuildResult(success, fail) {
//   local.get('/team/{teamid}/lastBuild').then(success).catch(fail);
// }