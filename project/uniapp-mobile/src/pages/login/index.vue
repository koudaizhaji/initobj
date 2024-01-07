<template>
  <view class="">
    <p class="mt-10 mb-2 font-size-6 font-medium text-center">
      欢迎登录本系统
    </p>
    <p class="mb-10 font-size-3 text-center color-coolgray">
      未注册的手机号验证后自动创建账号
    </p>
    <view
      class="borders flex flex-justify-left grid-items-center
    h-10 w-80% bg-white m-l-10% border-rd-5"
    >
      <view class="m-l-2 m-r-2" />
      <input
        v-model="userInfo.username"
        maxlength="30"
        placeholder="请输入专属帐号"
        class="w-75%"
      >
    </view>
    <view
      class="borders flex flex-justify-left grid-items-center
     h-10 w-80% bg-white m-l-10% border-rd-5 mt-5"
    >
      <view class="m-r-5" />
      <input
        v-model="userInfo.password"
        type="password"
        maxlength="30"
        placeholder="请输入密码"
        class="w-80%"
      >
    </view>

    <view class="h-10 w-80% m-l-10% border-rd-5 mt-5 flex">
      <button
        class="btn"
        @click="goLogin"
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
  </view>
</template>

<script>
import Validate from '@/utils/validate';
import loginApi from '@/api/login';
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
      isAgree: false,
      userInfo: {
        phone_token: '',
        username: '',
        password: '',
      },
    };
  },
  computed: {
    validatePhoneNumAndPwd() {
      console.log('adjasnd', (Validate.phone(this.userInfo.username) && Validate.password(this.userInfo.passWord)));
      console.log(Validate.phone(this.userInfo.username));
      console.log(Validate.password(this.userInfo.passWord));
      return Validate.phone(this.userInfo.username) && Validate.password(this.userInfo.passWord);
    },
  },
  created() {
    console.log('create');
    this.getUserPhoneInfo();
  },
  methods: {
    changeChecked(e) {
      this.isAgree = e.detail.value.length > 0;
    },
    async getUserPhoneInfo() {
      const {
        deviceBrand, deviceModel, deviceId, osName, osVersion,
      } = uni.getSystemInfoSync();
      // 获取ua
      const ua = navigator.userAgent;
      const ip = await loginApi.getIpMsg();
      console.log('拿到的设备信息', ua, deviceBrand, deviceModel, deviceId, osName, osVersion, ip);
      this.userInfo.phone_token = `${deviceBrand}_${deviceModel}_${deviceId}_${osName}_${osVersion}_${ip}`;
    },
    async goLogin() {
      if (!this.isAgree) {
        uni.showToast({
          title: '请先勾选同意协议',
          icon: 'none',
        });
        return;
      }

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
        console.log('对登录接口进行登录', this.userInfo);
        const res = await loginApi.login({ ...this.userInfo });
        console.log('登录结果', res);
        if (res.code === 0) {
          uni.setStorageSync('token', res.token.split(' ')[1]);
          const userInfo = await loginApi.getUserInfo();
          if (userInfo.code === 0) {
            // console.log('userInfo.data', userInfo.data);
            uni.setStorageSync('userInfo', userInfo.data);
          }
          // 提示登录成功
          uni.showToast({
            title: '登录成功',
            icon: 'success',
          });
          // 从哪里进来去哪里
          uni.navigateTo({
            url: '/pages/mine/index',
          });
          // uni.navigateTo({
          //   url: '/pages/form/index',
          // });
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none',
            duration: 3000,
          });
        }
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.btn {
  width: 120px;
  height: 40px;
  line-height: 30px;
  text-align: center;
  background-color: #7a7afa;
  border-radius: 24px;
}

.borders {
  border: 1px solid rgb(128 127 127 / 20%);
}
</style>
