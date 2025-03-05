import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(PrimeVue, { ripple: true });

app.component('Button', Button);
app.component('InputText', InputText);

app.use(createPinia())
app.use(router)

app.mount('#app')
