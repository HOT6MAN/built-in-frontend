<template>
    <div class="main-content">     
      <div class="config-container"> 
        <div>  
          <div class="page">
            <label class="title">이력서 목록</label>
            <hr class="mb-2">
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
                    <p class="text-sm mb-0 px-2 date">{{ resume.updatedDate }}</p>
                  </b-col>
                  <b-col md="auto">
                    <router-link :to="{ path: '/resume/update/' + resume.id }">
                      <b-button class="save-button">수정</b-button>
                    </router-link>
                    <b-button  class="m-1 remove-button" @click.prevent.stop="onDelete(resume.id)">삭제</b-button>
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

      </div>
    </div>
</template>
<script setup>
import {ref, onMounted} from 'vue'
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
  sweetConfirm('', '정말 삭제하시겠습니까?', (result) => {
    if (!result.isConfirmed) return;

    deleteResumeById(id, (resp) => {
      if (resp.status !== 204) return;
      
      localStorage.setItem('alertType', 'deleted');      
      location.reload(); 
    }, (err) => console.error(err))
  }, (err) => console.error(err))
}

onMounted(() => {
  const alertType = localStorage.getItem('alertType');

  if (alertType === 'deleted') {
    sweetAlert('','이력서 삭제 완료')
  }

  localStorage.removeItem('alertType');
})
</script>
<style scoped>
.save-button {
  font-family: var(--font-roboto);
  font-weight: 700 !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;
  font-size: 16px !important;
  border: none !important;
  background-color: #4299e1 !important;
  color: #ffffff !important;
  transition: background-color 0.3s ease, box-shadow 0.3s ease !important;
  
}

.save-button:hover {
  background-color: #434c5e !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
}


.remove-button {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  background-color: #5e81ac;
  color: #ffffff;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 8px;
}

.remove-button:hover {
  background-color: #d08770;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.date{
  font-size: 12px;
  color: #adadad;
}
.main-content {
    display: flex;
    margin-top: 80px;
    padding: 20px;
    justify-content: center;
    background-color: #f0f4f8;
    min-height: 100vh;
    font-family: var(--font-roboto);
    
  }
  .config-container {
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .page {
    padding-left: 50px;
    padding-right: 50px;
    margin-top: 40px;
  }  

  .title {
    font-weight: bold;
    font-size: 1.7rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 200px; /* label의 고정 너비 설정 */
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