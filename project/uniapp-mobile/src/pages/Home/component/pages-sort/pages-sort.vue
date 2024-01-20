<template>
  <view class="w-100% bg-#fff h-50 flex flex-wrap">
    <view
      v-for="(item, index) in sortlist"
      :key="index"
      class="w-20% h-50% flex flex-col grid-justify-center items-center"
    >
      <img
        :src="item.icon"
        class="w-15 h-15"
        @click="gotoDetail(item.url)"
      >
      <text class="font-size-3 font-medium">
        {{ item.text }}
      </text>
    </view>
  </view>
</template>

<script setup lang="ts">

defineProps({
  sortlist: {
    type: Array,
    default: () => [],
  },
});
const gotoDetail = (url) => {
  // 跳转
  uni.redirectTo({
    url,
  });
  uni.navigateTo({
    url,
  });
};
</script>

<style lang="scss" scoped>
</style>
