<template>
  <view>
    <uni-forms
      ref="forms"
      :value="formData"
      :rules="rules"
      validate-trigger="bind"
      err-show-type="undertext"
    >
      <!-- 信息录入区 -->
      <uni-group
        title="订单来源预存"
        top="0"
      >
        <uni-forms-item
          name="dictTypeId"
          required
          label="业务编号"
        >
          <uni-data-select
            v-model="formData.dictTypeId"
            :localdata="sourceList"
            @change="changeField"
          />
        </uni-forms-item>
        <uni-forms-item
          name="label"
          required
          label="显示内容"
        >
          <uni-easyinput
            v-model="formData.label"
            type="text"
            placeholder-style="color: #808080"
            :input-border="true"
            placeholder="请输入显示的文字"
          />
        </uni-forms-item>
        <uni-forms-item
          name="value"
          required
          label="字典值"
        >
          <uni-easyinput
            v-model="formData.value"
            type="text"
            placeholder-style="color: #808080"
            :input-border="true"
            placeholder="请输入英文字母的字典值"
          />
        </uni-forms-item>
        <uni-forms-item
          name="desc"
          required
          label="来源描述"
        >
          <uni-easyinput
            v-model="formData.desc"
            type="text"
            placeholder-style="color: #808080"
            :input-border="true"
            placeholder="请输入文字描述备注"
          />
        </uni-forms-item>
        <uni-forms-item
          name="status"
          required
          label="是否启用"
        >
          <uni-data-select
            v-model="formData.status"
            :localdata="statusList"
            @change="changeField"
          />
        </uni-forms-item>
      </uni-group>

      <!-- 校验区 -->
      <view class="w100% flex mb-20px">
        <button
          class="btnReset"
          type="default"
          @click="resetForm"
        >
          重置
        </button>
        <button
          class="submitBtn"
          type="primary"
          @click="submitForm"
        >
          提交
        </button>
      </view>
    </uni-forms>
    <!-- 弹出层 -->
    <!-- <li-popup
      ref="popup"
      :form-data="formData"
      :show="show"
      @close="close"
    /> -->
  </view>
</template>

<script setup lang="ts">
import {
  defineProps, ref, watch, nextTick,
  computed,
} from 'vue';
import { rules } from './validate';
import formApi from '@/api/form.js';
// 表单的store操作

const sourceList = [{
  value: 2,
  text: '新增订单来源',
}];

const statusList = [
  {
    value: 1,
    text: '启用',
  },
  {
    value: 0,
    text: '禁用',
  },
];
const defaultFormData = {
  dictTypeId: '',
  label: '',
  value: '',
  desc: '',
  status: 1,
};
const formData = ref(defaultFormData);
// const sTypeList = computed(() => props.OptionsList.school_type.value.map((item) => ({
//   value: item.value,
//   text: item.label,
// })));

// const teacherList = computed(() => props.OptionsList.teacher.value.map((item) => ({
//   value: item.value,
//   text: item.label,
// })));
// const source = computed(() => props.OptionsList.source.value.map((item) => ({
//   value: item.value,
//   text: item.label,
// })));
// const fieldList = computed(() => props.OptionsList.join_field.value.map((item) => ({
//   value: item.value,
//   text: item.label,
// })));
// const fieldList = ref();
// 下拉框参考格式
// const teacherList = ref([{
//   id: 0,
//   text: '123',
//   value: 0,

// },
// {
//   id: 1,
//   value: 1,
//   text: 'shijie',
// },
// ]);

const change = (name, value) => {
  formData.value.checked = value;
  // 下拉框值设定
  // this.$refs.forms.setValue(name, value);
};

const changeField = (value) => {
  console.log('选择的专业', value);
};
const changeSchoolType = (value) => {
  console.log('选择的学校类型', value);
};
// 选择教务老师
const changeTeacher = (value) => {
  console.log('选择的教务老师', value);
};
// 表单提交
const forms = ref();
const submitForm = async () => {
  // console.log('点了表单提交', forms.value);
  forms.value.validate().then((res) => {
    // console.log('res', res);
    submitData(res);
  }).catch((error) => {
    console.log('表单验证失败', error);
    uni.showToast({
      title: '请按要求填写完整',
      icon: 'none',
    });
  });
};
// 提交数据给后台
const submitData = async (data) => {
  // console.log('提交数据了', data);
  // emits('postOrder', data);
  await postSource(data);
};
const postSource = async (formData) => {
  console.log('formData', formData);
  const res = await formApi.postSource(formData);
  console.log('res', res);
  if (res.code === 0) {
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000,
    });
  } else {
    const msg = {
      title: '提交失败',
      icon: 'none',
      duration: 1000,
    };
    if (res.code === 'M4000101') {
      msg.title = '提交失败，登录过期，请重新登录！';
      setTimeout(() => {
        uni.navigateTo({
          url: '/pages/login/index',
        });
      }, 3000);
    }
    uni.showToast(msg);
  }
};
// 重置表单
const resetForm = () => {
  // 使用Object.assign恢复默认值
  formData.value = { ...defaultFormData };
};
// if (isLogin()) {}
</script>

<style lang="scss" scoped>
::v-deep.uni-input-border {
  box-sizing: border-box;
  width: 100%;
  height: 35px;
  padding: 0 10px;
  font-size: 14px;
  color: #666;
  border: 1px #e5e5e5 solid;
  border-radius: 5px;
}

::v-deep.uni-forms-item__label {
  width: 80px !important;
}

::v-deep.uni-forms-item__content {
  width: 80px !important;
}

::v-deep.uni-calendar__content-mobile {
  margin-bottom: 50px !important;
}

::v-deep.uni-calendar__content {
  margin-bottom: 50px !important;
}

::v-deep.uni-group__content {
  width: 80%;
  margin: 0 auto;
}

li {
  list-style: none;
}

.submitBtn {
  width: 160px;
  height: 50px;
  margin: 0 auto;
  border-radius: 10px;

  // 浅蓝色
  &:active {
    color: white;
    background-color: #67c267;
  }
}

// 重置按钮，点击后有反应后恢复

.btnReset {
  width: 160px;
  height: 50px;
  margin: 0 auto;
  color: 000;
  border-radius: 10px;

  &:active {
    color: white;
    background-color: #ff4949;
  }
}

.btna {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  margin: 0 auto;
  border-radius: 24px;
}

.inform {
  padding: 0 0 0 20px;
  margin-bottom: 20px;

  li {
    margin-bottom: 10px;
    font-size: 18px;
    letter-spacing: 1px;
  }
}

.popUp {
  width: 300px;
  height: auto;
  padding-bottom: 10px;
  margin: auto;
  margin-top: 90px;
  background-color: white;
  border-radius: 24px;
}
</style>
