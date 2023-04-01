import { Workbox } from 'workbox-window';
import {serviceWorker} from "../../config";
import {toast} from "react-toastify";

const config = serviceWorker;

export default function registerServiceWorker() {

    if ( 'production' !== process.env.NODE_ENV ) {
        return;
    }
    // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
    if ('serviceWorker' in navigator) {
        const wb = new Workbox('sw.js');

        // Update ServiceWorker
        wb.addEventListener('installed', (event) => {
            if (event.isUpdate) {
                localStorage.setItem(config.localStorage.sw_updated_status,true.toString());

                // New Update installed! - add your custom functions
                window.location.reload();
            }
        });
        wb.register().then(r => console.log('Succesfully registered!',r));
    }

    window.addEventListener('appinstalled', () => {

        // TODO: Optionally, send analytics event to indicate successful install
        console.log('PWA was installed');

        localStorage.setItem(config.localStorage.app_installed_status,true.toString());
        // Appka nainstalovana - refresh okna pre zmenu prostredia
        setTimeout(()=>{
            window.location.reload();
        },100);

    });

    if(localStorage.getItem(config.localStorage.app_installed_status)){
        toast.success("Application successfully installed!");
        localStorage.removeItem(config.localStorage.app_installed_status);
    }
}

export function notifyUpdatedPWA(function_to_notify){

    if (localStorage.getItem(config.localStorage.sw_updated_status)) {

        function_to_notify();

        //PWA was successfully updated, remove record
        localStorage.removeItem(config.localStorage.sw_updated_status);
    }
}




