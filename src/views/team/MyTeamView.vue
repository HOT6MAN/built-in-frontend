<script setup>
import MemberSidebar from '@/components/member/MemberSidebar.vue';

</script>

<template>
    <div class="container">
      <MemberSidebar class="sidebar" />
      <div class="content">
        <button><router-link :to="{name:'myTeamRegister'}">팀생성</router-link></button>
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
  }
  
  .content {
    flex-grow: 1;
    padding: 20px;
  }
  
  </style>