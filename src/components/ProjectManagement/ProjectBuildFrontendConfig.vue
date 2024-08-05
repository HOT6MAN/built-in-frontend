<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  allConfigs: Array,
  selectedConfigId: Number,
  selectedIndex: Number,
});
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
  console.log("FrontendConfigs = ", frontendConfigs.value);
  frontendConfigs.value.push({ id: null, teamProjectInfoId: selectedConfigId, gitUrl: '', gitAccessToken: '', gitBranch: '', gitUsername: '', framework: null, version: null });
  console.log("After value input = ", frontendConfigs.value);
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
    <b-button @click="addFrontendConfig" class="mb-3">+ 추가</b-button>
    <b-form>
      <b-col sm="4" class="containerTitle">프론트엔드</b-col>
      <div v-for="(frontend, index) in frontendConfigs" :key="'frontend-' + index" class="configContainer">
        <div class="configBuildContainer">
          <b-col sm="4" class="containerTitle">
            환경 설정 {{ index + 1 }}
            <b-button @click="removeFrontendConfig(index)" variant="danger" size="sm" class="ml-2">x</b-button>
          </b-col>
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
                  <b-col sm="3" class="dropdownTitle">
                    <label>Framework</label>
                  </b-col>
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
                  <b-col sm="3" class="dropdownTitle">
                    <label>Version</label>
                  </b-col>
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
      <b-button type="submit" class="saveButton" @click="saveFrontendData">저장</b-button>
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
