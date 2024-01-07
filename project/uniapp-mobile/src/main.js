import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'virtual:uno.css';
import tabBar from '@/components/tabBar.vue';

const app = createSSRApp(App);

app.component('TabBar', tabBar);

const pinia = createPinia();
app.use(pinia);

// Assuming MinRequest is a Vue plugin, you can use it like this:

export function createApp() {
  return { app };
}
