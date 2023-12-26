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
              v-for="(item,index) in tabBar"
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
import tabbarList from '@/config/tabbar.js';

export default {
  props: {
    // pageIndex: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      selectedIndex: uni.getStorageSync('selectedIndex') || 0, // 标记
      tabBar: tabbarList,
    };
  },
  methods: {
    switchTab(item, index) {
      const url = `/${item.pagePath}`;
      // console.log('拿到的路径', url, index);
      const pagePath = url;
      uni.navigateTo({ url });
      this.tabBar.forEach((v, i) => {
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
    width: 100%;
    padding: 20rpx;
    margin: 0 auto;
    overflow: hidden;
  }

  .warpper {
    display: flex;
    justify-content: space-around;
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
