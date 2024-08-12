<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue';
import { useMemberStore } from '@/stores/memberStore.js';
import { useAuthStore } from '@/stores/authStore.js';
import MemberSidebar from '@/components/member/MemberSidebar.vue';
import MemberProfileInfo from '@/components/member/MemberProfileInfo.vue';
import { storeToRefs } from 'pinia';

const store = useMemberStore();
const authStore = useAuthStore();
const {userId, userName, userEmail} = storeToRefs(authStore);
const { userObject, profileImage } = storeToRefs(store);
const { storeFindMemberProfileByMemberId, 
    storeDeleteMemberByMemberId, 
    storeUpdateMemberProfileByMemberId,
    storeUpdateMemberProfileImageByMemberId,
    storeFindMemberProfileImageByMemberId } = store;
const memberObject = ref({});
const componenetProfileImage = ref(null);
const dataLoad = ref(false);

onMounted(async () => {
  await storeFindMemberProfileByMemberId(userId.value);
  await storeFindMemberProfileImageByMemberId(userId.value);
  memberObject.value = {...userObject.value};
  componenetProfileImage.value = profileImage.value;
  console.log("componenet view value = ",componenetProfileImage.value);
  dataLoad.value = true;
  console.log("onMount and member = ",memberObject.value);
});

watch(userObject, (newValue) => {
  memberObject.value = { ...newValue };
  console.log('Updated memberObject = ', memberObject.value);
}, { immediate: true });

const deleteMember = ()=>{
    console.log("emit delete");
    storeDeleteMemberByMemberId(memberObject.value.id);
}

const updateMember = (updateMemberObject)=>{
    console.log("update call and ", updateMemberObject);
    storeUpdateMemberProfileByMemberId(updateMemberObject);
}

const updateMemberProfileImage = async(image)=>{
    const formData = new FormData();
    formData.append("memberId", memberObject.value.id);
    formData.append("image", image);
    await storeUpdateMemberProfileImageByMemberId(formData);
    await storeFindMemberProfileImageByMemberId(memberObject.value.id);
    componenetProfileImage.value = profileImage.value;
}
</script>

<template>
  <div class="container">
    <MemberSidebar />
    <div class="content">
      <MemberProfileInfo 
      v-if="dataLoad"
      :memberObject="memberObject"
      :componenetProfileImage="componenetProfileImage"
      @deleteMember="deleteMember"
      @updateMember="updateMember"
      @updateMemberProfileImage="updateMemberProfileImage" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  padding-top: 120px;
  padding-left: 20px;
  border: 1px solid #ddd;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-left: 220px;
  width: 80%;
}
.content {
  flex-grow: 1;
  padding: 20px;
}
</style>
