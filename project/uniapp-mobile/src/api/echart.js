import Api from './request';

class Echart {
  // 订单结算情况，通过token确定是谁
  async getOverCount() {
    return Api.get({
      url: '/educount/order/count/overStatus/list',
    });
  }

  // 获取学生订单
  async getUserOrder() {
    return Api.post({
      url: '/educount/order/list',
    });
  }
}
export default new Echart();
