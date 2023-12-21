<template>
  <view class="charts-box">
    <qiun-data-charts
      type="column"
      :chart-data="chartData"
    />
  </view>
  <TabBar ref="tabbar" />
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      // 模拟从服务器获取数据时的延时
      setTimeout(() => {
        const res = {
          categories: ['2016', '2017', '2018', '2019', '2020', '2021'],
          series: [
            {
              name: '目标值',
              data: [35, 36, 31, 33, 13, 34],
            },
            {
              name: '完成量',
              data: [18, 27, 21, 24, 6, 28],
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  },
};
</script>
<style scoped>
  .charts-box {
    width: 100%;
    height: 300px;
  }
</style>
