<template>
  <SideBarView />
   <b-container class="buildResultContainer">
    <img src="@/icons/제목 없음.png" alt="">
  <div class="boxContainer">
    <div class="menuboxWrapper">
      <div class="buildCount"></div>
      <div class="menuBox"><p>Declarative:Tool Install</p></div>
      <div class="menuBox"><p>jdk 확인</p></div>
      <div class="menuBox"><p>github clone</p></div>
      <div class="menuBox"><p>Add Gradle Plugin</p></div>
      <div class="menuBox"><p>젠킨스빌드</p></div>
      <div class="menuBox"><p>젠킨스빌드</p></div>
      <div class="menuBox"><p>젠킨스빌드</p></div>
    </div>
    <div class="boxWrapper">
      <div class="buildCount">
        <p>8월 1일 10:00</p>
        <p>Count: 5</p></div>
        <!-- v-if를 이용해 만약 success면 success 버튼으로, fail이라면 fail 버튼을 보여줌 -->
         <!-- fail 버튼을 누를 경우 로그로 이동하는 모달 창을 띄워줌 -->
      <b-button class="boxSuccess">Success</b-button>
      <b-button class="boxSuccess">Success</b-button>
      <b-button class="boxFailed">Failed</b-button>
      <b-button class="boxFailed">Failed</b-button>
      <b-button class="boxSuccess">Success</b-button>
      <b-button class="boxSuccess">Success</b-button>
      <b-button class="boxSuccess">Success</b-button>
    </div>
  </div>
    </b-container>
</template>

<style scoped>
.boxSuccess {
  width: 150px;
  /* width : calc(10vw * 3.3); */
  height : 120px;
  color: #34AFF7;
  font-weight: 600;
  border: 2px solid white;
  margin : 3px;
  background-image: url('@/icons/happycat.jpg');
  background-size: 100%;
}
.boxFailed {
  width: 150px;
  /* width : calc(10vw * 3.3); */
  height : 120px;
  color: #EC221F;
  background-image: url('@/icons/sadcat.jpg');
  background-size: 100%;
  border: 2px solid white;
  margin : 3px;
}

.buildResultContainer {
  position: absolute;
  top : 100px;
  left: 220px;
  height: auto;
  width: calc(100vw - 220px);
  background-color: #CBD2E0;
}
.boxContainer {
  display: flex;
  flex-direction: column;
  width: 90%;
  height: 100%;
}
.menuboxWrapper {
  display: flex;
  flex-direction: row;
  border : 1px solid black;
  border-width: 0 0 3px;
}
.menuBox {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: #F7F9FC;
  width: 150px;
  height : 120px;
  margin : 3px;
  border: 1px solid black;
}
.boxWrapper {
  display: flex;
  flex-direction: row;
}
.buildCount {
  position: relative;
  height: 120px;
  width: 200px;
  border: 1px dashed black;
  border-width: 0px 2px 0px 0px;
}
</style>


<script setup>
import SideBarView from '@/views/Bars/SideBarView.vue'

const testObject = {
	"process": {
        "statusCode": 200,
        "message": "정상적인 응답을 반환하였습니다"
    },
    "data": {
        "totalCount" : 5,
        "buildResults" : [
	        {
		        "buildId" : 1,
		        "buildTime": "2024-07-30T12:34:56Z",
		        "buildStage": [
		          {
				        "name": "Declarative: Tool Install",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 122
			        },
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 1 completed successfully.\nAll tests passed.\nNo issues found.",
				        "duration": 3000
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 5
			        }
		        ]
	        },
	        {
		        "buildId" : 2,
		        "buildTime": "2024-07-31T14:22:01Z",
		        "buildStage": [
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 1 completed successfully.\nAll tests passed.\nNo issues found.",
				        "duration": 32
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 12
			        }
		        ]
	        },
	        {
		        "buildId" : 3,
		        "buildTime": "2024-08-01T10:15:47Z",
		        "buildStage": [
			        {
				        "name": "Declarative: Tool Install",
				        "status": "Success",
				        "logs": "All tools installed successfully.",
				        "duration": 95
			        },
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 2 completed successfully.\nNo issues found.",
				        "duration": 145
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: TestCompile failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 22
			        }
		        ]
	        },
	        {
		        "buildId" : 4,
		        "buildTime": "2024-08-02T11:45:33Z",
		        "buildStage": [
			        {
				        "name": "Declarative: Tool Install",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 110
			        },
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 1 completed successfully.\nAll tests passed.\nNo issues found.",
				        "duration": 3020
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: CompileJava failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 15
			        }
		        ]
	        },
	        {
		        "buildId" : 5,
		        "buildTime": "2024-08-03T09:30:12Z",
		        "buildStage": [
			        {
				        "name": "Declarative: Tool Install",
				        "status": "Success",
				        "logs": "All tools installed successfully.",
				        "duration": 100
			        },
			        {
				        "name": "jdk 확인",
				        "status": "Success",
				        "logs": "Stage 2 completed successfully.\nNo issues found.",
				        "duration": 150
			        },
			        {
				        "name": "Add Gradle Plugin",
				        "status": "Failed",
				        "logs": "Task: TestCompile failed: // class com.example.hotsix.dto.common.APIResponse cannot be cast to class java.lang.String",
				        "duration": 20
			        }
		        ]
	        }
        ]
    }
}

console.log(testObject)

</script>
