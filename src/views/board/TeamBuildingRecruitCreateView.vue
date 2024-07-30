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

        <b-form-group label="Thumbnail">
          <input type="file" ref="thumbnailInput" accept="image/*" @change="handleFileChange" > 
          <b-img v-if="thumbnailPreview" :src="thumbnailPreview" alt="image preview" fluid/>
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

        <b-form-group label="Contents">
          <b-form-textarea
            id="textarea-formatter"
            v-model="contents"
            size="lg"
            no-resize
          ></b-form-textarea>
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
const thumbnail = ref('')
const thumbnailPreview = ref('')
const thumbnailInput = ref('')
const domain = ref([])
const desiredPosList = ref([])
const contents = ref('')
const introduction = ref('')

const onSubmit = () => {
  const form = new FormData();
  form.append('teamId', selectedTeam.value);
  form.append('thumbnail', thumbnail.value);
  form.append('domain', domain.value[0]);
  form.append('desiredPosList', JSON.stringify(desiredPosList.value));
  form.append('contents', contents.value);
  form.append('introduction', introduction.value);
  form.append('authorId', 1); // TODO: logged in user id

  registerRecruit(
    form,
    (resp) => {
      if (resp.status === 201) {
        router.push({path: '/teambuilding', query: {redirectYN: true, msg: 'Success Create'}})
        .then(() => router.replace({path: '/teambuilding'}))
      }
    }, 
    (err) => console.error(err)
  );  
}

const onReset = () => {
  selectedTeam.value = ''
  thumbnail.value = ''
  thumbnailPreview.value = ''  
  thumbnailInput.value.value = ''
  domain.value = []
  desiredPosList.value = []
  introduction.value = ''
  contents.value = ''
}

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    thumbnail.value = file;

    const reader = new FileReader();
    reader.onload = (e) => { thumbnailPreview.value = e.target.result; };
    reader.readAsDataURL(file);
  }
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
