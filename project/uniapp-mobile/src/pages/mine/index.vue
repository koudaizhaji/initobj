<template>
  <view class="container">
    <!-- 信息页 -->
    <view class="info">
      <view class="flex">
        <view class="ml-4">
          <img
            class="b-5rpx b-rd-100% w-18"
            src="/src/static/avter.jpg"
            @click="login"
          >
        </view>
        <view class="ml-3 w-30 h-20 mt-2">
          <view
            class="font-size-4.5 font-semibold mb-1"
            @click="login"
          >
            闪光女孩
          </view>
          <view class="flex bg-#F1C16C w-18 h-6 scale-80 b-rd-6 flex-items-center flex-justify-center">
            <view>
              <img
                class="h-5 w-5 mt-4px"
                src="/src/static/mine/VIP.png"
              >
            </view>
            <view class="color-white font-size-3.5 ml-1">
              Lv3
            </view>
          </view>
        </view>
      </view>
      <view class="flex mt-2">
        <view>
          <img
            class="h-7 w-7"
            src="/src/static/mine/xiaoxitixing.png"
          >
        </view>
        <view class="mt-0.5 ml-2 mr-3">
          <img
            class="h-6 w-6"
            src="/src/static/mine/shezhi.png"
          >
        </view>
      </view>
    </view>
    <!-- 卡片页 -->
    <view class="card">
      <view class="ml-3">
        <view class="flex">
          <img
            class="h-7 w-7"
            src="/src/static/mine/VIP.png"
          >
          <p class="color-white font-size-4.2">
            ETC会员
          </p>
        </view>
        <view class="color-#7985B9 font-size-3">
          高级会员提供最新的技术支持
        </view>
      </view>
      <view class="w-16 h-6 line-height-6 bg-#F7D2B7 b-rd-1 color-#D67936 mr-3 font-size-3.5 text-center">
        去续费
      </view>
    </view>
    <!-- 选项页 -->
    <view class="option">
      <view
        v-for="item in optionList"
        :key="item.id"
        class="w-10 h-10"
      >
        <view class="w-100% h-6 text-center">
          <img
            :src="item.img"
            :style="item.style"
          >
        </view>
        <view class="text-center mt-1">
          {{ item.title }}
        </view>
      </view>
    </view>
    <!-- 列表页 -->
    <view class="list">
      <view
        v-for="item in textList"
        :key="item.id"
        class="flex flex-justify-between bg-#ffffff flex-items-center h-10 active borders"
      >
        <view class="flex ml-4">
          <view class="mr-2">
            <img
              :src="item.icon"
              class="h-5 w-5"
            >
          </view>
          <view class="font-size-3.7 font-600">
            {{ item.title }}
          </view>
        </view>
        <view class="font-size-3 font-500 mr-3">
          {{ item.text }} >
        </view>
      </view>
    </view>
    <!-- footer -->
    <view class="h-23 bg-#f4f4f4 flex flex-justify-center">
      <view class="bg-white b-rd-1 w-90px h-30px text-center line-height-30px mt-10 font-size-3.5">
        客服入口
      </view>
    </view>
    <TabBar ref="tabbar" />
  </view>
</template>

<script>
import { uni } from '@dcloudio/uni-h5';

export default {
  data() {
    return {
      title: '首页',
      tabBarList: getApp().globalData.tabBarList,
      textList: [
        {
          id: 1,
          title: '安全中心',
          text: '修改手机号和密码',
          icon: '/src/static/mine/anquanzhongxin.png',
        },
        {
          id: 2,
          title: '推送设置',
          text: '订阅信息推送',
          icon: '/src/static/mine/tixing.png',
        },
        {
          id: 3,
          title: '关于我们',
          text: '当前版本V3.0.0',
          icon: '/src/static/mine/guanyuwomen.png',
        },
        {
          id: 4,
          title: '帮助反馈',
          text: '常见问题和咨询',
          icon: '/src/static/mine/xiaoxi.png',
        },
        {
          id: 5,
          title: '推荐有礼',
          text: '邀请一人推荐获得5元优惠卷',
          icon: '/src/static/mine/huodongyouli.png',
        },
      ],
      optionList: [
        {
          img: '/src/static/mine/qianbao.png',
          title: '钱包',
          style: 'width:28px;',
        },
        {
          img: '/src/static/mine/qiche.png',
          title: '爱车',
          style: 'width:23px;',
        },
        {
          img: '/src/static/mine/dingdan.png',
          title: '订单',
          style: 'width:25px;',
        },
        {
          img: '/src/static/mine/jifenguanli.png',
          title: '积分',
          style: 'width:22px;',
        },
      ],
    };
  },
  onShow() {
    uni.setStorageSync('selectedIndex', 3);
  },
  methods: {
    login() {
      uni.navigateTo({
        url: '/pages/login/index',
      });
    },
    navigate(path) {
      if (!path) return;
      uni.navigateTo({
        url: `/pages/${path}/${path}`,
      });
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
}

.active:hover {
  background-color: #def0fe;
}

.borders {
  width: 96%;
  margin: auto;
  border-bottom: 1px solid #f0f0f0;
}

.info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 232rpx;
  padding-top: 72rpx;
  background-image: linear-gradient(to right bottom, #bce6fc, #bce6fc, #def0fe, #fff, #fff);
}

.card {
  position: absolute;
  top: 130px;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 92%;
  height: 116rpx;
  background-color: #2e4370;
  border-radius: 8px;
  transform: translateX(-50%);
}

.option {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 120rpx;
  margin-top: 102rpx;
}

.list {
  height: auto;
  padding-top: 10px;
  margin-top: 40rpx;
  background-color: #f4f4f4;

  & > view {
    border-radius: 4px;
  }

  & > view:first-child {
    margin-bottom: 10px;
  }

  & > view:last-child {
    margin-top: 10px;
  }
}

.user_coin_info {
  position: relative;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 333px;
  height: 68px;
  padding: 0 29px;
  margin: 18px auto;
  margin-top: -30px;
  font-family: "PingFang SC", "PingFang SC-Light";
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  background: linear-gradient(228deg, #6acffc -5%, #3a82ef);
  border-radius: 5px;
  box-shadow: 0 3px 6px 0 rgb(58 130 239 / 31%);

  .cover_q {
    position: absolute;
    top: 12px;
    left: 85px;
    width: 12px;
    height: 12px;
  }

  .coin_bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;

    // align-items: flex-end;
    >view {
      display: flex;
    }

    .coin_content {
      display: flex;
      flex-direction: row;
      align-items: center;

      image {
        width: 20px;
        height: 20px;
        margin-right: 7px;
      }

      .user_icon {
        font-family: Akrobat, Akrobat-ExtraBold;
        font-size: 26px;
        font-weight: 700;
        color: #fff;
        text-align: center;
      }
    }

    .coin_record {
      margin-top: 14px;
      margin-left: 16px;
      font-family: "PingFang SC", "PingFang SC-Light";
      font-size: 10px;
      font-weight: 300;
      color: #fff;
      text-align: right;

      image {
        width: 5px;
        height: 8px;
        margin-left: 5px;
      }
    }
  }

  .user_coin_cash {
    width: 80px;
    height: 26px;
    margin: 0;
    margin-top: 2px;
    font-family: "PingFang SC", "PingFang SC-Regular";
    font-size: 12px;
    line-height: 26px;
    color: #3a82ef;
    text-align: center;
    background: #fff;
    border-radius: 13px;
  }
}
</style>
