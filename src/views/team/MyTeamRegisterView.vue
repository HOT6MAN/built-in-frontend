<script setup>
import MemberSidebar from '@/components/member/MemberSidebar.vue';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore } from '@/stores/teamStore';
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';
import { sweetAlert } from '../../api/sweetAlert';

const teamStore = useTeamStore()
const {createTeam} = teamStore
const authStore = useAuthStore()
const {userId} = storeToRefs(authStore)

const route = useRoute();

const memberId = ref(userId)

const team = ref({
    name:'',
    content:'',
    memberId: memberId
})

function create(){
    if(team.value.name!='' && team.value.content!=''&& team.value.memberId!=''){
        createTeam(team.value)
    }else if(team.value.name==''){
        sweetAlert('','팀 이름을 입력해주세요')
    }else if(team.value.content==''){
        sweetAlert('','팀 소개를 입력해주세요')
    }
}


</script>

<template>
    <div class="container">
        <MemberSidebar class="sidebar" />
        <div class="pxp-dashboard-content-details mb-5">
            <div class="fYreJO">
                <h2 class="mb-3 fw-bold">새 팀 등록</h2>
    
                <div class="contents">
                    <div class="jlNcEk">
                        <div class="sc-crHmcD fLCeMm">
                            <label for="teamName">팀 이름</label>
                            <div class="group">
                                <div class="input-wrapper">
                                    <input id="teamName" name="displayName" v-model="team.name" placeholder="팀이름을 입력하세요" size="20">
                                </div>
                                <div class="width-maker">팀 이름을 입력하세요</div>
                            </div>
                        </div>
                    </div>
        
                    <div class="jlNcEk">
                        <div class="sc-crHmcD fLCeMm">
                            <label for="teamContent">팀 소개</label>
                            <div class="group">
                                <div class="input-wrapper">
                                    <input id="teamContent" name="displayName"  v-model="team.content" placeholder="간단한 팀소개를 해주세요" size="20">
                                </div>
                                <div class="width-maker">간단한 팀 소개를 입력하세요</div>
                            </div>
                        </div>
                    </div>
                 
        
                    <div class="button-group">
                    <button class="fLtQtN" color="teal" @click="create">생성</button>
                    <button class="cOBVPj"><router-link :to="{name:'myteam'}"
                        style="text-decoration: none; color: black">취소</router-link></button>
                </div>
        
                </div>
        
             
        
        
            </div>

        </div>

    </div>
</template>

<style scoped>
.mb-3 {
    margin-bottom: 1rem !important;
}
.fw-bold {
    font-weight: 700 !important;
}
.pxp-dashboard-content-details h2 {
    /* font-size: 24px; */
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 30px;
    letter-spacing: -1px;
    
}

.pxp-dashboard-content-details {
    background-color: #fff;
    border-radius: 30px;
    margin-right: 30px;
    background-color: transparent;
    border: 1px solid #dedede;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.05); 
    padding: 60px; 
    padding: 30px;
    min-height: calc(100vh - 184px);
    width: 100%;
}
.mb-5 {
    margin-bottom: 3rem !important;
}



.container {
    display: flex;
    padding-top: 75px;
    padding-left: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    height: 100%; /* 컨테이너의 높이를 100%로 설정 */
    margin-left: 220px;
    width: 80%;
  }

/* margin-top을 줘 네비게이션 바가 하단 요소를 잡아먹지 않도록 합니다. */
.signUp {
    margin-top : 100px;
}

.cOBVPj {
    height: 3rem;
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 1.5rem;
    border: none;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    background: #DEE2E6;
    color: #212529;
    transition: 0.125s ease-in;
    cursor: pointer;
}

.fLtQtN {
    height: 3rem;
    font-size: 1.5rem;
    padding-left: 2rem;
    padding-right: 2rem;
    border-radius: 1.5rem;
    border: none;
    outline: none;
    font-weight: bold;
    word-break: keep-all;
    background: #12B886;
    color: #FFFFFF;
    transition: 0.125s ease-in;
    cursor: pointer;
}


/* 제목이 왼쪽 상단에 위치하도록 설정 */
.fYreJO {
    width: 100%;
    height: 100%;
    margin: 0 auto;/* 중앙 정렬과 상단 마진 설정 */
    padding: 20px; /* 전체 콘텐츠의 여백 설정 */
    position: relative; /* 제목과 경계선의 위치 조정을 위한 설정 */
    background-color: #fff; /* 배경 색상 설정 */
    border-radius: 10px; /* 배경의 둥근 모서리 설정 */
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 그림자 추가 */
    display: flex;
    flex-direction: column; /* 자식 요소들을 수직 방향으로 배치 */
    gap: 20px; /* 제목과 다른 요소들 간의 간격 설정 */
}

/* 제목 스타일링 */
.fYreJO h2 {
    margin: 0; /* 제목의 마진 제거 */
    font-size: 24px; /* 제목의 글꼴 크기 설정 */
    font-weight: 600; /* 제목의 글꼴 두께 설정 */
    color: #000; /* 제목의 글꼴 색상 설정 */
    border-bottom: 2px solid #DEE2E6; /* 제목 아래 경계선 설정 */
    padding-bottom: 10px; /* 제목과 경계선 사이의 간격 설정 */
    text-align: left; /* 제목을 왼쪽으로 정렬 */
}



.fLCeMm .input-wrapper {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #DEE2E6;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
}

.fLCeMm .width-maker {
    max-width: 100%;
    display: inline-block;
    visibility: hidden;
    font-size: 1.5rem;
    overflow: hidden;
    line-height: 0;
}

.group {
    display: inline-block;
    max-width: 100%;
}

.jINcEk {
    display: flex; /* jlNcEk 요소들을 flexbox로 설정 */
    flex-direction: column;
    gap: 15px; /* jlNcEk 내 요소 간의 간격 설정 */
    width: 100%; /* 전체 너비 사용 */
    max-width: 600px; /* 최대 너비 설정 */
}

.fLCeMm {
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 세로 중앙 정렬 */
    gap: 10px; /* label과 input 간의 간격 설정 */
    width: 100%; /* 전체 너비 사용 */
    
}

.fLCeMm label {
    font-weight: bold;
    font-size: 1.500rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 120px; /* label의 고정 너비 설정 */
    
}

.fLCeMm label, .fLCeMm input {
    display: block;
    line-height: 1.5;
}

.fLCeMm input {
    background: transparent;
    font-size: 1.5rem;
    border: none;
    outline: none;
    outline-color: initial;
    outline-style: none;
    outline-width: initial;
    width: 100%;
    color: var(--text2);
    transition: 0.125s ease-in;
}

/* contents 설정 */
.contents {
    flex: 1; /* contents 영역이 가능한 모든 공간을 차지하도록 설정 */
    display: flex;
    flex-direction: column;
    gap: 50px; /* jlNcEk 요소 간의 간격 설정 */
   
}
.button-group {
    display: flex; /* 버튼들을 수평으로 배치 */
    gap: 20px; /* 버튼 간의 간격 설정 */
    justify-content: center; /* 버튼을 수평 중앙에 배치 */
}


</style>