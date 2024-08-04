<script setup>
import { defineProps } from 'vue';
import { RouterLink } from "vue-router";

defineProps({
    team: Object
})


</script>

<template>
    <router-link :to="{ name: 'myTeamDetail', params: { teamId: team.id } }" style="text-decoration: none; color: white" class="team-card-link">
        <div class="card mb-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-4">
                    <img src="https://via.placeholder.com/150" class="img-fluid rounded-start" alt="Team Image">
                </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h3 class="card-title">{{ team.name }}</h3>
                        <p class="card-text">{{ team.content }}</p>
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

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.3s, transform 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
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
    color: #007BFF;
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
}
</style>