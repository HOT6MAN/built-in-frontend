<template>
  <b-modal v-model="showModal" centered scrollable hide-backdrop hide-footer title="내 이력서 목록">
    <div v-show="isVisible">
      <b-form-radio-group
        :options="resumeList"
        v-model="selectedResumeId"
        stacked required class="resume-radio-group" />
      <b-button class="b-button-block mb-4 mx-auto" pill variant="primary" @click.prevent="onApply">지원하기</b-button>
    </div>

    <div v-show="!isVisible">{{ ineligibilityReason }}</div>
  </b-modal>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { findMyResumeList } from '@/api/resume.js'
import { sweetAlertWarning } from '@/api/sweetAlert';

const props = defineProps({
  showModal: Boolean,
})
const emits = defineEmits(['apply', 'apply:isEligibleToApply'])

const showModal = ref(props.showModal)
const selectedResumeId = ref('')
const resumeList = ref([])
const isVisible = ref(false)
const ineligibilityReason = ref('')

const onApply = () => {
  if (!selectedResumeId.value) sweetAlertWarning('지원할 이력서를 선택해주세요','')

  emits('apply', selectedResumeId.value)
}

watch(showModal, async (newVal) => {
  if (!newVal) return;

  const msg = await new Promise((resolve) => emits('apply:isEligibleToApply', resolve))

  isVisible.value = !msg;
  
  if (msg) {
    ineligibilityReason.value = msg
    return;
  }

  findMyResumeList((res) => {
    const resumeListData = res.data.data;
    resumeList.value = resumeListData.map(({id, title}) => ({value: id, text: title}));
  }, (err) => console.error(err))
})
</script>
<style scoped>
  .resume-radio-group {
    margin: 15px;
  }
  
  .resume-radio-group .form-check {
    margin-bottom: 15px;
  }
  
  .b-button-block {
    font-family: var(--font-roboto);
  font-weight: 700 !important;
  border-radius: 8px !important;
  padding: 8px 16px !important;
  font-size: 16px !important;
  border: none !important;
  background-color: #4299e1 !important;
  color: #ffffff !important;
  transition: background-color 0.3s ease, box-shadow 0.3s ease !important;
    display: block;
  }
</style>