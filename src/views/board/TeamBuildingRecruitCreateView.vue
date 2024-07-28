<template>
  <div>     
    <div class="page container">      
      <h1 class="title">모집 게시글 생성</h1>
      <b-form class="form" @submit.prevent="onSubmit" @reset.prevent="onReset">
        <b-form-group label="Team" for="team">
          <b-form-select
            id="team"
            :options="teamList"
            v-model="selectedTeam"
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
            v-model="introduction"
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
import { useRouter } from 'vue-router';
import { findTeamList, registerRecruit } from '@/api/teambuilding.js'

const router = useRouter()

const teamList = ref([])
const params = {
  'memberId': 1
}

findTeamList(params, (resp) => {
  teamList.value = resp.data.data.map(item => ({ text: item.name, value: item.id }));
}, (err) => console.error(err))

const limitCnt = 1

const selectedTeam = ref('')
const domain = ref([])
const desiredPosList = ref([])
const introduction = ref('')

const onSubmit = () => {
  registerRecruit({
    teamId: selectedTeam.value, 
    domain: domain.value[0], 
    desiredPosList: desiredPosList.value,
    introduction: introduction.value,
    authorId: 1
  }, (resp) => {
    if (resp.status === 201) {      
      router.push({path: '/teambuilding', query: {redirectYN: true, msg: 'Success Create'}})
    }
  }, (err) => console.error(err))
}

const onReset = () => {
  selectedTeam.value = ''
  domain.value = []
  desiredPosList.value = []
  introduction.value = ''
}
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
