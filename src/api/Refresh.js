import refreshAxios from "@/util/axios-refresh"
//axios.defaults.withCredentials = true;


//쿠키로 발급 받은 access토큰, 헤더로 다시받아와서 localstorage에 저장(access 전송)
// function saveJwtLocal(success, fail) {
//   refreshAxios.get('/convert')
//   .then(response => {
//       console.log(response);
//       const accessToken = response.headers['authorization'];
//       console.log(accessToken);
//       if (accessToken) {
//           localStorage.setItem('access_token', accessToken.split(' ')[1]);
//           console.log("액세스토큰 로컬스토리지에 저장");
//       }
//       // '/'로 리디렉트
//       window.location.href = '/';
//   })
//   .catch(error => {
//       console.error('Error:', error);
  
//   });
// }

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


// 로그아웃(access + refresh 전송)
// function logout(success, fail) {
//   refreshAxios.post('/logout', {},   
//       {
//         headers: {Authorization: localStorage.getItem("access_token")},
//       }
//     )
//     .then(response => {
//       console.log(response);
//       localStorage.removeItem('access_token')
//       alert("로그아웃 완료")
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// }



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