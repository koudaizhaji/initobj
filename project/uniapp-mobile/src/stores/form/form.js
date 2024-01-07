import { defineStore } from 'pinia';
import formApi from '@/api/form.js';

const FormStore = defineStore('formStore', {
  state: () => ({
    teacher: [],
    source: [],
    school_type: [],
    head_id: [],
    join_field: [],
  }),
  actions: {
    async getDescTree({ dictId, typeId }) {
      // console.log('执行了', Object.keys(this.$state));
      const res = await formApi.postDictTree(dictId, typeId);
      console.log('res', res);
      if (res.code === 0) {
        res.data[0].children.forEach((item) => {
          // 如果字典里的东西跟state的属性一致，则直接将其的children的children赋值
          Object.keys(this.$state).forEach((key) => {
            // console.log('item.type_name', item.type_code, key, item.type_code === key);
            if (item.type_code === key) {
              console.log('this.$state[key]', this.$state[key]);
              this.$state[key] = item.children;
            }
          });
        });
      }
      console.log('this.$state', this.$state);
    },
    async postOrder(formData) {
      const res = await formApi.postOrder(formData);
      console.log('提交结果', res);
    },
    async postSource(formData) {
      const res = await formApi.postSource(formData);
      // console.log('postSource提交结果', res);
      return res;
    },
  },
});

export default FormStore;
