import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'virtual:uno.css';
import tabBar from '@/components/tabBar.vue';
import { isWeixinMobile } from '@/utils/public';

const app = createSSRApp(App);

app.component('TabBar', tabBar);

const pinia = createPinia();
app.use(pinia);

// Assuming MinRequest is a Vue plugin, you can use it like this:

export function createApp() {
  if (!isWeixinMobile()) {
    // If not in WeChat, you can show a message or redirect here
    uni.showToast({
      title: '请使用手机微信打开本系统',
      icon: 'none', // 'none'表示无图标
      duration: 50000, // 显示时间2秒
    });

    // Optionally, you can exit the app
    // uni.exit();
    window.location.href = 'http://www.baidu.com';
    // You can also redirect to another page
    // window.location.href = 'https://yourRedirectUrl.com';
    return null; // Return null to prevent the app from rendering
  }
  return { app };
}
