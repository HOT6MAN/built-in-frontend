import api from "../util/axios-common";



function my(success, fail){
  api.get('/my', 
    {
      headers: {Authorization: localStorage.getItem("access_token")}
    }
  )
    .then(response => {
        alert(response.data.process.message)
      })
      .catch(error => {
        console.log('Error:', error);
  
        // if(error.response.status==401){
        //   console.log("액세스토큰 재발행");
        //   reissue()
        // }
        
      });
}

export{ my}