<script setup>
import { onMounted,ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore } from '@/stores/teamStore';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import TeamMemberCard from '@/components/team/TeamMemberCard.vue'
import WebRtc from '@/components/team/WebRtc.vue';
import MemberSidebar from '@/components/member/MemberSidebar.vue';
import { sweetConfirm } from '../../api/sweetAlert';
import TeamSelectDropdown from '../../components/team/TeamSelectDropdown.vue';

const cuurentRoute = useRoute()
const teamId = ref(cuurentRoute.params.teamId)

const authStore = useAuthStore()
const {userId} = storeToRefs(authStore)

const teamStore = useTeamStore()
const {getTeam: team, getTeams: teams} = storeToRefs(teamStore)
const { fetchOneTeamsForUser, updateJiraUrl, updateGitUrl, updateStatus, deleteTeam } = teamStore

const editingJiraUrl = ref(false);
const editingGitUrl = ref(false);

const newJiraUrl = ref('');
const newGitUrl = ref('');

const showDelete = ref(false)

onMounted( async ()=> {
    if (teamId.value) { // teamId가 존재할 경우에만 호출
        await fetchTeamInfo(teamId.value);
    } else {
        console.error("팀 ID가 존재하지 않습니다.");
    }
  
    initializeUrls()

    for (let i = 0; i < team.value.memberTeams.length; i++) {
        const element =  team.value.memberTeams[i];

        if(element.leader && element.member.id==userId.value ){
            showDelete.value = true
        }
        
    }

})

const fetchTeamInfo = async(teamId) =>{
    await fetchOneTeamsForUser(teamId)
}

const initializeUrls = () => {
    newJiraUrl.value = team.value.jiraUrl || '';
    newGitUrl.value = team.value.gitUrl || '';
    editingJiraUrl.value = !team.value.jiraUrl; // 비어있으면 수정 모드로 설정
    editingGitUrl.value = !team.value.gitUrl; // 비어있으면 수정 모드로 설정
};

const toggleEditJiraUrl = () => {
    if (editingJiraUrl.value) {
        const newteam ={
            id:teamId.value,
            jiraUrl:newJiraUrl.value
        }
        updateJiraUrl(newteam)
    }
    editingJiraUrl.value = !editingJiraUrl.value;
};

const toggleEditGitUrl = () => {
    if (editingGitUrl.value) {
        const newteam ={
            id:teamId.value,
            gitUrl:newGitUrl.value
        }
        updateGitUrl(newteam)
    }
    editingGitUrl.value = !editingGitUrl.value;
};

const changeStatus = async () =>{
    await updateStatus({id:teamId.value})

}

const clickDelete = () =>{
    sweetConfirm('','정말 팀을 삭제하시겠습니까?',
        (result) =>{
            if (result.isConfirmed) {
                deleteTeam(team.value.id)
            } 
        }
    )
}

watch(() => cuurentRoute.params.teamId, async (newTeamId) => {
  teamId.value = newTeamId;
  await fetchTeamInfo(newTeamId);
  initializeUrls();
});

</script>

<template>
    <div class="container">
        <MemberSidebar class="sidebar" />
        <div class="team-info">
            <div class="team-header">
                <div class="sc-crHmcD fLCeMm">
                    <TeamSelectDropdown/>
                    <label class="link-label">팀 이름 :</label>
                    <h2 class="fw-bold ">{{ team.name }}</h2>
                </div>
                <div class="sc-crHmcD fLCeMm ">
                    <label class="link-label">팀 소개 :</label>
                    <p >{{ team.content }}</p>
                </div>
               
                    
                <div class="team-links ">
                    <div class="link-row">
                        <div class="link-group">
                            <label class="link-label">Jira URL :</label>
                            <input
                                type="text"
                                v-model="newJiraUrl"
                                :disabled="!editingJiraUrl"
                                class="link-input"
                                placeholder="Jira URL을 등록해주세요"
                            />
                            <button @click="toggleEditJiraUrl" class="link-button">
                                {{ editingJiraUrl ? '저장' : '수정' }}
                            </button>
                        </div>
                        <div class="link-group">
                            <label class="link-label">Git URL :</label>
                            <input
                                type="text"
                                v-model="newGitUrl"
                                :disabled="!editingGitUrl"
                                class="link-input"
                                placeholder="Git URL을 등록해주세요"
                            />
                            <button @click="toggleEditGitUrl" class="link-button">
                                {{ editingGitUrl ? '저장' : '수정' }}
                            </button>
                        </div>
                    </div>

                    <div class="status-group">
                        <label class="status-label">Status:</label>
                        <p class="status-text" v-if="team.status==='RECRUIT'">
                            <span class="badge badge-recruit" @click="changeStatus">모집중</span>
                        </p>
                        <p class="status-text" v-else>
                            <span class="badge badge-finish" @click="changeStatus">모집완료</span>
                        </p>
                    </div>
                </div>   
                    
                

            </div>
            <div class="team-details">
                <div class="team-members">
                    <div v-for="(item, index) in team.memberTeams" :key="index">
                        <TeamMemberCard :member="item"/>
                    </div>
                </div>
                <div v-if="showDelete" class="delete-button">
                    <button class="link-button" @click="clickDelete">팀 삭제</button>
                </div>
                
                <div class="web-rtc">
                    <WebRtc/>
                </div>
      
            </div>
        </div>
    </div>
</template>

<style scoped>

.delete-button {
    position: absolute; /* 절대 위치로 설정 */
    bottom: 10px; /* 아래쪽에서 10px 떨어진 위치 */
    left: 10px; /* 왼쪽에서 10px 떨어진 위치 */
    
}

.fLCeMm {
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 세로 중앙 정렬 */
    gap: 30px; /* label과 input 간의 간격 설정 */
    width: 100%; /* 전체 너비 사용 */
    
}

.fLCeMm label {
    font-weight: bold;
    font-size: 1.050rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 120px; /* label의 고정 너비 설정 */
    
}

.badge-recruit {
    background-color: green; /* Leader 배경 색상 */
    color: #fff; /* Leader 텍스트 색상 */
    padding: 5px 10px;
    border-radius: 12px; /* 배지 둥근 모서리 */
    font-size: 0.875rem; /* 배지 폰트 크기 */
    font-weight: 600; /* 배지 폰트 두께 */
    cursor: pointer;
}
.badge-recruit:hover {
    background-color: #033d07;
}

.badge-finish {
    background-color: red; /* Leader 배경 색상 */
    color: #fff; /* Leader 텍스트 색상 */
    padding: 5px 10px;
    border-radius: 12px; /* 배지 둥근 모서리 */
    font-size: 0.875rem; /* 배지 폰트 크기 */
    font-weight: 600; /* 배지 폰트 두께 */
    cursor: pointer;
}
.badge-finish:hover {
    background-color: #960606;
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


.team-header {
    border-bottom: 2px solid #DEE2E6; /* 팀 이름 아래에 파란색 경계선 추가 */
    padding-bottom: 10px;
    display: flex; /* jlNcEk 요소들을 flexbox로 설정 */
    flex-direction: column;
    gap: 15px; /* jlNcEk 내 요소 간의 간격 설정 */
}

.team-name {
    font-size: 2rem; /* 팀 이름 크기 설정 */
    font-weight: bold; /* 팀 이름을 볼드체로 설정 */
    color: #333; /* 팀 이름 색상 설정 */
    margin: 0;
}

.team-description {
    font-size: 1.2rem; /* 팀 소개 크기 설정 */
    color: #555; /* 팀 소개 색상 설정 */
    margin: 10px 0; /* 팀 소개 위아래에 여백 추가 */
    line-height: 1.6; /* 팀 소개 줄 간격 설정 */
    border-left: 4px solid #007BFF; /* 왼쪽에 파란색 경계선 추가 */
    padding-left: 10px; /* 경계선과 텍스트 간격 추가 */
}


.team-info {
    flex: 1; /* 팀 정보가 남은 공간을 차지하도록 설정 */
    display: flex;
    flex-direction: column;
    gap: 20px; /* 팀 이름과 소개, 상세 정보 사이에 여백을 추가했습니다 */
    margin-top: 15px;
}

h1 {
    font-size: 2rem;
    color: #333; /* 제목 색상을 설정했습니다 */
    margin: 0;
}

p {
    font-size: 1.1rem;
    color: #666; /* 소개 글 색상을 설정했습니다 */
    margin: 0;
    line-height: 1.6; /* 소개 글의 줄 간격을 설정했습니다 */
}

button{
    margin:-3px
}

.team-links {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.link-row {
    display: flex;
    gap: 15px; /* 간격 줄이기 */
}

.link-group {
    display: flex;
    align-items: center;
    gap: 5px; /* label과 input 사이 간격 줄이기 */
    flex: 1;
}

.link-label {
    font-weight: bold;
    margin-right: -30px; /* label과 input 사이의 간격 조정 */
    width: 100px; /* label의 고정 폭 */
}

.link-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
    margin-left: 25px;
}

.link-input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

.link-button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #12B886;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
    
}

.link-button:hover {
    background-color: #0f926b;;
}

.status-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-label {
    font-weight: bold;
}

.status-text {
    font-size: 1.1rem;
    color: #333;
}


.team-details {
    display: flex;
    justify-content: space-between;
    gap: 20px; /* 팀 구성원과 WebRTC 사이에 여백을 추가했습니다 */
    position: relative; /* 버튼의 절대 위치를 기준으로 설정 */
}

.team-members {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 10px; /* 팀 구성원 사이에 여백을 추가했습니다 */
}

/* .team-members > div {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
} */

.web-rtc {
    width: 35%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    height: 500px;
}


</style>