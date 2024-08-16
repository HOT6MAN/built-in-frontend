<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  allConfigs: Array,
  selectedConfigId: Number,
  selectedIndex: Number,
});
console.log("Db props  = ", props.allConfigs);
const emits = defineEmits(["saveDBData"]);
const selectedConfigId = props.selectedConfigId;
const dbTypes = ref(['url', 'schemaName', 'username', 'password']);
const dbConfigs = ref([]);
const updateDBConfig = () => {
  if (props.selectedIndex !== -1) {
    dbConfigs.value = props.allConfigs[props.selectedIndex]?.databaseConfigs || [];
  }
};
updateDBConfig();
const dbStates = computed(() => dbConfigs.value.map(config => ({
  'url': config.url?.length > 0,
  'schemaName': config.schemaName?.length > 0,
  'username': config.username.length > 0,
  'password': config.password?.length > 0,
})));

const addDBConfig = () => {
  const newIndex = dbConfigs.value.length + 1;
  dbConfigs.value.push({ id:null, teamProjectInfoId : selectedConfigId , url: '', schemaName: '', username: '', password: '',
  isEditing: false,configName :`환경설정 ${newIndex}`,
  attatchFile : null,urlGenerated: false,
   });
  console.log(dbConfigs.value);
};

const editConfigName = (index) => {
  dbConfigs.value[index].isEditing = true;
};

const stopEditing = (index) => {
  dbConfigs.value[index].isEditing = false;
};


const removeDBConfig = (index) => {
  dbConfigs.value.splice(index, 1);
};

const saveDBData = () => {
  emits("saveDBData", dbConfigs.value);
};

const handleFileUpload = (event, index) => {
  const file = event.target.files[0];
  if (file) {
    dbConfigs.value[index].attachedFile = file;
  }
};

const generateUrl = (index) => {
  const config = dbConfigs.value[index];
  config.url = `jdbc:mysql://mysql_TPIID-${config.teamProjectInfoId}:3306/ssafy?serverTimezone=UTC&useUniCode=yes&characterEncoding=UTF-8`;
  config.urlGenerated = true;
};



watch(() => props.selectedConfigId, (newConfigId) => {
  const config = props.allConfigs.find(c => c.id === newConfigId);
  if (config) {
    dbConfigs.value = config.databaseConfigs || [];
  }
}, { immediate: true, deep: true });

watch(() => props.selectedIndex, updateDBConfig, { immediate: true });
</script>

<template>
  <div>
    <b-form>
      <div class="configWrapper">
        <b-col sm="12" class="containerTitle">
          <span class="title-text">데이터베이스</span>
          <div class="button-group">
            <b-button @click="addDBConfig" class="add-button">+ 추가</b-button>
            <b-button type="button" class="save-button" @click="saveDBData">저장</b-button>
          </div>
        </b-col>

        <div v-if="dbConfigs.length === 0" class="no-config-message">
          <i class="fas fa-info-circle"></i>
          <p>아직 저장된 환경 설정이 없습니다.</p>
          <p>빌드 및 배포하실 환경 정보를 입력해보세요.</p>
        </div>


        <div v-else v-for="(db, index) in dbConfigs" :key="'db-' + index" class="configContainer">
          <div class="configBuildContainer">
            <div class="configHeader">
              <span v-if="!db.isEditing" class="configTitle" @dblclick="editConfigName(index)">{{ db.configName }}</span> <!-- configName 바인딩 -->
              <input v-else type="text" v-model="db.configName" @blur="stopEditing(index)" @keyup.enter="stopEditing(index)" class="configTitleInput" />
              <b-button @click="removeDBConfig(index)" variant="danger" size="sm" class="remove-button">삭제</b-button>
            </div>
            <div class="buildContainer">
              <b-container>
                <b-row v-for="type in dbTypes" :key="type" class="inputBox">
                  <b-col sm="3" class="inputTitle">
                    <label :for="'db-' + type + '-' + index">{{ type }}</label>
                  </b-col>
                  <b-col sm="9">
                    <div class="input-button-container">
                      <b-form-input
                        :id="'db-' + type + '-' + index"
                        v-model="db[type]"
                        :state="dbStates[index][type]"
                        aria-describedby="'input-live-feedback-db-' + type + '-' + index"
                        placeholder="입력해주세요"
                        trim
                        :readonly="type === 'url'"
                        :class="{ 'url-input': type === 'url' }"
                      ></b-form-input>
                      <b-button 
                        v-if="type === 'url'"
                        @click="generateUrl(index)" 
                        class="generate-button"
                      >
                        생성
                      </b-button>
                    </div>
                    <b-form-invalid-feedback :id="'input-live-feedback-db-' + type + '-' + index">
                      아직 채워지지 않았군요!
                    </b-form-invalid-feedback>
                    <small v-if="type === 'url' && db.urlGenerated" class="url-info">
                      application jdbc url에 해당 주소를 입력해주세요.
                    </small>
                  </b-col>
                </b-row>
                <b-row class="inputBox">
                  <b-col sm="3" class="inputTitle">
                    <label :for="'db-file-' + index">파일 첨부</label>
                  </b-col>
                  <b-col sm="8">
                    <input
                      type="file"
                      :id="'db-file-' + index"
                      @change="handleFileUpload($event, index)"
                      class="file-input"
                    />
                    <span v-if="db.attachedFile" class="file-name">{{ db.attachedFile.name }}</span>
                  </b-col>
                </b-row>
              </b-container>
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

.b-form-input {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f5f7fa;
  color: #2e3440;
  border-radius: 6px;
  border: 1px solid #d8dee9;
  padding: 10px;
  font-size: 14px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.b-form-input:focus {
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

.input-button-container {
  display: flex;
  align-items: center;
}

.url-input {
  flex-grow: 1;
  margin-right: 10px;
}

.generate-button {
  flex-shrink: 0;
  background-color: #5e81ac;
  color: #ffffff;
  font-family: 'Noto Sans KR';
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.generate-button:hover {
  background-color: #81a1c1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.url-info {
  color: #4c566a;
  margin-top: 5px;
  font-size: 12px;
  display: block;
}

/* Adjust the layout for better spacing */
.inputBox {
  margin-bottom: 15px;
}

.inputTitle {
  margin-bottom: 0;
}
</style>