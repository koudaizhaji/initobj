<template>
  <view class="lineNav">
    <!-- <login-panel /> -->
    <view
      v-for="item in optionList"
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
</template>

<script setup lang="ts">
defineProps({
  optionList: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.lineNav {
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
</style>
