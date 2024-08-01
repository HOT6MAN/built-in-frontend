<script setup>
import { ref } from 'vue';

const isMemberOpen = ref(false);
const isTeamOpen = ref(false);
const isResumeOpen = ref(false);

const toggleMember = () => {
  isMemberOpen.value = !isMemberOpen.value;
};

const toggleTeam = () => {
  isTeamOpen.value = !isTeamOpen.value;
};

const toggleResume = () => {
  isResumeOpen.value = !isResumeOpen.value;
};


</script>

<template>
  <div class="sidebar">
    <ul>
      <li @click="toggleMember">회원</li>
      <ul v-if="isMemberOpen">
        <li>계정</li>
        <li>관심</li>
        <li>메신저</li>
      </ul>
      <li @click="toggleTeam">팀</li>
      <ul v-if="isTeamOpen">
        <li><router-link :to="{name:'myteam'}">나의 팀</router-link></li>
        <li>모집공고</li>
        <li>팀원관리</li>
      </ul>
      <li @click="toggleResume">이력서</li>
      <ul v-if="isResumeOpen">
        <li>프로필</li>
        <li>멀티이력서</li>
        <li>팀원관리</li>
      </ul>
    </ul>
  </div>
</template>

<style scoped>
.sidebar {
  width: 100%;
  padding: 20px;
  border-right: 1px solid #ddd;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
  cursor: pointer;
}

.sidebar ul ul {
  padding-left: 20px;
}
</style>
