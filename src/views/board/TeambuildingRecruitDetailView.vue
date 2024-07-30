<template>
  <div class="page">
    <h1 class="page-title">Recruit</h1>
    <div v-if="isAuth" class="auth-buttons d-flex justify-content-end mb-2 w-100">
      <b-button variant="success" class="mx-1">Update</b-button>
      <b-button variant="danger" class="delete-btn" @click.prevent="del">Delete</b-button>
    </div>
    
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
import { useRoute, useRouter } from 'vue-router'
import { findRecruit, deleteRecruit } from '@/api/teambuilding.js'

const board = ref({})
const isAuth = ref(true)
const route = useRoute()
const router = useRouter()
const id = route.params.id

findRecruit(id, (resp) => {
  board.value = resp.data.data
}, (err) => console.error(err))

const del = () => {
  deleteRecruit(id, (resp) => {
    if (resp.status === 204) {
      router.push({path: '/teambuilding', query: {redirectYN: true, msg: 'Success Delete'}})        
      .then(() => router.replace({path: '/teambuilding'}))
    }
  }, (err) => console.error(err))
}
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

  .auth-buttons > .delete-btn {
    margin-right: 15px;
  }
</style>