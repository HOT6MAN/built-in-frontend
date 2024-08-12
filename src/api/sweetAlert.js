import Swal from 'sweetalert2';


function sweetAlert(title,message){
    Swal.fire({
        title: title,
        text: message,
        icon: "success"
      });
}

function sweetConfirm(title,message,success,fail){
    Swal.fire({
        icon: 'info',
        title: title,
        text: message,
        showCancelButton: true,
        confirmButtonText: '예', 
        cancelButtonText: '아니오',
        confirmButtonColor: '#5e81ac',
        cancelButtonColor: '#4299e1',
    }).then(success).catch(fail);
}

export{ sweetAlert, sweetConfirm}