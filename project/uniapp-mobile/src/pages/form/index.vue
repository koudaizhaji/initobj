<template>
  <view class="form">
    Form表单页面
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
