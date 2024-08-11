<template>
  <div class="outer-container">
    <div class="configurations-container">
      <div class="config-header">
        <h2>빌드 및 배포 프로젝트 관리</h2>
      </div>
      <div v-for="configItem in allConfigByComponent" :key="configItem.id" class="config-group">
        <h2>현재 실행중인 프로젝트 : {{ configItem.title }}</h2>

        <section v-if="configItem.backendConfigs && configItem.backendConfigs.length" class="config-section">
          <div class="config-category">
            <h3>Backend</h3>
          </div>
          <div class="config-cards">
            <div class="config-card" v-for="config in configItem.backendConfigs" :key="config.id" @click="openModal(config, 'backend')">
              <p><strong>{{ config.configName }}</strong></p>
              <p>{{ config.language }} {{ config.languageVersion }}</p>
            </div>
          </div>
        </section>

        <section v-if="configItem.frontendConfigs && configItem.frontendConfigs.length" class="config-section">
          <div class="config-category">
            <h3>Frontend</h3>
          </div>
          <div class="config-cards">
            <div class="config-card" v-for="config in configItem.frontendConfigs" :key="config.id" @click="openModal(config, 'frontend')">
              <p><strong>{{ config.configName }}</strong></p>
              <p>{{ config.framework }} {{ config.version }}</p>
            </div>
          </div>
        </section>

        <section v-if="configItem.databaseConfigs && configItem.databaseConfigs.length" class="config-section">
          <div class="config-category">
            <h3>Database</h3>
          </div>
          <div class="config-cards">
            <div class="config-card" v-for="config in configItem.databaseConfigs" :key="config.id" @click="openModal(config, 'database')">
              <p><strong>{{ config.configName }}</strong></p>
              <p>{{ config.url }}</p>
            </div>
          </div>
        </section>
        <div  class="build-button-container">
          <button class="build-button" @click="stopBuildDeploy">
            빌드/배포 종료
          </button>
        </div>
      </div>

      <!-- Custom Modal -->
      <div v-if="showModal" class="modal-backdrop" @click.self="closeModal">
        <div class="custom-modal">
          <div class="modal-header">
            <h3>상세 환경 설정 정보</h3>
          </div>
          <div class="modal-body">
            <div v-if="selectedConfig && modalType === 'backend'">
              <p><strong>Build Tool:</strong> {{ selectedConfig.buildTool }}</p>
              <p><strong>Git URL:</strong> {{ selectedConfig.gitUrl }}</p>
              <p><strong>Git Branch:</strong> {{ selectedConfig.gitBranch }}</p>
              <p><strong>Language:</strong> {{ selectedConfig.language }}</p>
              <p><strong>Language Version:</strong> {{ selectedConfig.languageVersion }}</p>
            </div>
            <div v-if="selectedConfig && modalType === 'frontend'">
              <p><strong>Framework:</strong> {{ selectedConfig.framework }}</p>
              <p><strong>Version:</strong> {{ selectedConfig.version }}</p>
              <p><strong>Git URL:</strong> {{ selectedConfig.gitUrl }}</p>
              <p><strong>Git Branch:</strong> {{ selectedConfig.gitBranch }}</p>
            </div>
            <div v-if="selectedConfig && modalType === 'database'">
              <p><strong>URL:</strong> {{ selectedConfig.url }}</p>
              <p><strong>Schema Name:</strong> {{ selectedConfig.schemaName }}</p>
              <p><strong>Username:</strong> {{ selectedConfig.username }}</p>
            </div>
            <button class="modal-button" @click="viewLogs(selectedConfig.id, selectedConfig.id, modalType)">실시간 로그 보기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue';
import {buildStop} from '@/api/project.js';

const props = defineProps({
  allConfigs: Array,
});
const emits = defineEmits(["viewLogs"]);

const allConfigByComponent = ref([]);
const selectedConfig = ref(null);
const showModal = ref(false);
const modalType = ref('');

onMounted(() => {
  allConfigByComponent.value = props.allConfigs;
});

const openModal = (config, type) => {
  selectedConfig.value = config;
  modalType.value = type;
  showModal.value = true;

  // Focus on modal when opened
  document.body.classList.add('modal-open');
};

const closeModal = () => {
  showModal.value = false;
  document.body.classList.remove('modal-open');
};

const stopBuildDeploy = async ()=>{
  const serviceScheduleId = allConfigByComponent.value[0].serviceScheduleId;
  if(confirm("정말 배포를 종료하시겠습니까?")){
    await buildStop(serviceScheduleId, (response)=>{

    },(error)=>{
      console.log(error);
    })
  }
}

const viewLogs = (projectInfoId, configId, type) => {
  const dataObject = {
    projectInfoId: allConfigByComponent.value[0].id,
    serviceScheduleId: allConfigByComponent.value[0].serviceScheduleId,
    configId: configId,
    type: type,
  };
  emits("viewLogs", dataObject);
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

.outer-container {
  padding: 20px;
  border: 2px solid #102a43;
  border-radius: 8px;
  background-color: #ffffff;
}

.configurations-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.config-header {
  background-color: #102a43;
  color: #ffffff;
  padding: 20px;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}

.config-group {
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #d1d5db;
}

.config-section {
  margin-bottom: 20px;
  border-top: 1px solid #e2e8f0;
  padding-top: 20px;
}

.config-category h3 {
  text-align: left;
  font-family: 'Noto Sans KR', sans-serif;
}

h2, h3 {
  margin-top: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.config-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.config-card {
  background-color: #ffffff;
  padding: 30px;
  flex: 1;
  min-width: 200px;
  max-width: calc(33.333% - 30px);
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
  border: 1px solid #e2e8f0;
}

.config-card:hover {
  transform: translateY(-5px);
}

.config-card p {
  margin: 0;
  font-size: 14px;
  font-family: 'Noto Sans KR', sans-serif;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.custom-modal {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 500px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1001;
}

.modal-header {
  background-color: #102a43;
  color: #ffffff;
  padding: 10px;
  text-align: center;
  border-radius: 8px 8px 0 0;
  font-family: 'Noto Sans KR', sans-serif;
}

.modal-body {
  padding: 20px;
  font-family: 'Noto Sans KR', sans-serif;
}

.modal-button {
  background-color: #102a43;
  color: #ffffff;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  display: block;
  width: 100%;
  text-align: center;
}

.modal-button:hover {
  background-color: #0f1e36;
}

/* Disable body scroll when modal is open */
.modal-open {
  overflow: hidden;
}

.build-button-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.build-button {
  background-color: #102a43;
  color: #ffffff;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 18px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}
</style>

