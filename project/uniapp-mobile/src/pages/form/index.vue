<template>
  <view class="form">
    <uni-forms
      ref="forms"
      :value="formData"
      :rules="rules"
      validate-trigger="bind"
      err-show-type="undertext"
    >
      <!-- 信息录入区 -->
      <uni-group
        title="基础订单录入"
        top="0"
      >
        <uni-forms-item
          name="name"
          required
          label="学生姓名"
        >
          <uni-easyinput
            v-model="formData.name"
            type="text"
            placeholder-style="color: #808080"
            :input-border="true"
            placeholder="请输入学生姓名"
          />
        </uni-forms-item>

        <uni-forms-item
          required
          name="joinData"
          label="报名日期"
        >
          <uni-datetime-picker
            v-model="formData.joinData"
            timestamp
          />
        </uni-forms-item>

        <uni-forms-item
          name="joinField"
          required
          label="报名专业"
        >
          <uni-data-select
            v-model="formData.joinField"
            :localdata="fieldList"
            @change="changeField"
          />
        </uni-forms-item>

        <uni-forms-item
          name="source"
          required
          label="订单来源"
        >
          <uni-data-select
            v-model="formData.source"
            :localdata="source"
            @change="changeField"
          />
          <!-- <uni-easyinput
            v-model="formData.source"
            type="text"
            placeholder-style="color: #808080"
            :input-border="true"
            placeholder="订单来源"
          /> -->
        </uni-forms-item>

        <uni-forms-item
          name="schoolType"
          required
          label="学习类型"
        >
          <uni-data-select
            v-model="formData.schoolType"
            :localdata="sTypeList"
            @change="changeSchoolType"
          />
        </uni-forms-item>
        <uni-forms-item
          name="feeSum"
          required
          label="收费金额"
        >
          <uni-easyinput
            v-model="formData.feeSum"
            type="number"
            placeholder-style="color: #808080"
            :input-border="true"
            placeholder="请输入数字"
          />
        </uni-forms-item>

        <uni-forms-item
          name="teacher"
          required
          label="教务老师"
        >
          <uni-data-select
            v-model="formData.teacher"
            :localdata="teacherList"
            @change="changeTeacher"
          />
        </uni-forms-item>

        <uni-forms-item

          name="overState"
          required
          label="结算情况"
        >
          <switch
            :checked="formData.overState"
            @change="change('checked', $event.detail.value)"
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
  <TabBar />
</template>

<script lang="ts" setup>

// import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { rules } from './config/index-validate';
// import UseFormStore from '@/stores/form/form';
// import userForms from '@/components/forms/forms.vue';
// 表单的store操作
// const formStore = UseFormStore();
import formApi from '@/api/form.js';
import { isLogin } from '@/utils/public.js';

const defaultFormData = {
  name: '',
  joinData: '',
  joinField: 0,
  source: '',
  schoolType: '',
  feeSum: 0,
  overState: false,
  teacher: 0,
};
const formData = ref(defaultFormData);

const OptionsList = ref({
  teacher: [],
  source: [],
  school_type: [],
  // head_id:[],
  join_field: [],
});
// const {
//   teacher, source, school_type, head_id,
// } = OptionsList;
// -----这里是函数封装- start----
const postOrder = async (formData) => {
  console.log('formData', formData);
  const res = await formApi.postOrder(formData);
  if (res.code === 0) {
    uni.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000,
    });
  } else {
    uni.showToast({
      title: '提交失败',
      icon: 'none',
      duration: 1000,
    });
  }
};

let sTypeList = ref([]);
let teacherList = ref([]);
let source = ref([]);
let fieldList = ref([]);

const getDictTree = async ({ dictId, typeId }) => {
  // console.log('执行了', Object.keys(this.$state));
  const res = await formApi.postDictTree(dictId, typeId);
  console.log('res', res);
  if (res.code === 0) {
    res.data[0].children.forEach((item) => {
      // 如果字典里的东西跟state的属性一致，则直接将其的children的children赋值
      Object.keys(OptionsList.value).forEach((key) => {
        // console.log('item.type_name', item.type_code, key, item.type_code === key);
        if (item.type_code === key) {
          OptionsList.value[key] = item.children;
        }
        // switch (key) {
        //   case 'teacher':
        //     OptionsList.value.teacher = item.children || [];
        //     break;
        //   case 'source':
        //     OptionsList.value.source = item.children || [];
        //     break;
        //   case 'school_type':
        //     OptionsList.value.school_type = item.children || [];
        //     break;
        //   case 'join_field':
        //     console.log('走了这里');
        //     OptionsList.value.join_field = item.children || [];
        //     break;
        //   default:
        //     break;
        // }
      });
      // console.log('OptionsList.value', OptionsList.value);
    });
    // console.log('OptionsList.value.school_type.value', OptionsList.value.school_type);
  }
};
// 同步数据
const syncData = () => {
  sTypeList = computed(() => OptionsList.value.school_type.map((item) => ({
    value: item.value,
    text: item.label,
  })));

  teacherList = computed(() => OptionsList.value.teacher.map((item) => ({
    value: item.value,
    text: item.label,
  })));
  source = computed(() => OptionsList.value.source.map((item) => ({
    value: item.value,
    text: item.label,
  })));
  fieldList = computed(() => OptionsList.value.join_field.map((item) => ({
    value: item.value,
    text: item.label,
  })));
};

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
    submitData(formData.value);
  }).catch((error) => {
    console.log('表单验证失败', error);
    uni.showToast({
      title: '请按要求填写完整',
      icon: 'none',
    });
  });
};
// 提交数据给后台
const submitData = (data) => {
  // console.log('提交数据了', data);
  postOrder(data);
};
// 重置表单
const resetForm = () => {
  // 使用Object.assign恢复默认值
  formData.value = { ...defaultFormData };
};
// const postOrder=async(formData)=> {
//       const res = await formApi.postOrder(formData);
//       console.log('提交结果', res);
//     },
//     const postSource=async (formData)=> {
//       const res = await formApi.postSource(formData);
//       // console.log('postSource提交结果', res);
//       return res;
//     },

// -----这里是函数封装- end----
getApp().globalData.saveSelectIndex();
if (isLogin()) {
  getDictTree({ dictId: 2 });
  syncData();
}

</script>
<style lang="scss" scoped>
body {
  font-family: Arial;
  font-size: 14px;
  color: #000;
}

.form {
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
}
</style>
