<template>
  <view class="">
    <p class="mt-10 mb-2 font-size-6 font-medium text-center">
      欢迎登录本系统
    </p>
    <p class="mb-10 font-size-3 text-center color-coolgray">
      未注册的手机号验证后自动创建账号
    </p>
    <view class="borders flex flex-justify-left grid-items-center h-10 w-80% bg-white m-l-10% border-rd-5">
      <view class="m-l-2 m-r-2">
        +86 |
      </view>
      <input v-model="phoneNum" type="number" maxlength="11" placeholder="请输入手机号码" class="w-75%">
    </view>
    <view class=" flex flex-justify-left grid-items-center h-10 w-80% bg-white m-l-10% border-rd-5 mt-5">
      <input v-model="code" type="number" maxlength="6" placeholder="请输入短信验证码" class="w-70% m-l-5">
      <button
        class="btn1 flex flex-justify-center grid-items-center m-l-2 m-r-4 font-size-3 w-25% h-6 bg-#7A7AFA border-rd-10px"
        :class="{'color-#fff bg-#7A7AFA':!validatePhoneNum}" @click="getCode">
        获取验证码
      </button>
    </view>
    <view class="h-10 w-80% m-l-10% border-rd-5 mt-5 flex">
      <button class="btn">
        登录
      </button>
    </view>
    <view class="flex mt-6 mb-5 m-l-10% ">
      <view>
        <label class="flex flex-justify-left grid-items-center">
          <checkbox-group @change="changeChecked">
            <label>
              <checkbox :checked="isAgree" style="transform: scale(0.6);" />
            </label>
          </checkbox-group>
          <text style="font-size: 13px;">
            <text>登录即代表同意</text>
            <text class="color-#004cfe">[用户协议]</text>
            <text>和</text>
            <text class="color-#004cfe">[隐私政策]</text>
          </text>
        </label>
      </view>
    </view>
    <view class="flex">
      <view class="m-l-10% w-80% flex font-size-3.5 flex-justify-between">
        <navigator url="/pages/login/index">
          密码登录
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import Validate from '@/utils/validate.js';

export default {
  components: {},
  data() {
    return {
      phoneNum: '',
      code: '',
      isAgree: false,
    };
  },
  computed: {
    validatePhoneNum() {
      return Validate.phone(this.phoneNum);
    },
  },
  methods: {
    changeChecked(e) {
      this.isAgree = e.detail.value.length > 0;
    },
    getCode() {
      if (!this.validatePhoneNum) {
        return;
      }
      if (!this.isAgree) {
        uni.showToast({
          title: '请先勾选同意协议',
          icon: 'none',
        });
        return;
      }
      uni.showToast({
        title: '验证码发送成功，请注意查收',
        icon: 'none',
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  background-color: #7A7AFA;
  border-radius: 24px;
  width: 120px;
  height: 40px;
  text-align: center;
  line-height: 30px;
}
.borders{
  border: 1px solid rgba(128, 127, 127, 0.2);
}
.btn1 {
  text-align: center;
  line-height: 12px;
  width: 106px;
  height: 30px;
  border-radius: 24px;
}
</style>
