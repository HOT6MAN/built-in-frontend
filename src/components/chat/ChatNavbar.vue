<script setup>
import { ref } from 'vue';

const activeTab = ref('individual');

const setActiveTab = (tab) => {
  activeTab.value = tab;
};
</script>

<template>
  <div class="navbar">
    <div class="navbar-header">
      <h1>채팅</h1>
    </div>
    <div class="tabs">
      <div :class="['tab', { active: activeTab === 'individual' }]" @click="setActiveTab('individual')">
        개인
      </div>
      <div :class="['tab', { active: activeTab === 'team' }]" @click="setActiveTab('team')">
        팀
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px; 
  background-color: #f8f8f8;
  border-bottom: 1px solid #ddd;
  height: 70px;
}

.navbar-header {
  display: flex;
  justify-content: flex-start;
  width: 100%;
}

.navbar-header h1 {
  margin: 0;
  padding: 5px;
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.tabs {
  display: flex;
  width: 100%;
  justify-content: space-around;
  margin-top: 5px;
}

.tab {
  padding: 5px 10px; 
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-size: 14px;
  color: #666;
}

.tab.active {
  border-bottom: 2px solid #333;
  font-weight: bold;
  color: #333;
}
</style>
