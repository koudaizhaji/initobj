<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import {
  ElDialog,
  ElButton,
  ElForm,
  ElFormItem,
  ElInput,
  ElTreeSelect,
  ElCheckbox,
  ElMessage,
  type FormRules
} from 'element-plus'
import { addUser, editUser } from '@/services/base/home'

type Form = {
  username: string
  password: string
  userid: string | number
}

const props = defineProps<{
  type?: '' | 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger'
  round?: boolean
  link?: boolean
  data?: Record<string, string>
  isEdit?: boolean
  title?: string
  loading?: boolean
}>()
const emits = defineEmits<{
  (e: 'refresh'): void
}>()

const visible = ref<boolean>(false)
const submitLoading = ref<boolean>(false)
const form = reactive<Form>({
  username: '',
  password: '',
  userid: ''
})
const ruleFormRef = ref()
const dialogTitle = computed(() => {
  if (props.title) return props.title
  return props.isEdit ? '编辑' : '创建'
})
const destroyDialog = ref<boolean>(false)
const rules: FormRules<Form> = {
  username: [{ required: true, message: '用户名不能为空！', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空！', trigger: 'blur' }]
}

const open = () => {
  if (props.isEdit && props.data) {
    console.log('props.data===🚀===>', props.data)
    form.username = props.data.username
    form.userid = props.data.id
  }
  destroyDialog.value = true
  visible.value = true
}
const close = () => {
  form.username = ''
  form.password = ''
  visible.value = false
  submitLoading.value = false
  setTimeout(() => {
    destroyDialog.value = false
  }, 100)
}
const submit = () => {
  if (!ruleFormRef.value) return
  ruleFormRef.value.validate((valid: boolean) => {
    if (valid) {
      submitLoading.value = true
      if (!props.isEdit) {
        addUser(form).then(() => {
          ElMessage.success('创建成功')
          emits('refresh')
          close()
        }).catch(() => {
          submitLoading.value = false
        })
      } else {
        editUser(form).then(() => {
          ElMessage.success('编辑成功')
          emits('refresh')
          close()
        }).catch(() => {
          submitLoading.value = false
        })
      }
    }
  })
}
</script>

<template>
  <ElButton :type="props.type" :link="props.link" @click="open" :round="props.round" :loading="props.loading">
    <slot name="default"></slot>
  </ElButton>
  <ElDialog
    destroy-on-close
    v-if="destroyDialog"
    v-model="visible"
    :title="dialogTitle"
    width="30%"
    :beforeClose="close"
    append-to-body
  >
    <template v-slot:default>
      <ElForm :model="form" label-width="120px" :rules="rules" ref="ruleFormRef">
        <ElFormItem label="用户名" prop="username">
          <ElInput v-model="form.username" :maxlength="64" />
        </ElFormItem>
        <ElFormItem label="密码" prop="password">
          <ElInput v-model="form.password" type="password" show-password :maxlength="64" />
        </ElFormItem>
      </ElForm>
    </template>
    <template v-slot:footer>
      <span class="dialog-footer">
        <ElButton @click="close">取消</ElButton>
        <ElButton type="primary" @click="submit" :loading="submitLoading">确定</ElButton>
      </span>
    </template>
  </ElDialog>
</template>
