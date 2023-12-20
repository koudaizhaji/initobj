import { ref } from 'vue'
import type PageContent from '@/components/page-content/page-content.vue'
// search搜索操作
function usePageContent() {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  // 搜索
  function handleQueryClick(searchInfo: any) {
    console.log('拿到的搜索111', searchInfo)
    // 调用content页面里的fetchPageListData方法
    contentRef.value?.fetchPageListData(searchInfo)
  }
  // 重置
  function handleResetClick() {
    contentRef.value?.handleResetClick()
  }
  function handleExportExcel() {
    contentRef.value?.exportExcel()
  }
  return {
    contentRef,
    handleQueryClick,
    handleResetClick,
    handleExportExcel
  }
}

export default usePageContent
