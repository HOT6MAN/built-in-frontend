<template>
  <b-modal v-model="showModal" centered scrollable hide-backdrop  hide-footer >
    <div class="d-flex justify-content-center align-items-center mt-3 mb-4">
      <h1>{{ resume.title }}</h1>
    </div>
    <div class="d-flex justify-content-center mb-3">
      <b-img :src="resume.profileUrl" class="profile-img" rounded="circle" />
    </div>
    <b-form-group label="Position">
      <b-form-tag
        :title="resume.position"
        variant="primary"              
        no-remove
        pill          
        class="tag-btn mx-1 mb-3"
      />
    </b-form-group>
    <b-form-group label="Tech Stack">
      <b-form-tag
        v-for="(tag, idx) in resume.techStack"
        :key="idx"
        :title="tag"
        variant="info"              
        no-remove
        pill          
        class="tag-btn mx-1 mb-3"
      />
    </b-form-group>
    <b-form-group label="Experience">
      <div v-for="(experience, idx) in resume.experiences" :key="idx">
        <b-card bg-variant="light" class="mb-2">
          <b-form-group label="Title" :label-for="'nested-title-' + idx">
            <b-form-input v-model="experience.title" :id="'nested-title-' + idx" disabled />
          </b-form-group>
          <b-form-group label="Description" :label-for="'nested-description-' + idx">
            <b-form-textarea v-model="experience.description" :id="'nested-description-' + idx" no-resize disabled />
          </b-form-group>
        </b-card>
      </div>
    </b-form-group>
    <b-form-group label="Comment">
      <b-form-input v-model="resume.comment" class="mb-3" disabled />
    </b-form-group> 
  </b-modal>
</template>
<script setup>
import { ref, reactive, defineProps, watch } from 'vue'
import { findResumeById } from '@/api/resume.js'

const props = defineProps({
  showModal: Boolean,
  resumeId: Number,
})

const showModal = ref(props.showModal)
const resume = reactive({
  profileUrl: '',
  title: '',
  position: '',
  techStack: [],
  experiences: [],
  comment: ''
})

watch(() => props.resumeId, (resumeId) => {
  if (!resumeId) return false;

  // findResumeById(resumeId, (res) => {
  //   Object.assign(resume, res.data.data)
  // }, (err) => console.error(err))

  Object.assign(resume, {
    profileUrl: "https://picsum.photos/250/250/?image=54",
    title: "ssafy kim's resume",
    position: "FE",
    techStack: ["Java", "SpringBoot"],
    experiences: [
      {title: '1', description: '네이버 부동산 클론코딩'},
      {title: '1', description: '당근마켓 클론코딩'},
    ],
    comment: "열심히 하겠습니다!",
  })
}, {immediate: true})
</script>
<style scoped>
.profile-img {
  width: 130px;
  height: 130px;
  object-fit: cover;
}
</style>