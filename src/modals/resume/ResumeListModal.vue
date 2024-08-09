<template>
    <b-modal v-model="showModal" centered scrollable hide-backdrop hide-footer title="내 이력서 목록">
      <b-form-radio-group
        :options="resumeList"
        v-model="selectedResumeId"
        stacked
        class="resume-radio-group"
      />
      <b-button class="b-button-block mb-4 mx-auto" pill variant="primary" @click.prevent="onApply">Apply</b-button>
    </b-modal>
  </template>
  <script setup>
  import { defineProps, defineEmits, ref, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import { findMyResumeList, applyTeamByResumeId } from '@/api/resume.js'
  
  const router = useRouter()
  
  const props = defineProps({
    showModal: Boolean,
    teamId: Number
  })
  const emits = defineEmits(['update:closeModal', 'apply'])
  
  const showModal = ref(props.showModal)
  const teamId = ref(props.teamId)
  const selectedResumeId = ref('')
  const resumeList = ref([])
  
  findMyResumeList((res) => {
    const resumeListData = res.data.data;
    resumeList.value = resumeListData.map(({id, title}) => ({value: id, text: title}));
  }, (err) => console.error(err))
  
  const onApply = () => {
    emits('apply', selectedResumeId.value)
  }
  
  </script>
  <style scoped>
  .resume-radio-group {
    margin: 15px;
  }
  
  .resume-radio-group .form-check {
    margin-bottom: 15px;
  }
  
  .b-button-block {
    margin-top: 20px;
    width: 85%;
    display: block;
  }
  </style>