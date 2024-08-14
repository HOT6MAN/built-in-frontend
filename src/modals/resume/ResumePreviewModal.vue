<template>
  <b-modal v-model="showModal" centered scrollable hide-backdrop  hide-footer >
    <div class="d-flex justify-content-center align-items-center mt-3 mb-4">
      <h1>{{ resume.title }}</h1>
    </div>
    <div class="d-flex justify-content-center mb-3">
      <b-img :src="resume.profileUrl" class="profile-img" rounded="circle" />
    </div>
    <b-form-group label="포지션">
      <b-form-tag
        :title="resume.position"
        variant="primary"              
        no-remove
        pill          
        class="tag-btn mx-1 mb-3"
      />
    </b-form-group>
    <b-form-group label="기술 스택">
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
    <b-form-group label="경험">
      <div v-for="(experience, idx) in resume.experiences" :key="idx">
        <b-card bg-variant="light" class="mb-2">
          <b-form-group label="제목" :label-for="'nested-title-' + idx">
            <b-form-input v-model="experience.title" :id="'nested-title-' + idx" disabled />
          </b-form-group>
          <b-form-group label="내용" :label-for="'nested-description-' + idx">
            <b-form-textarea v-model="experience.description" :id="'nested-description-' + idx" no-resize disabled />
          </b-form-group>
        </b-card>
      </div>
    </b-form-group>
    <b-form-group label="한마디" label-class="custom-label">
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

watch(() => props.resumeId, async (resumeId) => {
  if (!resumeId) return false;

  const result = await findResumeById(resumeId);

  Object.assign(resume, result.data);
}, {immediate: true})
</script>
<style scoped>
::v-deep .form-label{
  font-weight: bold;
    font-size: 0.9rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 200px; /* label의 고정 너비 설정 */

}

.profile-img {
  width: 130px;
  height: 130px;
  object-fit: cover;
}
</style>