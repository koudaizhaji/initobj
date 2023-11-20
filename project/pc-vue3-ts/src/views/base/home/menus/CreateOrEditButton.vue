<script setup lang="ts">
// import { ElButton, ElDialog } from 'element-plus'
import { onMounted, reactive } from 'vue'

const props = defineProps<{
  type: string
  data?: Record<string, string>
}>()

const form = reactive({
  title: '',
  type: '1',
  url: '',
  parentId: ''
})
onMounted(() => {
  if (props.type === 'edit' && props.data) {
    Object.keys((item: string) => {
      form[item] = props.data[item]
    })
  } else if (props.data && props.data.parentId) {
    form.parentId = props?.data.parentId
  }
})
</script>

<template></template>
