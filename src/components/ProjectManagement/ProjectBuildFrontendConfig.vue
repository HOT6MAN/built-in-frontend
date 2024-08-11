<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  allConfigs: Array,
  selectedConfigId: Number,
  selectedIndex: Number,
});

console.log("Frontend Props = ",props);
const emits = defineEmits(["saveFrontendData"]);
const selectedConfigId = props.selectedConfigId;
const frontendTypes = ref(['gitUrl', 'gitAccessToken', 'gitBranch', 'gitUsername']);
const frontendConfigs = ref([]);
const updateFrontendConfig = () => {
  if (props.selectedIndex !== -1) {
    frontendConfigs.value = props.allConfigs[props.selectedIndex]?.frontendConfigs || [];
  }
};
updateFrontendConfig();
console.log("after update frontend configs = ", frontendConfigs.value);

const frontendStates = computed(() => frontendConfigs.value.map(config => ({
  'FrontEndUrl': config.gitUrl?.length > 0,
  'FrontEndToken': config.gitAccessToken?.length > 0,
  'FrontEndBranch': config.gitBranch?.length > 0,
  'userName': config.gitUsername.length > 0,
  'frontEnd': config.frontEnd !== null,
})));

const frontEndFrameworkOptions = ref([
  { text: '하나 골라주세요', value: null },
  { text: 'Vue.js', value: 'Vue.js' },
  { text: 'React', value: 'React' },
  { text: 'Angular', value: 'Angular' },
]);

const frameworkVersions = {
  'Vue.js': ['2.5.22', '2.6.14', '3.0.0', '3.1.5', '3.2.37'],
  'React': ['16.8.6', '16.13.1', '17.0.2', '18.0.0', '18.2.0'],
  'Angular': ['10.2.5', '11.2.14', '12.2.13', '13.3.9', '14.2.10']
};

const addFrontendConfig = () => {
  const newIndex = frontendConfigs.value.length + 1;
  console.log("FrontendConfigs = ", frontendConfigs.value);
  frontendConfigs.value.push(
    { id: null, 
      teamProjectInfoId: selectedConfigId, 
      configName :`환경설정 ${newIndex}`,
      gitUrl: '', 
      gitAccessToken: '', 
      gitBranch: '', 
      gitUsername: '', 
      framework: null, 
      version: null,
      isEditing: false
    }
  );
  console.log("After value input = ", frontendConfigs.value);
};

const editConfigName = (index) => {
  frontendConfigs.value[index].isEditing = true;
};

const stopEditing = (index) => {
  frontendConfigs.value[index].isEditing = false;
};

const removeFrontendConfig = (index) => {
  frontendConfigs.value.splice(index, 1);
  console.log("After removal = ", frontendConfigs.value);
};

const updateVersions = (index) => {
  frontendConfigs.value[index].version = null;
};

const getVersionOptions = (framework) => {
  return framework ? frameworkVersions[framework].map(version => ({ text: version, value: version })) : [];
};

const saveFrontendData = () => {
  emits("saveFrontendData", frontendConfigs.value);
};

watch(
  () => props.selectedConfigId,
  (newConfigId) => {
    const config = props.allConfigs.find(c => c.id === newConfigId);
    if (config) {
      frontendConfigs.value = config.frontendConfigs || [];
    }
  },
  { immediate: true, deep: true }
);
</script>

<template>
  <div>
    <b-form>
      <div class="configWrapper">
        <b-col sm="12" class="containerTitle">
          <span class="title-text">프론트엔드</span>
          <div class="button-group">
            <b-button @click="addFrontendConfig" class="add-button">+ 추가</b-button>
            <b-button type="button" class="save-button" @click="saveFrontendData">저장</b-button>
          </div>
        </b-col>
        <div v-if="frontendConfigs.length === 0" class="no-config-message">
          <i class="fas fa-info-circle"></i>
          <p>아직 저장된 환경 설정이 없습니다.</p>
          <p>빌드 및 배포하실 환경 정보를 입력해보세요.</p>
        </div>
        <div v-else  v-for="(frontend, index) in frontendConfigs" :key="'frontend-' + index" class="configContainer">
          <div class="configBuildContainer">
            <div class="configHeader">
              <span v-if="!frontend.isEditing" class="configTitle" @dblclick="editConfigName(index)">{{ frontend.configName }}</span> <!-- configName 바인딩 -->
              <input v-else type="text" v-model="frontend.configName" @blur="stopEditing(index)" @keyup.enter="stopEditing(index)" class="configTitleInput" />
              <b-button @click="removeFrontendConfig(index)" variant="danger" size="sm" class="remove-button">삭제</b-button>
            </div>
            <div class="buildContainer">
              <b-container>
                <b-row v-for="type in frontendTypes" :key="type" class="inputBox">
                  <b-col sm="3" class="inputTitle">
                    <label :for="'frontend-' + type + '-' + index">{{ type }}</label>
                  </b-col>
                  <b-col sm="8">
                    <b-form-input
                      :id="'frontend-' + type + '-' + index"
                      v-model="frontend[type]"
                      :state="frontendStates[index][type]"
                      aria-describedby="'input-live-feedback-frontend-' + type + '-' + index"
                      placeholder="입력해주세요"
                      trim
                    ></b-form-input>
                    <b-form-invalid-feedback :id="'input-live-feedback-frontend-' + type + '-' + index">
                      아직 채워지지 않았군요!
                    </b-form-invalid-feedback>
                  </b-col>
                </b-row>
              </b-container>
              <div class="dropdownContainer">
                <b-form-group class="dropdownBox">
                  <b-row>
                    <b-col sm="3" class="dropdownTitle"><label>Framework</label></b-col>
                    <b-col sm="8">
                      <b-form-select
                        :id="'frontend-framework-' + index"
                        v-model="frontend.framework"
                        :options="frontEndFrameworkOptions"
                        @change="updateVersions(index)"
                        required
                      ></b-form-select>
                    </b-col>
                  </b-row>
                </b-form-group>
                <b-form-group class="dropdownBox">
                  <b-row>
                    <b-col sm="3" class="dropdownTitle"><label>Version</label></b-col>
                    <b-col sm="8">
                      <b-form-select
                        :id="'frontend-version-' + index"
                        v-model="frontend.version"
                        :options="getVersionOptions(frontend.framework)"
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

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700&display=swap');

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

.configTitle {
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
}

.title-text {
  font-weight: bold;
}

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
  background-color: #5e81ac;
  color: #ffffff;
}

.add-button:hover {
  background-color: #81a1c1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.save-button {
  background-color: #4c566a;
  color: #ffffff;
}

.save-button:hover {
  background-color: #434c5e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.remove-button {
  background-color: #bf616a;
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

.configHeader:hover{
  cursor: pointer;
}
</style>