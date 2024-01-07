// index.js

import MinRequest from './request';

// 创建 MinRequest 实例
const minRequest = new MinRequest();

function getToken() {
  return uni.getStorageSync('token');
}
// 定义不需要携带 Token 的路径列表 ['/public-path', '/another-public-path']
const pathsWithoutToken = ['/pcadmin/login', '/daili/?format=json'];
// 请求拦截器
minRequest.interceptors.request((config) => {
  // 检查当前请求的路径是否在不需要携带 Token 的列表中
  const isPublicPath = pathsWithoutToken.some((path) => config.url.startsWith(path));

  // 如果路径在不需要携带 Token 的列表中，则不添加 Token
  if (!isPublicPath) {
  // 在请求头中添加Token
    const token = getToken();
    if (token) {
      // console.log('登录结果', token);
      config.header.Authorization = `${token}`;
    }
  }
  return config;
});

// 响应拦截器
minRequest.interceptors.response((response) => response.data);

// 设置默认配置
minRequest.setConfig((config) => {
  // 在此处设置默认的 baseURL 或其他配置
  // config.baseURL = 'http://*****';
  config.baseURL = 'http://127.0.0.1:12345';
  return config;
});

// 导出一个对象，包含 post 和 get 方法
export default {
  /**
   * 发送 POST 请求
   * @param {string} url - 请求的 URL
   * @param {Object} data - 请求的数据
   * @param {Object} options - 额外的请求配置
   * @returns {Promise} - 返回 Promise 对象
   */
  post(options = {}) {
    return minRequest.post(options);
  },

  /**
   * 发送 GET 请求
   * @param {string} url - 请求的 URL
   * @param {Object} data - 请求的数据
   * @param {Object} options - 额外的请求配置
   * @returns {Promise} - 返回 Promise 对象
   */
  get(options = {}) {
    return minRequest.get(options);
  },
};
