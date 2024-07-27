import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router';
import { saveAccessLocalStorage,logout,emailLink} from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()

  let token = ref(localStorage.getItem('access_token') || '')
 
  const user = ref({
    id:'',
    name:'',
    email:''
  })

  const computedToken = computed((access_token) => {  
    token.value = access_token
  })

  const isLogin = computed(() => {
    return token.value!='' ? true : false
  })
  
  function setUser(token) {
    return new Promise((resolve, reject) => {
      try {
        const decodedToken = parseJwt(token);
        user.value.id = decodedToken.id;
        user.value.name = decodedToken.name;
        resolve(); // 완료되면 resolve 호출
      } catch (error) {
        reject(error); // 에러 발생 시 reject 호출
      }
    });
  }

  function parseJwt(token) {
    let base64Url = (token||'').split('.')[1];
    console.log(base64Url);
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
        console.log(accessToken);
        if (accessToken) {
          accessToken = (accessToken || '').split(' ')[1];
          localStorage.setItem('access_token', accessToken);
          token.value = accessToken;
          try {
            await setUser(token.value); // setUser가 완료될 때까지 기다림
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
        localStorage.removeItem('access_token')
        token.value=''
        user.value={
            id:'',
            name:'',
            email:''
        }
        alert("로그아웃 완료")
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }

  const authEmailLink = async (email) =>{
    await emailLink(
      email,
      (response) =>{
        console.log(response.data);
      },
      (error)=>{
        console.error('Error:', error);
      }
    )
  }


  return { token, user, computedToken,isLogin, setUser,
    authSaveAccessLocalStorage,
    authLogout,
    authEmailLink,
    }
})
