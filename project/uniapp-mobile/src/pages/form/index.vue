<template>
  <view class="form">
    <forms />
  </view>
  <TabBar/>
</template>

<script>
export default {

  data() {
    return {
      title: '首页',
      activeIndex: 1,
    };
  },
  onLoad() {
    getApp().globalData.saveSelectIndex();
  },
  onShow() {
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
