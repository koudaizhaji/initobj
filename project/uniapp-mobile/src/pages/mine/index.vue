<template>
  <view class="container">
    <!-- 信息页 -->
    <user-info v-bind="userInfoObj" />
    <!-- 卡片页 -->
    <member-card v-bind="memberObj" />
    <!-- 选项页 -->
    <icon-nav :option-list="iconNavList" />
    <!-- 列表页 -->
    <line-nav :option-list="lineNavList" />
    <!-- footer -->
    <view class="h-23 bg-#f4f4f4 flex flex-justify-center">
      <view class="bg-white b-rd-1 w-90px h-30px text-center line-height-30px mt-10 font-size-3.5">
        客服入口
      </view>
    </view>
    <TabBar />
  </view>
</template>

<script>
import { uni } from '@dcloudio/uni-h5';
import iconNav from '@/components/pageCard/iconNav/iconNav.vue';
import lineNav from '@/components/pageCard/lineNav/lineNav.vue';
import memberCard from '@/components/pageCard/memberCard/memberCard.vue';
import userInfo from './component/userInfo';
import { iconNavList, lineNavList } from './data';

export default {
  components: {
    iconNav,
    lineNav,
    memberCard,
    userInfo,
  },
  data() {
    return {
      title: '首页',
      iconNavList,
      lineNavList,
      // 会员卡信息
      memberObj: {
        title: '添加信息',
        direct: '点我添加相关订单信息',
        btnTitle: {
          text: '添加',
          url: '/pages/form/index',
        },
      },
      userInfoObj: {
        name: '闪光女孩',
        tagTitle: 'Lv999',
        avatar: '/static/img/avatar.png',
        rightIcon: [{
          mdiIcon: '',
          url: '',
        }, {
          mdiIcon: '',
          url: '',
        }],
      },
    };
  },
  onLoad() {
    getApp().globalData.saveSelectIndex();
  },

  onShow() {
    console.log('首页显示');
  },
  methods: {
    login() {
      uni.navigateTo({
        url: '/pages/login/index',
      });
    },
    navigate(path) {
      if (!path) return;
      uni.navigateTo({
        url: `/pages/${path}/${path}`,
      });
    },
  },
};
</script>

<style scoped lang="scss">
body {
  padding: 0;
  margin: 0;
  font-family: "PingFang SC", "PingFang SC-Regular";
  background-color: #fff;
}

.container {
  position: relative;
}

.active:hover {
  background-color: #def0fe;
}

.borders {
  width: 96%;
  margin: auto;
  border-bottom: 1px solid #f0f0f0;
}

</style>
