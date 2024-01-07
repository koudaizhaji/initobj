<template>
  <view class="userInfo">
    <view class="info">
      <view
        class="flex"
        @click="iconHandler"
      >
        <view
          class="ml-4"
        >
          <img
            class="b-5rpx b-rd-100% w-18"
            src="/src/static/avter.jpg"
          >
        </view>
        <view class="h-20 mt-2">
          <view
            class="font-size-4.5 font-semibold mb-1 ml-2.5"
          >
            {{ name }}
          </view>
          <view
            class="flex bg-#F1C16C  h-6 scale-80 px-10px
          b-rd-6 flex-items-center flex-justify-center"
          >
            <view>
              <img
                class="h-5 w-5 mt-4px"
                src="/src/static/mine/VIP.png"
              >
            </view>
            <view class="color-white font-size-3.5 ml-1">
              {{ tagTitle }}
            </view>
          </view>
        </view>
      </view>
      <view class="flex mt-2">
        <view @click="goSetView">
          <!-- <img
            class="h-7 w-7"
            src="/src/static/mine/xiaoxitixing.png"
          > -->
          <view class="i-mdi-bell-outline text-size-25px c-#333" />
        </view>
        <view class="ml-2 mr-3">
          <!-- <img
            class="h-6 w-6"
            src="/src/static/mine/shezhi.png"
          > -->
          <view class="i-mdi-database-settings-outline text-size-25px c-#333" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
const emits = defineEmits(['goLogin']);
defineProps({
  name: {
    type: String,
    default: '张三',
  },
  tagTitle: {
    type: String,
    default: '标签',
  },
  avatar: {
    type: String,
    default: '',
  },
  rightIcon: {
    type: Array,
    default: [{
      mdiIcon: '',
      url: '',
    }, {
      mdiIcon: '',
      url: '',
    }],
  },
});

const iconHandler = () => {
  emits('goLogin');
};

const goSetView = () => {
  uni.navigateTo({
    url: '/pages/mine/set/index',
  });
};
</script>

<style lang="scss" scoped>
.userInfo {
  .info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 232rpx;
    padding-top: 72rpx;
    background-image: linear-gradient(to right bottom, #bce6fc, #bce6fc, #def0fe, #fff, #fff);
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
}
</style>
