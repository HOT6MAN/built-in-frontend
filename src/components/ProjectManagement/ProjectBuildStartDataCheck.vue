<script setup>
import { ref } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  config: Object
});

const backendVisible = ref(true);
const frontendVisible = ref(true);
const databaseVisible = ref(true);

const toggleVisibility = (section) => {
  if (section === 'backend') {
    backendVisible.value = !backendVisible.value;
  } else if (section === 'frontend') {
    frontendVisible.value = !frontendVisible.value;
  } else if (section === 'database') {
    databaseVisible.value = !databaseVisible.value;
  }
};
</script>

<template>
  <div class="config-details">
    <h3>Selected Config Details</h3>
    <div v-if="config">
      <div class="config-section general">
        <h4>General</h4>
        <div class="field">
          <label>ID:</label>
          <input type="text" v-model="config.id" readonly>
        </div>
        <div class="field">
          <label>Title:</label>
          <input type="text" v-model="config.title" readonly>
        </div>
      </div>

      <div class="config-section backend">
        <h4 @click="toggleVisibility('backend')" class="toggle-header">
          Backend Configurations
        </h4>
        <div v-if="backendVisible">
          <div v-for="backend in config.backendConfigs" :key="backend.id" class="config-item">
            <div class="field">
              <label>ID:</label>
              <input type="text" v-model="backend.id" readonly>
            </div>
            <div class="field">
              <label>Git URL:</label>
              <input type="text" v-model="backend.gitUrl" readonly>
            </div>
            <div class="field">
              <label>Git Branch:</label>
              <input type="text" v-model="backend.gitBranch" readonly>
            </div>
            <div class="field">
              <label>Git Username:</label>
              <input type="text" v-model="backend.gitUsername" readonly>
            </div>
            <div class="field">
              <label>Language:</label>
              <input type="text" v-model="backend.language" readonly>
            </div>
            <div class="field">
              <label>Language Version:</label>
              <input type="text" v-model="backend.languageVersion" readonly>
            </div>
            <div class="field">
              <label>Build Tool:</label>
              <input type="text" v-model="backend.buildTool" readonly>
            </div>
          </div>
        </div>
      </div>

      <div class="config-section frontend">
        <h4 @click="toggleVisibility('frontend')" class="toggle-header">
          Frontend Configurations
        </h4>
        <div v-if="frontendVisible">
          <div v-for="frontend in config.frontendConfigs" :key="frontend.id" class="config-item">
            <div class="field">
              <label>ID:</label>
              <input type="text" v-model="frontend.id" readonly>
            </div>
            <div class="field">
              <label>Framework:</label>
              <input type="text" v-model="frontend.framework" readonly>
            </div>
            <div class="field">
              <label>Version:</label>
              <input type="text" v-model="frontend.version" readonly>
            </div>
            <div class="field">
              <label>Git URL:</label>
              <input type="text" v-model="frontend.gitUrl" readonly>
            </div>
            <div class="field">
              <label>Git Branch:</label>
              <input type="text" v-model="frontend.gitBranch" readonly>
            </div>
            <div class="field">
              <label>Git Username:</label>
              <input type="text" v-model="frontend.gitUsername" readonly>
            </div>
          </div>
        </div>
      </div>

      <div class="config-section database">
        <h4 @click="toggleVisibility('database')" class="toggle-header">
          Database Configurations
        </h4>
        <div v-if="databaseVisible">
          <div v-for="database in config.databaseConfigs" :key="database.id" class="config-item">
            <div class="field">
              <label>ID:</label>
              <input type="text" v-model="database.id" readonly>
            </div>
            <div class="field">
              <label>URL:</label>
              <input type="text" v-model="database.url" readonly>
            </div>
            <div class="field">
              <label>Schema Name:</label>
              <input type="text" v-model="database.schemaName" readonly>
            </div>
            <div class="field">
              <label>Username:</label>
              <input type="text" v-model="database.username" readonly>
            </div>
            <div class="field">
              <label>Password:</label>
              <input type="text" v-model="database.password" readonly>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No configuration selected.</p>
    </div>
  </div>
</template>

<style scoped>
.config-details {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.config-section {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 8px;
}

.config-section.general {
  background-color: #eef;
}

.config-section.backend {
  background-color: #efe;
}

.config-section.frontend {
  background-color: #fee;
}

.config-section.database {
  background-color: #eef;
}

.config-section h4 {
  margin-bottom: 10px;
  color: #333;
  border-bottom: 2px solid #ccc;
  padding-bottom: 5px;
  cursor: pointer;
}

.config-item {
  background-color: #fff;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.config-item + .config-item {
  margin-top: 10px;
}

.field {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

input[type="text"] {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #f9f9f9;
}
</style>
