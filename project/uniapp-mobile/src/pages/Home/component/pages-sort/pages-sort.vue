<template>
  <view class="w-100% bg-#fff h-50 flex flex-wrap">
    <view
      v-for="(item, index) in sortlist"
      :key="index"
      class="w-20% h-50% flex flex-col grid-justify-center items-center"
      @click="gotoDetail">
      <img :src="item.icon" class="w-15 h-15" />
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
const gotoDetail = () => {
  uni.navigateTo({
    url: '/pages/detail/index',
  });
};
</script>
    
<style lang="scss" scoped>
</style>
    