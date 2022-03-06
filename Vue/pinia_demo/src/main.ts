import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'


const app = createApp(App);

// 创建 Pinia 实例
const pinia = createPinia();

app.use(router);
app.use(pinia); // 使用 pinia

app.mount('#app');
