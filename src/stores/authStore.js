import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { saveAccessLocalStorage,logout,getEmailLink, setUserProfile} from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  let token = ref(localStorage.getItem('access_token') || '')
  let userId = ref('');
  let userName = ref('');
  let userEmail = ref('');

  // const user = ref({
  //   id:'',
  //   name:'',
  //   email:''
  // })

  function getUserId(token){
    const decodedToken = parseJwt(token);
    console.log(decodedToken.id);
    return decodedToken.id;
  }

  function getUserName(token){
    const decodedToken = parseJwt(token);
    return decodedToken.name;
  }

  function getUserEmail(token){
    const decodedToken = parseJwt(token);
    return decodedToken.email;
  }


  // const computedToken = computed((access_token) => {  
  //   token.value = access_token
  // })

  const isLogin = computed(() => {
    return token.value!='' ? true : false
  })
  
  function setAuthData(newToken) {
    return new Promise((resolve, reject) => {
      try {
        const decodedToken = parseJwt(newToken);
        localStorage.setItem('access_token', newToken);
        console.log(decodedToken.id, decodedToken.name, decodedToken.email);
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
    localStorage.removeItem('access_token')
    token.value = '';
    userId.value = '';
    userName.value = '';
    userEmail.value = '';
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
        console.log(response);
        clearAuthData()
        alert("로그아웃 완료")
        router.replace({ path: '/' });
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }

  const authEmailLink = async (email) =>{
    await getEmailLink(
      email,
      (response) =>{
        console.log(response.data);
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }

  const authSignUp = async (param) =>{
    await setUserProfile(
      param,
      (response)=>{
        console.log(response.data);
        alert("가입완료")
        router.replace({ path: '/' });
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }



  return { token,userId,userName,userEmail, 
    //computedToken,
    isLogin,
    getUserId,
    setAuthData,
    clearAuthData,
    authSaveAccessLocalStorage,
    authLogout,
    authEmailLink,
    authSignUp,
  }
},
{persist:true}

)
