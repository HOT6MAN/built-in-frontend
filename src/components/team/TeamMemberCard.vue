<script setup>
import { defineProps } from 'vue';
defineProps({
    member: Object
})


</script>

<template>
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
                <img src="..." class="img-fluid rounded-start" alt="Team Member">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <div class="name-container">
                        <h3 class="card-title">{{ member.member.name }}</h3>
                        <p class="card-text" v-if="member.leader">
                            <span class="badge badge-leader">Leader</span>
                        </p>
                    </div>
                    <div class="info-container">
                        <p class="card-text"><strong>닉네임:</strong> {{ member.member.nickname }}</p>
                        <p class="card-text"><strong>이메일:</strong> {{ member.member.email }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border: 1px solid #ddd;
    border-radius: 12px; /* 카드 모서리를 둥글게 */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* 그림자 더 부드럽고 깊게 */
    overflow: hidden; /* 이미지가 카드 경계를 넘지 않도록 */
    background-color: #fff; /* 배경 색상 설정 */
}

.card-img-top {
    border-right: 1px solid #ddd; /* 이미지와 본문 사이에 경계 추가 */
}

.card-body {
    padding: 20px; /* 본문 여백을 좀 더 넉넉하게 */
}

.name-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem; /* 제목과 본문 사이에 충분한 여백 */
}

.card-title {
    font-size: 1.5rem;
    color: #333; /* 제목 색상 */
    margin: 0; /* 제목 주변 여백 제거 */
}

.badge-leader {
    background-color: #007bff; /* Leader 배경 색상 */
    color: #fff; /* Leader 텍스트 색상 */
    padding: 5px 10px;
    border-radius: 12px; /* 배지 둥근 모서리 */
    font-size: 0.875rem; /* 배지 폰트 크기 */
    font-weight: 600; /* 배지 폰트 두께 */
}

.info-container {
    display: flex;
    justify-content: space-between;
    margin-top: 0.5rem; /* 정보 항목 간 여백 */
}

.card-text {
    font-size: 1rem;
    color: #555; /* 본문 텍스트 색상 */
    margin-bottom: 0.5rem; /* 본문 간의 여백 */
}

.card-text strong {
    color: #333; /* 강조 텍스트 색상 */
}

.img-fluid {
    border-radius: 12px 0 0 12px; /* 이미지에 둥근 모서리 추가 */
    object-fit: cover; /* 이미지가 카드의 크기에 맞게 조절 */
}
</style>