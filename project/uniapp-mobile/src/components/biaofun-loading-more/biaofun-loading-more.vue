<!--
 * 加载更多组件
 - loading: 是否正在加载中？
- loadall: 是否加载了全部数据？
- defaultTips: 默认提示。默认为：'上拉加载更多'
- loadingTips: 加载中状态时的提示内容。默认为：'加载中...'
- loadallTips: 加载完全部数据后的提示内容。默认为：'已加载全部'
 *
 -->
<template>
  <view class="loading-more-component">
    <view
      v-if="loadall"
      class="loading"
    >
      <text>{{ loadallTips }}</text>
    </view>
    <view
      v-else-if="loading"
      class="loading"
    >
      <text>{{ loadingTips }}</text>
      <!-- <image src="@/static/biaofun-loading-more/loading/loading.gif" mode="widthFix" class="loading-gif"></image> -->
    </view>
    <view
      v-else
      class="loading"
    >
      <text>{{ defaultTips }}</text>
    </view>
  </view>
</template>

<script>
export default {
  /**
	 * 数据
	 */
  props: {
    // 是否正在加载中？
    loading: {
      type: Boolean,
      default: false,
    },

    // 是否加载了全部数据？
    loadall: {
      type: Boolean,
      default: false,
    },

    // 默认提示内容
    defaultTips: {
      type: String,
      default: '上拉加载更多',
    },

    // 提示内容
    loadingTips: {
      type: String,
      default: '加载中...',
    },

    // 提示内容
    loadallTips: {
      type: String,
      default: '已加载全部',
    },
  },

  /**
	 * 数据
	 */
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80upx;
  font-size: 26upx;
  color: #050505;
}

.loading-gif {
  width: 60upx;
  height: 60upx;
}
</style>
