import api from "../util/axios-test";



function my(success, fail){
  api.get('/my', 
    {
      headers: {Authorization: localStorage.getItem("access_token")}
    }
  )
    .then(response => {
        console.log(response.data);
        alert(response.data)
      })
      .catch(error => {
        //console.error('Error:', error);
        console.log(error.response.data);
        console.log(error.response.status);
  
        // if(error.response.status==401){
        //   console.log("액세스토큰 재발행");
        //   reissue()
        // }
        
      });
}

export{ my}