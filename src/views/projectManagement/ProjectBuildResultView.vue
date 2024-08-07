<template>
  <!-- <SideBarView /> -->
	<b-container class="buildResultContainer">
		<b-form-group class="dropdownBox">
            <b-row><b-col sm="1">세팅 설정</b-col>
            <b-col sm="3">
            <b-form-select
              id="input-3"
              required>
            </b-form-select>
            </b-col>
            </b-row>
          </b-form-group>		 
			<div class="boxContainer">
			 <div class="menuboxWrapper">
				 <div class="menuBoxBlank"><p>전체 빌드 횟수 : {{response.totalCount}}</p></div>
				 <div v-for="menu in menuBuilds" :key="menu">
				 	<div class="menuBox"><p>{{ menu.name }}</p></div>
				</div>
				</div>
				<div v-for= "build in pageBuilds.slice().reverse()" :key="build" class="boxWrapper">
					<div class="buildRow">
						<p class="dateCss">{{formatDate(build.buildTime).year}}.{{formatDate(build.buildTime).month}}.{{ formatDate(build.buildTime).day }} {{ formatDate(build.buildTime).hour }}:{{ formatDate(build.buildTime).minute }}:{{formatDate(build.buildTime).second}}</p>
						<p>현재 빌드 : {{ build.buildId }}</p>
					</div>
							<!-- v-if를 이용해 만약 success면 success 버튼으로, fail이라면 fail 버튼을 보여줌 -->
					<div v-for="(buildStage, index) in build.buildStages" :key="index">
						<div v-if="`${buildStage.status}`==='SUCCESS'"><b-button @click="toggleModal(build.buildId, index)" class="boxSuccess">{{buildStage.duration}}ms</b-button>
							<b-modal 
							:id="`modal-${build.buildId}-${index}`"
							v-model="modalShow[`${build.buildId}-${index}`]"
							hide-backdrop content-class="shadow" 
							title="Stage Logs">
							<div v-for="log in buildStage.buildLogs" :key="log" class="logWrapper">
							<b-button squared v-b-toggle="`${log.id}`" class="logButton">{{log.title}}</b-button>
							<b-collapse :id="`${log.id}`" v-for="logMessage in log.description" :key="logMessage">
								<b-card class="logCard">{{ logMessage }}</b-card>
							</b-collapse>
						</div>
						</b-modal>
					</div>
						<div v-else><b-button @click="toggleModal(build.buildId, index)" class="boxFailed">{{buildStage.duration}}ms</b-button>
							<b-modal 
							:id="`modal-${build.buildId}-${index}`"
							v-model="modalShow[`${build.buildId}-${index}`]"
							hide-backdrop content-class="shadow" 
							title="Stage Logs">
							<div v-for="log in buildStage.buildLogs" :key="log" class="logWrapper">
							<b-button squared v-b-toggle="`${log.id}`" class="logButton">{{log.title}}</b-button>
							<b-collapse :id="`${log.id}`" v-for="logMessage in log.description" :key="logMessage">
								<b-card class="logCard">{{ logMessage }}</b-card>
							</b-collapse>
						</div>
						</b-modal>						
					</div>
					</div>
				</div>
		</div>
				<!-- 페이지네이션 -->
				<div class="d-flex justify-content-center mt-1">
					<b-pagination class="mb-0"
						v-model="currentPage"
						:total-rows="pages"
						:per-page="perPage"
						aria-controls="my-table">
					</b-pagination>
				</div>
	</b-container>
</template>



<script setup>
import { ref, onMounted, computed } from 'vue'
import SideBarView from '@/views/Bars/SideBarView.vue'
import { receiveBuildResult, testObject } from '@/api/build.js'

const response = ref([])
const builds = ref([])
const successOrNot = ref(null)
const menuBuilds = ref(null)

onMounted(() => {
	response.value = testObject.data
	pages.value = response.value.totalCount
	builds.value = response.value.buildResults
	successOrNot.value = response.value
	menuBuilds.value = response.value.buildResults[0].buildStages
	return response, builds, pages, menuBuilds
})

// paginatin 관련
const currentPage = ref(1)
const pages = ref(0)
const perPage = ref(5)
const pageBuilds = computed (() => {
	const pageStart = (pages.value) - ((currentPage.value) * perPage.value)
	const pageEnd = (pages.value) - ((currentPage.value-1) * perPage.value)
	return builds.value.slice(pageStart, pageEnd)
})

// 빌드 시작 시간 나타내는 함수
const formatDate = (dateString) => {
	const date = new Date(dateString)
	return {
		year : date.getUTCFullYear(),
		month: String(date.getUTCMonth()+1).padStart(2, '0'),
		day: String(date.getUTCDate()).padStart(2,'0'),
		hour: String(date.getUTCHours()).padStart(2,'0'),
		minute: String(date.getUTCMinutes()).padStart(2,'0'),
		second: String(date.getUTCSeconds()).padStart(2,'0')
	}
}
// Stage Error 모달 창
const modalShow = ref({})
// buildId와 index는 위의 html에서 가져오는 것.
// 위에서 v-for문으로 해서 생긴 buildId와 index를 아래 가져온 후, toggleModal model을 실행시킨다.
// modalKey는 각 모달의 ID를 판별하기 위해 만든 것. buildId만 있어도 무방하나, 혹시 몰라 index도 추가한 것 같다.
// 따라서 modalShow.value[modalKey]로 각 모달을 구분한다.
// 다만 이렇게 되면 modalShow 변수는 ref(false)로 하면 true인지 아닌지 알 수 없기 때문에, toogleModal = !toggleModal로 click 시마다
// true와 false를 왔다갔다 하는 것이 아니라 toggleModal(buildId, index)로 해서 함수에 매개변수 값을 내려보내줘야 한다.
const toggleModal = (buildId, index) => {
	const modalKey = `${buildId}-${index}`
	modalShow.value[modalKey] = !modalShow.value[modalKey]
}
// 로그 관련 모달 창
const openIndex = ref(null);
const toggleLog = (index) => {
	openIndex.value = openIndex.value === index? null: index;
}
const isLogOpen = (index) => openIndex.value === index
</script>

<style scoped>
.boxSuccess {
	position: relative;
  width: 110px;
  height : 90px;
  color: green;
  border: 2px solid white;
	background-color: #c3e7cb;
  margin : 3px;
  background-size: 100%;
}
.boxFailed {
  width: 150px;
  /* width : calc(10vw * 3.3); */
  height : 120px;
  color: #EC221F;
  background-size: 100%;
	background-color: #f2dede;
  border: 2px solid white;
  margin : 3px;
}

.buildResultContainer {
  position: absolute;
  top : 100px;
  left: 220px;
  height: calc(100% - 80px);
  width: calc(100% - 220px);
	font: var(--font-roboto);
	z-index: 1;
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
	border-radius: 3%;
	padding: 6px 12px;
	font-weight: 400;
	font-size: 15px;
}
.menuBox p {
	margin: 0px;
}
/* 메뉴 옆에 빈 공백 영역 */
.menuBoxBlank {
	display: flex;
	align-items: center;
	position: relative;
	height: 90px;
	width: 150px;
	border: solid black;
	border-width: 0px 0.1px 0px 0px;
	color: black;
	font-weight: 600;
}
.menuBoxBlank p {
	margin: 0px;
}
.boxWrapper {
  display: flex;
  flex-direction: row;
}
.buildCount {
  position: relative;
  height: 90px;
  width: 150px;
  border: solid black;
  border-width: 0px 0.1px 0px 0px;
	color: black;
}
.buildRow p {
	margin: 2px;
}
img {
	position: relative;
}
/* 로그모달 관련 */
.logWrapper {
	margin-bottom: 3px;	
}
.logButton {
	width: 100%;
	font-family: var(--font-roboto);
	text-align: left;
}
.logCard {
	margin-top: 0px;
	border-radius: 0%;
}
/* 페이지네이션 */
</style>