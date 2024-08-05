<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  allConfigs: Array,
  selectedConfigId: Number,
  selectedIndex: Number,
});
console.log("all = ", props.allConfigs);
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
  dbConfigs.value.push({ id:null, teamProjectInfoId : selectedConfigId , url: '', schemaName: '', username: '', password: '' });
  console.log(dbConfigs.value);
};

const removeDBConfig = (index) => {
  dbConfigs.value.splice(index, 1);
};

const saveDBData = () => {
  emits("saveDBData", dbConfigs.value);
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
    <b-button @click="addDBConfig" class="mb-3">+ 추가</b-button>
    <b-form>
      <b-col sm="4" class="containerTitle">DB</b-col>
      <div v-for="(db, index) in dbConfigs" :key="'db-' + index" class="configContainer">
        <div class="configBuildContainer">
          <b-col sm="4" class="containerTitle">
            환경 설정 {{ index + 1 }}
            <b-button @click="removeDBConfig(index)" variant="danger" size="sm" class="ml-2">x</b-button>
          </b-col>
          <div class="buildContainer">
            <b-container>
              <b-row v-for="type in dbTypes" :key="type" class="inputBox">
                <b-col sm="3" class="inputTitle"><label :for="'db-' + type + '-' + index">{{ type }}</label></b-col>
                <b-col sm="8">
                  <b-form-input
                    :id="'db-' + type + '-' + index"
                    v-model="db[type]"
                    :state="dbStates[index][type]"
                    aria-describedby="'input-live-feedback-db-' + type + '-' + index"
                    placeholder="입력해주세요"
                    trim
                  ></b-form-input>
                  <b-form-invalid-feedback :id="'input-live-feedback-db-' + type + '-' + index">
                    아직 채워지지 않았군요!
                  </b-form-invalid-feedback>
                </b-col>
              </b-row>
            </b-container>
          </div>
        </div>
      </div>
      <b-button type="submit" class="saveButton" @click="saveDBData">저장</b-button>
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
