<template>
  <div class="sidebars p-y-8px h-full" ref="pageSidebars">
    <div class="font-bold m-b-16px p-l-8px" v-show="props?.title">{{ props?.title }}</div>
    <ElTree :data="props.data" @node-click="nodeClick" />
  </div>
</template>

<script setup lang="ts" name="page-sider">
import { onMounted, ref } from 'vue'
import { ElTree } from 'element-plus'
import type { PageSideBarsProps } from './index'

const props = defineProps<PageSideBarsProps>()
const emits = defineEmits(['nodeClick'])
const pageSidebars = ref()

const nodeClick = (...args: any[]) => {
  emits('nodeClick', ...args)
}
onMounted(() => {
  pageSidebars.value.style = `width: ${props.width || 200}px`
})
</script>

<style scoped lang="less"></style>
