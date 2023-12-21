<template>
  <uni-transition
    mode-class="fade"
    :duration="200"
    :show="true"
  >
    <view>
      <view class="tab-content">
        <slot />
      </view>
      <view class="tabbar">
        <view class="navigator">
          <view
            ref="warpper"
            class="warpper"
          >
            <view
              v-for="(item,index) in tabBar.list"
              ref="navItem"
              :key="item.pagePath"
              class="navigator-item"
              :data-index="index"
              @click="switchTab(item,index)"
            >
              <i
                :class="[`i-mdi-${item.iconMdi}`,'icon',{'c-blue':selectedIndex == index}]"
              />
              <!-- <i
                v-if="selectedIndex !== index"
                :class="`i-mdi-${item.iconMdi}`"
                class="icon"
              />
              <i
                v-else
                :class="`i-mdi-${item.iconMdi}`"
                class="icon c-blue"
              /> -->
              <!-- <img
                v-if="selectedIndex !== index"
                :src="item.iconPath"
                class="icon"
              >
              <img
                v-else
                :src="item.selectedIconPath"
                class="icon"
              > -->
              <text :class="['item-text',{'text-active':selectedIndex === index}]">
                {{ item.text }}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </uni-transition>
</template>
<script>
export default {
  data() {
    return {
      selectedIndex: uni.getStorageSync('selectedIndex') || 0, // 标记
      tabBar: {
        list: [{
          pagePath: 'pages/home/index',
          iconMdi: 'home-silo-outline',
          // iconPath: '/static/tabIcon/icon1.png',
          // selectedIconPath: '/static/tabIcon/icon2.png',
          text: '首页',
        }, {
          pagePath: 'pages/form/index',
          iconMdi: 'file-search-outline',
          iconPath: '/static/tabIcon/icon3.png',
          selectedIconPath: '/static/tabIcon/icon4.png',
          text: '团队',
        }, {
          pagePath: 'pages/echart/index',
          iconMdi: 'form-select',
          iconPath: '/static/tabIcon/icon5.png',
          selectedIconPath: '/static/tabIcon/icon6.png',
          text: '推广圈',
        },
        {
          pagePath: 'pages/mine/index',
          iconMdi: 'account-tie',
          iconPath: '/static/tabIcon/icon7.png',
          selectedIconPath: '/static/tabIcon/icon8.png',
          text: '我的',
        },
        ],
      },
    };
  },
  methods: {
    switchTab(item, index) {
      const url = `/${item.pagePath}`;
      console.log('拿到的路径', url);
      const pagePath = url;
      uni.navigateTo({ url });
      this.tabBar.list.forEach((v, i) => {
        if (item.pagePath === v.pagePath) {
          uni.setStorageSync('selectedIndex', index);
        }
      });
    },

  },

};
</script>
<style>
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100rpx;
    background: #f5f5f5;
    border-top: 2rpx solid #eee;
  }

  .navigator {
    width: 85%;
    padding: 20rpx;
    margin: 0 auto;
    overflow: hidden;
  }

  .warpper {
    display: flex;
    justify-content: space-between;
    width: auto;
    transition-timing-function: ease-out;
  }

  .navigator-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50rpx;
    height: 100%;
  }

  .item-text {
    margin-top: 6rpx;
    font-size: 24rpx;
    color: #777e86;
  }

  .text-active {
    color: #2e92fd !important;
  }

  .icon {
    width: 20px;
    height: 20px;
  }
</style>
