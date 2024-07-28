<template>
  <div class="page">
    <h1 class="page-title">Recruit</h1>
    
    <b-card class="board">
      <div></div>
      <b-card-header class="d-flex justify-content-between align-items-center py-3">
        <b-card-title>{{ board.teamName }} </b-card-title>          
        <b-card-sub-header>{{ board.authorName }} {{ board.createdDate }} </b-card-sub-header>
      </b-card-header>
      <b-card-body>          
        <b-card-title>{{ board.introduction }} </b-card-title>          
        <b-card-text> {{ board.content }} </b-card-text>        
      </b-card-body>
    </b-card>    
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { findRecruit } from '@/api/teambuilding.js'

const board = ref({})
const route = useRoute()
const id = route.params.id

findRecruit(id, (resp) => {
  board.value = resp.data.data
}, (err) => console.error(err))
</script>
<style scoped>
  .page {
    margin-top: 130px;
  }  

  .page-title {
    margin-bottom: 60px;
    display: flex;
    justify-content: center
  }
</style>