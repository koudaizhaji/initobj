<template>
  <view class="uni-padding-top">
    <!-- hedaer -->
    <view class="pt-5 flex flex-justify-between bg-white">
      <view class="headerLogo">
        <view>拍拍严选</view>
      </view>
      <view class="headerText">
        <p> 专业质检</p>
        <p> 一年质保</p>
        <p> 7天无理由</p>
        <p class="font-bold">
          >
        </p>
      </view>
    </view>
    <!-- Search -->
    <view class="pb-3 bg-white text-center flex flex-items-center flex-justify-around">
      <view class="bg-white boders border-rd-2 flex-items-center flex  w-1000 h-8 ">
        <view class="bg-black i-mdi-magnify w-6 h-6 ml-2 mr-1" />
        <view>
          <input
            class=" text-left c-black"
            type="text"
          >
        </view>
      </view>
    </view>
    <!-- 分类 -->
    <view class="w-100% bg-#fff h-50  flex flex-wrap">
      <view
        v-for="(item, index) in categoryList"
        :key="index"
        class="w-20% h-50% flex flex-col grid-justify-center items-center"
        @click="gotoDetail"
      >
        <img
          :src="item.icon"
          class="w-15 h-15"
        >
        <text class="font-size-3 font-medium">
          {{ item.text }}
        </text>
      </view>
    </view>
    <!-- 轮播图 -->
    <!-- <u-swiper
      :circular="true"
      :list="bannerlist"
      @click="gotoDetail"
    /> -->
    <view>
      <!-- 这里是轮播图 -->
      <!-- <card-swiper
        class="card_swiper"
        :card_menu="card_menu"
      /> -->
    </view>

    <!-- 卡片式 -->
    <view class="w-100% h-40 mt-4 flex flex-justify-between bg-white ">
      <view class="flex flex-col w-48% ml-2 mt-2">
        <view class="h-6 flex flex-justify-between">
          <view class="font-size-4 font-semibold">
            高价回收
          </view>
          <view class="mt-1 mr-6 line-height-6 font-size-3 flex">
            <view class="i-mdi-account-outline h-22px mr-0.5" /> 赚了￥2000
          </view>
        </view>
        <!-- flex-grow   font-medium-->
        <view class="mt-3 flex">
          <view>
            <img
              class="w-20"
              src="/src/static/images/demo/cate_08.png"
            >
          </view>
          <view>
            <view class="font-size-3 text-right">
              一加ACE&nbsp;
            </view>
            <view class="flex font-size-3 h-5 c-#D88E48 text-right">
              <view class="h-5 mt-1">
                价格￥
              </view>
              <view class="font-size-5 h-5 font-semibold">
                3800
              </view>
            </view>
            <view
              class="ml-2 mt-2.5 text-center font-size-3.5 font-bold h-6
              line-height-6 w-20 bg-black border-rd-1 c-#737D41"
            >
              立即换购
            </view>
          </view>
        </view>
        <view
          class="position-relative pl-2 w-33 line-height-8 font-size-3
        h-8 bg-#DAF6EE letter_spacing"
        >
          更多品类高价卖 &nbsp;>
          <view class="triangle" />
        </view>
      </view>
      <view class="flex flex-col w-48% ml-2 mt-2">
        <view class="flex">
          <view>
            <view class="font-size-4 font-bold">
              夺宝岛
            </view>
            <view class="font-size-3 c-#999 mt-1">
              潮品一元抢购
            </view>
            <view
              class="mt-1 w-4 h-4 line-height-4 text-center
            bg-#DBE0DC border-rd-50% font-bold scale-80"
            >
              >
            </view>
          </view>
          <view class="flex flex-grow-1 flex-justify-center flex-items-center">
            <img
              class="w-10"
              src="../../static/images/demo/cate_07.png"
            >
          </view>
        </view>
        <view class="flex">
          <view>
            <view class="font-size-4 font-bold">
              备件库
            </view>
            <view class="font-size-3 c-#999 mt-1">
              点击发现折扣
            </view>
            <view
              class="mt-1 w-4 h-4 line-height-4 text-center
            bg-#DBE0DC border-rd-50% font-bold scale-80"
            >
              >
            </view>
          </view>
          <view class="flex flex-grow-1 flex-justify-center flex-items-center">
            <img
              class="w-10 "
              src="@/static/images/demo/cate_09.png"
            >
          </view>
        </view>
      </view>
    </view>
    <!-- 商品列表 -->
    <view>
      <!-- 选项栏 -->
      <view>
        <view class="flex flex-justify-center flex-items-center mt-2 mb-2">
          <view class="blackBox" />
          <view class="ml-4 mr-4 font-size-4 font-bold">
            严选推荐
          </view>
          <view class="blackBox" />
        </view>
        <view class="flex justify-center bg-white pl-4 pr-4">
          <ul class="flex flex-justify-between w-100% h-12 p-0">
            <li
              v-for="item in optionList"
              :key="item.id"
              @click="change(item.id)"
            >
              <view class="font-size-3.4 text-center mt-3 flex flex-items-center font-semibold">
                {{ item.title }}<view :class="item.icon" />
              </view>
            </li>
          </ul>
        </view>
      </view>
      <!-- 展示栏 -->
      <view class="flex w-100%">
        <view class="flex justify-center w-50% bg-white">
          <img
            src="@/static/images/demo/cate_04.png"
            alt=""
          >
        </view>
        <view class="flex justify-center w-50% bg-white">
          <img
            src="@/static/images/demo/cate_06.png"
            alt=""
          >
        </view>
      </view>
    </view>
    <view class="h-16" />
    <TabBar
      ref="tabbar"
    />
  </view>
</template>

<script>

export default {
  data() {
    return {
      title: '首页',
      card_menu: [
        {
          img: '/src/static/swiper/swiper1.png',
          title: '一加ACE',
          author: '小明',
          url: '/pages/detail/index?id=1',
        },
        {
          img: '/src/static/swiper/swiper2.png',
          title: '小米10',
          author: '小红',
          url: '/pages/detail/index?id=2',
        },
        {
          img: '/src/static/swiper/swiper3.png',
          title: '华为P40',
          author: '小王',
          url: '/pages/detail/index?id=3',
        },
      ],
      optionList: [
        { id: 1, title: '综合排序', icon: 'i-mdi-chevron-down' },
        { id: 2, title: '价格', icon: 'i-mdi-chevron-down' },
        { id: 3, title: '机型', icon: 'i-mdi-cellphone-android' },
        { id: 4, title: '筛选', icon: 'i-mdi-filter-settings-outline' },
      ],
      bannerlist: [
        '/src/assetsswiper/swiper1.png',
        '/src/assetsswiper/swiper2.png',
        '/src/assetsswiper/swiper3.png',
        '/src/assetsswiper/swiper4.png',
      ],
      categoryList: [
        { icon: '/src/static/images/demo/cate_01.png', text: '手机数码' },
        { icon: '/src/static/images/demo/cate_02.png', text: '买前必领' },
        { icon: '/src/static/images/demo/cate_03.png', text: '一起拼团' },
        { icon: '/src/static/images/demo/cate_04.png', text: '疯狂砍价' },
        { icon: '/src/static/images/demo/cate_05.png', text: '限时秒杀' },
        { icon: '/src/static/images/demo/cate_06.png', text: '分销中心' },
        { icon: '/src/static/images/demo/cate_07.png', text: '我的收藏' },
        { icon: '/src/static/images/demo/cate_08.png', text: '新闻资讯' },
        { icon: '/src/static/images/demo/cate_09.png', text: '我的订单' },
        { icon: '/src/static/images/demo/cate_01.png', text: '我的积分' },
      ],
      cardList: [
        { title: '京东特卖', text: '京东特卖家具', icon: 'i-mdi-account-tie bg-green' },
        { title: '京东邮件', text: '京东邮件发送', icon: 'i-mdi-account-supervisor bg-red' },
        { title: '京东回收', text: '京东回收家电', icon: 'i-mdi-apple-icloud bg-blue' },

      ],
    };
  },
  onLoad() { },
  onShow() {
    uni.setStorageSync('selectedIndex', 0);
  },
  methods: {
    change(index) {
      index === 1 && this.optionList[0].icon === 'i-mdi-chevron-down' ? this.optionList[0].icon = 'i-mdi-chevron-up' : this.optionList[0].icon = 'i-mdi-chevron-down';
      index === 2 && this.optionList[1].icon === 'i-mdi-chevron-down' ? this.optionList[1].icon = 'i-mdi-chevron-up' : this.optionList[1].icon = 'i-mdi-chevron-down';
    },
    gotoDetail() {
      uni.navigateTo({
        url: '/pages/detail/index',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.card_swiper {
  position: fixed;
  top: 50%;
  width: 100%;
  height: 800rpx;
  transform: translateY(-50%);
}

body {
  font-family: Arial;
  font-size: 14px;
  color: #000;
}

.blackBox {
  width: 12px;
  height: 3px;
  background-color: black;
}

.headerLogo {
  position: relative;
  width: 100px;
  height: 15px;

  /* background-color: #aee7ff; */
  margin: 10px 0;
  margin-left: 10px;
  background-color: #bfef05;
  border-radius: 9px;

  & > view:first-child {
    font-size: 19px;
    font-weight: 600;
    line-height: 1px;
    text-align: center;
  }
}

.headerText {
  display: flex;
  margin-top: 5px;
  margin-right: 10px;

  & > p {
    margin-left: 15px;
    font-size: 12px;
  }

  & > p:last-child {
    margin-right: 5px;
    font-size: 12px;
  }
}

.triangle {
  position: absolute;
  top: 0;
  left: 8.7rem;
  width: 0;
  height: 0;

  /* 底边的宽度和颜色 */
  border-right: 2rem solid transparent;
  border-bottom: 2rem solid #daf6ee;

  /* 左斜边的宽度和颜色 */
}

.letter_spacing {
  letter-spacing: 1.5px;
}

.boders {
  margin: 0 10px;
  border: 2px solid black;
}

li {
  list-style: none;
}

.titleActive {
  color: orange;
}

.textActive {
  width: 60px;
  color: #dd7e30;
  border-radius: 6px;
}

.threecard {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
  margin-bottom: 10px;

  .threelist {
    width: 120px;
    height: 70px;
    background-color: white;
    border-radius: 5px;
  }
}
</style>
