
<template>
    <router-link :to="{ name: 'myTeamDetail', params: { teamId: team.id } }" style="text-decoration: none; color: inherit;" class="team-card-link">
        <div class="card mb-1">
            <div class="status">
                <p class="status-text" v-if="team.status==='RECRUIT'">
                            <span class="badge badge-recruit">모집중</span>
                        </p>
                        <p class="status-text" v-else>
                            <span class="badge badge-finish">모집완료</span>
                        </p>
            </div>
            <div class="row g-0">
                <div class="col-md-10">
                    <div class="card-body">
                        <div class="sc-crHmcD fLCeMm">
                            <label class="link-label">팀 이름 :</label>
                            <h3 class="card-title">{{ team.name }}</h3>
                        </div>
                        <div class="sc-crHmcD fLCeMm ">
                            <label class="link-label">팀 소개 :</label>
                            <p class="card-text">{{ team.content }}</p>
                        </div>
                       
                       
                        <div class="member-teams">
                            <div v-for="(item, index) in team.memberTeams" :key="index" class="member-item">
                                <p class="card-text"><small class="text-body-secondary">{{ item.member.nickname }}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script setup>
import { defineProps } from 'vue';
import { RouterLink } from "vue-router";

defineProps({
    team: Object
})


</script>

<style scoped>
    .card {
        border: 1px solid #ddd;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s, transform 0.3s;
        overflow: hidden;
        width: 100%;
        height: 150px;
        max-width: 500px;
    }
.fLCeMm {
    display: flex; /* Flexbox 사용 */
    align-items: center; /* 세로 중앙 정렬 */
}

.fLCeMm label {
    font-weight: bold;
    font-size: 1.000rem;
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
}
.badge-finish {
    background-color: red; /* Leader 배경 색상 */
    color: #fff; /* Leader 텍스트 색상 */
    padding: 5px 10px;
    border-radius: 12px; /* 배지 둥근 모서리 */
    font-size: 0.875rem; /* 배지 폰트 크기 */
    font-weight: 600; /* 배지 폰트 두께 */
}

.status {
    position: absolute;
    top: 10px;
    right: 10px;

}

.img-fluid {
    object-fit: cover;
}

.card-title-link {
    text-decoration: none;
    color: inherit;
}

.card-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0;
    color: #555;
}

.card-text {
    font-size: 1rem;
    color: #555;
}

.member-teams {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.member-item {
    background-color: #f1f1f1;
    border-radius: 15px;
    padding: 5px 10px;
    font-size: 0.9rem;
    color: #333;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 12px;
}

.team-card-link{
    width: 100px;
}
</style>