<template>
  <div class="user">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
      @exp-click="handleExportExcel"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewDataClick"
      @edit-click="handleEditDataClick"
      @exp="exportExcelClick"
    >
      <!-- 通过具名插槽全部自定义 -->
      <template #status="scope">
        <el-tag :type="scope.row.status == 1 ? 'success' : 'danger'">{{
          scope.row.status == 1 ? '启用' : '禁用'
        }}</el-tag>
      </template>
      <template #role_id="scope">
        <el-tag
          :type="
            scope.row.role_id == 1
              ? 'success'
              : scope.row.role_id == 2
                ? ''
                : scope.row.role_id == 3
                  ? 'danger'
                  : scope.row.role_id == 4
                    ? 'warning'
                    : 'info'
          "
        >
          {{ getRoleName(scope.row.role_id) }}
        </el-tag>
      </template>
      <template #rightBtn>
        <el-button type="primary" size="small" icon="EditPen" @click="handleNewDataClick">
          新增用户
        </el-button>
        <el-button type="primary" size="small" icon="EditPen" @click="exportExcelClick">
          导出表格
        </el-button>
      </template>
    </pageContent>
    <!-- 弹窗 -->
    <pageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup name="user">
// computed数据有一些改变时，重新获取下

import pageSearch from '@/components/pages/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/pages/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/pages/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/stores/base/base'
import { storeToRefs } from 'pinia'

const { contentRef, handleQueryClick, handleResetClick, handleExportExcel } = usePageContent()
// 弹窗所需的3个操作
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()
// 获取role/group数据,拿store里的数据
const mainStore = useMainStore()
const { entireRoles, entireGroups } = storeToRefs(mainStore)

const exportExcelClick = () => {
  handleExportExcel()
}
// 所属角色查询
const getRoleName = (id: number) => {
  console.log('拿到匹配角色的信息', id)
  modalConfig.formItems[3].options = entireRoles.value
  modalConfig.formItems[2].options = entireGroups.value
  if (entireRoles.value) {
    for (const item of entireRoles.value) {
      if (item.id === id) {
        return item.name
      }
    }
  }
}
</script>

<style scoped></style>
