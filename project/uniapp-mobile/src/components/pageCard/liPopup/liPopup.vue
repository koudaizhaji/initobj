<template>
  <view
    class="home"
  >
    <uni-popup
      ref="popup"
      type="center"
    >
      <view class="popUp">
        <view class="pt-20px mb-20px font-size-6 text-center">
          确认信息
        </view>
        <view class="w100%">
          <ul class="inform">
            <li v-show="formData.name">
              姓名&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.name }}
            </li>
            <li v-show="formData.age">
              年龄&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.age }}
            </li>
            <li v-show="formData.email">
              邮箱&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.email }}
            </li>
            <li v-show="formData.birth">
              生日&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.birth }}
            </li>
            <li v-show="formData.weight">
              体重&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.weight }}
            </li>
            <li v-show="formData.sex">
              性别&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ sex[formData.sex].text }}
            </li>
            <li v-show="formData.remarks">
              留言&nbsp;<span style="font-weight: 700;">：</span>&nbsp;{{ formData.remarks }}
            </li>
          </ul>
        </view>
        <view class="w100% flex mb-20px">
          <button
            class="btna"
            style="background-color: #67c23a;"
            type="primary"
            @click="close"
          >
            修改
          </button>
          <button
            class="btna"
            type="primary"
            @click="submitForm('form')"
          >
            提交
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup lang="ts">

defineProps({
  formData: {
    type: Object,
    default: {},
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const open = () => {
  this.$refs.popup.open();
};
const close = () => {
  this.$refs.popup.close();
};

const submitForm = (formName) => {
};

</script>

<style lang="scss" scoped>
.home {
  @apply flex flex-justify-center flex-items-center w-100\% h-100\% bg-center bg-no-repeat bg-cover;
}
</style>
