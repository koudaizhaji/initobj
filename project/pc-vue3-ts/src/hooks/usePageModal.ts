import { ref, type Ref } from 'vue'
import type PageModal from '@/components/pages/page-modal/page-modal.vue'

type callbackType = (item?: any) => void

function usePageModal(
  refNames: String[] = [],
  newCallback?: callbackType,
  editCallback?: callbackType
) {
  if (refNames.length === 0) refNames.push('modalRef')
  const refList = refNames.map(() => {
    // 根据 refName 获取实际的 ref 对象，如果不存在则使用 modalRef
    return ref<InstanceType<typeof PageModal>>()
  })
  const modalRef = refList[0]
  function handleNewDataClick(index: number = 0) {
    const currentRef = refList[index]
    // console.log('点了新建handleNewDataClick')
    currentRef.value?.setDialogVisible()
    if (newCallback) newCallback()
  }
  function handleEditDataClick(data: any, index: number = 0) {
    // console.log('点击了编辑操作',data)
    const currentRef = refList[index]
    currentRef.value?.setDialogVisible(false, data)
    if (editCallback) editCallback(data)
  }

  return {
    modalRef,
    refList,
    handleNewDataClick,
    handleEditDataClick
  }
}

export default usePageModal
