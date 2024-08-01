<template>
  <div>
    <SideBarView class="sidebar" />
    <b-form class="configContainer" @submit.prevent="saveData">
      <div class="configBuildContainer">
        <!-- 인풋박스 -->
        <b-col sm="4" class="containerTitle">빌드 환경 설정</b-col>
        <div class="buildContainer">
        <b-container>
          <b-row v-for="type in types" :key="type" class="inputBox">
            <b-col sm="3" class="inputTitle"><label :for="'type-' + type">{{ type }}</label></b-col>
            <b-col sm="8">
            <b-form-input
              :id="'type-' + type"
              v-model="inputValues[type]"
              :state="inputStates[type]"
              aria-describedby="'input-live-feedback-' + type"
              placeholder="입력해주세요"
              trim>
            </b-form-input>
            <b-form-invalid-feedback :id="'input-live-feedback-' + type">
              아직 채워지지 않았군요!
            </b-form-invalid-feedback>
              </b-col>
            </b-row>
          </b-container>
          <div class="dropdownContainer">
          <!-- 드롭다운 -->
          <b-form-group class="dropdownBox">
            <b-row>
            <b-col sm="3" class="dropdownTitle"><label>FrontEnd</label></b-col>
            <b-col sm="8">
            <b-form-select
              id="input-3"
              v-model="form.frontEnd"
              :options="frontEnd"
              required>
            </b-form-select>
            </b-col>
            </b-row>
          </b-form-group>

          <b-form-group class="dropdownBox">
            <b-row>
            <b-col sm="3" class="dropdownTitle"><label>Language</label></b-col>
            <b-col sm="8">
            <b-form-select
              id="input-3"
              v-model="form.language"
              :options="languages"
              required>
            </b-form-select>
            </b-col>
            </b-row>
          </b-form-group>

          <b-form-group class="dropdownBox">
            <b-row>
            <b-col sm="3" class="dropdownTitle"><label>Build-Tool</label></b-col>
            <b-col sm="8">
            <b-form-select
              id="input-3"
              v-model="form.buildTool"
              :options="buildTool"
              required>
            </b-form-select>
            </b-col>
            </b-row>
          </b-form-group>
        </div>
          <b-button type="submit" class="saveButton">저장</b-button>
        </div>
      </div>
    </b-form>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { useRouter } from 'vue-router'
import SideBarView from '../Bars/SideBarView.vue'
import { sendBuildConfigForm } from '@/api/build.js'
const router = useRouter()

// html에서 input box div를 하나만 만들었기 때문에 types 변수를 for문을 통해 반복해서 만들 예정
const types = ref([
  'Git-url',
  'Git-Access-Token',
  'Git-Branch',
  'user-name',
])
// 각 input box의 값을 저장할 객체
const inputValues = reactive({});
// 각 input box의 상태를 계산할 객체
const inputStates = computed(() => {
  const states = {};
  for (const type of types.value) {
    states[type] = inputValues[type] && inputValues[type].length > 0 ? true : false
  }
  return states;
})
const inputValue = computed(()=> {
  const formValue = {};
  for (const type of types.value) {
    formValue[type] = inputValues[type];
  }
  console.log(formValue)
  return formValue;
})

// 드롭다운 메뉴
const form = ref({
  language : null,
  buildTool : null,
  frontEnd : null
});

const languages = ref([
  { text: '하나 골라주세요', value: null }, 
  'Java/Spring', 
  'C++/NET', 
  'Python/Django'
]);

const buildTool = ref([
  { text: '하나 골라주세요', value: null }, 
  'gradle', 
  'Maven', 
  '빌드 도구 3',
  '빌드 도구 4',
]);

const frontEnd = ref([
  { text: '하나 골라주세요', value: null }, 
  'Vue.js', 
  'React', 
  'Angular',
  'None',
]);

const saveData = () => {
  const formData = {
    'gitUrl' : inputValue.value['Git-url'],
    'gitAccessToken' : inputValue.value['Git-Access-Token'],
    'gitBranch' : inputValue.value['Git-Branch'],
    'userName' : inputValue.value['user-name'],
    'language' : form.value.language,
    'buildTool' : form.value.buildTool,
    'frontEnd' : form.value.frontEnd
  };
  console.log(formData)
  sendBuildConfigForm(formData, (response) => {console.log('form submitted', response)}, (error) => {console.log('submit failed', error)})
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
}
.configContainer {
  position: absolute;
  top : 80px;
  left: 220px;
  height: calc(100vh - 80px);
  width: calc(100vw - 220px);
}
.configBuildContainer {
  display: flex;
  position: relative;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  background-color: #4a5468;
  box-sizing: border-box;
  width: 80vw;
  height: auto;
  color : white;
  font-size: 21px;
  font-family: var(--font-roboto);

}
.buildContainer {
  font-weight: 500;
  padding : 20px;
  display: flex;
  flex-direction: column;
}
.containerTitle {
  display: flex;
  justify-content: center;
  position: relative;
  margin: 10px;
  font-size: 30px;
  width: 300px;
  background-color: #2D3648;
}

.buildBox {
  display: flex;
  flex-direction: row;
}
.inputBox {
  height: 70px;
}
.inputTitle {
  display: flex;
  justify-content: center;
  /* align-items: center; */
}
.dropdownBox {
  position : relative;
  vertical-align: middle;
  height: 50px;
}
.dropdownTitle {
  display: flex;
  justify-content: center;
  align-items: center;
}
.saveButton {
  position: relative;
  border-radius: var(--radius-200);
  color: black;
  font-weight: 600;
  background-color: #A0ABC0;
  border: 1px solid #ffedad;
  box-sizing: border-box;
  width: 201px;
  height: 40px;
  align-items: center;
  margin-left: auto;
}
</style>