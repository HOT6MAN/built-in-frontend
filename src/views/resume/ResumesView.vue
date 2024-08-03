<template>
  <div>  
    <div class="page">
      <h1 class="title">이력서 관리</h1>
      <div class="d-flex justify-content-end">
        <b-button variant="success" :to="{path: '/resume/create'}">Add New Resume</b-button>
      </div>
      <b-list-group class="resume-list">
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
              <b-button variant="outline-danger" class="m-1">delete</b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </div>
  </div>
</template>
<script setup>
import {ref} from 'vue'

const list = ref([]);

// TODO: request

list.value = [{
  id: 1,
  title: "ssafy kim's resume",
  updatedDate: "2024-08-03",
  profileUrl: "https://picsum.photos/250/250/?image=54"
}, {
  id: 1,
  title: "ssafy kim's resume",
  updatedDate: "2024-08-03",
  profileUrl: "https://picsum.photos/250/250/?image=54"
}, {
  id: 1,
  title: "ssafy kim's resume",
  updatedDate: "2024-08-03",
  profileUrl: "https://picsum.photos/250/250/?image=54"
}]

// TODO: handler: create btn
// TODO: handler: preview btn
// TODO: handler: update btn
// TODO: handler: delete btn

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
</style>