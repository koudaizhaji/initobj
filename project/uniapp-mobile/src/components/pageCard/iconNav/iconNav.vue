<template>
  <view class="iconNav">
    <view v-for="item in optionList" :key="item.id" class="w-10 h-10" @click="Fn(item.methods)">
      <view class="w-100% h-6 text-center">
        <img :src="item.img" :style="item.style">
      </view>
      <view class="text-center mt-1">
        {{ item.title }}
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
defineProps({
  optionList: {
    type: Array,
    default: () => [],
  },
});
const toOrder = () => {
  uni.navigateTo({
    url: '/pages/order/index',
  });
}
const Fn = (m) => {
  if (m === '') return
  toOrder()
}
</script>

<style lang="scss" scoped>
.iconNav {
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 120rpx;
  margin-top: 102rpx;
}
</style>
