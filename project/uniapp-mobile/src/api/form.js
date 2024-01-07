import Api from './request';

class Forms {
  async postDictTree(dictId = '', typeId = '') {
    return Api.post({
      url: '/pcadmin/dicts',
      data: {
        dictId,
        typeId,
      },
    });
  }

  // 提交订单
  async postOrder(data) {
    return Api.post({
      url: '/educount/order/add',
      data,
    });
  }

  // 提交订单来源
  async postSource({
    label, value, desc, status, dictTypeId,
  }) {
    return Api.post({
      url: '/pcadmin/dictsContent/add',
      data: {
        label, value, desc, status, dictTypeId,
      },
    });
  }
}
export default new Forms();
