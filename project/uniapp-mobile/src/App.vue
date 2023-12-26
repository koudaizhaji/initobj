<script>
import { saveSelectIndex } from '@/utils/tabbar.js';

export default {
  onLaunch() {
    uni.removeStorageSync('selectedIndex');
    console.log('App Launch');
  },
  onShow() {
    console.log('App Show');
  },
  onHide() {
    console.log('App Hide');
  },
  onExit() {
    // 把原生的tabBar先隐藏起来，同时添加一个removeStorageSync，用于移除使用的tabBar的下标。
    // uni.removeStorageSync('selectedIndex');
    uni.hideTabBar();
  },
  methods: {},
  globalData: {
    type: uni.getSystemInfoSync().uniPlatform, // 当前运行环境
    saveSelectIndex,
  },
};
</script>

<style lang="scss">
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */

.uni-padding-top {
  padding-top: var(--status-bar-height);
}

uni-page-body,
page {
  background-color: #fff;

  // background-color: #f4f4f4;
  // overflow: auto;
}
</style>
