<template>
  <div>  
    <div class="page">
      <h1 class="title">이력서 관리</h1>
      <div class="d-flex justify-content-end">
        <b-button variant="success" :to="{path: '/resume/create'}">Add New Resume</b-button>
      </div>
      
      <b-list-group v-show="!loading" class="resume-list">
        <b-list-group-item 
          v-for="resume in list"
          :key="resume.id"
          class="group-item"
          action
        >
          <b-row align-v="center">
            <b-col md="auto">
              <b-img :src="resume.profileUrl" class="resume-img" rounded />
            </b-col>
            <b-col>
              <h4 class="mb-1 px-2">{{ resume.title }}</h4>
              <p class="text-sm mb-0 px-2">{{ resume.updatedDate }}</p>
            </b-col>
            <b-col md="auto">
              <b-button variant="outline-primary" class="m-1">preview</b-button>
              <b-button variant="outline-success" class="m-1">update</b-button>
              <b-button variant="outline-danger" class="m-1" @click.prevent="onDelete(resume.id)">delete</b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>

      <div v-show="loading" class="full-screen-center">
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import {findMyResumeList, deleteResumeById } from '@/api/resume.js'

const list = ref([]);
const loading = ref(true);

findMyResumeList((res) => {
  list.value = res.data.data;
  loading.value = false;
}, (err) => console.error(err))

// TODO: handler: create btn
// TODO: handler: preview btn
// TODO: handler: update btn

const onDelete = (id) => {
  deleteResumeById(id, (resp) => {
    if (resp.status === 204) {
      router.push({path: '/resumes', query: {redirectYN: true, msg: 'Success Delete'}})        
      .then(() => router.replace({path: '/resumes'}))
    }
  }, (err) => console.error(err))
}
</script>
<style scoped>
  .page {
    padding-left: 300px;
    padding-right: 300px;
    margin-top: 130px;
  }  

  .title {
    text-align: center;
    margin-bottom: 100px;
  }

  .group-item {
    margin-bottom: 15px;
  }
  
  .resume-list {
    margin: 60px;
    margin-top: 30px;
    padding: 30px;
  }

  .resume-img {
    height: 48px;
    width: 48px;
  }

  .full-screen-center {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>