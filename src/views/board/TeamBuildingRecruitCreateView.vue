<template>
  <div class="main-content">     
    <div class="config-container">      
      <div class="config-header">
        <h2>모집 게시글 {{ title }}</h2>
      </div>
      <b-form class="form" @submit.prevent="onSubmit" @reset.prevent="onReset" @keydown.enter.prevent >
        <b-form-group for="team">
          <label class="left-align">팀 이름</label>
          <b-form-input v-if="isUpdateMode" v-model="selectedTeam"/>
          <b-form-select
            v-if="!isUpdateMode"
            id="team"
            :options="teamList"
            v-model="selectedTeam"
            required />
        </b-form-group>

        <b-form-group class="image-form">
          <label class="left-align">이미지</label>
          <div><b-img class="form-image" v-if="thumbnailPreview" :src="thumbnailPreview" alt="image preview" fluid/></div>
          <div><input type="file" ref="thumbnailInput" accept="image/*" @change="handleFileChange" class="image-input" ></div>
        </b-form-group>

        <b-form-group for="domain">
          <label class="left-align">프로젝트 도메인</label>
          <b-form-tags 
            input-id="domain"           
            :limit="1"
            tag-variant="primary"
            tag-pills
            placeholder="작성 후 ADD버튼 눌러주세요 + 1개만 작성 가능합니다" 
            v-model="domain" 
            remove-on-delete />          
        </b-form-group>

        <b-form-group for="desired-positions">
          <label class="left-align">모집 분야</label>
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

        <b-form-group for="introduction">
          <b-form-input
            id="introduction"
            type="text"
            placeholder="팀 소개"
            v-model="introduction"
            required />          
        </b-form-group>

        <b-form-group>
          <b-form-textarea
            id="textarea-formatter"
            v-model="content"
            placeholder="내용"
            size="xl"
            no-resize
            required />
        </b-form-group>

        <b-form-group class="d-flex justify-content-end mt-3">
          <b-button type="submit" variant="secondary" class="mx-1">제출</b-button>
          <b-button type="reset" variant="danger" class="mx-1">초기화</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findMyTeamList, registerRecruit, getImageFromUrl, updateRecruit } from '@/api/teambuilding.js'
import { sweetAlertWarning } from '@/api/sweetAlert';

const route = useRoute()
const router = useRouter()

const teamList = ref([{}])
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

const limitCnt = 5

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

  if (!title.value || !selectedTeam.value || !thumbnail.value || !thumbnailPreview.value || !thumbnailInput.value || !domain.value.length || !desiredPosList.value.length || !content.value || !introduction.value) {
    sweetAlertWarning('모두 입력 해주세요','')
    return;
  }
  
  registerRecruit(
    form,
    (resp) => {
      if (resp.status === 201) {
        router.push({path: '/teambuilding', query: {redirectYN: true, msg: '작성 완료'}})
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

  if (!title.value || !selectedTeam.value || !thumbnail.value || !thumbnailPreview.value || !thumbnailInput.value || !domain.value.length || !desiredPosList.value.length || !content.value || !introduction.value) {
    sweetAlertWarning('모두 입력 해주세요','')
    return;
  }

  updateRecruit(id, form, 
    (resp) => {
      if (resp.status !== 204) return;

      router.push({path: '/teambuilding', query: {redirectYN: true, msg: 'Success Update'}})
            .then(() => router.replace({path: '/teambuilding'}))
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
  desiredPosList.value = newTags.filter((tag, index, self) => self.indexOf(tag) === index);
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
  if (!isUpdateMode.value) {    
    findMyTeamList((resp) => {
      const result = resp.data.data;

      if (!result.length) {
        router.push({path: '/teambuilding'}).then(() => sweetAlertWarning('소속된 팀이 없습니다.',''));    
        return;
      }
      
      teamList.value = result.map(item => ({ text: item.name, value: item.id }));
    }, (err) => console.error(err))

    return;
  }

  // update mode
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

    if (!thumbnailInput.value) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    thumbnailInput.value.files = dataTransfer.files;
  }, (err) => console.error(err));

  selectedTeam.value = boardData.teamName;    
  domain.value = [boardData.domain];
  desiredPosList.value = boardData.desiredPosList;
  introduction.value = boardData.introduction;
  content.value = boardData.content;
})
</script>

<style scoped>

  .b-from-tags{
    padding-bottom: 0.5rem;
    border-bottom: 1px solid #DEE2E6;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
  }

  .main-content {
    display: flex;
    margin-top: 80px;
    padding: 20px;
    justify-content: center;
    background-color: #f0f4f8;
    min-height: 100vh;
  }
  .config-container {
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  .config-container label {
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--text1);
    margin-bottom: 1rem;
    transition: 0.125s ease-in;
    display: block;
    line-height: 1.5;
}

  .config-header {
    background-color: #102a43;
    color: #ffffff;
    padding: 20px;
    text-align: center;
  }
  .config-header h2 {
    margin: 0;
    font-size: 24px;
  }
  .form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-content: left;  
  }
  .image-form {
    display: flex;
    flex-direction: column;
    align-items: start;
  }
  .form-image {
    width: 227.2px;
    height: 126.9px;
  }
  .image-input {
    border: 1px solid black;
  }
  .left-align {
    text-align: left; /* 상단 여백 추가 */
  }
</style>
