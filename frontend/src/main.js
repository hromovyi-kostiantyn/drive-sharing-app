import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueGoogleMaps from 'vue-google-maps-community-fork'

import App from './App.vue'
import router from './router'

import axios from "axios";
import Echo from "laravel-echo";

import Pusher from 'pusher-js';
import process from "@fawmi/vue-google-maps/.eslintrc.js";

window.axios = axios
window.axios.defaults.baseURL= "http://localhost:8000/api";

// axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
           config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'mykey',
    cluster: 'mt1',
    wsHost: window.location.hostname,
    wsPort: 6001,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss']
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueGoogleMaps, {
    load: {
        key: import.meta.env.VITE_GOOGLE_MAP_KEY,
        libraries: ['places','geometry']
    },
})
app.mount('#app')
