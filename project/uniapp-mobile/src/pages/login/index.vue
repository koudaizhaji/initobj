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
      <input
        v-model="phoneNum"
        type="number"
        maxlength="11"
        placeholder="请输入手机号码"
        class="w-75%"
      >
    </view>
    <view class="borders flex flex-justify-left grid-items-center h-10 w-80% bg-white m-l-10% border-rd-5 mt-5">
      <view class="m-r-5" />
      <input
        v-model="passWord"
        type="password"
        maxlength="11"
        placeholder="请输入密码"
        class="w-80%"
      >
    </view>
    <!-- <view class="flex flex-justify-center grid-items-center h-10 w-80% bg-yellow m-l-10% border-rd-5 mt-5 ">
            <p class="color-white">登录</p>
        </view> -->
    <view class="h-10 w-80% m-l-10% border-rd-5 mt-5 flex">
      <button
        class="btn"      
        @click="login"
      >
        登录
      </button>
    </view>
    <view class="flex mt-6 mb-5 m-l-10%">
      <view>
        <label class="flex flex-justify-left grid-items-center">
          <checkbox-group @change="changeChecked">
            <label>
              <checkbox
                :checked="isAgree"
                style="transform: scale(0.6);"
              />
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
        <navigator url="/pages/login/register">
          验证码登录
        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import Validate from '@/utils/validate.js';
// import { ref, reactive, computed } from 'vue'
// const validatePhoneNumAndPwd = computed(() => {
//     return Validate.phone(phoneNum.value) && Validate.password(passWord.value);
// })
// const phoneNum = ref('')
// const passWord = ref('')
// const isAgree = ref(false)
// const changeRadio = () => {
//     isAgree.value = !isAgree.value
// }
export default {
  components: {},
  data() {
    return {
      phoneNum: '',
      passWord: '',
      isAgree: false,
    };
  },
  computed: {
    validatePhoneNumAndPwd() {
      console.log('adjasnd',(Validate.phone(this.phoneNum) && Validate.password(this.passWord)));
      console.log(Validate.phone(this.phoneNum));
      console.log(Validate.password(this.passWord));
      return Validate.phone(this.phoneNum) && Validate.password(this.passWord);
    },
  },
  methods: {
    changeChecked(e) {
      this.isAgree = e.detail.value.length > 0;
    },
    async login() {
      if (!this.isAgree) {
        uni.showToast({
          title: '请先勾选同意协议',
          icon: 'none',
        });
        return;
      }
      const req = {
        username: this.phoneNum,
        password: this.passWord,
      };
      if (getApp().globalData.type === 'mp-weixin') { // 小程序
        uni.login({
          provider: 'weixin',
          onlyAuthorize: true, // 微信登录仅请求授权认证
          success(event) {
            const { code } = event;
            console.log(code);
          },
          fail(err) {},
        });
      } else {
        // const res = await this.$api.Login.login(req)
        // console.log(res)
      }
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
</style>
