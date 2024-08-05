import axios from 'axios'
import refreshAxios from "@/util/axios-refresh"
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';

const { VITE_VUE_API_URL } = import.meta.env;

const api = axios.create({
    baseURL : VITE_VUE_API_URL,
    headers : {
        "Content-Type" : "application/json",
       // Authorization: localStorage.getItem("access_token")
    },
    withCredentials: false, // 초기 요청에서는 쿠키를 포함하지 않음
  });

// 요청 인터셉터
api.interceptors.request.use(
  config => {
      // 요청이 발생할 때마다 현재의 access token을 가져와 헤더에 설정
      const token = localStorage.getItem("access_token");
      if (token) {
          config.headers.Authorization = token;
      }
      return config;
  },
  error => Promise.reject(error)
);



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
        const {setAuthData} = authStore
        if (accessToken) {
          const newToken = accessToken.split(' ')[1];
          console.log("리이슈", newToken);

            setAuthData(newToken)
          
            console.log("액세스토큰 로컬스토리지에 저장");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        if(error.response.status==400){
          alert("로그인 필요")
          const authStore = useAuthStore()
          const {clearAuthData} = authStore
          clearAuthData()
        }
    });
    } catch (retryError) {
      return Promise.reject(retryError);
    }


  }


})

  
  export default api;