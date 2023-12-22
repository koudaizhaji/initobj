<template>
  <view class="charts-box">
    <qiun-data-charts
      type="column"
      :chart-data="chartData"
    />
    <zb-table
      :show-header="true"
      :columns="column"
      :stripe="true"
      :fit="false"
      show-summary
      sum-text="合计"
      :summary-method="getSummaries"
      :border="true"
      :data="data"
      @row-click="rowClick"
      @toggle-row-selection="toggleRowSelection"
      @toggle-all-selection="toggleAllSelection"
      @edit="buttonEdit"
      @dele="dele"
    />
  </view>
  <TabBar ref="tabbar" />
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      chartData: {},
      column: [
        { type: 'selection', fixed: true, width: 50 },
        {
          name: 'name', label: '姓名', fixed: false, width: 80, emptyString: '--',
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
    this.getServerData();
  },
  methods: {
    getServerData() {
    // 模拟从服务器获取数据时的延时
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
    },
    // 点击单元格触发
    onCellClick(value) {
      console.log('点击了单元格触发', value);
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
