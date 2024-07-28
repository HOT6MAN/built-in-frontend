<template>
  <div>        
    <div class="page container">      
      <h1 class="title">모집 게시글 생성</h1>
      <b-form class="form">
        <b-form-group label="Team" for="team">
          <b-form-select
            id="team"
            :options="teamList"
            required
          ></b-form-select>
        </b-form-group>

        <b-form-group label="Domain" for="domain">
          <b-form-tags 
          input-id="domain"           
          :limit="limitCnt"
          tag-variant="primary"
          tag-pills
          placeholder="Enter domain"
          v-model="domain" 
          remove-on-delete />
        </b-form-group>

        <b-form-group label="Desired positions" for="desired-positions">
          <b-form-tags
            input-id="desired-positions"            
            tag-variant="primary"
            tag-pills
            separator=" "
            placeholder="Enter desired positions separated by space"
            v-model="desiredPosList" />          
        </b-form-group>

        <b-form-group label="Introduction" for="introduction">
          <b-form-input
            id="introduction"
            type="text"
            required />          
        </b-form-group>
      
        <b-form-group class="d-flex justify-content-center mt-3">
          <b-button type="submit" variant="primary" class="mx-1">Submit</b-button>
          <b-button type="reset" variant="danger" class="mx-1">Reset</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const teamList = ['A', 'B', 'C', 'D']
const domain = ref([])
const desiredPosList = ref([])
const limitCnt = ref(1)
</script>

<style scoped>
  .title {
    text-align: center;
    margin-bottom: 50px;
  }

  .page {
    margin-top: 130px;
    max-width: 600px;
  }  
</style>
