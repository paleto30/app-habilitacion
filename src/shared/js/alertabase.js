
import Swal from 'sweetalert2';



// alerta sencilla 
export const invokeAlert = (title, text, icon, textButton, buttonColor) => {
    Swal.fire({
        title: title,
        text: text,
        icon: icon,
        confirmButtonText: textButton,
        confirmButtonColor: buttonColor || '#3FC3EE'
    })
}

//invokeAlert('Excelente!',"results.message",'success','Entendido','#2280E5');
//invokeAlert('Error!',"results.message",'error','Entendido','#2280E5');


export const alertProccessSuccess = (title) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        text: title,
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true
    })
}


export const alertAreYouSure = async (title, text, textConfirm, textCancel, successTitle, successText, confirmBtnText) => {
    return new Promise((resolve) => {
        Swal.fire({
            title: title,
            text: text,
            icon: "info",
            showCancelButton: true,
            confirmButtonColor:'#3FC3EE',
            cancelButtonColor: "#9A9999",
            confirmButtonText: textConfirm,
            cancelButtonText: textCancel
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: successTitle,
                    text: successText,
                    icon: "success",
                    confirmButtonText: confirmBtnText,
                    confirmButtonColor: '#3FC3EE'
                });
                resolve(true);
            } else {
                resolve(false);
            }
        });
    })
}