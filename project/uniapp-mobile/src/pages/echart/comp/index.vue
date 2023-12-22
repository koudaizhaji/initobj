<template>
  <view class="body">
    <!-- <view class="topLine" :style="{height: topBar+'px'}"></view> -->
    <view
      id="nav"
      class="nav row_align_center"
    >
      <li
        style="z-index: 999;color: #fff;"
        :class="['iconfont icon-zuojiantou back']"
        @click="gotoBack()"
      />
    </view>
    <view class="top_head">
      <view class="text_des">
        <text class="month_num">
          {{ nowTime.month }}
        </text>
        <text class="month_text">
          月
        </text>
        <text class="month_year">
          {{ nowTime.year }}
        </text>
        <text class="point">
          .
        </text>
        <text class="title">
          财务报告
        </text>
      </view>
      <view class="top_desc">
        <view class="text-gray">
          结余
        </view>
        <view class="remaining">
          {{ myWallet.remaining }}
        </view>
        <view class="row head_block">
          <view class="flex_1">
            <text class="text-gray">
              支出
            </text>
            <text class="text_green">
              {{ myWallet.expend }}
            </text>
          </view>
          <view class="flex_1">
            <text class="text-gray">
              收入
            </text>
            <text class="income">
              {{ myWallet.income }}
            </text>
          </view>
        </view>
      </view>
    </view>
    <view class="main">
      <view class="row_block">
        <view
          class="the_title"
          style="justify-content: space-between;"
        >
          <view class="left_title">
            <view class="title_icon" />
            <text class="margin_stand-samll font-big wide">
              历史趋势
            </text>
          </view>
          <view class="right_btn">
            <view
              v-for="(item,index) in historyBtn"
              :key="index"
              :class="item.state ? 'active_btn':''"
              @click="changeHistoryBtn(item.type)"
            >
              {{ item.name }}
            </view>
          </view>
        </view>
        <view
          class="charts-box"
          style="height: 200px;"
        >
          <qiun-data-charts
            type="line"
            canvas-id="finance_a"
            :canvas2d="isCanvas2d"
            :resshow="delayload"
            :opts="{xAxis:{itemCount:12,disableGrid:true},yAxis:{disableGrid:true,data:[{disabled:true}]}}"
            :chart-data="historyData"
          />
        </view>
      </view>
      <view class="row_block">
        <view class="the_title">
          <view class="title_icon" />
          <text class="margin_stand-samll font-big wide">
            钱都去哪了
          </text>
        </view>
        <view
          v-if="delayload"
          class="charts-box"
        >
          <qiun-data-charts
            type="ring"
            canvas-id="finance_b"
            :canvas2d="isCanvas2d"
            :resshow="delayload"
            :opts="{padding:[15,0,4,0],legend:{position: 'bottom'},title:{name: expendCount},subtitle: {name: '支出',fontSize:'20'}}"
            :chart-data="expendDetail"
          />
        </view>
        <view class="the_title">
          <text class="margin_stand-samll font-middle wide">
            支出单笔最贵
          </text>
        </view>
        <view class="extend_rank">
          <view
            v-for="(item,index) in extendRank"
            :key="index"
            class="rank_item"
          >
            <image
              :src="getImage(index)"
              mode="widthFix"
            />
            <text class="name">
              {{ item.name }}
            </text>
            <text class="desc">
              {{ item.desc }}
            </text>
            <text class="text_green money">
              {{ item.money }}
            </text>
          </view>
        </view>
      </view>
      <view class="row_block">
        <view class="the_title">
          <view class="title_icon" />
          <text class="margin_stand-samll font-big wide">
            {{ nowTime.month }}月明细
          </text>
        </view>
        <view class="detail_list">
          <view
            v-for="(item,index) in detail_list"
            :key="index"
            class="detail_item"
          >
            <view>
              <view class="font-middle">
                {{ item.date }}
              </view>
              <view class="font-small">
                {{ item.time }}
              </view>
            </view>
            <view class="icon">
              <li :class="['iconfont',item.type == 'income'?'icon-income':'icon-expend']" />
            </view>
            <view class="right_content">
              <view class="money">
                {{ item.type == 'income'?'+':'-' }}{{ item.money }}
              </view>
              <view class="text-gray font-middle">
                {{ item.desc }}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="end_block">
        <view
          class="the_title"
          style="margin-bottom: 40rpx;"
        >
          <view class="title_icon" />
          <text class="margin_stand-samll font-big wide">
            我的支出水平
          </text>
        </view>
        <view class="level_bar">
          <view
            v-for="(item,index) in extend_level_bar"
            :key="index"
            :style="{width:item.width}"
            :class="item.state ? 'text_green font-middle':''"
          >
            {{ item.name }}
          </view>
        </view>
        <view class="level_bar">
          <view
            v-for="(item,index) in extend_level_bar"
            :key="index"
            :style="{width:item.width}"
            :class="item.state ? 'active_bar':'default_bar'"
          />
        </view>
        <view class="level_bar">
          <view
            v-for="(item,index) in extend_level_bar"
            :key="index"
            :style="{width:item.width}"
            :class="item.state ? 'text_green font-middle':''"
          >
            {{ item.range }}
          </view>
        </view>
        <view class="extend_message">
          <li
            style="color: #ccc;"
            :class="['iconfont icon-message']"
          />
          <view>
            “ 我的支出水平已超过
            <text>{{ extend_morethan }}</text>
            的乡镇居民。 ”
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import ProgressBar from './component/progress-bar/progress-bar.vue';

import dataOne from './json/finance/1.json';
import expendDetail from './json/finance/2.json';

const _now = new Date();
const now_time = {};
now_time.year = _now.getFullYear();
now_time.month = _now.getMonth() + 1;
now_time.day = _now.getDay();
export default {
  components: {
    ProgressBar,
  },
  data() {
    return {
      info: { name: '大便超人' }, // 用户数据
      scrollHeight: '600px', // 数据展示体高度
      isCanvas2d: true,
      historyData: {},
      dataOne,
      expendDetail,
      expendCount: 0,
      delayload: false,
      nowTime: {
        year: now_time.year,
        month: now_time.month,
        day: now_time.day,
      },
      historyBtn: [{
        name: '支出',
        state: 1,
        type: 'expend',
      },
      {
        name: '收入',
        state: 0,
        type: 'income',
      },
      {
        name: '结余',
        state: 0,
        type: 'remaining',
      },
      ],
      myWallet: {
        remaining: 3000.34,
        expend: 5240.32,
        income: 8240.66,
      },
      extendRank: [{
        name: '腐败聚会',
        desc: `${now_time.month}月6日12:34-跨界空间轰趴`,
        money: '422.12',
      },
      {
        name: '沐浴按摩',
        desc: `${now_time.month}月12日21:34-乔杉沐浴城`,
        money: '318.00',
      },
      {
        name: '食品酒水',
        desc: `${now_time.month}月1日21:34-school酒馆`,
        money: '289.50',
      },
      ],
      extend_level_bar: [
        { name: '低消费', range: '<2000元', width: '20%' },
        { name: '中间消费', range: '2000-5000元', width: '35%' },
        {
          name: '较高消费', range: '5000-8000元', width: '25%', state: 1,
        },
        { name: '高消费', range: '>8000元', width: '20%' },
      ],
      extend_morethan: '68%',
      detail_list: [
        {
          date: `${now_time.month}-01`, time: '11:01', type: 'extend', money: '10.00', desc: '银行卡转出',
        },
        {
          date: `${now_time.month}-01`, time: '13:45', type: 'income', money: '18.00', desc: '银行卡收入',
        },
        {
          date: `${now_time.month}-02`, time: '06:21', type: 'extend', money: '123.45', desc: '信用卡转出',
        },
        {
          date: `${now_time.month}-03`, time: '07:38', type: 'income', money: '23.00', desc: '银行卡收入',
        },
        {
          date: `${now_time.month}-08`, time: '16:28', type: 'extend', money: '23.56', desc: '信用卡转出',
        },
        {
          date: `${now_time.month}-09`, time: '15:25', type: 'income', money: '850.12', desc: '银行卡收入',
        },
        {
          date: `${now_time.month}-09`, time: '18:52', type: 'income', money: '1.88', desc: '银行卡收入',
        },
        {
          date: `${now_time.month}-11`, time: '21:12', type: 'extend', money: '220.21', desc: '银行卡转出',
        },
        {
          date: `${now_time.month}-12`, time: '13:08', type: 'income', money: '32.28', desc: '银行卡收入',
        },
        {
          date: `${now_time.month}-12`, time: '12:41', type: 'extend', money: '122.12', desc: '信用卡转出',
        },
        {
          date: `${now_time.month}-13`, time: '17:21', type: 'income', money: '10.00', desc: '银行卡收入',
        },
      ],
    };
  },
  watch: {
    historyBtn: {
      deep: true,
      handler(newVal, oldVal) {
        this.filterHistoryData();
      },
    },
  },
  methods: {
    async getData() {
      uni.showLoading();
      this.filterHistoryData();
      for (let i = 0; i < this.expendDetail.series.length; i++) {
        this.expendDetail.series[i].format = 'pieDemo';
      }
      const { length } = this.expendDetail.series[0].data;
      for (let i = 0; i < length; i++) {
        this.expendCount += this.expendDetail.series[0].data[i].value;
      }
      await setTimeout(() => {
        this.delayload = true;
        uni.hideLoading();
      }, 1000);
    },
    changeHistoryBtn(type) {
      for (let i = 0; i < this.historyBtn.length; i++) {
        if (this.historyBtn[i].type == type) {
          this.historyBtn[i].state = 1;
        } else {
          this.historyBtn[i].state = 0;
        }
      }
    },
    filterHistoryData() {
      const { type } = this.historyBtn.filter((x) => x.state == 1)[0];
      switch (type) {
        case 'expend':
          this.historyData = this.dataOne.expend;
          break;
        case 'income':
          this.historyData = this.dataOne.income;
          break;
        case 'remaining':
          this.historyData = this.dataOne.remaining;
          break;
      }
    },
    gotoBack() {
      this.$Common.navigateBack('/index/index');
    },
    getImage(index) {
      switch (index) {
        case 0:
          return 'https://s1.ax1x.com/2023/03/31/ppRYrfP.png';
          break;
        case 1:
          return 'https://s1.ax1x.com/2023/03/31/ppRYySf.png';
          break;
        case 2:
          return 'https://s1.ax1x.com/2023/03/31/ppRY6l8.png';
          break;
      }
    },
  },
  onReady() {
    // #ifndef H5
    uni.showShareMenu();
    // #endif
    this.getData();
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
      background: url("https://img1.baidu.com/it/u=300787145,1214060415&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500") no-repeat center 0;
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
