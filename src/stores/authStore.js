import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { saveAccessLocalStorage,logout,getEmailLink, setUserProfile} from '@/api/auth'
import { sweetAlert } from '../api/sweetAlert';
export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  let token = ref(localStorage.getItem('access_token') || '')

  const isLogined = ref(false);
  
  let userId = ref('');
  let userName = ref('');
  let userEmail = ref('');

  
  const getUserId = computed(()=>userId.value)
  const getUserName = computed(()=>userName.value)
  const getUserEmail = computed(()=>userEmail.value)
  // const computedToken = computed((access_token) => {  
  //   token.value = access_token
  // })

  // function getUserId(token){
  //   const decodedToken = parseJwt(token);
  //   console.log(decodedToken.id);
  //   return decodedToken.id;
  // }




  const isLogin = computed(() => {
    return token.value!='' ? true : false
  })
  
  function setAuthData(newToken) {
    return new Promise((resolve, reject) => {
      try {
        const decodedToken = parseJwt(newToken);
        localStorage.setItem('access_token', newToken);
  
        token.value = newToken
        userId.value = decodedToken.id;
        userName.value = decodedToken.name;
        userEmail.value = decodedToken.email;
        resolve(); // 완료되면 resolve 호출
      } catch (error) {
        reject(error); // 에러 발생 시 reject 호출
      }
    });
  }

  function clearAuthData() {
    // Pinia 상태 값 초기화
    token.value = '';
    userId.value = '';
    userName.value = '';
    userEmail.value = '';


 // `localStorage`에서 항목 제거
  setTimeout(() => {
    localStorage.removeItem('auth');
    localStorage.removeItem('access_token');
  }, 0);

}



  function parseJwt(token) {
    //console.log(token);
    let base64Url = (token||'').split('.')[1];
    //console.log(base64Url);
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  const authSaveAccessLocalStorage = async () => {
    await saveAccessLocalStorage(
      async (response) => {
        let accessToken = response.headers['authorization'];
    
        if (accessToken) {
          accessToken = (accessToken || '').split(' ')[1];

          try {
            await setAuthData(accessToken); // setUser가 완료될 때까지 기다림
            console.log("액세스토큰 로컬스토리지에 저장");
            isLogined.value = true;
            // '/'로 리디렉트
            router.replace({ path: '/' });

          } catch (error) {
            console.error('Error setting user:', error);
          }
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  };

  const authLogout = async () =>{
    await logout(
      (response) =>{
        clearAuthData()
        sweetAlert('','로그아웃 완료')
        router.replace({ path: '/' });
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }

  const authEmailLink = async (email) =>{
    try {
      // 프로미스를 반환하도록 getEmailLink 호출을 수정합니다.
      const response = await new Promise((resolve, reject) => {
        getEmailLink(
          email,
          (response) => {
            console.log(response.data.data);
            resolve(response.data.data); // 응답 데이터를 프로미스 해결값으로 설정
          },
          (error) => {
            console.error('Error:', error);
            reject(error); // 오류를 프로미스 거부값으로 설정
          }
        );
      });
      return response; // 프로미스 해결값을 반환
    } catch (error) {
      console.error('Error in authEmailLink:', error);
      throw error; // 오류를 호출자에게 전파
    }
  }

  const authSignUp = async (param) =>{
    await setUserProfile(
      param,
      (response)=>{
        console.log(response.data);
        sweetAlert('가입 완료','')
        router.replace({ path: '/' });
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }



  return { token,userId,userName,userEmail, 
    //computedToken,
    isLogined,
    isLogin,
    getUserId,
    getUserName,
    getUserEmail,
    setAuthData,
    clearAuthData,
    authSaveAccessLocalStorage,
    authLogout,
    authEmailLink,
    authSignUp,
  }
},
{
  persist: {
    key: 'auth', // 키를 설정할 수도 있습니다.
    storage: localStorage, // 로컬스토리지에 저장
  },
});