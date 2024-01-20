import { createSSRApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import 'virtual:uno.css';
import tabBar from '@/components/tabBar.vue';
// import { isWeixinMobile } from '@/utils/public';
import selfRoll from '@/uni_modules/scrollView/components/self-roll/roll.vue'
import nodata from '@/uni_modules/scrollView/components/no-data/bottom.vue';
import noview from '@/uni_modules/scrollView/components/no-data/back-view.vue';
import scrollView from '@/uni_modules/scrollView/components/scroll-view/scroll-view.vue';
const app = createSSRApp(App);

app.component('TabBar', tabBar);
app.component('selfRoll', selfRoll)
app.component('nodata', nodata)
app.component('noview', noview)
app.component('scrollView', scrollView)
const pinia = createPinia();
app.use(pinia);

// Assuming MinRequest is a Vue plugin, you can use it like this:

export function createApp() {
  // if (!isWeixinMobile()) {
  //   // If not in WeChat, you can show a message or redirect here
  //   uni.showToast({
  //     title: '当前环境，非手机微信',
  //     icon: 'none', // 'none'无图标
  //     duration: 50000, // 5s
  //   });

  //   // Optionally, you can exit the app
  //   // uni.exit();
  //   window.location.href = 'http://www.baidu.com';
  //   // You can also redirect to another page
  //   // window.location.href = 'https://yourRedirectUrl.com';
  //   return null; // Return null to prevent the app from rendering
  // }
  return { app };
}
