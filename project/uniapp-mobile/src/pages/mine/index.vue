<template>
  <view class="container">
    <!-- 信息页 -->
    <user-info
      v-bind="userInfoObj"
      @go-login="goLogin"
      @click="openVconsole"
    />
    <!-- 卡片页 -->
    <member-card
      v-bind="memberObj"
    />
    <!-- 选项页 -->
    <icon-nav :option-list="iconNavList" />
    <!-- 列表页 -->

    <line-nav
      class="lineNav"
      :option-list="lineNavList"
    />
    <!-- footer -->
    <!-- <view class="h-23 bg-#f4f4f4 flex flex-justify-center">
      <view class="bg-white b-rd-1 w-90px h-30px text-center line-height-30px mt-10 font-size-3.5">
        客服入口
      </view>
    </view> -->
    <TabBar />
  </view>
</template>

<script>
import { uni } from '@dcloudio/uni-h5';
// import VConsole from 'vconsole';
import iconNav from '@/components/pageCard/iconNav/iconNav.vue';
import lineNav from '@/components/pageCard/lineNav/lineNav.vue';
import memberCard from '@/components/pageCard/memberCard/memberCard.vue';
import userInfo from './component/userInfo';
import { iconNavList, lineNavList } from './data';
import echartView from '../echart/index';
import { isLogin } from '@/utils/public.js';

export default {
  components: {
    iconNav,
    lineNav,
    memberCard,
    userInfo,
    echartView,
  },
  data() {
    return {
      title: '首页',
      iconNavList,
      lineNavList,
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
      this.getUserInfo();
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
body {
  padding: 0;
  margin: 0;
  font-family: "PingFang SC", "PingFang SC-Regular";
  background-color: #fff;
}

.container {
  position: relative;
  margin-bottom: 25px;
}

.lineNav {
  padding-top: 10px;
  margin-top: 20px;
}

.active:hover {
  background-color: #def0fe;
}

.borders {
  width: 96%;
  margin: auto;
  border-bottom: 1px solid #f0f0f0;
}

</style>
