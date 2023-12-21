<template>
  <view class="echart">
    Echart统计页面
  </view>
  <TabBar ref="tabbar" />
</template>

<script>

export default {
  data() {
    return {
      title: '统计管理页',
      activeIndex: 1,
      tabBarList: getApp().globalData.tabBarList,
    };
  },
  onLoad() { },
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
