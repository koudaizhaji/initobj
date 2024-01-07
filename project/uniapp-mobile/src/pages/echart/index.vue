<template>
  <view class="charts-box">
    <view class="topEachars">
      <view class="leftBox">
        <li-charts
          :chart-type="chartType"
          :chart-opts="chartOpts"
          :chart-data="chartData"
          :chart-style="chartStyle"
        />
      </view>
      <view class="rightBox">
        <view class="title">
          当前订单量：
          <text> {{ orderSum }}单 </text>
        </view>
        <view class="title">
          已结算订单：
          <text> {{ overOrder }}单 </text>
        </view>
        <view class="title">
          未结算：
          <text> {{ noOverOrder }}单 </text>
        </view>
      </view>
    </view>
    <view class="bottom">
      <zb-table
        :show-header="true"
        :columns="column"
        :stripe="true"
        :fit="false"
        :border="true"
        :data="data"
        @row-click="rowClick"
        @toggle-row-selection="toggleRowSelection"
        @toggle-all-selection="toggleAllSelection"
      />
    </view>
    <view class="blankView" />
    <TabBar />
  </view>
</template>

<script lang="ts" setup>
import {
  ref, onMounted, computed, onCreated,
} from 'vue';
import liCharts from '@/components/charts/charts.vue';
import UseEchartStore from '@/stores/echart/echart';
import { column } from './data/table.config';

const echartStore = UseEchartStore();
const chartType = 'pie'; // 控制图表类型的数据
const chartOpts = {
  color: ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'],
  padding: [5, 5, 5, 5],
  enableScroll: false,
  legend: {
    show: false,
  },
  extra: {
    pie: {
      activeOpacity: 0.5,
      activeRadius: 10,
      offsetAngle: 0,
      labelWidth: 5,
      border: true,
      borderWidth: 3,
      borderColor: '#FFFFFF',
      // linearType: 'custom',
      // customColor: ['#1890FF', '#91CB74'],
    },
  },
};
// pie数据
const chartData = ref({
  series: [
    {
      data: [
        {},
        //       // { name: '一班', value: 50, labelShow: false },
        //       // { name: '二班', value: 30, labelShow: false },
        //       // { name: '三班', value: 20, labelShow: false },
        //       // { name: '四班', value: 18 },
        //       // { name: '五班', value: 8, labelShow: false },
      ],
    },
  ],
});
const chartStyle = {
  // height: '300px',
  width: '150%',
  position: 'relative',
  left: '-15%',
};
// tableList
const data = ref([
]);

// 单击某行,第一个参数代表选中对象，参数二代表选中的index
const rowClick = (row, index) => {
  console.log('rowClick', row, index);
};

const orderSum = ref(0);
const overOrder = ref(0);
const noOverOrder = ref(0);
// 判断是否登录
const isLogin = () => {
  // console.log('判断是否登录');
  const value = uni.getStorageSync('token');
  if (value && value.includes('Bearer')) {
    console.log('value', value, value.includes('Bearer'));
    console.log('包含，已登录');
    return true;
  }
  // return false;
  return true;
};
const pageLoad = () => {
  console.log('pageLoad');
  getApp().globalData.saveSelectIndex();
  if (!isLogin()) {
    console.log('没登录');
    // 跳转到登录页
    uni.navigateTo({
      url: '/pages/login/index',
    });
  }
};

// 用于多选表格，切换某一行的选中状态，第一个参数代表选中状态，参数二代表选中的对象
const toggleRowSelection = (selected, array) => {
  console.log('toggleRowSelection', selected, array);
};
// 用于多选表格，切换所有行的选中状态 ，第一个参数代表选中状态，参数二代表选中的对象
const toggleAllSelection = (selected, array) => {
  console.log('toggleAllSelection', selected, array);
};

// 自定义的合计计算方法
// const getSummaries = ({ columns, data }) => {
//   console.log('getSummaries', { columns, data });
// };
// 获取统计数据

const getOverCount = async () => {
  console.log('getOverCount');
  echartStore.getOverCountAction().then(async (res) => {
    console.log('结算统计', chartData.value, res.code, res.data);
    if (res.code === 0) {
    // console.log('结算统计', chartData.value, res.code, res.data);
      uni.showLoading();
      await setTimeout(() => {
        chartData.value.series[0].data = res.data.map((item) => ({
          value: item.goodsCount,
          name: item.name,
        }));
        // 已结算
        overOrder.value = res.data[0].goodsCount;
        // 未结算
        noOverOrder.value = res.data[1].goodsCount;
        uni.hideLoading();
      }, 300);
    }
  }).catch((err) => {
    console.log('结算统计', err);
  });
};

// 获取个人订单表
const getUserOrder = async () => {
  console.log('getUserOrder');
  // educount/order/list
  const res = await echartStore.getUserOrderAction();
  if (res.code === 0) {
    console.log('获取订单列表', res.data);
    data.value = res.data.list;
    orderSum.value = res.data.total;
  }
};
// onCreated(() => {
//   console.log('onCreated');
//   getOverCount();
// });
// onMounted(() => {
//   // 执行挂载后要做的事情

// });
pageLoad();
// 由于接口异步，数据渲染延后一点出入，否则绘制会有点问题
// setTimeout(() => {

// }, 200);
getUserOrder();

getOverCount();

</script>
<style scoped lang="scss">
.charts-box {
  // margin-bottom: 100px;
  // background-color: green;

  .topEachars {
    display: flex; /* 使用 Flex 布局 */
    .leftBox {
      // float: left;
      flex: 1;
      width: 50%;

      // background-color: pink;  /* 设置背景颜色为粉红色 */
    }

    .rightBox {
      // flex: 1;
      width: 50%;
      margin: auto 0;
      text-align: center;

      // float: right;
      // background-color: skyblue; /* 设置背景颜色为天蓝色 */
      .title {
        font-size: 16px;
        line-height: 20px;

        text {
          display: block;
          padding: 10px 0 10px 30px;
          font-size: 18px;
          font-weight: 700;
        }
      }
    }
  }

  .bottom {
    // margin-bottom: 100px;
  }

  // 底部间隔,确保底部菜单正常
  .blankView {
    height: 60px;
    background-color: #fff;
  }
}
</style>
