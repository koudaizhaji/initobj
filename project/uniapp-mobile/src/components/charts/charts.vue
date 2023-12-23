<template>
  <view
    class="charts-box"
    :style="chartStyle"
  >
    <qiun-data-charts
      :type="chartType"
      :opts="chartOpts"
      :chart-data="chartData"
    />
  </view>
</template>

<script>
export default {
  props: {
    chartType: {
      type: String,
      default: 'pie',
    },
    chartOpts: {
      type: Object,
      default: () => ({}),
    },
    chartData: {
      type: Object,
      default: () => ({}),
    },
    chartStyle: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped>
  /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>
