<template>
  <view class="uni-padding-top">
    <!-- hedaer -->
    <view
      v-for="item in navigationbarDataList"
      :key="item.id"
      class="pt-5 flex flex-justify-between bg-white"
    >
      <view class="headerLogo">
        <view>{{ item.title }}</view>
      </view>
      <view class="headerText">
        <p> {{ item.qualityText }}</p>
        <p> {{ item.warrantyText }}</p>
        <p> {{ item.goodsReturn }}</p>
        <p class="font-bold">
          >
        </p>
      </view>
    </view>
    <!-- Search 搜索组件页 -->
    <pagesSearch />
    <!-- 分类页 -->
    <pagesSort :sortlist="sortDataList" />
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
    <pagesCart />
    <!-- 商品列表 -->
    <pagesGoods :option-list="optionList" />

    <view class="h-16" />
    <TabBar />
  </view>
</template>

<script>
import { navigationbarDataList, sortDataList, optionList } from './data';
import pagesSearch from '@/pages/Home/component/pages-search/pages-search.vue';
import pagesSort from '@/pages/Home/component/pages-sort/pages-sort.vue';
import pagesGoods from '@/pages/Home/component/pages-goods/pages-goods.vue';
import pagesCart from '@/pages/Home/component/pages-cart/pages-cart.vue';

export default {
  components: {
    pagesSearch,
    pagesSort,
    pagesGoods,
    pagesCart,
  },
  data() {
    return {
      title: '首页',
      navigationbarDataList,
      sortDataList,
      optionList,
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

      bannerlist: [
        '/src/assetsswiper/swiper1.png',
        '/src/assetsswiper/swiper2.png',
        '/src/assetsswiper/swiper3.png',
        '/src/assetsswiper/swiper4.png',
      ],

      cardList: [
        { title: '京东特卖', text: '京东特卖家具', icon: 'i-mdi-account-tie bg-green' },
        { title: '京东邮件', text: '京东邮件发送', icon: 'i-mdi-account-supervisor bg-red' },
        { title: '京东回收', text: '京东回收家电', icon: 'i-mdi-apple-icloud bg-blue' },
      ],
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
