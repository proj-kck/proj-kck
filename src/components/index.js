import { Snackbar } from '@mui/material';

export { default as App } from './App';

export const successMsg = (element) => {
        element.className = "show";
        setTimeout(function(){ element.className = element.className.replace("show", ""); }, 3000);
}


