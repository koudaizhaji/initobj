import { defineStore } from 'pinia';
import echartApi from '@/api/echart.js';

const FormStore = defineStore('formStore', {
  state: () => ({

  }),
  actions: {
    async getOverCountAction(formData) {
      const res = await echartApi.getOverCount(formData);
      // console.log('提交结果', res);
      return res;
    },
    // 获取
    async getUserOrderAction() {
      const res = await echartApi.getUserOrder();
      return res;
    },
  },
});

export default FormStore;
