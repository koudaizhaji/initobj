<template>
  <view class="form">
    <forms></forms>
  </view>
  <TabBar ref="tabbar" />
</template>

<script>
export default {
  
  data() {
    return {
      title: '首页',
      activeIndex: 1,
      tabBarList: getApp().globalData.tabBarList,
    };
  },
  onLoad() { },
  onShow() {
    uni.setStorageSync('selectedIndex', 1);
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>
body {
  font-family: Arial;
  font-size: 14px;
  color: #000;
}
</style>
