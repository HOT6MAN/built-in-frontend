<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  allConfigs: Array,
  selectedConfigId: Number,
  selectedIndex: Number,
});
const emits = defineEmits(["saveBackendData"]);

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
  backendConfigs.value.push({ id: null, teamProjectInfoId: selectedConfigId, gitUrl: '', gitAccessToken: '', gitBranch: '', gitUsername: '', language: null, languageVersion: null, buildTool: null });
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

<template>
  <div>
    <b-button @click="addBackendConfig" class="mb-3">+ 추가</b-button>
    <b-form>
      <b-col sm="4" class="containerTitle">백엔드</b-col>
      <div v-for="(backend, index) in backendConfigs" :key="'backend-' + index" class="configContainer">
        <div class="configBuildContainer">
          <b-col sm="4" class="containerTitle">
            환경 설정 {{ index + 1 }}
            <b-button @click="removeBackendConfig(index)" variant="danger" size="sm" class="ml-2">x</b-button>
          </b-col>
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
      <b-button type="button" class="saveButton" @click="saveBackendData">저장</b-button>
    </b-form>
  </div>
</template>

<style scoped>
.configContainer {
  position: relative;
  margin-bottom: 20px;
}
.configBuildContainer {
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: #4a5468;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  color: white;
  font-size: 21px;
  font-family: var(--font-roboto);
}
.buildContainer {
  font-weight: 500;
  display: flex;
  flex-direction: column;
}
.containerTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin: 10px;
  font-size: 30px;
  background-color: #2d3648;
  color: white;
  padding: 10px;
}
.inputBox {
  height: 70px;
}
.inputTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.dropdownBox {
  position: relative;
  vertical-align: middle;
  height: 50px;
}
.dropdownTitle {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
}
.saveButton {
  position: relative;
  border-radius: var(--radius-200);
  color: black;
  font-weight: 600;
  background-color: #a0abc0;
  border: 1px solid #ffedad;
  box-sizing: border-box;
  width: 201px;
  height: 40px;
  align-items: center;
  margin-left: auto;
  margin-top: 20px;
}
</style>
