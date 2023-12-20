import { createSSRApp } from 'vue';
import App from './App.vue';
import 'virtual:uno.css';
import { createPinia } from 'pinia';
import TabBar from '@/components/Tabbar.vue';
import api from '@/api/index.js';

export function createApp() {
  const app = createSSRApp(App);
  // 在这里实例化Vue并挂载到app上
  const pinia = createPinia();
  app.component('TabBar', TabBar);
  app.use(pinia);
  app.config.globalProperties.$api = api;
  return {
    app,
  };
}
