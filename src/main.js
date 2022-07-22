import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-plus';
import 'element-plus/dist/index.css';
import axios, {post, get} from "./utils/http.js"
import store from "./store"

// createApp(App).mount('#app')
const app = createApp(App)
app.config.globalProperties.$api = axios;
app.config.globalProperties.$post = post;
app.config.globalProperties.$get = get;
app.use(router)
app.use(store)
app.use(ElementUI)
app.mount('#app')
