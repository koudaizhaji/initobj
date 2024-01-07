<template>
  <view class="setView">
    <line-nav
      class="lineNav"
      :option-list="lineNavList"
    />
    <!-- footer -->
    <view class="h-23 bg-#fff flex flex-justify-center">
      <view class="bg-white b-rd-1 w-90px h-30px text-center line-height-30px mt-10 font-size-3.5">
        客服入口
      </view>
    </view>
    <TabBar />
  </view>
</template>

<script>
import { uni } from '@dcloudio/uni-h5';
import { isLogin } from '@/utils/public.js';
import lineNav from '@/components/pageCard/lineNav/lineNav.vue';

export default {
  components: {
    lineNav,
  },
  data() {
    return {
      title: '首页',
      lineNavList: [
        // {
        //   id: 1,
        //   title: '安全中心',
        //   text: '修改手机号和密码',
        //   icon: '/src/static/mine/anquanzhongxin.png',
        //   link: 'noLink',
        // },
        {
          id: 2,
          title: '关于我们',
          text: '当前版本V3.0.0',
          icon: '/src/static/mine/guanyuwomen.png',
        },
        {
          id: 3,
          title: '退出登录',
          text: '退出当前帐号',
          icon: '/src/static/mine/tixing.png',
          click: () => {
            uni.removeStorageSync('userInfo');
            console.log('退出登录');
            uni.navigateTo({
              url: '/pages/login/index',
            });
          },
        },
      ],
      vconsoleCount: 0, // 调试工具
      vConsole: null,
      // 会员卡信息
      memberObj: {
        title: '添加学生',
        isLeftIcon: false,
        direct: '点我添加相关学生订单',
        btnTitle: {
          text: '添加',
          url: '/pages/form/index',
        },
      },
      userInfoObj: {
        name: '闪光女孩',
        tagTitle: 'Lv999',
        avatar: '/static/img/avatar.png',
        rightIcon: [{
          mdiIcon: '',
          url: '',
        }, {
          mdiIcon: '',
          url: '',
        }],
      },
    };
  },
  onLoad() {
    getApp().globalData.saveSelectIndex();
  },

  onShow() {
    console.log('首页显示');
    if (isLogin()) {
      // this.getUserInfo();
    }
  },
  methods: {
    // 去登录
    goLogin() {
      // uni.navigateTo({
      //   url: '/pages/login/index',
      // });
    },
    // 打开调试工具
    openVconsole() {
      this.vconsoleCount++;

      if (this.vconsoleCount > 9) {
        this.vConsole = new VConsole();
      }
      if (this.vconsoleCount > 15) {
        this.vConsole.destroy();
        this.vconsoleCount = 0;
      }
    },
    navigate(path) {
      if (!path) return;
      uni.navigateTo({
        url: `/pages/${path}/${path}`,
      });
    },

    getUserInfo() {
      const userInfo = uni.getStorageSync('userInfo');
      if (userInfo) {
        // this.userInfoObj = userInfo;
        this.userInfoObj.name = userInfo.username;
        this.userInfoObj.tagTitle = '内部帐号';
      }
    },

  },
};
</script>

<style scoped lang="scss">
.setView {
  width: 100%;
  height: 100%;

  .lineNav {
    margin-top: 50px;
    background-color: #fff;
  }
}

</style>
