<template>
  <div>
    <b-form>
      <div class="configWrapper">
        <b-col sm="12" class="containerTitle">
          <span class="title-text">백엔드</span>
          <div class="button-group">
            <b-button @click="addBackendConfig" class="add-button">+ 추가</b-button>
            <b-button type="button" class="save-button" @click="saveBackendData">저장</b-button>
          </div>
        </b-col>
        <div v-if="backendConfigs.length === 0" class="no-config-message">
          <i class="fas fa-info-circle"></i>
          <p>아직 저장된 환경 설정이 없습니다.</p>
          <p>빌드 및 배포하실 환경 정보를 입력해보세요.</p>
        </div>
        <div v-else  v-for="(backend, index) in backendConfigs" :key="'backend-' + index" class="configContainer">
          <div class="configBuildContainer">
            <div class="configHeader">
              <span v-if="!backend.isEditing" class="configTitle" @dblclick="editConfigName(index)">{{ backend.configName }}</span> <!-- configName 바인딩 -->
              <input v-else type="text" v-model="backend.configName" @blur="stopEditing(index)" @keyup.enter="stopEditing(index)" class="configTitleInput" />
              <b-button @click="removeBackendConfig(index)" variant="danger" size="sm" class="remove-button">삭제</b-button>
            </div>
            <div class="buildContainer">
              <b-container>
                <b-row v-for="type in backendTypes" :key="type" class="inputBox">
                  <b-col sm="3" class="inputTitle">
                    <label :for="'backend-' + type + '-' + index">{{ type }}</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      :id="'backend-' + type + '-' + index"
                      v-model="backend[type]"
                      :state="backendStates[index][type]"
                      aria-describedby="'input-live-feedback-backend-' + type + '-' + index"
                      placeholder="입력해주세요"
                      trim
                    ></b-form-input>
                    <b-form-invalid-feedback :id="'input-live-feedback-backend-' + type + '-' + index">
                      아직 채워지지 않았군요!
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
              </b-container>
              <div class="dropdownContainer">
                <b-form-group class="dropdownBox">
                  <b-row>
                    <b-col sm="3" class="dropdownTitle"><label>Language</label></b-col>
                    <b-col sm="4">
                      <b-form-select
                        :id="'backend-language-' + index"
                        v-model="backend.language"
                        :options="languages"
                        @change="updateVersions(index)"
                        required
                      ></b-form-select>
                    </b-col>
                    <b-col sm="4">
                      <b-form-select
                        :id="'backend-language-version-' + index"
                        v-model="backend.languageVersion"
                        :options="getLanguageVersions(backend.language)"
                        required
                      ></b-form-select>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-group class="dropdownBox">
                  <b-row>
                    <b-col sm="3" class="dropdownTitle"><label>Build-Tool</label></b-col>
                    <b-col sm="8">
                      <b-form-select
                        :id="'backend-buildTool-' + index"
                        v-model="backend.buildTool"
                        :options="buildTools"
                        required
                      ></b-form-select>
                    </b-col>
                  </b-row>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  allConfigs: Array,
  selectedConfigId: Number,
  selectedIndex: Number,
});
const emits = defineEmits(["saveBackendData"]);

console.log("backend Props = ",props);

const backendTypes = ref(['gitUrl', 'gitAccessToken', 'gitBranch', 'gitUsername']);
const backendConfigs = ref([]);
const selectedConfigId = props.selectedConfigId;
const updateBackendConfigs = () => {
  if (props.selectedIndex !== -1) {
    backendConfigs.value = props.allConfigs[props.selectedIndex]?.backendConfigs || [];
  }
};
updateBackendConfigs();

const backendStates = computed(() => backendConfigs.value.map(config => ({
  'Git-url': config.gitUrl?.length > 0,
  'Git-Access-Token': config.gitAccessToken?.length > 0,
  'Git-Branch': config.gitBranch?.length > 0,
  'Git-Username': config.gitUsername ? config.gitUsername.length > 0 : false,
  'language': config.language !== null,
  'languageVersion': config.languageVersion !== null,
  'buildTool': config.buildTool !== null,
})));

const languages = ref([
  { text: '하나 골라주세요', value: null },
  'Java/Spring',
  'C++/NET',
  'Python/Django',
]);

const languageVersions = {
  'Java/Spring': ['1.8', '11', '17'],
  'C++/NET': ['2015', '2017', '2019'],
  'Python/Django': ['2.7', '3.6', '3.9']
};

const buildTools = ref([
  { text: '하나 골라주세요', value: null },
  'Gradle',
  'Maven',
  '빌드 도구 3',
  '빌드 도구 4',
]);

const addBackendConfig = () => {
  const newIndex = backendConfigs.value.length + 1;
  backendConfigs.value.push({ 
    id: null, 
    teamProjectInfoId: selectedConfigId, 
    configName :`환경설정 ${newIndex}`,
    gitUrl: '', 
    gitAccessToken: '', 
    gitBranch: '', 
    gitUsername: '', 
    language: null, 
    languageVersion: null, 
    buildTool: null,
    isEditing: false
  });
};

const editConfigName = (index) => {
  backendConfigs.value[index].isEditing = true;
};

const stopEditing = (index) => {
  backendConfigs.value[index].isEditing = false;
};

const removeBackendConfig = (index) => {
  backendConfigs.value.splice(index, 1);
};

const updateVersions = (index) => {
  backendConfigs.value[index].languageVersion = null;
};

const getLanguageVersions = (language) => {
  return language ? languageVersions[language].map(version => ({ text: version, value: version })) : [];
};

const saveBackendData = () => {
  console.log(backendConfigs.value);
  emits("saveBackendData", backendConfigs.value);
};

watch(() => props.selectedConfigId, updateBackendConfigs, { immediate: true });
watch(() => props.selectedIndex, updateBackendConfigs, { immediate: true });
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');
@import url('https://webfontworld.github.io/NexonMaplestory/NexonMaplestory.css');

.configWrapper {
  border: 2px solid #d8dee9;
  border-radius: 12px;
  padding: 20px;
  background-color: #f0f4f8;
  margin-bottom: 20px;
}

.configContainer {
  position: relative;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: 'Noto Sans KR', sans-serif;
}

.configBuildContainer {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  color: #2e3440;
  font-size: 16px;
  border-radius: 12px;
  overflow: hidden;
}

.buildContainer {
  font-weight: 500;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid #d8dee9;
  border-top: none;
  border-radius: 0 0 12px 12px;
}

.containerTitle {
  font-family: 'Noto Sans KR'; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 0;
  font-size: 28px;
  background-color: #eceff4;
  color: #2e3440;
  padding: 12px 20px;
  border-radius: 12px 12px 0 0;
}

.configHeader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #102a43;
  padding: 15px 20px;
  border-bottom: 1px solid #d8dee9;
}

.configHeader:hover{
  cursor: pointer;
}

.configTitle {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.title-text {
  font-weight: bold;
}

/* 버튼 스타일 변경 */
.button-group {
  display: flex;
  gap: 10px;
}

.add-button, .save-button, .remove-button {
  font-family: 'Noto Sans KR';
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.add-button {
  background-color: #5e81ac; /* 파란 계열 */
  color: #ffffff;
}

.add-button:hover {
  background-color: #81a1c1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.save-button {
  background-color: #4c566a; /* 회색 계열 */
  color: #ffffff;
}

.save-button:hover {
  background-color: #434c5e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-button {
  background-color: #bf616a; /* 붉은 계열 */
  color: #ffffff;
  padding: 8px 16px;
  font-size: 16px;
  border-radius: 8px;
}

.remove-button:hover {
  background-color: #d08770;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.inputBox {
  height: 60px;
  margin-bottom: 20px;
}

.inputTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #2e3440;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.dropdownBox {
  position: relative;
  vertical-align: middle;
  margin-bottom: 20px;
}

.dropdownTitle {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: #2e3440;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 5px;
}

.b-form-input,
.b-form-select {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f5f7fa;
  color: #2e3440;
  border-radius: 6px;
  border: 1px solid #d8dee9;
  padding: 10px;
  font-size: 14px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.b-form-input:focus,
.b-form-select:focus {
  background-color: #f5f7fa;
  color: #2e3440;
  outline: none;
  box-shadow: 0 0 0 3px rgba(136, 192, 208, 0.2);
  border-color: #88c0d0;
}

.b-button {
  background-color: #81a1c1;
  color: #f5f7fa;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.b-button:hover {
  background-color: #8fbcbb;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.b-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(143, 188, 187, 0.5);
}

.saveButton {
  background-color: #8fbcbb;
  color: #2e3440;
  font-weight: 700;
  border-radius: 8px;
  padding: 12px 24px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  width: auto;
  height: auto;
  margin-left: auto;
  margin-top: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.saveButton:hover {
  background-color: #81a1c1;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.saveButton:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(129, 161, 193, 0.5);
}

.b-form-invalid-feedback {
  color: #bf616a;
}

.no-config-message {
  text-align: center;
  padding: 40px;
  background-color: #e5e9f0;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  font-family: 'Noto Sans KR', sans-serif;
  color: #4c566a;
}

.no-config-message i {
  font-size: 48px;
  margin-bottom: 20px;
  color: #5e81ac;
}

.no-config-message p {
  font-size: 18px;
  margin: 10px 0;
}

.no-config-message p:first-of-type {
  font-weight: bold;
  font-size: 22px;
  color: #3b4252;
}

.configTitleInput {
  font-size: 20px;
  font-weight: 700;
  color: #000000;
  background-color: #FFFFFF;
  border: none;
  padding: 0;
  outline: none;
  width: 100%;
}
</style>