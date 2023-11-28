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
import { menuList as list } from './hooks'
import { addMenu, editMenu } from '@/services/base/home'

type Form = {
  title: string
  url: string
  parentId: number
}

const props = defineProps<{
  type?: '' | 'default' | 'success' | 'warning' | 'info' | 'text' | 'primary' | 'danger'
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
  title: '',
  url: '',
  parentId: 0
})
const ruleFormRef = ref()
const dialogTitle = computed(() => {
  if (props.title) return props.title
  return props.isEdit ? '编辑' : '创建'
})
const menuList = computed(() => {
  const getTree = (arr: Record<string, any>[]) => {
    if (arr.length === 0) return []
    const out: object[] = []
    for (const item of arr) {
      const obj: Record<string, any> = {
        value: item.id,
        label: item.title,
        disabled: item.url === 'no-url'
      }
      if (item.children && Array.isArray(item.children)) obj.children = getTree(item.children)
      out.push(obj)
    }
    return out
  }
  return getTree(list.value)
})
const destroyDialog = ref<boolean>(false)
const rules: FormRules<Form> = {
  title: [{ required: true, message: '菜单名称不能为空！', trigger: 'blur' }],
  parentId: [{ required: true, message: '父级菜单不能为空！', trigger: 'blur' }],
  url: [{ required: true, message: '菜单地址不能为空！', trigger: 'blur' }]
}

const open = () => {
  if (props.isEdit && props.data) {
    form.title = props.data.title
    form.url = props.data.url
    form.parentId = Number(props.data.parent_id)
  }
  destroyDialog.value = true
  visible.value = true
}
const close = () => {
  form.title = ''
  form.url = ''
  form.parentId = 0
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
      if (props.isEdit) {
        editMenu<Form>(form).then(({ code }) => {
          if (code === 0) {
            close()
            ElMessage.success('编辑成功')
            emits('refresh')
          } else {
            ElMessage.error('编辑失败')
            submitLoading.value = false
          }
        })
      } else {
        addMenu<Form>(form).then(({ code }) => {
          if (code === 0) {
            close()
            ElMessage.success('创建成功')
            emits('refresh')
          } else {
            ElMessage.error('创建失败')
            submitLoading.value = false
          }
        })
      }
    }
  })
}
const changeParentIdType = (value: number = 0) => {
  form.parentId = value
}
const changeUrlType = (value: boolean = false) => {
  if (value) {
    form.url = ''
  } else {
    form.url = 'no-url'
  }
}
</script>

<template>
  <ElButton :type="props.type" :link="props.link" @click="open" :loading="props.loading">
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
        <ElFormItem label="菜单名称" prop="title">
          <ElInput v-model="form.title" :maxlength="64" />
        </ElFormItem>
        <ElFormItem label="父级菜单" prop="parentId">
          <div>
            <ElCheckbox
              :modelValue="form.parentId === 0"
              @click="changeParentIdType(0)"
              size="large"
              >新建一级</ElCheckbox
            >
            <ElCheckbox
              :modelValue="form.parentId !== 0"
              @click="changeParentIdType(1)"
              size="large"
              >选择父级</ElCheckbox
            >
          </div>
          <ElTreeSelect
            v-show="form.parentId !== 0"
            class="w-full"
            :data="menuList"
            v-model="form.parentId"
            check-strictly
          />
        </ElFormItem>
        <ElFormItem label="菜单类型">
          <ElCheckbox :modelValue="form.url !== 'no-url'" @click="changeUrlType(true)" size="large"
            >菜单</ElCheckbox
          >
          <ElCheckbox :modelValue="form.url === 'no-url'" @click="changeUrlType(false)" size="large"
            >接口</ElCheckbox
          >
        </ElFormItem>
        <ElFormItem label="菜单地址" v-show="form.url !== 'no-url'" prop="url">
          <ElInput v-model="form.url" :maxlength="128" />
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
