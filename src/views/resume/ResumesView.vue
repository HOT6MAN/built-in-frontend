<template>
  <div>  
    <div class="page">
      <h1 class="title">이력서 관리</h1>

      <b-list-group v-show="!loading" class="resume-list">
        <RouterLink :to="{name: 'resumeCreate'}">
          <b-list-group-item button >
            <b-row class="resume-item d-flex justify-content-center align-items-center h-100 my-2">
              <b-col md="auto" ><img src="@/icons/addButton.svg" alt="" class="create-img" /></b-col>
            </b-row>
          </b-list-group-item>
        </RouterLink>

        <b-list-group-item 
          v-for="resume in list"
          :key="resume.id"
          class="group-item"
          action
        >
          <b-row class="resume-item" align-v="center" @click.prevent="onPreview(resume.id)">
            <b-col md="auto">
              <b-img v-show="resume.profileUrl" :src="resume.profileUrl" alt="" class="resume-img" rounded />
              <b-img v-show="!resume.profileUrl" :src="defaultImgSrc" alt="" class="resume-img" rounded />
            </b-col>
            <b-col>
              <h4 class="mb-1 px-2">{{ resume.title }}</h4>
              <p class="text-sm mb-0 px-2">{{ resume.updatedDate }}</p>
            </b-col>
            <b-col md="auto">
              <b-button variant="outline-success" class="m-1" :to="{path: '/resume/update/' + resume.id}">수정</b-button>
              <b-button variant="outline-danger" class="m-1" @click.prevent.stop="onDelete(resume.id)">삭제</b-button>
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>

      <div v-show="loading" class="full-screen-center">
        <b-spinner label="Loading..."></b-spinner>
      </div>
    </div>

    <PreviewModal v-model="showModal" :resumeId="resumeId"/>
  </div>
</template>
<script setup>
import {ref} from 'vue'
import { RouterLink } from 'vue-router'
import {findMyResumeList, deleteResumeById } from '@/api/resume.js'
import { sweetAlert } from '../../api/sweetAlert';
import PreviewModal from '@/modals/resume/ResumePreviewModal.vue'
import defaultImgSrc from '@/icons/default-profile.svg';

const list = ref([]);
const loading = ref(true);
const showModal = ref(false)
const resumeId = ref('')

findMyResumeList((res) => {
  list.value = res.data.data;
  loading.value = false;
}, (err) => console.error(err))

const onPreview = (id) => {
  showModal.value = true
  resumeId.value = id
}

const onDelete = (id) => {
  deleteResumeById(id, (resp) => {
    if (resp.status === 204) {
      window.location.reload(); 
      sweetAlert('','이력서 삭제 완료')
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
  
  .add-group-item {
    background-image: url('../icons/createItemButton.svg');
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

  .resume-item:hover {
    cursor: pointer;
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

  .create-img {
    width: 75%;
    height: 75%;
  }
</style>