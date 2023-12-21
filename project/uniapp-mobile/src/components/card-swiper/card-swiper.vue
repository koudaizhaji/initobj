<template>
  <view>
    <view class="top-swiper">
      <view class="box">
        <view style="height: 44px;" />
        <swiper
          class="swiper"
          :previous-margin="swiper.margin"
          :next-margin="swiper.margin"
          :circular="true"
          @change="swiperChange"
        >
          <swiper-item
            v-for="(item,index) in card_menu"
            :key="index"
            @click="toUrl(item.url)"
          >
            <!-- <image class='le-img' :src='item'
							:class="{'le-active':swiper.index == index}"></image> -->
            <view
              class="le-img"
              :class="{'le-active':swiper.index == index}"
            >
              <view class="img_box">
                <image
                  class="card_img"
                  :src="item.img"
                  mode="aspectFill"
                />
              </view>
              <view class="detail_box">
                <view class="title_box">
                  {{ item.title }}
                </view>
                <view class="author_box">
                  By:{{ item.author }}
                </view>
              </view>
            </view>
          </swiper-item>
        </swiper>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {

  },
  props: {
    card_menu: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      swiper: {
        margin: '150rpx',
        index: 0,
        list: [
          '/static/images/douyin/0.jpg',
          '/static/images/douyin/4.jpg',
          '/static/images/douyin/7.jpg',
        ],
      },
    };
  },
  mounted() {

  },
  methods: {
    // swiper滑动事件
    swiperChange(e) {
      this.swiper.index = e.detail.current;
    },
    toUrl(url) {
      this.$Common.navigateTo(url);
    },
  },
};
</script>

<style lang="scss">
  .top-swiper {
    margin-bottom: 30rpx;

    .box {
      position: absolute;
      top: 60px;
      left: 0;
      z-index: 5;
      box-sizing: content-box;
      width: 100%;
      height: auto;
      padding-top: var(--status-bar-height);
    }

    .swiper {
      height: 600rpx;
      margin: 0 20rpx;

      .le-img {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: #fff;
        border-radius: 10px;
        transition: transform 0.3s ease-in-out 0s;
        transform: scale(0.9);

        &.le-active {
          transform: scale(1);
        }

        .img_box {
          width: 100%;
          height: 65%;
          overflow: hidden;

          .card_img {
            width: 100%;
            height: 100%;
          }
        }

        .detail_box {
          width: 100%;
          height: 35%;
          overflow: hidden;

          .title_box {
            width: 100%;
            margin: 30rpx 0;
            font-size: 40rpx;
            text-align: center;
          }

          .author_box {
            position: relative;
            width: 100%;
            height: 80rpx;
            font-size: 30rpx;
            line-height: 80rpx;
            text-align: center;

            &::before {
              position: absolute;
              top: 0;
              left: 50%;
              width: 150rpx;
              height: 1px;
              content: "";
              background: #000;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
  }
</style>
