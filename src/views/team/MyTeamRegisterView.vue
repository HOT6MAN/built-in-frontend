<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore } from '@/stores/teamStore';
import { useAuthStore } from '../../stores/authStore';


const teamStore = useTeamStore()
const {createTeam} = teamStore
const authStore = useAuthStore()
const {getUserId} = authStore

const route = useRoute();

const memberId = ref(getUserId(localStorage.getItem('access_token')))

const team = ref({
    name:'',
    content:'',
    memberId: memberId
})

function create(){
    if(team.value.name!='' && team.value.content!=''&& team.value.memberId!=''){
        createTeam(team.value)
    }else if(team.value.name==''){
        alert("팀 이름을 입력해주세요")
    }else if(team.value.content==''){
        alert("팀 소개를 입력해주세요")
    }
}


</script>

<template>
    <div class="fYreJO">
        <h1>팀 생성</h1>
        <div class="contents">
            <div class="jlNcEk">
                <div class="sc-crHmcD fLCeMm">
                    <label>팀 이름</label>
                    <div class="group">
                        <div class="input-wrapper">
                            <input name="displayName" v-model="team.name" placeholder="팀이름을 입력하세요" size="20">
                        </div>
                        <div class="width-maker">팀 이름을 입력하세요</div>
                    </div>
                </div>
            </div>

            <div class="jlNcEk">
                <div class="sc-crHmcD fLCeMm">
                    <label>팀 소개</label>
                    <div class="group">
                        <div class="input-wrapper">
                            <input name="displayName"  v-model="team.content" placeholder="팀소개를 해주세요" size="20">
                        </div>
                        <div class="width-maker">팀 소개를 입력하세요</div>
                    </div>
                </div>
            </div>
         

            <button class="fLtQtN" color="teal" @click="create">생성</button>
            <button class="cOBVPj"><router-link :to="{name:'myteam'}">취소</router-link></button>

        </div>

     


    </div>
</template>

<style scoped>
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


.fYreJO {
    width: 768px;
    margin: 100px auto 0px;
    line-height: 1.5;
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
    margin-top: 3rem;
    margin-bottom: 3rem;
}

.fLCeMm label {
    font-weight: bold;
    font-size: 1.125rem;
    color: var(--text1);
    margin-bottom: 1rem;
    transition: 0.125s ease-in;
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



</style>