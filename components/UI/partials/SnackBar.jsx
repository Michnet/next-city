import { snackNotification } from "@/contexts/signals"
import { useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

function SnackBar({}) {
   useSignals();
   let sIcon, sColor, sMessage;
   let {message, icon, color} = snackNotification.value;
   
    useSignalEffect(async() => {
        
        
        if(snackNotification.value.message?.length > 0){
            if(typeof window !== 'undefined'){
                var notificationElement = document.getElementById('snackMessage');

                var notificationToast = new bootstrap.Toast(notificationElement);
                //console.log('message in effects', notificationToast);

                notificationToast.show();
               // snackMessage.value = '';
            }
        }
      });

  return (
    <div style={{zIndex: '999'}} id="snackMessage" className={`snackbar-toast rounded-m bg-${color ?? 'highlight'}`} data-bs-delay="1500" data-bs-autohide="true"><i className={`${icon} me-3`}></i>{message}</div>
  )
}
export default SnackBar