<script setup>
import { onMounted,ref } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore } from '@/stores/teamStore';
import { storeToRefs } from 'pinia';
import TeamMemberCard from '@/components/team/TeamMemberCard.vue'
import WebRtc from '@/components/team/WebRtc.vue';
import MemberSidebar from '@/components/member/MemberSidebar.vue';

const cuurentRoute = useRoute()
const teamId = ref(cuurentRoute.params.teamId)

const teamStore = useTeamStore()
const {getTeam: team} = storeToRefs(teamStore)
const { fetchOneTeamsForUser} = teamStore

const editingJiraUrl = ref(false);
const editingGitUrl = ref(false);

const newJiraUrl = ref('');
const newGitUrl = ref('');

//const team = ref({})

onMounted( async ()=> {
    if (teamId.value) { // teamId가 존재할 경우에만 호출
        await fetchTeamInfo(teamId.value);
    } else {
        console.error("팀 ID가 존재하지 않습니다.");
    }
    console.log(team.value);

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
        team.value.jiraUrl = newJiraUrl.value;
    }
    editingJiraUrl.value = !editingJiraUrl.value;
};

const toggleEditGitUrl = () => {
    if (editingGitUrl.value) {
        team.value.gitUrl = newGitUrl.value;
    }
    editingGitUrl.value = !editingGitUrl.value;
};
</script>

<template>
    <div class="container">
        <MemberSidebar class="sidebar" />
        <div class="team-info">
            <div class="team-header">
                <h1 class="team-name">{{ team.name }}</h1>
                <p class="team-description">{{ team.content }}</p>

                
                    
                <div class="team-links">
                    <div class="link-row">
                        <div class="link-group">
                            <label class="link-label">Jira URL:</label>
                            <input
                                type="text"
                                v-model="newJiraUrl"
                                :disabled="!editingJiraUrl"
                                class="link-input"
                                placeholder="Enter Jira URL"
                            />
                            <button @click="toggleEditJiraUrl" class="link-button">
                                {{ editingJiraUrl ? 'Save' : 'Edit' }}
                            </button>
                        </div>
                        <div class="link-group">
                            <label class="link-label">Git URL:</label>
                            <input
                                type="text"
                                v-model="newGitUrl"
                                :disabled="!editingGitUrl"
                                class="link-input"
                                placeholder="Enter Git URL"
                            />
                            <button @click="toggleEditGitUrl" class="link-button">
                                {{ editingGitUrl ? 'Save' : 'Edit' }}
                            </button>
                        </div>
                    </div>

                    <div class="status-group">
                        <label class="status-label">Status:</label>
                        <p class="status-text">{{ team.status }}</p>
                    </div>
                </div>   
                    
                

            </div>
            <div class="team-details">
                <div class="team-members">
                    <div v-for="(item, index) in team.memberTeams" :key="index">
                        <TeamMemberCard :member="item"/>
                    </div>
                </div>
                <div class="web-rtc">
                    <WebRtc/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .container {
        display: flex;
        padding-top: 120px;
        padding-left: 20px;
        border: 1px solid #ddd;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    .sidebar {
    width: 200px;
    padding: 20px;
    border-right: 1px solid #ddd;
    margin-right: 20px;
    background-color: #f9f9f9; /* 사이드바 배경색을 설정했습니다 */
    border-radius: 8px; /* 사이드바에 둥근 모서리를 추가했습니다 */
}

.team-header {
    border-bottom: 2px solid #007BFF; /* 팀 이름 아래에 파란색 경계선 추가 */
    padding-bottom: 10px;
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
}

.link-input:disabled {
    background-color: #f0f0f0;
    cursor: not-allowed;
}

.link-button {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    background-color: #007BFF;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;
}

.link-button:hover {
    background-color: #0056b3;
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
}

.team-members {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 10px; /* 팀 구성원 사이에 여백을 추가했습니다 */
}

.team-members > div {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.web-rtc {
    width: 35%;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}


</style>