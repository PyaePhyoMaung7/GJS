// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import { createHead } from '@unhead/vue'

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

axios.interceptors.response.use(
    response => {return response},
    error => {
        if (error.response.status === 401){
            sessionStorage.removeItem('user');
            window.location.reload();
        }else{
             // This is important, so that unhandled cases make axios throw errors
             return Promise.reject(error);
        }
    }
)

const head = createHead()

const app = createApp(App)

app.use(router).use(store).use(head)

app.mount('#app')
