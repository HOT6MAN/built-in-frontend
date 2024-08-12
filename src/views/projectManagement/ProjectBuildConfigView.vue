<template>
  <div class="main-content">
    <div class="config-container">
      <div class="config-header">
        <h2>프로젝트 빌드 환경 설정</h2>
      </div>
      <div v-if="dataLoaded" class="config-selection">
        <div class="input-group">
          <select v-model="selectedConfigId" class="form-select config-select">
            <option value="" disabled selected>설정 선택</option>
            <option v-for="(config, index) in allConfigs" :key="config.id" :value="config.id">
              {{ config.title }}
            </option>
          </select>
          <button class="btn btn-primary" @click="showModal">+ 추가</button>
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
                <input type="text" class="form-control" id="buildName" v-model="updateConfigName">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
              <button type="button" class="btn btn-primary" @click="addNewConfig">생성</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="selectedConfigId" class="config-content">
        <div class="input-group-container">
          <label for="config-input" class="config-label">선택된 프로젝트 환경설정 이름</label>
          <div class="input-group">
            <input id="config-input" v-model="updateConfigName" @focus="onFocusInput" @blur="onBlurInput" type="text"
              class="form-control config-input" placeholder="설정 제목" />
          </div>
        </div>

        <b-tabs v-model="activeTab" @input="onTabChange" class="mt-4">
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

        <component v-if="dataLoaded" :is="currentComponent" :allConfigs="allConfigs"
          :selectedConfigId="selectedConfigId" :selectedIndex="selectedIndex" @saveBackendData="saveBackendData"
          @saveFrontendData="saveFrontendData" @saveDBData="saveDBData"></component>
      </div>

      <div v-else class="no-selection-message">
        <div class="no-selection-content">
          <i class="fas fa-project-diagram"></i>
          <div class="no-selection-title">프로젝트를 선택해주세요</div>
          <p class="no-selection-description">
            프로젝트를 선택하여 설정을 시작하세요. 새 프로젝트를 추가하려면 상단의 '+ 추가' 버튼을 클릭하세요.
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed, shallowRef, markRaw } from 'vue';
import ProjectBuildBackendConfig from '@/components/ProjectManagement/ProjectBuildBackendConfig.vue';
import ProjectBuildFrontendConfig from '@/components/ProjectManagement/ProjectBuildFrontendConfig.vue';
import ProjectBuildDBConfig from '@/components/ProjectManagement/ProjectBuildDBConfig.vue';
import { useProjectStore } from '@/stores/projectStore.js';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore.js';
import { useRoute } from 'vue-router';
import { updateProjectInfoNameByProjectInfoId, saveBackendConfigs, saveFrontendConfigs, saveDatabaseConfigs } from '@/api/project.js';
import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min';
import { sweetAlert } from '../../api/sweetAlert';

const route = useRoute();
const teamId = route.params.teamId;

const authStore = useAuthStore();
const { userId } = storeToRefs(authStore);

const store = useProjectStore();
const { storeFindAllProjectInfosByTeamId, storeInsertNewProjectInfo } = store;

const { projectInfos } = storeToRefs(store);
const dataLoaded = ref(false);
const activeTab = ref(0);
const currentComponent = shallowRef(markRaw(ProjectBuildBackendConfig)); // markRaw와 shallowRef 사용

const allConfigs = ref([]);
const selectedConfigId = ref(0);
const selectedIndex = ref(0);

const updateConfigName = ref("");

// 탭에 따른 설정 필터링
const filteredConfigs = computed(() => {
  console.log("Filterling call active value = ", activeTab.value);
  if (activeTab.value === 0) {
    return allConfigs.value.map(config => ({
      ...config,
      backendConfigs: config.backendConfigs
    }));
  } else if (activeTab.value === 1) {
    return allConfigs.value.map(config => ({
      ...config,
      frontendConfigs: config.frontendConfigs
    }));
  } else if (activeTab.value === 2) {
    return allConfigs.value.map(config => ({
      ...config,
      databaseConfigs: config.databaseConfigs
    }));
  }
});

const saveBackendData = async (backendConfigs) => {
  console.log("전달받은 backend = ", backendConfigs);
  await saveBackendConfigs(selectedConfigId.value, backendConfigs, async (response) => {
    sweetAlert('',"백엔드 설정 저장 성공");
    await storeFindAllProjectInfosByTeamId(teamId);
    allConfigs.value = projectInfos.value;
    dataLoaded.value = true;
  }, (error) => {
    console.log(error);
  })

};

const saveFrontendData = async (frontendConfigs) => {
  console.log("전발받은 frontend config = ", frontendConfigs);
  await saveFrontendConfigs(selectedConfigId.value, frontendConfigs, async (response) => {
    sweetAlert('',"프론트엔드 설정 저장 성공");
    await storeFindAllProjectInfosByTeamId(teamId);
    allConfigs.value = projectInfos.value;
    dataLoaded.value = true;
  }, (error) => {
    console.log(error);
  });
  // 프론트엔드 데이터 저장 로직
};

const saveDBData = async (databaseConfigs) => {
  await saveDatabaseConfigs(selectedConfigId.value, databaseConfigs, async (response) => {
    sweetAlert('',"DB 설정 저장 성공");
    await storeFindAllProjectInfosByTeamId(teamId);
    allConfigs.value = projectInfos.value;
    dataLoaded.value = true;
  }, (error) => {
    console.log(error);
  });
  // 데이터베이스 데이터 저장 로직
};

onMounted(async () => {
  await storeFindAllProjectInfosByTeamId(teamId);
  allConfigs.value = projectInfos.value;
  dataLoaded.value = true;
});

watch(selectedConfigId, (newId) => {
  selectedIndex.value = allConfigs.value.findIndex(config => config.id === newId);
  updateConfigName.value = allConfigs.value[selectedIndex.value]?.title || "";
});

watch(activeTab, (newValue) => {
  onTabChange(newValue);
});

// '+ 추가' 버튼을 눌렀을 때, 모달 띄우기
const showModal = () => {
  const modal = new Modal(document.getElementById('newBuildModal'));
  modal.show();
};


const addNewConfig = async () => {

  // 1. projectInfo 테이블에 데이터 넣기
  // projectInfos도 이 시점에서 업데이트됨
  await storeInsertNewProjectInfo(teamId, updateConfigName.value);


  // 2. 모달 닫기
  const modalElement = document.getElementById('newBuildModal');
  const modalInstance = Modal.getInstance(modalElement);
  if (modalInstance) {
    modalInstance.hide();
  }

  // console.log("Insert 이후 Find 차례 selectedTeam id = ", teamId);
  // console.log("selectedTeam만 = ", teamId);
  // // await storeFindAllProjectInfosByTeamId(teamId);
  // allConfigs.value = projectInfos.value;
  // console.log("After Insert All Configs = ", allConfigs.value);

}

const onTabChange = (newTabIndex) => {
  console.log("탭 체인지", newTabIndex);
  activeTab.value = newTabIndex;
  switch (newTabIndex) {
    case 0:
      currentComponent.value = markRaw(ProjectBuildBackendConfig);
      break;
    case 1:
      currentComponent.value = markRaw(ProjectBuildFrontendConfig);
      break;
    case 2:
      currentComponent.value = markRaw(ProjectBuildDBConfig);
      break;
  }
};

const onFocusInput = () => {
  document.querySelector('.config-input').style.backgroundColor = '#e9f7ef';
};

const onBlurInput = async () => {
  document.querySelector('.config-input').style.backgroundColor = '#fff';
  await updateProjectInfoNameByProjectInfoId(selectedConfigId.value, updateConfigName.value, () => {
    sweetAlert('',"업데이트 완료");
  }, (error) => {
    console.error(error);
  });
  await storeFindAllProjectInfosByTeamId(teamId);
  allConfigs.value = projectInfos.value;
  dataLoaded.value = true;
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

.main-content {
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #f0f4f8;
  min-height: 100vh;
}

.config-container {
  width: 100%;
  max-width: 1000px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}


.config-header {
  background-color: #102a43;
  color: #ffffff;
  padding: 20px;
  text-align: center;
}

.config-header h2 {
  margin: 0;
  font-size: 24px;
}

.config-selection {
  padding: 20px;
  border-bottom: 1px solid #e2e8f0;
}

.input-group-container {
  margin-bottom: 20px;
}

.config-label {
  display: block;
  margin-bottom: 8px;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 16px;
  color: #4a5568;
  font-weight: 500;
  text-align: left;
  /* 레이블을 왼쪽으로 정렬 */
}

.input-group {
  display: flex;
  align-items: center;
  width: 100%;
}

.config-input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #cbd5e0;
  font-size: 16px;
  transition: all 0.3s ease;
}

.config-input:focus {
  border-color: #4299e1;
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  outline: none;
}

.config-select {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
}

.btn-primary {
  background-color: #4299e1;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #3182ce;
}

.config-content {
  padding: 20px;
}

.config-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 6px;
  border: 1px solid #cbd5e0;
  transition: border-color 0.3s;
}

.config-input:focus {
  border-color: #4299e1;
  outline: none;
}

.no-selection-message {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #4a5568;
}

.no-selection-message i {
  font-size: 24px;
  margin-right: 10px;
}

.nav-tabs {
  justify-content: center;
  border-bottom: 1px solid #e2e8f0;
}

.nav-tabs .nav-link {
  color: #4a5568;
  border: none;
  padding: 10px 20px;
  margin-bottom: -1px;
  transition: color 0.3s, border-color 0.3s;
}

.nav-tabs .nav-link.active {
  color: #4299e1;
  border-bottom: 2px solid #4299e1;
}

.tab-content {
  padding-top: 20px;
}

.no-selection-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-selection-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}

.no-selection-description {
  font-size: 16px;
  color: #718096;
  max-width: 400px;
  line-height: 1.5;
}

.no-selection-message i {
  font-size: 48px;
  margin-bottom: 20px;
  color: #4299e1;
}

.no-selection-message {
  text-align: center;
  padding: 40px;
  font-size: 18px;
  color: #4a5568;
  background-color: #edf2f7;
  border-radius: 8px;
  margin: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
</style>