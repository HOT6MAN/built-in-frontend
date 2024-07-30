//처음에 쿠키 포함해서 보내는 api(saveAccessLocalStorage, logout, emialLogin, reissue)
import axios from "axios"
const { VITE_VUE_API_URL } = import.meta.env;

axios.defaults.withCredentials = true;

export default axios.create({
    baseURL : VITE_VUE_API_URL,
    headers : {
        "Content-Type" : "application/json",
        // Authorization: localStorage.getItem("access_token")
    }
})