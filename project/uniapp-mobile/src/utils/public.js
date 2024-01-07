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
