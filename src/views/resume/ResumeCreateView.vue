<template>
  <div class="page">
    <h1 class="title">이력서 생성</h1>
    <div>
      <b-form-group label="Title">
        <b-form-input size="lg" class="text-center mb-3" />
      </b-form-group>
      <b-form-group label="Profile">
        <input type="file" ref="profileInput" accept="image/*" @change="handleFileChange" class="mb-3"> 
        <b-img v-if="profilePreview" :src="profilePreview" alt="image preview" fluid/>
      </b-form-group>
      <b-form-group label="Position">
        <b-form-tags 
          v-model="selected" 
          placeholder=""
          :limit="1" 
          tag-variant="primary"
          tag-pills
          disabled  
          class="mb-2"
        />
        <b-form-tag
          v-for="(tag, idx) in positions"
          :key="idx"
          :title="tag"
          variant="primary"              
          no-remove
          pill          
          @click="selectTag(tag)"
          class="tag-btn mx-1 mb-3"
        />
      </b-form-group>
      <b-form-group label="Tech Stack">
        <b-form-tags 
          v-model="techStack" 
          placeholder="" 
          tag-variant="primary"
          tag-pills          
          separator=" "
          is-duplicate="false"
          remove-on-delete
          class="mb-3"
        />
      </b-form-group>
      <b-form-group label="Experience">
        <div v-for="(experience, idx) in experiences" :key="idx">
          <b-card bg-variant="light" class="mb-2">
            <b-form-group label="Title" :label-for="'nested-title-' + idx">
              <b-form-input v-model="experience.title" :id="'nested-title-' + idx" />
            </b-form-group>
            <b-form-group label="Description" :label-for="'nested-description-' + idx">
              <b-form-textarea v-model="experience.description" :id="'nested-description-' + idx" rows="3" max-rows="6" no-resize />
            </b-form-group>
            <div class="d-flex justify-content-end">
              <b-button v-if="idx !== 0" variant="outline-danger" @click="removeExperience(idx)"  >Delete</b-button>
            </div>
          </b-card>
        </div>
        <b-button class="b-button-block mb-4 mx-auto" pill variant="primary" @click="addExperience">Add</b-button>
      </b-form-group>
      <b-form-group label="Comment">
        <b-form-input class="mb-3" />
      </b-form-group>
      <b-form-group class="d-flex justify-content-center mt-3">
        <b-button type="submit" variant="primary" class="mx-1">Submit</b-button>
      </b-form-group>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';

const positions = ref(['FE', 'BE', 'DevOps', 'ML', 'DBA'])
const selected = ref([])
const techStack = ref([])
const experiences = ref([{ title: '', description: '' }])

const selectTag = (tag) => { selected.value = [tag] }
const addExperience = () => {
  experiences.value.push({ title: '', description: '' })
}

const removeExperience = (idx) => {
  experiences.value.splice(idx, 1)
}
 
</script>
<style scoped>
  .page {
    padding-left: 300px;
    padding-right: 300px;
    margin-top: 130px;
  }  

  .title {
    text-align: center;
    margin-bottom: 70px;
  }

  .tag-btn {
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.3s, transform 0.3s;
  }

  .tag-btn:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
  
  .b-button-block {    
    width: 95%;
    display: block;
  }
</style>