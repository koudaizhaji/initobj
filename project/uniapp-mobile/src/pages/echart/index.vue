<template>
  <view class="charts-box">
    <li-charts />
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
import liCharts from './comp/index.vue';

export default {
  components: {
    liCharts,
  },
  data() {
    return {
      chartData: {},
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
    this.getServerData();
  },
  onShow() {
    uni.setStorageSync('selectedIndex', 2);
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
  .body {
    height: 100%;
    padding-bottom: 20rpx;
    margin: 0;
    background-color: #560594;

    li {
      list-style-type: none;
    }

    .nav {
      position: fixed;
      top: 50rpx;
      left: 20rpx;
    }

    .text_green {
      color: #4ecdb6;
    }

    .main {
      box-sizing: border-box;
      width: 100%;
      padding: 0 10rpx;
      margin-top: 20rpx;

      .detail_list {
        height: 700rpx;
        overflow: auto;
        color: #9e9e9e;

        .detail_item {
          display: flex;
          align-items: center;
          margin: 20rpx 0;

          .icon {
            width: 30%;
            text-align: center;

            li {
              font-size: 80rpx;
            }
          }

          .right_content {
            width: 50%;
            text-align: center;
          }

          .icon-income {
            color: #4aabf9;
          }

          .icon-expend {
            color: #e45521;
          }

          .money {
            color: #000;
          }
        }
      }

      .extend_message {
        display: flex;
        margin-top: 20rpx;
        color: #ccc;

        text {
          color: #f90;
        }
      }

      .level_bar {
        display: flex;
        width: 100%;
        height: 40rpx;
        overflow: hidden;
        font-size: 20rpx;
        line-height: 40rpx;
        color: #ccc;
        text-align: right;
        border-radius: 40rpx;

        view {
          position: relative;
          border-right: 2rpx solid #fff;
        }

        .name {
          position: absolute;
          top: -30rpx;
          right: -40rpx;
        }

        .range {
          position: absolute;
          right: -40rpx;
          bottom: 30rpx;
        }

        .default_bar {
          background-color: #a0dfcd;
        }

        .active_bar {
          background-color: #02ae7a;
        }
      }

      .right_btn {
        display: flex;
        float: right;
        font-size: 22rpx;
        color: #ccc;

        view {
          height: 50rpx;
          margin: 0 20rpx;
          line-height: 50rpx;
        }

        .active_btn {
          padding: 0rpx 20rpx;
          border: 1px solid #ccc;
          border-radius: 40rpx;
        }
      }

      .end_block {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 20rpx;
        background-color: #fff;
        border-radius: 12rpx;
      }

      .row_block {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        padding: 20rpx;
        background-color: #fff;
        border-radius: 12rpx;

        &::after {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 92%;
          height: 0;
          content: "";
          border-top: 1px dashed #ccc;
          transform: translateX(-50%);
        }
      }

      .the_title {
        display: flex;
        align-items: center;

        .left_title {
          display: flex;
          align-items: center;
        }

        .title_icon {
          width: 10rpx;
          height: 40rpx;
          margin-right: 20rpx;
          font-size: 16px;
          font-weight: 600;
          background-color: #7e7e7e;
          border-radius: 10rpx;
        }
      }

      .extend_rank {
        box-sizing: border-box;
        width: 100%;
        padding: 10rpx;
        background-color: #f5f5f5;

        .rank_item {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          margin: 20rpx 0;
          font-size: 26rpx;

          image {
            width: 10%;
          }

          text {
            display: block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .name {
            width: 20%;
            margin: 0 10rpx;
            color: #7d7d7d;
          }

          .desc {
            width: 50%;
            color: #ccc;
          }

          .money {
            width: 20%;
            text-align: right;
          }
        }
      }
    }

    .top_head {
      box-sizing: border-box;
      width: 100%;
      height: 435rpx;
      padding: 110rpx 10rpx 0rpx;
      background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e9420bcd-26cd-4faf-b47a-9949982f7c41/0edf7889-12cb-4151-94b7-a2c12d27108a.jpg") no-repeat center 0;
      background-size: 100% 100%;

      .top_desc {
        box-sizing: border-box;
        width: 100%;
        padding: 20rpx;
        margin-top: 20rpx;
        background-color: #fff;
        border-radius: 20rpx;

        .text-gray {
          margin-right: 10rpx;
          font-size: 28rpx;
          color: #ccc;
        }

        .remaining {
          font-size: 46rpx;
        }

        .flex_1 {
          flex: 1;
        }

        .head_block {
          margin-top: 20rpx;

          .income {
            color: #e34b5e;
          }
        }
      }

      .text_des {
        position: relative;
        height: 100rpx;
        margin-left: 60rpx;
        font-weight: 900;
        color: #fff;

        text {
          display: inline-block;
          height: 100%;
        }

        .month_num {
          font-size: 90rpx;
        }

        .month_text {
          font-size: 56rpx;
        }

        .month_year {
          position: absolute;
          top: 20rpx;
          left: 60rpx;
          font-size: 22rpx;
        }

        .point {
          font-size: 40rpx;
        }

        .title {
          font-size: 40rpx;
        }
      }
    }
  }
</style>
