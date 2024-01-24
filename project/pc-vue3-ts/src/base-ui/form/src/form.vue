<template>
  <div class="lili-form">
    <el-form :model="formData" label-width="100px" size="large" status-icon :rules="rules" ref="ruleFormRef">
      <template v-for="item in modalConfig.formItems" :key="item.prop">
        <el-form-item :label="item.label" :prop="item.prop">
          <template v-if="item.type === 'input'">
            <el-input v-model="formData[item.prop]" :placeholder="item.placeholder"
              :disabled="item.disabled ? item.disabled : false" />
          </template>
          <template v-if="item.type === 'password'">
            <el-input show-password v-model="formData[item.prop]" :placeholder="item.placeholder" />
          </template>
          <template v-if="item.type === 'select'">
            <el-select v-model="formData[item.prop]" :placeholder="item.placeholder" style="width: 100%;">
              <template v-for="value in item.options" :key="value.id">
                <el-option :value="value.value" :label="value.label" />
              </template>
            </el-select>
          </template>
          <template v-if="item.type === 'timer'">
            <el-date-picker v-model="formData[item.prop]" type="datetime" :placeholder="item.placeholder" />
          </template>
          <template v-if="item.type === 'number'">
            <el-input-number v-model="formData[item.prop]" v-bind="item.otherConfig" /></template>
          <template v-if="item.type === 'date-picker'">
            <el-date-picker type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间"
              v-model="formData[item.prop]" />
          </template>
          <template v-if="item.type === 'custom'">
            <slot :name="item.slotName"></slot>
          </template>
        </el-form-item>
      </template>
    </el-form>
    <slot name="footer">
      <el-button @click="handleCannelClick(ruleFormRef)">取消</el-button>
      <el-button type="primary" @click="handleConfirmClick(ruleFormRef)">确定</el-button>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref,defineExpose } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { localCache } from '@/utils/cache'
import { USER_INFO } from '@/config'
import useSystemMenuStore from '@/stores/base/system/menu'

const systemMenuStore =useSystemMenuStore()
// 定义props
interface IProps {
  modalConfig: {
    pageName: string
    pageUrl: any
    editUrl: any
    title: string
    editTitle: string
    formItems: any[]
  }
  otherInfo?: any
}

const props = defineProps<IProps>()
const rules = reactive<FormRules>({})
const ruleFormRef = ref<FormInstance>()

// 定义数据绑定
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
  if (item.rules) {
    rules[item.prop] = item.rules
  }
}
const formData = reactive(initialForm)
const dialogVisible = ref(false)
// 确认添加
function handleConfirmClick(formEl: FormInstance | undefined) {
  console.log('formEl', formEl)
  if (!formEl) return
  formEl.validate(async (valid) => {
    // console.log('submit!',valid,formData)
    if (valid) {
      if(formData.newPassword!==formData.confirmPassword){
        // alert('两次密码不一致')
        ElMessage.warning('两次密码不一致')
        return
      }
      if(formData.newPassword==formData.oldPassword){
          // alert('新老密码一致，请重新修改')
          ElMessage.warning('新老密码一致，请重新修改')
          return
      }
      // alert('密码一致，提交修改，并退出')
      // 从本地取userInfo
      const userInfo = {
        password: formData.oldPassword,
        newPassword: formData.newPassword
      }
      console.log('userInfo',userInfo)
      // 重新定义一个修改密码的方法
      // const res = await systemStore.editPageDataAction("users/update",userInfo.id,userInfo)
      const res = await systemMenuStore.changePasswordAction(userInfo)
      console.log('修改结果',res)
      if(res.code==0){
        ElMessage.success(res.message)
        // 清除本地信息
        localCache.clearCache()
        setTimeout(() => {
        // 刷新页面
          window.location.reload()
        },1000)
      }else{
        console.log("res",res)
        ElMessage.error(res.message)
      }
    } else {
      console.log('error submit!')
      ElMessage.error('表单验证失败!')
      return false
    }
  })
}
// 点击取消
function handleCannelClick(formEl: FormInstance | undefined) {
  if (!formEl) return
  dialogVisible.value = false
  formEl.resetFields()
}
defineExpose({
   handleConfirmClick,
   handleCannelClick,
   dialogVisible,
   ruleFormRef
})
</script>

<style lang="less">
.lili-form {
  padding-top: 22px;
}
</style>
