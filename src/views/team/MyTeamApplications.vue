<template>
  <div class="page">
    <h1 class="page-title">지원 현황</h1>
    
    <b-table head-variant="light" hover :items="applicationList" :fields="fields" @row-clicked="onPreview" sticky-header class="table table-text-center" ref="table">    
      <template #cell(actions)="data">
        <b-button v-show="showButton(data.item.status)" variant="outline-primary" @click.prevent.stop="onApprove(data.item.resumeId)" >Approve</b-button>
        <b-button v-show="showButton(data.item.status)" variant="outline-danger" @click.prevent.stop="onReject(data.item.resumeId)" class="mx-2" >Reject</b-button>
        <b-button variant="danger" @click.prevent.stop="onDelete(data.item.resumeId)">Delete</b-button>
      </template>
    </b-table>    
  </div>

  <div v-show="!applicationList.length" class="no-result-content">
    <h3>No Result</h3>
  </div>

  <PreviewModal v-model="showModal" :resumeId="resumeId"/>
</template>
<script setup>
import { ref, nextTick, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { findApplyList, acceptApplication, rejectApplication, deleteApplication } from '@/api/resume.js'
import { sweetAlert, sweetConfirm } from '@/api/sweetAlert';
import PreviewModal from '@/modals/resume/ResumePreviewModal.vue'

const route = useRoute()

const table = ref(null);
const applicationList = ref([])
const showModal = ref(false)
const resumeId = ref('')
const fields = ref([]) 
const teamId = route.params.teamId

const showButton = (status) => {
  return status === 'applied';
}

const onPreview = (item) => {
  showModal.value = true
  resumeId.value = item.resumeId
}

const onApprove = (resumeId) => {
  const body = {
    teamId, resumeId
  }

  sweetConfirm('정말 승인하시겠습니까?', '', acceptApplication(body, (resp) => {
    if (resp.status !== 204) return;

    sweetAlert('승인 성공! 지원자가 팀원으로 합류하게 되었습니다', '')
    location.reload();
  }, (err) => console.error(err)), (err) => console.error(err))
}

const onReject = (resumeId) => {
  const body = {
    teamId, resumeId
  }

  sweetConfirm('정말 거절하시겠습니까?', '', rejectApplication(body, (resp) => {
    if (resp.status !== 204) return;
    
    location.reload();    
  }, (err) => console.error(err)), (err) => console.error(err))
}

const onDelete = (resumeId) => {
  sweetConfirm('삭제하시겠습니까?', '', deleteApplication(teamId, resumeId, (resp) => {
    if (resp.status !== 204) return;
    
    sweetAlert('삭제 되었습니다', '')
    location.reload();      
  }, (err) => console.error(err)), (err) => console.error(err))
}

const applyRowStyles = () => {
  const rows = table.value.$el.querySelectorAll('tbody tr');
  rows.forEach((row, index) => {
    const status = applicationList.value[index].status;
    if (status === 'accepted') {
      // TODO: 글씨 색깔 변경
      row.style.textDecoration = 'underline';
    } else if (status === 'rejected') {
      row.style.textDecoration = 'line-through';
      row.style.textDecorationColor = 'red';
    } 
  });
};

onMounted(async () => {
  const result = await findApplyList(teamId)

  for (let application of result.data) {
    for (let key in application) {
      if (application.hasOwnProperty(key)) {
        if (key === 'resumeId') continue;

        fields.value.push({key: `${key}`, label: `${key}`})
      }
    }
  }

  applicationList.value = result.data;

  if (applicationList.value.length) fields.value.push({key: 'actions', label: 'Actions'})
})

watch(applicationList, () => {
  nextTick(() => {
    applyRowStyles();
  });
});
</script>
<style scoped>
.page {
  margin-top: 150px;
}  

.page-title {
  margin-bottom: 30px;
}

.custom-form-group {
  font-size: 0.85rem;
}

.custom-select {
  width: 120px; 
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
}

.table {
  margin-top: 50px;
}

.table-text-center {
  vertical-align: middle;
}

.no-result-content {
  margin-top: 80px;
}

</style>