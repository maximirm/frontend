import {createApp} from 'vue';
import App from './App.vue';
import router from './router.js';
import store from "./store"

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);
app.use(router);
app.use(store);
app.use(vuetify)
app.mount('#app');
