import axios from 'axios'
import refreshAxios from "@/util/axios-refresh"
import { useAuthStore } from '../stores/authStore';

const { VITE_VUE_API_URL } = import.meta.env;

const api = axios.create({
    baseURL : VITE_VUE_API_URL,
    headers : {
        "Content-Type" : "application/json",
        Authorization: localStorage.getItem("access_token")
    },
    withCredentials: false, // 초기 요청에서는 쿠키를 포함하지 않음
  });


api.interceptors.response.use(function(response){

  return response;
}, async function(error){
  console.log(error.response.status);
  if(error.response.status==401){
    
    try {
      // /reissue 엔드포인트로 쿠키를 포함하여 재요청
      const reissueResponse = await refreshAxios.post('/reissue', 
        {}, {withCredentials: true })// 재요청에는 쿠키를 포함
      .then(response => {
        const accessToken = response.headers['authorization'];
        
        const authStore = useAuthStore()
        if (accessToken) {
            console.log("리이슈", accessToken);
            localStorage.setItem('access_token', accessToken.split(' ')[1]);
            authStore.token = accessToken.split(' ')[1]
            authStore.setUser(authStore.token)
            console.log("액세스토큰 로컬스토리지에 저장");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if(error.response.status==400){
          alert("로그인 필요")
          const authStore = useAuthStore()
          localStorage.removeItem('access_token')
          authStore.token=''
          user.value={
              id:'',
              name:'',
              email:''
          }
        }
    });
    } catch (retryError) {
      return Promise.reject(retryError);
    }


  }


})

  
  export default api;