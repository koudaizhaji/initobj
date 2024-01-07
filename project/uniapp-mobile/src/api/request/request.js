// request.js

// 创建一个Symbol作为私有变量
// 将 Symbol(config) 改为普通对象
const config = {
  baseURL: '',
  header: {
    'content-type': 'application/json',
  },
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
};

const isCompleteURL = Symbol('isCompleteURL');
const requestBefore = Symbol('requestBefore');
const requestAfter = Symbol('requestAfter');

class MinRequest {
  // 默认配置
  [config] = {
    baseURL: '', // 基础URL
    header: {
      'content-type': 'application/json',
    },
    method: 'GET', // 默认请求方法
    dataType: 'json', // 数据类型
    responseType: 'text', // 响应数据类型
  };

  // 拦截器
  interceptors = {
    // 请求拦截器
    request: (func) => {
      if (func) {
        MinRequest[requestBefore] = func;
      } else {
        // 如果没有传递拦截函数，则使用默认的空函数
        MinRequest[requestBefore] = (request) => request;
      }
    },
    // 响应拦截器
    response: (func) => {
      if (func) {
        MinRequest[requestAfter] = func;
      } else {
        // 如果没有传递拦截函数，则使用默认的空函数
        MinRequest[requestAfter] = (response) => response;
      }
    },
  };

  // 静态方法用于请求前的处理
  static [requestBefore](config) {
    return config;
  }

  // 静态方法用于请求后的处理
  static [requestAfter](response) {
    return response;
  }

  // 静态方法检查是否是完整的URL
  static [isCompleteURL](url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }

  // 设置配置
  setConfig(func) {
    this[config] = func(this[config]);
  }

  // 请求方法
  request(options = {}) {
    // 合并配置项

    options.baseURL = options.baseURL || this[config].baseURL;
    options.dataType = options.dataType || this[config].dataType;
    options.url = MinRequest[isCompleteURL](options.url) ? options.url : (options.baseURL + options.url);
    options.data = options.data;
    // 添加对 config.header 的检查和初始化
    options.header = { ...options.header, ...this[config].header };
    options.method = options.method || this[config].method;

    options = { ...options, ...MinRequest[requestBefore](options) };
    console.log('走这里了', options);
    // 返回一个Promise对象
    return new Promise((resolve, reject) => {
      options.success = function (res) {
        resolve(MinRequest[requestAfter](res));
      };
      options.fail = function (err) {
        reject(MinRequest[requestAfter](err));
      };
      // 发起请求
      uni.request(options);
    });
  }

  // 封装GET请求
  get(options = {}) {
    options.method = 'GET';
    console.log('请求的信息', options);
    return this.request(options);
  }

  // 封装POST请求
  post(options = {}) {
    options.method = 'POST';
    return this.request(options);
  }
}

// Vue插件
MinRequest.install = function (app) {
  app.mixin({
    // 在Vue组件的beforeCreate生命周期中执行
    beforeCreate() {
      if (this.$options.minRequest) {
        // 如果组件配置了minRequest，则将minRequest的APIs挂载到全局
        app.config.globalProperties.$minApi = this.$options.minRequest.apis;
      }
    },
  });
};

export default MinRequest;
