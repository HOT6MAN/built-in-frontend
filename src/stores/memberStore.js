import { ref } from 'vue';
import { defineStore } from 'pinia';
import { findMemberProfileByMemberId, 
    deleteMemberByMemberId, 
    updateMemberProfileByMemberId,
    updateMemberProfileImageByMemberId,
    findMemberProfileImageByMemberId } from '@/api/member.js';
import { sweetAlert } from '../api/sweetAlert';

export const useMemberStore = defineStore('member', () => {
  
  const userObject = ref({});
  const profileImage = ref(null);

  const storeFindMemberProfileByMemberId = async (userId) => {
    console.log("parameter = ",userId);
    await findMemberProfileByMemberId(userId, (response)=>{
        userObject.value = {...response.data.data};
    },(erorr)=>{
        console.log(error);
    })
  };

  const storeFindMemberProfileImageByMemberId = async(userId)=>{
    await findMemberProfileImageByMemberId(userId, (response)=>{
      console.log("response", response);
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] }));
      profileImage.value = url;
      console.log("stroe profile value = ",profileImage.value);
    },(error)=>{
      console.log(error);
    })
  }
  const storeDeleteMemberByMemberId = (userId)=>{
    deleteMemberByMemberId(userId, (response)=>{
      sweetAlert('',"계정 삭제가 완료되었습니다.");
    }, (error)=>{
        console.log(error);
    })
  }

  const storeUpdateMemberProfileByMemberId = (memberObject) =>{
    updateMemberProfileByMemberId(memberObject, (response)=>{
      sweetAlert('',"업데이트가 완료되었습니다.");
    }, (error)=>{
        console.log(error);
    })
  }

  const storeUpdateMemberProfileImageByMemberId = async (formData) =>{
    console.log("update image call");
    await updateMemberProfileImageByMemberId(formData, async(response)=>{
      sweetAlert('',"이미지 변경 성공");
    }, (error)=>{
        console.log(error);
    })
  }

  return {
    storeFindMemberProfileByMemberId,
    storeFindMemberProfileImageByMemberId,
    storeDeleteMemberByMemberId,
    storeUpdateMemberProfileByMemberId,
    storeUpdateMemberProfileImageByMemberId,
    userObject,
    profileImage
  };
});
