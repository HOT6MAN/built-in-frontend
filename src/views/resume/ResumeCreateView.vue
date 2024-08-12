<template>
  <div class="page">
    <h1 class="title">이력서 {{ pageTitle }}</h1>
    <div>
      <b-form @submit.prevent="onSubmit" @keydown.enter.prevent>
        <b-form-group label="Title">
          <b-form-input v-model="title" size="lg" class="text-center mb-3" />
        </b-form-group>
        <b-form-group label="Profile">
          <input type="file" ref="profileInput" accept="image/*" @change="handleFileChange" class="mb-3"> 
          <b-img v-if="profilePreview" :src="profilePreview" alt="image preview" fluid/>
        </b-form-group>
        <b-form-group label="Position">
          <b-form-tags 
            v-model="selectedPos" 
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
            placeholder="작성 후 스페이스 바 눌러주세요" 
            tag-variant="primary"
            tag-pills          
            separator=" "
            @input="onTagsDuplicate"
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
                <b-button v-if="idx != 0" variant="outline-danger" @click="removeExperience(idx)"  >Delete</b-button>
              </div>
            </b-card>
          </div>
          <b-button class="b-button-block mb-4 mx-auto" pill variant="primary" @click="addExperience">Add</b-button>
        </b-form-group>
        <b-form-group label="Comment">
          <b-form-input v-model="comment" class="mb-3" />
        </b-form-group>
        <b-form-group class="d-flex justify-content-center mt-3">
          <b-button type="submit" variant="primary" class="mx-1">Submit</b-button>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findResumeById, registerResume, updateResume, getImageFromUrl } from '@/api/resume.js'
import { sweetAlert } from '../../api/sweetAlert';

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
const addExperience = () => {
  experiences.value.push({ title: '', description: '' })
}

const removeExperience = (idx) => {
  experiences.value.splice(idx, 1)
}

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    profile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => { profilePreview.value = e.target.result; };
    reader.readAsDataURL(file);
  }
}

const onSubmit =() => {
  isUpdateMode.value ? onUpdate(): onCreate()
}

const onCreate = () => {
  const form = new FormData();
  form.append('title', title.value);
  form.append('profile', profile.value);
  form.append('position', selectedPos.value[0]);
  form.append('techStack', JSON.stringify(techStack.value));
  form.append('experiences', JSON.stringify(experiences.value.filter(item => item.title !== '' && item.description !== '')));
  form.append('comment', comment.value);

  registerResume(
    form,
    (resp) => {
      if (resp.status === 201) {
        router.push({path: '/resumes', query: {redirectYN: true, msg: 'Success Create'}})
        .then(() => router.replace({path: '/resumes'}))
      }
    }, 
    (err) => console.error(err)
  );  
}

const onUpdate = () => {
  const id = route.params.id

  const form = new FormData();
  form.append('title', title.value);
  form.append('profile', profile.value);
  form.append('position', selectedPos.value[0]);
  form.append('techStack', JSON.stringify(techStack.value));
  form.append('experiences', JSON.stringify(experiences.value.filter(item => item.title !== '' && item.description !== '')));
  form.append('comment', comment.value);

  updateResume(id, form,    
    (resp) => {
      if (resp.status === 204) {
        router.push({path: '/resumes'}).then(() => {
          sweetAlert('','Success Update')
          router.replace({path: '/resumes'})
        })
      }
    }, 
    (err) => console.error(err)
  );  
}

const onTagsDuplicate = (newTags) => {
  techStack.value = newTags.filter((tag, index, self) => {
    return self.indexOf(tag) === index;
  });
}

onMounted(async () => {
  if (isUpdateMode.value) {
    const result = await findResumeById(route.params.id);
    const resumeData = result.data

    console.log(resumeData)
    
    const profileUrl = resumeData.profileUrl
    getImageFromUrl(profileUrl, (resp) => {      
      const urlParts = profileUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]

      const blob = resp.data;
      const file = new File([blob], fileName, {type: blob.type});
      
      profile.value = file;
      profilePreview.value = URL.createObjectURL(blob);

      if (profileInput.value) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        profileInput.value.files = dataTransfer.files;
      }
    }, (err) => console.error(err));

    title.value = resumeData.title;    
    profile.value = resumeData.profile;    
    selectedPos.value = [resumeData.position];
    techStack.value = resumeData.techStack;
    experiences.value = resumeData.experiences;
    comment.value = resumeData.comment;
  }
})

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