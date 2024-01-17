<template>
  <div class="page">
    <div class="main-content">
      <sidebar
        class="desc-sidebar"
        :treeList="descTreeList"
        @nodeClick="handleNodeClick"
        @new-desc-click="handleNewDescClick"
        @new-desc-type-click="handleNewDescTypeClick"
      ></sidebar>
    </div>
    <pageModal :modalConfig="modalConfig" ref="pageModalRef" />
  </div>
</template>

<script lang="ts" setup name="group">
import { computed, onBeforeMount, onMounted, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import sidebar from './components/sidebar.vue'
import useInstallStore from '@/stores/public/install/install'
import modalConfig from './config/modal.config'

const installStore = useInstallStore()
const descTreeList = ref([])
let menuList = ref([])
const isNewDictContent = ref(true) // 控制是否点的新建内容按钮

// 二级菜单的id
const selectDesc = ref({ id: '', label: '', children: [] })
// 新建自定义.选中2级或1级
const newCallback = () => {
  if (selectDesc.value.id != '') {
    // 选了侧边菜单
    console.log('点了侧边菜单', selectDesc.value)
    const idList = `${selectDesc.value.id}`.split('_')
    if (idList[0] === 'type') {
      console.log('点击了2级菜单菜单', {
        id: idList[1],
        label: selectDesc.value.label,
        value: idList[1]
      })
      modalConfig.formItems[0].options = []
      // 选2级了,仅将2级内容加入
      modalConfig.formItems[0].options?.push({
        id: idList[1],
        label: selectDesc.value.label,
        value: idList[1]
      })
    } else {
      // 点击了一级菜单
      modalConfig.formItems[0].options = selectDesc.value.children.map((item) => {
        return {
          id: item.id,
          label: item.label,
          value: item.id
        }
      })
    }
  } else {
    // console.log('请选择左侧字典')
    // 只有点击了内容的新建才提醒
    if (isNewDictContent.value) {
      ElMessage.error('请选择左侧字典选项后,再来添加内容')
    }
  }
}

// 弹窗所需操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()
const { modalRef, refList, handleNewDataClick, handleEditDataClick } = usePageModal(
  ['pageModalRef', 'descModalRef', 'descTypeModalRef'],
  newCallback
)
const pageModalRef = refList[0]
const descModalRef = refList[1]
const descTypeModalRef = refList[2]
const handleNewDescClick = () => {
  // console.log('点了新建字典')
  isNewDictContent.value = false
  handleNewDataClick(1)
}
const handleNewDescTypeClick = () => {
  // console.log('点了新建字典类型')
  isNewDictContent.value = false
  handleNewDataClick(2)
}

// 子节点的选择
const handleNodeClick = (node: any) => {
  console.log('点击了菜单', node.value)

  handleEditDataClick(node.value)
}
// currentType表示要找到第几层，将所有的信息给合并到一个数组，然后匹配对应的id
async function getMenuList() {
  menuList.value = await installStore.getInitMenu(modalConfig.pageName)
}
// 监听menuList.value
watch(menuList, () => {
  SyncgetMenuList()
})

function SyncgetMenuList() {
  descTreeList.value = menuList.value.map((item) => {
    console.log('item', item)
    return {
      id: item.id,
      label: `id:${item.id}>>>>>>>>
      页面级别：${item.type}>>>>>>>
      ${item.title}<<<<<<<<<<<基路径：${item.url}>>>>>>>>>${item.icon}>>>>>>${item.parent_id}==`,
      ...item,
      children: item.children.map((oneitem) => {
        return {
          id: oneitem.id,
          label: `id:${oneitem.id}==上级页面id：${oneitem.parent_id}>>>>>>${oneitem.type}${oneitem.title}==${oneitem.url}==${oneitem.icon}==`,
          ...oneitem,
          children: oneitem.children
            ? oneitem.children.map((twoItem) => {
                // console.log('twoItem', twoItem)
                return {
                  id: twoItem.id,
                  ...twoItem,
                  label: `==id:${twoItem.id}==parent_id${twoItem.parent_id}==${twoItem.type}${twoItem.title}==${twoItem.url}==${twoItem.icon}==`
                }
              })
            : []
        }
      })
    }
  })
}

onBeforeMount(() => {
  getMenuList()
})
</script>

<style scoped lang="less">
.page {
  display: flex;
}

.sidebar {
  /* Add your styles for the left sidebar */
}

.main-content {
  flex: 1;
  padding: 20px;
}

.descs {
  /* Your existing styles for the group */
  display: flex;
  justify-content: space-around;

  .desc-sidebar {
    flex: 1;
    max-width: 150px;
    margin-top: 22px;
  }
}
</style>
