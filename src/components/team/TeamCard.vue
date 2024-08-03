<script setup>
import { defineProps } from 'vue';

defineProps({
    team: Object
})


</script>

<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img src="..." class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
            <div class="card-body">
                <h3 class="card-title">{{ team.name }}</h3>
                <p class="card-text">{{ team.content }}</p>
                <div v-for="(item, index) in team.memberTeams" :key="index">
                    <p class="card-text"><small class="text-body-secondary">{{item.member.nickname}}</small></p>
                </div>
                
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>