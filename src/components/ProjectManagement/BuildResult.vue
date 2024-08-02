<template>
  <div>

  </div>
</template>

<script setup>
import { receiveBuildResult } from '@/api/build.js'

console.log(receiveBuildResult)

const testObject = {
	"process": {
        "statusCode": 200,
        "message": "정상적인 응답을 반환하였습니다"
    },
    "data": {
        "totalCount" : 19,
        "buildResults" : [
	        {
		        "buildId" : 19,
		        "buildTime": "2024-07-30T12:34:56Z",
		        "buildStage": [
		          {
				        "name": "Declarative: Tool Install",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String"
				        "duration": 122
			        },
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 1 completed successfully.\nAll tests passed.\nNo issues found."
				        "duration": 3000
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String"
				        "duration": 5
			        },
		        ]
	        },
	        {
		        "buildId" : 19,
		        "buildTime": "2024-07-30T12:34:56Z",
		        "buildStage": [
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 1 completed successfully.\nAll tests passed.\nNo issues found."
				        "duration": 32
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String"
				        "duration": 12
			        }
		        ]
	        },
        ]
    }
}
</script>

<style scoped>

</style>