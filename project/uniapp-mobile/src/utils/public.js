// 环境验证
// 手机设备判断
const isMobile = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/android/i) == 'android' || ua.match(/iphone/i) == 'iphone' || ua.match(/ipad/i) == 'ipad') {
    return true;
  }
  return false;
};

// 微信设备判断
const isWeixin = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  }
  return false;
};
// 手机微信环境判断
export const isWeixinMobile = () => {
  if (isMobile() && isWeixin()) {
    return true;
  }
  return false;
};

// 登录验证
const goLogin = () => {
  // 回到上一页
  uni.removeStorageSync('userInfo');
  uni.removeStorageSync('selectedIndex');
  uni.navigateTo({
    url: '/pages/login/index',
  });
};

const hasToken = () => {
  const token = uni.getStorageSync('token');
  if (token) {
    return true;
  }
  return false;
};

export const isLogin = () => {
  if (!hasToken()) {
    goLogin();
  } else {
    return true;
  }
};
