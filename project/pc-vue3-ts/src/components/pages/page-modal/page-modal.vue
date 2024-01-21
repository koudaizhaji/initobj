<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? modalConfig.editTitle : modalConfig.title"
      width="30%"
      center
    >
      <div class="form">
        <el-form
          :model="formData"
          label-width="100px"
          size="large"
          status-icon
          :rules="rules"
          ref="ruleFormRef"
        >
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  :disabled="item.disabled ? item.disabled : false"
                />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  show-password
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%;"
                >
                  <template v-for="value in item.options" :key="value.id">
                    <el-option :value="value.value" :label="value.label" />
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'timer'">
                <el-date-picker
                  v-model="formData[item.prop]"
                  type="datetime"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-if="item.type === 'number'">
                <el-input-number v-model="formData[item.prop]" v-bind="item.otherConfig"
              /></template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  v-model="formData[item.prop]"
                />
              </template>
              <template v-if="item.type === 'custom'">
                <slot :name="item.slotName"></slot>
              </template>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCannelClick(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick(ruleFormRef)">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="modal">
// import useSystemStore from '@/stores/base/system/system'
import pageDataStore from '@/stores/public/pages/pagestore'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

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
const ruleFormRef = ref<FormInstance>()
const dialogVisible = ref(false)
const isEdit = ref(false) // 是否编辑
const editData = ref()
const rules = reactive<FormRules>({})

// 部门和角色的数据
// const mainStore = useMainStore()
// const { entireDepartments } = storeToRefs(mainStore)

// 定义数据绑定
const initialForm: any = {}
for (const item of props.modalConfig.formItems) {
  initialForm[item.prop] = item.initialValue ?? ''
  if (item.rules) {
    rules[item.prop] = item.rules
  }
}
const formData = reactive(initialForm)

// 点击确定
// const systemStore = useSystemStore()
const pageStore = pageDataStore()
// 确认添加
function handleConfirmClick(formEl: FormInstance | undefined) {
  console.log('formEl', formEl)
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      console.log('submit!')
      await clickConfirmBtn()
    } else {
      console.log('error submit!')
      return false
    }
  })
}
// 点击确定按钮的一系列操作
async function clickConfirmBtn() {
  dialogVisible.value = false

  let data = { ...formData }
  // 判断props有没有额外信息
  if (props.otherInfo) {
    data = { ...data, ...props.otherInfo }
  }
  let res
  const messageObj = { message: '' }
  if (!isEdit.value) {
    res = await pageStore.newPageDataAction(props.modalConfig.pageUrl, data)
    messageObj.message = '新增'
    const getDataRes = await pageStore.getPageListDataAction(props.modalConfig.editUrl, {
      pageNum: 1,
      pageSize: 10
    })
  } else {
    res = await pageStore.editPageDataAction(props.modalConfig.pageUrl, editData.value.id, data)
    console.log('编辑确认')
    const getDataRes = await pageStore.getPageListDataAction(props.modalConfig.editUrl, {
      pageNum: 1,
      pageSize: 10
    })
    console.log('编辑后的请求列表结果', getDataRes)
    messageObj.message = '编辑'
  }
  console.log('修改删除', editData.value)
  editData.value?.title
    ? (messageObj.message += `【${editData.value.title}】成功`)
    : (messageObj.message = res.message)
  res.code === 0 ? ElMessage.success(messageObj) : ElMessage.error(messageObj)
  // 直接刷新页面吧，只是请求数据有点麻烦
  // window.location.reload()
}

// 点击取消
function handleCannelClick(formEl: FormInstance | undefined) {
  if (!formEl) return
  dialogVisible.value = false
  formEl.resetFields()
}
// 新建或者编辑
function setDialogVisible(isNew: boolean = true, data: any = {}) {
  dialogVisible.value = true
  isEdit.value = !isNew
  editData.value = data
  for (const key in formData) {
    if (isNew) {
      formData[key] = ''
    } else {
      formData[key] = data[key]
    }
  }
}

defineExpose({
  setDialogVisible,
  dialogVisible,
  formData
})
</script>

<style scoped lang="less">
.form {
  padding: 10px 30px;
}
</style>
