<template>
  <div>     
    <div class="page container">      
      <h1 class="title">모집 게시글 {{ title }}</h1>
      <b-form class="form" @submit.prevent="onSubmit" @reset.prevent="onReset" @keydown.enter.prevent >
        <b-form-group label="Team" for="team">
          <b-form-input v-if="isUpdateMode" v-model="selectedTeam" disabled />
          <b-form-select
            v-if="!isUpdateMode"
            id="team"
            :options="teamList"
            v-model="selectedTeam"
            required
          >

        </b-form-select>
        </b-form-group>

        <b-form-group label="Thumbnail">
          <input type="file" ref="thumbnailInput" accept="image/*" @change="handleFileChange" > 
          <b-img v-if="thumbnailPreview" :src="thumbnailPreview" alt="image preview" fluid/>
        </b-form-group>

        <b-form-group label="Domain" for="domain">
          <b-form-tags 
            input-id="domain"           
            :limit="1"
            tag-variant="primary"
            tag-pills
            placeholder="작성 후 스페이스 바 눌러주세요" 
            v-model="domain" 
            remove-on-delete />
        </b-form-group>

        <b-form-group label="Desired positions" for="desired-positions">
          <b-form-tags
            input-id="desired-positions"            
            :limit="limitCnt"
            tag-variant="primary"
            tag-pills
            separator=" "        
            @input="onTagsDuplicate"
            placeholder="작성 후 스페이스 바 눌러주세요" 
            v-model="desiredPosList" />          
        </b-form-group>

        <b-form-group label="Introduction" for="introduction">
          <b-form-input
            id="introduction"
            type="text"
            v-model="introduction"
            required />          
        </b-form-group>

        <b-form-group label="Content">
          <b-form-textarea
            id="textarea-formatter"
            v-model="content"
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
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findTeamList, registerRecruit, getImageFromUrl, updateRecruit } from '@/api/teambuilding.js'
import { useAuthStore } from '../../stores/authStore';
import { storeToRefs } from 'pinia';
const authStore = useAuthStore();
const {userId} = storeToRefs(authStore);

const route = useRoute()
const router = useRouter()

const teamList = ref([])
const params = {
  'memberId': userId.value
}

const limitCnt = 5

const title = ref('생성')
const selectedTeam = ref('')
const thumbnail = ref('')
const thumbnailPreview = ref('')
const thumbnailInput = ref(null)
const domain = ref([])
const desiredPosList = ref([])
const content = ref('')
const introduction = ref('')

const isUpdateMode = computed(() => !!route.params.id)

const onSubmit =() => {
  isUpdateMode.value ? onUpdate(): onCreate()
}

const onCreate = () => {
  const form = new FormData();
  form.append('teamId', selectedTeam.value);
  form.append('thumbnail', thumbnail.value);
  form.append('domain', domain.value[0]);
  form.append('desiredPosList', JSON.stringify(desiredPosList.value));
  form.append('content', content.value);
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

const onUpdate = () => {
  const id = route.params.id
  
  const form = new FormData();
  form.append('thumbnail', thumbnail.value);
  form.append('domain', domain.value[0]);
  form.append('desiredPosList', JSON.stringify(desiredPosList.value));
  form.append('content', content.value);
  form.append('introduction', introduction.value);

  updateRecruit(id, form, 
    (resp) => {
      if (resp.status === 204) {
        router.push({path: '/teambuilding', query: {redirectYN: true, msg: 'Success Update'}})
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
  content.value = ''
}

const onTagsDuplicate = (newTags) => {
  desiredPosList.value = newTags.filter((tag, index, self) => {
    return self.indexOf(tag) === index;
  });
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
onMounted(() => {
  if (isUpdateMode.value) {
    title.value = "수정"

    const boardData = JSON.parse(route.query.board);
    const thumbnailUrl = boardData.thumbnailUrl
    getImageFromUrl(thumbnailUrl, (resp) => {      
      const urlParts = thumbnailUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]

      const blob = resp.data;
      const file = new File([blob], fileName, {type: blob.type});
      
      thumbnail.value = file;
      thumbnailPreview.value = URL.createObjectURL(blob);

      if (thumbnailInput.value) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        thumbnailInput.value.files = dataTransfer.files;
      }
    }, (err) => console.error(err));

    selectedTeam.value = boardData.teamName;    
    domain.value = [boardData.domain];
    desiredPosList.value = boardData.desiredPosList;
    introduction.value = boardData.introduction;
    content.value = boardData.content;
  } else {
    findTeamList(params, (resp) => {
      teamList.value = resp.data.data.map(item => ({ text: item.name, value: item.id }));
    }, (err) => console.error(err))
  }  
})
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
