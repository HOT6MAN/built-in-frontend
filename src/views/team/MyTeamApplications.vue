<template>
  <NavBar />
  <SideBar />
  <div class="all-container">
    <div class="page-container">
      <label class="title">지원 현황</label>
      <hr class="mb-2">
      <b-table head-variant="light" hover :items="applicationList" :fields="fields" @row-clicked="onPreview" sticky-header class="table table-text-center" ref="table">    
        <template #cell(actions)="data">
          <b-button v-show="showButton(data.item.status)" variant="outline-primary" @click.prevent.stop="onApprove(data.item.resumeId)" >승인</b-button>
          <b-button v-show="showButton(data.item.status)" variant="outline-danger" @click.prevent.stop="onReject(data.item.resumeId)" class="mx-2" >거절</b-button>
          <b-button variant="danger" @click.prevent.stop="onDelete(data.item.resumeId)">삭제</b-button>
        </template>
      </b-table>    
      <div v-show="!applicationList.length" class="noApply">
        <h4>지원한 사람이 없습니다.</h4>
      </div>
      <PreviewModal v-model="showModal" :resumeId="resumeId"/>
    </div>
  </div>
</template>
<script setup>
import { ref, nextTick, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { findApplyList, acceptApplication, rejectApplication, deleteApplication } from '@/api/resume.js'
import { sweetAlert, sweetConfirm } from '@/api/sweetAlert';
import PreviewModal from '@/modals/resume/ResumePreviewModal.vue'
import SideBar from '@/views/Bars/SideBarView.vue'
import NavBar from '@/views/Bars/NavigationBarView.vue'

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

  sweetConfirm('', '정말 승인하시겠습니까?', (result) => {
    if (!result.isConfirmed) return;

    acceptApplication(body, (resp) => {
      if (resp.status !== 204) return;

      localStorage.setItem('alertType', 'approved');
      location.reload();
    }, (err) => console.error(err))
  }, (err) => console.error(err))
}

const onReject = (resumeId) => {
  const body = {
    teamId, resumeId
  }

  sweetConfirm('', '정말 거절하시겠습니까?', (result) => {
    if (!result.isConfirmed) return;

    rejectApplication(body, (resp) => {
      if (resp.status !== 204) return;
      
      localStorage.setItem('alertType', 'rejected');
      location.reload();
    }, (err) => console.error(err))
  }, (err) => console.error(err))
}

const onDelete = (resumeId) => {
  sweetConfirm('', '정말 삭제하시겠습니까?', (result) => {
    if (!result.isConfirmed) return;

    deleteApplication(teamId, resumeId, (resp) => {
      if (resp.status !== 204) return;
      
      localStorage.setItem('alertType', 'deleted');
      location.reload();    
    }, (err) => console.error(err))
  }, (err) => console.error(err))
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
  const alertType = localStorage.getItem('alertType');

  if (alertType === 'approved') {
    sweetAlert('승인 성공! 지원자가 팀원으로 합류하게 되었습니다', '');
  } else if (alertType === 'rejected') {
    sweetAlert('거절 되었습니다', '');
  } else if (alertType === 'deleted') {
    sweetAlert('삭제 되었습니다', '');
  }

  localStorage.removeItem('alertType');

  const result = await findApplyList(teamId)

  if (!result.length) {
    sweetAlert('지원 현황이 존재하지 않습니다', '')
    return;
  }

  fields.value = []

  for (let application of result) {
    for (let key in application) {
      if (application.hasOwnProperty(key)) {
        if (key === 'resumeId') continue;

        fields.value.push({key: `${key}`, label: `${key}`})
      }
    }
  }

  applicationList.value = result;

  if (applicationList.value.length) fields.value.push({key: 'actions', label: 'Actions'})
})

watch(applicationList, () => {
  if (!applicationList) return;

  nextTick(() => {
    applyRowStyles();
  });
});
</script>
<style scoped>
.noApply{
  font-size: 12px;
  color: #adadad;
}
.title {
    font-weight: bold;
    font-size: 1.7rem;
    color: var(--text1);
    white-space: nowrap; /* label의 텍스트가 줄 바꿈되지 않도록 설정 */
    width: 200px; /* label의 고정 너비 설정 */
    margin-top: 20px;
  }

.all-container {
  display: flex;
  justify-content: center;
  position: relative;
  width: calc(100vw - 220px);
  height: calc(100vh - 80px);
  left: 220px;
  top: 80px;
  background-color: #f0f4f8;
}
.page-container {
  position: relative;
  width: 80%;
  height: 90%;
  top: 5%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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