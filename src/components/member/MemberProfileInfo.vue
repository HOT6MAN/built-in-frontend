<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  memberObject: Object,
  componenetProfileImage: String
});
const emit = defineEmits(["deleteMember", "updateMember", "updateMemberProfileImage"]);

const updateMemberObject = ref({ ...props.memberObject });
const emailForDeletion = ref('');
const selectedImage = ref(null);
const deleteMember = () => {
  if (emailForDeletion.value === updateMemberObject.value.email) {
    emit("deleteMember");
  } else {
    alert('이메일 주소가 일치하지 않습니다.');
  }
};

const updateMember = () => {
    emit("updateMember", updateMemberObject.value);
}

const updateMemberProfileImage = () => {
    if(!selectedImage.value){
        alert("이미지를 먼저 선택해주세요.");
        return;
    }
    emit("updateMemberProfileImage", selectedImage.value);
}
const onFileSelected = (event)=>{
    selectedImage.value = event.target.files[0];
    console.log(selectedImage.value);
}
</script>

<template>
  <div class="profile-info">
    <h2>계정</h2>
    <form>
      <div class="form-group">
        <label for="profile-image">프로필 이미지 <span>(최대 5MB)</span></label>
        <div class="profile-image-wrapper">
          <img :src="props.componenetProfileImage" alt="프로필 이미지" class="profile-image" />
          <input type="file" id="profile-image" @change="onFileSelected" />
          <button type="button" @click="updateMemberProfileImage">저장</button>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="name">이름</label>
          <input type="text" id="name" v-model="updateMemberObject.name" readonly>
        </div>
        <div class="form-group">
          <label for="gender">닉네임</label>
          <input type="text" id="gender" v-model="updateMemberObject.nickname" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="nickname">핸드폰</label>
          <input type="text" id="nickname" v-model="updateMemberObject.phone" />
        </div>
        <div class="form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="updateMemberObject.email" readonly />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="country">주소</label>
          <input type="text" id="region" v-model="updateMemberObject.address" />
        </div>
        <div class="form-group">
          <label for="region">가입일</label>
          <input type="text" id="region" v-model="updateMemberObject.lgnMtd" readonly>
        </div>
      </div>
      <button type="button" class="save-button" @click="updateMember">저장</button>
    </form>
    <hr>
    <div class="account-deletion">
      <h3>계정 삭제</h3>
      <p>이메일 주소 입력</p>
      <input type="email" v-model="emailForDeletion" placeholder="이메일 주소 입력" />
      <button @click="deleteMember" class="delete-button">삭제</button>
      <div class="deletion-info">
        <p>계정을 삭제하는 경우,</p>
        <ul>
          <li>이 계정을 더 이상 사용할 수 없게 됩니다.</li>
          <li>계정과 관계된 모든 정보가 삭제됩니다.</li>
          <li>보유중인 캐시는 소멸되며, 정산 및 환불이 불가합니다.</li>
          <li>신청한 유료 이벤트는 자동으로 신청취소 처리되며, 캐시는 환불되지 않습니다.</li>
          <li>플랫폼에 등록한 모든 이벤트가 종료되지 않으면 탈퇴할 수 없습니다.</li>
          <li>정말로 계정을 삭제하고 싶다면, 이메일 주소를 입력해주세요.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-info {
  width: 100%;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile-info h2 {
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.profile-image-wrapper {
  display: flex;
  align-items: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 10px;
}

input[type="file"] {
  width: calc(100% - 160px);
}

.form-row {
  display: flex;
  justify-content: space-between;
}

.form-row .form-group {
  width: 48%;
}

input,
select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

input[readonly] {
  background-color: #e9ecef;
}

.save-button {
  padding: 10px 20px;
  background-color: #ffa500;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  width: 100%;
  margin-top: 20px;
}

.save-button:hover {
  background-color: #ff8c00;
}

.account-deletion {
  margin-top: 40px;
}

.account-deletion h3 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: 600;
}

.account-deletion p {
  margin-bottom: 10px;
  font-size: 16px;
}

.deletion-info p {
  margin-top: 20px;
  font-size: 16px;
  font-weight: 600;
}

.deletion-info ul {
  list-style: disc;
  margin-left: 20px;
  font-size: 14px;
}

.delete-button {
  padding: 10px 20px;
  background-color: #ff4c4c;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.delete-button:hover {
  background-color: #ff1c1c;
}

</style>
