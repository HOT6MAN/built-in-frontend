import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import VueJwtDecode from 'vue-jwt-decode'
export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('access_token') || '')
 
  const user = ref({
    id:'',
    name:'',
    email:''
  })

  const computedToken = computed(() => {
    console.log(localStorage.getItem("access_token"));
    
   // token.value = localStorage.getItem("access_token")
  })

  const isLogin = computed(() => {
    return token.value!='' ? true : false
  })
  
  function getUser(){
    console.log(token.value);
   
    const decodedToken = parseJwt(token.value)
    console.log(decodedToken);
    user.value.id = decodedToken.id
    user.value.name = decodedToken.name
  }

  function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

  return { token, user, computedToken,isLogin, getUser  }
})
