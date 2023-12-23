<template>
  <view class="charts-box">
    <li-charts
      :chart-type="chartType"
      :chart-opts="chartOpts"
      :chart-data="chartData"
      :chart-style="chartStyle"
    />
    <zb-table
      :show-header="true"
      :columns="column"
      :stripe="true"
      :fit="false"
      show-summary
      sum-text="合计"
      :border="true"
      :data="data"
      @row-click="rowClick"
      @toggle-row-selection="toggleRowSelection"
      @toggle-all-selection="toggleAllSelection"
    />
  </view>
  <TabBar ref="tabbar" />
</template>

<script>
import liCharts from '@/components/charts/charts.vue';

export default {
  components: {
    liCharts,
  },
  data() {
    return {
      chartType: 'pie', // 控制图表类型的数据
      chartOpts: {
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
      },
      chartData: {
        series: [
          {
            data: [{ name: '一班', value: 50, labelShow: false }, { name: '二班', value: 30, labelShow: false }, { name: '三班', value: 20, labelShow: false }, { name: '四班', value: 18 }, { name: '五班', value: 8, labelShow: false }],
          },
        ],
      },
      chartStyle: {
        width: '50%',
        height: '300px',
      },
      column: [
        { type: 'selection', fixed: true, width: 50 },
        {
          name: 'name', label: '姓名', fixed: true, width: 80, emptyString: '--',
        },
        {
          name: 'age', label: '年纪', sorter: false, align: 'right',
        },
        { name: 'sex', label: '性别', filters: { 0: '男', 1: '女' } },
        { name: 'img', label: '图片', type: 'img' },
        { name: 'address', label: '地址' },
        { name: 'date', label: '日期', sorter: true },
        { name: 'province', label: '省份' },
        { name: 'city', label: '城市' },
        { name: 'zip', label: '邮编' },
        {
          name: 'operation',
          type: 'operation',
          label: '操作',
          renders: [
            {
              name: '编辑',
              func: 'edit', // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
            },
            {
              name: '删除',
              type: 'warn',
              func: 'dele',
            },
          ],
        },
      ],
      data: [
        {
          date: '2016-05-02',
          name: '王小虎1',
          province: '上海',
          sex: '男',
          age: '18',
          img: 'https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
          city: '普陀区',
          address: '上海市普',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎2',
          province: '上海',
          sex: '男',
          age: '18',
          city: '普陀区',
          address: '上海市普',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎3',
          province: '上海',
          sex: '男',
          age: '18',
          city: '普陀区',
          address: '上海市普',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎4',
          province: '上海',
          sex: '男',
          age: '18',
          city: '普陀区',
          address: '上海市普',
          zip: 200333,
        },
        {
          date: '2016-05-02',
          name: '王小虎5',
          province: '上海',
          sex: '男',
          age: '18',
          city: '普陀区',
          address: '上海市普',
          zip: 200333,
        },
      ],
    };
  },
  onReady() {
  },
  onShow() {
    uni.setStorageSync('selectedIndex', 2);
  },
  methods: {
    // 单击某行,第一个参数代表选中对象，参数二代表选中的index
    rowClick(row, index) {
      console.log('rowClick', row, index);
    },
    // 用于多选表格，切换某一行的选中状态，第一个参数代表选中状态，参数二代表选中的对象
    toggleRowSelection(selected, array) {
      console.log('toggleRowSelection', selected, array);
    },
    // 用于多选表格，切换所有行的选中状态 ，第一个参数代表选中状态，参数二代表选中的对象
    toggleAllSelection(selected, array) {
      console.log('toggleAllSelection', selected, array);
    },
    // 自定义的合计计算方法
    getSummaries({ columns, data }) {
      console.log('getSummaries', { columns, data });
    },
  },
};
</script>
<style scoped lang="scss">

</style>
