<template>
  <b-modal v-model="showModal" centered scrollable hide-backdrop hide-footer title="내 이력서 목록">
    <div v-show="isVisible">
      <b-form-radio-group
        :options="resumeList"
        v-model="selectedResumeId"
        stacked
        class="resume-radio-group"
      />
      <b-button class="b-button-block mb-4 mx-auto" pill variant="primary" @click.prevent="onApply">Apply</b-button>
    </div>

    <div v-show="!isVisible">{{ ineligibilityReason }}</div>
  </b-modal>
</template>
<script setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import { findMyResumeList } from '@/api/resume.js'

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
    margin-top: 20px;
    width: 85%;
    display: block;
  }
</style>