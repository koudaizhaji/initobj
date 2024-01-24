<template>
  <view
    class="order-list"
  >
    <uni-list>
      <uni-list
        v-for="item,index in 30"
        :key="index"
        :border="true"
      >
        <order-item>
          <!-- <template #content>
            <uni-list-chat
              title="uni-app"
              avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
              note="您收到一条新的消息"
              time="2020-02-02 20:20"
              badge-text="12"
            />
          </template> -->
        </order-item>
      </uni-list>
    </uni-list>
  </view>
</template>

<script>
import orderItem from './order-item.vue';

export default {
  components: {
    orderItem,
  },
};

</script>

<style lang="less" scoped>

.chat-custom-right {
	flex: 1;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-end;
}

.chat-custom-text {
	font-size: 12px;
	color: #999;
}

</style>
