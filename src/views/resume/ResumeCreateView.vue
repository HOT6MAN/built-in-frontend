<template>
  <div class="main-content">     
    <div class="config-container">  
      <!-- <div class="page"> -->
        <div class="config-header">
          <h2 class="title">이력서 {{ pageTitle }}</h2>
        </div>
  
        <b-form class="form" @submit.prevent="onSubmit" @keydown.enter.prevent>
          <b-form-group >
            <label class="left-align">제목</label>
            <b-form-input v-model="title" size="lg" class="text-center mb-3" required />
          </b-form-group>

          <b-form-group class="image-form">
            <label class="left-align">프로필</label>
            <div><input type="file" ref="profileInput" accept="image/*" @change="handleFileChange" class="mb-3 image-input"> </div> 
            <div><b-img class="form-image" v-if="profilePreview" :src="profilePreview" alt="image preview" fluid/></div>
          </b-form-group>

          <b-form-group>
            <label class="left-align">포지션</label>
            <b-form-tags 
              v-model="selectedPos" 
              :limit="1" tag-variant="primary" tag-pills placeholder=""
              class="mb-2" disabled required />
            <b-form-tag
              v-for="(tag, idx) in positions" :key="idx" :title="tag"
              variant="primary" pill no-remove
              @click="selectTag(tag)" class="tag-btn mx-1 mb-3" />
          </b-form-group>

          <b-form-group>
            <label class="left-align">기술 스택</label>
            <b-form-tags 
              v-model="techStack" 
              tag-variant="primary" tag-pills remove-on-delete separator=" " placeholder="작성 후 스페이스 바 눌러주세요"  
              @input="onTagsDuplicate" class="mb-3" />
          </b-form-group>

          <b-form-group>
            <label class="left-align">경험</label>
            <div v-for="(experience, idx) in experiences" :key="idx">
              <b-card bg-variant="light" class="mb-2">
                <b-form-group label="제목" :label-for="'nested-title-' + idx">
                  <b-form-input v-model="experience.title" :id="'nested-title-' + idx" required />
                </b-form-group>
                <b-form-group label="내용" :label-for="'nested-description-' + idx">
                  <b-form-textarea v-model="experience.description" :id="'nested-description-' + idx" rows="3" max-rows="6" no-resize required />
                </b-form-group>
                <div class="d-flex justify-content-end">
                  <b-button v-if="idx" variant="outline-danger" @click="removeExperience(idx)" >삭제</b-button>
                </div>
              </b-card>
            </div>
            <b-button class=" add-button" pill variant="primary" @click="addExperience">추가</b-button>
          </b-form-group>

          <b-form-group>
            <label class="left-align">한마디</label>
            <b-form-input v-model="comment" class="mb-3" required />
          </b-form-group>

          <b-form-group class="d-flex justify-content-center mt-3">
            <b-button type="submit" variant="primary" class="mx-1 save-button">제출</b-button>
          </b-form-group>
        </b-form>
      <!-- </div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findResumeById, registerResume, updateResume, getImageFromUrl } from '@/api/resume.js'
import { sweetAlert, sweetConfirm, sweetAlertWarning } from '@/api/sweetAlert';

const route = useRoute()
const router = useRouter()

const title = ref('')
const profile = ref('')
const profilePreview = ref('')
const profileInput = ref(null)
const positions = ref(['FE', 'BE', 'DevOps', 'ML', 'DBA'])
const selectedPos = ref([])
const techStack = ref([])
const experiences = ref([{ title: '', description: '' }])
const comment = ref('')

const isUpdateMode = computed(() => !!route.params.id)
const pageTitle = computed(() => route.params.id ? '수정' : '생성') 

const selectTag = (tag) => { selectedPos.value = [tag] }
const addExperience = () => experiences.value.push({ title: '', description: '' });

const removeExperience = (idx) => experiences.value.splice(idx, 1)

const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (!file || !file.type.startsWith('image/')) return;

  profile.value = file;

  const reader = new FileReader();
  reader.onload = (e) => { profilePreview.value = e.target.result; };
  reader.readAsDataURL(file);
}

const onSubmit =() => {
  isUpdateMode.value ? onUpdate(): onCreate()
}

const onCreate = () => {
  const filteredExpLists = experiences.value.filter(item => item.title && item.description);

  const form = new FormData();
  form.append('title', title.value);
  form.append('profile', profile.value);
  form.append('position', selectedPos.value[0]);
  form.append('techStack', JSON.stringify(techStack.value));
  form.append('experiences', JSON.stringify(filteredExpLists));
  form.append('comment', comment.value);

  const isExpsAllCompleted = filteredExpLists.every(item => item.title && item.description);

  if (!title.value || !selectedPos.value[0] || !techStack.value.length || !comment.value || !isExpsAllCompleted) {
    sweetAlertWarning('모두 입력 해주세요','')
    return;
  }

  sweetConfirm('', '정말 생성하시겠습니까?', (result) => {
    if (!result.isConfirmed) return;

    registerResume(form, (resp) => {
      if (resp.status !== 201) return;
      
      router.push({path: '/resumes'}).then(() => sweetAlert('','이력서 생성 완료'))
    }, (err) => console.error(err));
  }, (err) => console.error(err))
}

const onUpdate = () => {
  const id = route.params.id
  const filteredExpLists = experiences.value.filter(item => item.title && item.description);

  const form = new FormData();
  form.append('title', title.value);
  form.append('profile', profile.value);
  form.append('position', selectedPos.value[0]);
  form.append('techStack', JSON.stringify(techStack.value));
  form.append('experiences', JSON.stringify(filteredExpLists));
  form.append('comment', comment.value);

  const isExpsAllCompleted = filteredExpLists.every(item => item.title && item.description);

  if (!title.value || !selectedPos.value[0] || !techStack.value.length || !comment.value || !isExpsAllCompleted) {
    sweetAlertWarning('모두 입력 해주세요','')
    return;
  }

  sweetConfirm('', '정말 수정하시겠습니까?', (result) => {
    if (!result.isConfirmed) return;

      updateResume(id, form, (resp) => {
      if (resp.status !== 204) return;

      router.push({path: '/resumes'}).then(() => sweetAlert('','이력서 갱신 완료'))
    }, (err) => console.error(err));  
  }, (err) => console.error(err))
}

const onTagsDuplicate = (newTags) => {
  techStack.value = newTags.filter((tag, index, self) => self.indexOf(tag) === index);
}

onMounted(async () => {
  if (!isUpdateMode.value) return;

  const result = await findResumeById(route.params.id);
  const resumeData = result.data
    
  const profileUrl = resumeData.profileUrl
  getImageFromUrl(profileUrl, (resp) => {      
    const urlParts = profileUrl.split('/')
    const fileName = urlParts[urlParts.length - 1]

    const blob = resp.data;
    const file = new File([blob], fileName, {type: blob.type});
    
    profile.value = file;
    profilePreview.value = URL.createObjectURL(blob);

    if (!profileInput.value) return;

    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    profileInput.value.files = dataTransfer.files;
  }, (err) => console.error(err));

  title.value = resumeData.title;    
  profile.value = resumeData.profile;    
  selectedPos.value = [resumeData.position];
  techStack.value = resumeData.techStack;
  experiences.value = resumeData.experiences;
  comment.value = resumeData.comment;
})
</script>
<style scoped>

.config-container label {
    font-weight: bold;
    font-size: 1.5rem;
    color: var(--text1);
    margin-bottom: 1rem;
    transition: 0.125s ease-in;
    display: block;
    line-height: 1.5;
}

  .main-content {
    display: flex;
    margin-top: 80px;
    padding: 20px;
    justify-content: center;
    background-color: #f0f4f8;
    min-height: 100vh;
    font-family: var(--font-roboto)
  }
  .config-container {
    width: 100%;
    max-width: 1000px;
    background-color: #ffffff;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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
    font-family: var(--font-roboto)
  }
  .form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-content: left;  
  }

  .left-align {
    text-align: left; /* 상단 여백 추가 */
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


  .add-button {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  background-color: #5e81ac;
  color: #ffffff;
}

.add-button:hover {
  background-color: #81a1c1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.save-button {
  font-family: var(--font-roboto);
  font-weight: 700;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;

  background-color: #4c566a;
  color: #ffffff;
}

.save-button:hover {
  background-color: #434c5e;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  
  /* .b-button-block {    
    width: 95%;
    display: block;
  } */
</style>