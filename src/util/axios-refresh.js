//axios 객체 수정(customizing....)
//사용자 정의 axios 객체 생성
//baseURL, Content type....
import axios from "axios"

axios.defaults.withCredentials = true;


export default axios.create({
    baseURL : "http://i11a606.p.ssafy.io:8080",
    headers : {
        "Content-Type" : "application/json"
    }
})