<template>
  <div class="page">
    <div class="install">
      <!-- Table and Content -->
      <div class="descs">
        <sidebar
          class="desc-sidebar"
          :treeList="descTreeList"
          @nodeClick="handleNodeClick"
          @new-desc-click="handleNewDescClick"
          @new-desc-type-click="handleNewDescTypeClick"
        ></sidebar>
        <pageContent
          class="desc-content"
          :contentConfig="contentConfig"
          @new-click="handleNewDescContentClick"
          @edit-click="handleEditDataClick"
          ref="contentRef"
        >
          <!-- Custom Slot for Status -->
          <template #status="scope">
            <el-tag :type="scope.row.status == 1 ? 'info' : 'danger'">
              {{ scope.row.status == 1 ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </pageContent>
        <pageModal :modalConfig="modalConfig" ref="pageModalRef" />
        <pageModal :modalConfig="descModalConfig" ref="descModalRef" />
        <pageModal :modalConfig="descTypeModalConfig" ref="descTypeModalRef" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="group">
import { onMounted, ref } from 'vue'
import pageSearch from '@/components/pages/page-search/page-search.vue'
import searchConfig from './config/search.config'
import pageContent from '@/components/pages/page-content/page-content.vue'
import contentConfig from './config/content.config'
import pageModal from '@/components/pages/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
import sidebar from './components/sidebar.vue'
import useSystemStore from '@/stores/base/system/system'
import useInstallStore from '@/stores/install/install'

import descModalConfig from './config/desc-modal.config'
import descTypeModalConfig from './config/desc-type-modal.config'

// import { mapDictToOptions } from '@/utils/dict-options'
import { ElMessage } from 'element-plus'

const systemStore = useSystemStore()
const installStore = useInstallStore()
const descTreeList = ref([])
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

const handleNewDescContentClick = () => {
  // console.log('点了新建字典内容')
  isNewDictContent.value = true
  handleNewDataClick(0)
}

// const descModalRef = refList[0]
// const descTypeModalRef = refList[1]

const getDescTree = async () => {
  const res = await systemStore.getDescTree('dicts', { dictId: '', typeId: '' })
  if (res.code === 0) {
    console.log('获取到的字典树', res.data)
    if (res.code === 0) {
      // 赋值传递给子组件
      descTreeList.value = res.data
      // 将所有的res.data的id赋值给descTypeModalConfig.formItems[0].options
      descTypeModalConfig.formItems[0].options = res.data.map((item) => {
        return {
          id: item.id,
          label: item.name,
          value: item.id
        }
      })

      // console.log('添加后结果', descTypeModalConfig.formItems[0].options)
    }
  }
}
// 获取菜单
const getMenuTree = async () => {
  console.log('installStore', installStore)
  await installStore.getInitMenu('suibian')
}

// 子节点的选择
const handleNodeClick = (node: any) => {
  console.log('点击了菜单', node)
  // 如果node.id包含type,标识二级类型
  selectDesc.value = { ...node }
  const idList = `${node.id}`.split('_')
  if (idList[0] === 'type') {
    console.log('点击了2级菜单菜单', node)
    contentConfig.pageUrl.handleName = `/types/${idList[1]}/contents`
    handleQueryClick(contentConfig.pageUrl)
  }
}

onMounted(() => {
  getDescTree()
  getMenuTree()
})
</script>

<style scoped lang="less">
.page {
  display: flex;
}

.sidebar {
  /* Add your styles for the left sidebar */
}

.install {
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
