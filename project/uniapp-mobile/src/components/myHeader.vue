<template>
  <view :style="{height: headerHeight}">
    <u-navbar
      :title="title"
      :left-icon-color="leftIconColor"
      :left-text="leftText"
      :height="headerHeight"
      :border="false"
      :border-bottom="false"
      :bg-color="headerBgColor"
      :fixed="true"
      :safe-area-inset-top="true"
      @left-click="leftClick"
      @right-click="rightClick"
    >
      <view
        slot="right"
        class="u-nav-slot"
      >
        <slot name="right" />
      </view>
    </u-navbar>
  </view>
</template>

<script>
export default {
  props: {
    headerHeight: { // header高度
      type: String,
      default: '44px',
    },
    headerBgColor: {
      type: String, // header背景颜色
      default: '#fff',
    },
    leftIconColor: {
      type: String, // 左侧icon颜色
      default: '#333',
    },
    width: { // 搜索框宽度
      type: String,
      default: '75%',
    },
    title: { // 中间text
      type: String,
      default: '',
    },
    leftText: { // 左侧返回text
      type: String,
      default: '',
    },
  },
  methods: {
    leftClick() {
      uni.navigateBack();
    },
    rightClick() {
      this.$emit('rightClick');
    },
  },
};
</script>
