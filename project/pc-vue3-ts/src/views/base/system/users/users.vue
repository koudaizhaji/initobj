<template>
  <div class="user">
    <pageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <pageContent
      :content-config="contentConfig"
      ref="contentRef"
      @new-click="handleNewDataClick"
      @edit-click="handleEditDataClick"
    >
      <!-- 通过具名插槽全部自定义 -->
      <template #status="scope">
        <el-tag :type="scope.row[scope.prop] == 1 ? 'success' : 'danger'">{{
          scope.row[scope.prop] == 1 ? '启用' : '禁用'
        }}</el-tag>
      </template>
      <template #role_id="scope">
        <el-tag
          :type="
            scope.row[scope.prop] == 1
              ? 'success'
              : scope.row[scope.prop] == 2
                ? ''
                : scope.row[scope.prop] == 3
                  ? 'danger'
                  : scope.row[scope.prop] == 4
                    ? 'warning'
                    : 'info'
          "
          >{{ getRoleName(scope.row[scope.prop]) }}</el-tag
        >
      </template>
    </pageContent>
    <!-- 弹窗 -->
    <pageModal :modal-config="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup name="user">
// computed数据有一些改变时，重新获取下

import pageSearch from '@/components/public/page-search/page-search.vue'
import searchConfig from './config/search.config'

import pageContent from '@/components/public/page-content/page-content.vue'
import contentConfig from './config/content.config'

import pageModal from '@/components/public/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'

import useMainStore from '@/stores/base/main'
import { storeToRefs } from 'pinia'

const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
// 弹窗所需的3个操作
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()

// 获取role/group数据,拿store里的数据
const mainStore = useMainStore()
// storeToRefs是为了保障数据的响应式
const { entireRoles, entireGroups } = storeToRefs(mainStore)
console.log('拿到的角色信息1111', entireRoles.value)
modalConfig.formItems[3].options = entireRoles.value
modalConfig.formItems[2].options = entireGroups.value
</script>

<style scoped></style>
