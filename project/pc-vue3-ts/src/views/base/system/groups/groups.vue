<template>
  <div class="group">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :contentConfig="contentConfig"
      @new-click="handleNewDataClick"
      @edit-click="handleEditDataClick"
      ref="contentRef"
    >
      <!-- 通过具名插槽全部自定义 -->
      <template #status="scope">
        <el-tag :type="scope.row.status == 1 ? 'info' : 'danger'">{{
          scope.row.status == 1 ? '启用' : '禁用'
        }}</el-tag>
      </template>
    </pageContent>
    <pageModal :modalConfig="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup name="group">
import pageSearch from '@/components/pages/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/pages/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/pages/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

// 弹窗所需操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()
</script>

<style scoped></style>
