import refreshAxios from "@/util/axios-refresh"


// Access토큰 재발급(refresh 전송)
function reissue(success, fail) {
  refreshAxios.post('/reissue')
  .then(response => {
      console.log(response);
      const accessToken = response.headers['authorization'];
      console.log(accessToken);
      if (accessToken) {
          localStorage.setItem('access_token', accessToken.split(' ')[1]);
          console.log("액세스토큰 로컬스토리지에 저장");
      }
  })
  .catch(error => {
      console.error('Error:', error);
      if(error.response.status==400){
        alert("로그인 필요")
      }
  });
}


function my(success, fail){
  refreshAxios.get('/my', 
    {
      headers: {Authorization: localStorage.getItem("access_token")},
    }
  )
    .then(response => {
        console.log(response.data);
        alert(response.data)
      })
      .catch(error => {
        // console.error('Error:', error);
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        if(error.response.status==401){
          console.log("액세스토큰 재발행");
          reissue()
        }
        
      });
}

export{ my, reissue}