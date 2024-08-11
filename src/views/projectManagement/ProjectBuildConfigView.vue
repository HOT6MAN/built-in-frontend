<script setup>
import { ref, watch, onMounted, shallowRef } from 'vue';
import SideBarView from '../Bars/SideBarView.vue';
import ProjectBuildBackendConfig from '@/components/ProjectManagement/ProjectBuildBackendConfig.vue';
import ProjectBuildFrontendConfig from '@/components/ProjectManagement/ProjectBuildFrontendConfig.vue';
import ProjectBuildDBConfig from '@/components/ProjectManagement/ProjectBuildDBConfig.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import { getAllMyTeamByUserId } from '@/api/team.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';

const authStore = useAuthStore();
const { userId } = storeToRefs(authStore);

const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId,
  storeInsertNewProjectInfo, storeSaveBackendConfigs, storeSaveFrontendConfigs, storeSaveDatabaseConfigs } = store;

const { projectInfos } = storeToRefs(store);
const dataLoaded = ref(false);
const activeTab = ref(0);
const currentComponent = shallowRef(ProjectBuildBackendConfig);

const teamId = ref(-1);
const allConfigs = ref([]);
const selectedConfigId = ref(0);
const selectedIndex = ref(0);

const teamOptions = ref([]);
const selectedTeam = ref({});
const newBuildName = ref(''); // 새로운 빌드 이름 입력을 위한 ref

const handleTeamSelection = async (event) => {
  teamId.value = parseInt(event.target.value, 10);
  selectedTeam.value = teamOptions.value.find(team => team.id === teamId.value);
  console.log("선택 이후 selectedTeam = ", selectedTeam.value);
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
  allConfigs.value = projectInfos.value;

  // 따로 빌드 환경 설정 selection box를 만들었으므로, 해당 로직 주석 처리
  // if (allConfigs.value.length > 0) {
  //   selectedConfigId.value = allConfigs.value[0].id;
  //   selectedIndex.value = 0;
  // }
  // dataLoaded.value = true;
};
onMounted(async () => {
  await getAllMyTeamByUserId(userId.value, (response) => {
    console.log(response);
    teamOptions.value = response.data.data;
  }, (error) => {
    console.log("get All My Team By User Id Error", error);
  })
});

const onTabChange = () => {
  switch (activeTab.value) {
    case 0:
      currentComponent.value = ProjectBuildBackendConfig;
      break;
    case 1:
      currentComponent.value = ProjectBuildFrontendConfig;
      break;
    case 2:
      currentComponent.value = ProjectBuildDBConfig;
      break;
  }
};
watch(activeTab, onTabChange);

const saveBackendData = async (backendConfigArray) => {
  if (!selectedConfigId) {
    alert("설정을 먼저 선택해주세요.");
    return;
  }
  console.log("emits array = ", backendConfigArray);
  const projectInfoId = selectedConfigId.value;
  console.log(selectedConfigId.value);
  await storeSaveBackendConfigs(projectInfoId, backendConfigArray);
  await alert("변경 이후 불러오기");
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
};
const saveFrontendData = async (frontendConfigArray) => {
  if (!selectedConfigId) {
    alert("설정을 먼저 선택해주세요.");
    return;
  }
  console.log("Emit frontend data = ", frontendConfigArray);
  const projectInfoId = selectedConfigId.value;
  console.log("before save front id = ", projectInfoId, " frontend config Array = ", frontendConfigArray);
  await storeSaveFrontendConfigs(projectInfoId, frontendConfigArray);
  await alert("변경 이후 불러오기");
  await storeFindAllProjectInfosByTeamId(selectedTeam.value.id);
};

// '새로운 환경 생성' 버튼을 눌렀을 때, 모달 띄우기
const showModal = () => {
  const modal = new Modal(document.getElementById('newBuildModal'));
  modal.show();
};

// 모달에서 '생성' 버튼을 눌렀을 때, projectInfo 추가
const createNewBuild = async () => {
  console.log("새로운 빌드 이름: ", newBuildName.value);

  // 1. projectInfo 테이블에 데이터 넣기
  // projectInfos도 이 시점에서 업데이트됨
  await storeInsertNewProjectInfo(teamId.value, newBuildName.value);
  
  // 2. 모달 닫기
  const modalElement = document.getElementById('newBuildModal');
  const modalInstance = Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }
};

const saveDBData = async (DBConfigArray) => {
  if (!selectedConfigId) {
    alert("설정을 먼저 선택해주세요.");
    return;
  }
  const projectInfoId = selectedConfigId.value;
  console.log("emits db config = ", DBConfigArray);
  await storeSaveDatabaseConfigs(projectInfoId, DBConfigArray);
};


watch(selectedConfigId, (newId) => {
  selectedIndex.value = allConfigs.value.findIndex(config => config.id === newId);
});
</script>

<template>
  <div class="main-content">
    <div class="row select-group">
      <!-- {{ teamOptions }} -->
      <!-- 팀 선택 selection box -->
      <div class="col-3 team-select" v-if="teamOptions.length > 0">
        <label for="teamSelect">팀 선택:</label>
        <select id="teamSelect" @change="handleTeamSelection">
          <option disabled selected>설정 선택</option>
          <option v-for="team in teamOptions" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <!-- 빌드 환경 선택 selection box -->
      <div class="col-3 build-env-select">
        <label for="buildEnvSelect">빌드 환경 선택:</label>
        <select id="buildEnvSelect" v-model="selectedConfigId" :disabled="teamId === -1">
          <option value="0" selected>설정 선택</option>
          <option v-for="(config, index) in projectInfos" :key="config.id" :value="config.id">
            {{ config.title }}
          </option>
        </select>
      </div>

      <!-- 새로운 환경 생성 버튼 -->
      <div class="col-3">
        <button @click="showModal" class="btn btn-primary">새로운 환경 생성</button>
      </div>
    </div>

    <!-- 모달 -->
    <div class="modal fade" id="newBuildModal" tabindex="-1" aria-labelledby="newBuildModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="newBuildModalLabel">새로운 빌드 환경 생성</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="mb-3">
              <label for="buildName" class="form-label">빌드 이름</label>
              <input type="text" class="form-control" id="buildName" v-model="newBuildName">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
            <button type="button" class="btn btn-primary" @click="createNewBuild">생성</button>
          </div>
        </div>
      </div>
    </div>

    <b-tabs v-model="activeTab" @input="onTabChange">
      <b-tab title="Backend">
        <template #title>
          <b>{{ activeTab === 0 ? '▶' : '' }} Backend 설정</b>
        </template>
      </b-tab>
      <b-tab title="Frontend">
        <template #title>
          <b>{{ activeTab === 1 ? '▶' : '' }} Frontend 설정</b>
        </template>
      </b-tab>
      <b-tab title="DB">
        <template #title>
          <b>{{ activeTab === 2 ? '▶' : '' }} DB 설정</b>
        </template>
      </b-tab>
    </b-tabs>
    <component v-if="teamId > 0 && selectedConfigId > 0" :is="currentComponent" :allConfigs="allConfigs" :selectedConfigId="selectedConfigId"
      :selectedIndex="selectedIndex" @saveBackendData="saveBackendData" @saveFrontendData="saveFrontendData"
      @saveDBData="saveDBData"></component>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<style scoped>

.main-content {
  padding-top: 20px;
}

/* .team-select {
  margin-top: 20px;
} */
</style>
