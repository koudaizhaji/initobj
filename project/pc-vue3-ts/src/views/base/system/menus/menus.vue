<template>
  <div class="menu">
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewDataClick"
      @edit-click="handleEditDataClick"
      @filter-method="filterHandler"
    >
      <template #status="scope">
        <el-tag
          :type="scope.row.status == '1' ? 'success' : 'danger'"
          @click="elTagChange(scope.row)"
          >{{ scope.row.status == '1' ? '启用' : '禁用' }}</el-tag
        >
      </template>
    </pageContent>

    <pageModal :modal-config="modalConfig" ref="modalRef"></pageModal>
  </div>
</template>

<script lang="ts" setup name="menu">
import pageContent from '@/components/pages/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/pages/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import { ElMessage } from 'element-plus'
import type { TableColumnCtx } from 'element-plus'

import useSystemStore from '@/stores/base/system/system'
const systemStore = useSystemStore()

const { contentRef } = usePageContent()
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()
// 点击标签改变状态
async function elTagChange(row: any) {
  console.log('elTagChange', row)
  if (row.status == '1') {
    row.status = '0'
  } else {
    row.status = '1'
  }
  const res = await systemStore.editPageDataAction(contentConfig.pageName, row.id, row)
  res.code === 0
    ? ElMessage.success({ message: row.status == '1' ? '菜单【启用】成功' : '菜单【禁用】成功' })
    : ElMessage.error({ message: res.message })
}
// 筛选操作
const filterHandler = (value: string, row: any, column: TableColumnCtx<any>) => {
  // console.log('进行了筛选操作', data)
  const property = column['property']
  console.log('property', property, row[property], value)
  return row[property] === value
}
</script>

<style scoped></style>
