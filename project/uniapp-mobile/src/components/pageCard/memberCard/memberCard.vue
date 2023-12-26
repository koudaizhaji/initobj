<template>
  <view
    class="memberCard"
  >
    <view class="ml-3">
      <view class="flex">
        <img
          class="h-7 w-7"
          src="/src/static/mine/VIP.png"
        >
        <p class="color-white font-size-4.2">
          <!-- ETC会员 -->
          {{ title }}
        </p>
      </view>
      <view class="color-#7985B9 font-size-3">
        <!-- 高级会员提供最新的技术支持 -->
        {{ direct }}
      </view>
    </view>
    <view
      class="w-16 h-6 line-height-6 bg-#F7D2B7 b-rd-1
      color-#D67936 mr-3 font-size-3.5 text-center"
      @click="navigate(btnTitle.url)"
    >
      {{ btnTitle.text }}
    </view>
  </view>
</template>

<script setup lang="ts">
import { METHODS } from 'http';

defineProps({
  title: {
    type: String,
    default: 'ETC会员',
  },
  direct: {
    type: String,
    default: '高级会员提供最新的技术支持',
  },
  btnTitle: {
    type: Object,
    default: {
      text: '去续费',
      color: '#F7D2B7',
      bg: '#D67936',
      url: '',
    },
  },
});
const navigate = (url: string) => {
  uni.navigateTo({
    url,
  });
};
</script>

<style lang="scss" scoped>
.memberCard {
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
</style>
