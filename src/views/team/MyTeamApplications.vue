<template>
  <div class="page">
    <h1 class="page-title">지원 현황</h1>
    <div class="d-flex justify-content-end filters">
      <b-form-group
        label-cols="3"
        label="team"
        label-for="select-horizontal"
        class="mx-4"
      >
        <b-form-select id="select-horizontal" class="custom-select" v-model="selectedTeamId" :options="teamList" />
      </b-form-group>
    </div>
    
    <b-table head-variant="light" hover :items="applicationList" :fields="fields" @row-clicked="onPreview" sticky-header class="table table-text-center" ref="table">    
      <template #cell(actions)="data">
        <b-button v-show="showButton(data.item.status)" variant="outline-primary" @click.prevent.stop="onApprove(data.item.resumeId)" >Approve</b-button>
        <b-button v-show="showButton(data.item.status)" variant="outline-danger" @click.prevent.stop="onReject(data.item.resumeId)" class="mx-2" >Reject</b-button>
        <b-button variant="danger" @click.prevent.stop="onDelete(data.item.resumeId)">Delete</b-button>
      </template>
    </b-table>    
  </div>

  <div v-show="!applicationList.length">
    <h3>No Result</h3>
  </div>

  <PreviewModal v-model="showModal" :resumeId="resumeId"/>
</template>
<script setup>
import { ref, nextTick, watch } from 'vue'
import { findTeamList } from '@/api/teambuilding.js'
import { findApplyList, acceptApplication, rejectApplication, deleteApplication } from '@/api/resume.js'
import PreviewModal from '@/modals/resume/ResumePreviewModal.vue'

const table = ref(null);
const applicationList = ref([])
const showModal = ref(false)
const resumeId = ref('')
const selectedTeamId = ref('')
const teamList = ref([])
const fields = ref([]) 

findTeamList((resp) => {
  teamList.value = resp.data.data.map(item => ({ text: item.name, value: item.id }));
  selectedTeamId.value = teamList.value[0].value
}, (err) => console.error(err))

const showButton = (status) => {
  return status === 'applied';
}

const onPreview = (item) => {
  showModal.value = true
  resumeId.value = item.resumeId
}

const onApprove = (resumeId) => {
  const teamId = selectedTeamId.value;
  const body = {
    teamId, resumeId
  }

  if (!confirm("Do you really want to approve?")) return;

  acceptApplication(body, (resp) => {
    if (resp.status === 204) {
      alert("Success Approve!")
      location.reload();
    }
  }, (err) => console.error(err))
}

const onReject = (resumeId) => {
  const teamId = selectedTeamId.value;
  const body = {
    teamId, resumeId
  }

  if (!confirm("Do you really want to reject?")) return;

  rejectApplication(body, (resp) => {
    if (resp.status === 204) {
      alert("Success Reject!")
      location.reload();
    }
  }, (err) => console.error(err))
}

const onDelete = (resumeId) => {
  const teamId = selectedTeamId.value;

  if (!confirm("Do you really want to delete?")) return;

  deleteApplication(teamId, resumeId, (resp) => {
    if (resp.status === 204) {
      alert("Success Delete!")
      location.reload();
    }
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

watch(selectedTeamId, async (newTeamId) => {
  const teamId = newTeamId;
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

  if (applicationList.value.length > 0) fields.value.push({key: 'actions', label: 'Actions'})
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
</style>