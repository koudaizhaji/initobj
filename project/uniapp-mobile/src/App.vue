<script>
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
    tabBarList: [ // 自定义底部tabbar
      {
        icon: 'home', // tabBar图标
        img: '../../static/tabbarImg/home.png', // 自定义图片
        text: '首页', // 显示的提示文字
        pagePath: '/pages/home/index', // 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
        customIcon: false, // 如果使用自定义扩展的图标库字体，需配置此值为true
        midButton: false, // 如果是凸起按钮项，需配置此值为true
      },
      // {
      //   icon: "eye",
      //   img: '../../static/tabbarImg/find.png',
      //   text: '发现',
      //   midButton: false,
      //   pagePath: "/pages/find/index",
      //   customIcon: false,
      // },
      {
        icon: 'account',
        img: '../../static/tabbarImg/my.png',
        text: '个人中心',
        customIcon: false,
        pagePath: '/pages/mine/index',
        customIcon: false,
      },
    ],
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
