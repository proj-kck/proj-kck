import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export { default as App } from './App';

export const successMsg = (msg) => {
    toast.success(msg, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}


