// login.js

import Api from './request';

class Login {
  // 登录方法
  login({ username, password }) {
    // 使用 request.js 中封装的 post 方法发送 POST 请求
    return Api.post({
      url: '/pcadmin/login',
      data: {
        username,
        password,
      },
    });
  }

  // 获取IP信息
  getIpMsg() {
    // 使用 request.js 中封装的 get 方法发送 GET 请求
    return Api.get({
      url: '/daili/?format=json',
    });
  }

  // 获取用户信息
  getUserInfo() {
    return Api.get({
      url: '/pcadmin/users/info',
    });
  }
}

// 导出单例
export default new Login();
