<template>
  <div class="admin-install">
    <div class="top-handler">
      <!-- <vxe-button content="默认颜色" icon="vxe-icon-add"></vxe-button> -->
      <vxe-button
        status="primary"
        content="新建"
        icon="vxe-icon-add"
        class="mx-30px"
        @click="addNav"
      ></vxe-button>
      <!-- <vxe-button status="warning" content="删除" icon="vxe-icon-search"></vxe-button> -->
      <!-- <vxe-button status="danger" content="危险颜色" icon="vxe-icon-save"></vxe-button> -->
    </div>
    <vxe-table
      show-overflow
      ref="xTreeRef"
      border="inner"
      :row-config="{ isHover: true, useKey: true }"
      :show-header="false"
      :data="tableData"
      :radio-config="{ labelField: 'title' }"
      :scroll-y="{ enabled: false }"
      :tree-config="{
        transform: true,
        accordion: true,
        showLine: true,
        iconOpen: 'vxe-icon-square-minus-fill',
        iconClose: 'vxe-icon-square-plus-fill'
      }"
    >
      <vxe-column type="radio" tree-node>
        <template #default="{ row }">
          <span>
            <template v-if="row.children && row.children.length">
              <i
                class="tree-node-icon"
                :class="hasRowExpand(row) ? 'vxe-icon-folder-open' : 'vxe-icon-folder'"
              ></i>
            </template>
            <template v-else>
              <i class="tree-node-icon vxe-icon-file-txt"></i>
            </template>
            <span>【{{ row.id }}】--{{ row.title }}</span>
          </span>
        </template>
      </vxe-column>
      <vxe-column title="操作" width="140">
        <template #default="{ row }">
          <vxe-button type="text" icon="vxe-icon-setting-fill"></vxe-button>
          <vxe-button type="text" icon="vxe-icon-edit" @click="editHandler(row)"></vxe-button>
          <vxe-button type="text" icon="vxe-icon-delete" @click="removeRowEvent(row)"></vxe-button>
          <!-- <vxe-button type="text" icon="vxe-icon-home-fill"></vxe-button> -->
        </template>
      </vxe-column>
    </vxe-table>
    <pageModal :modalConfig="modalConfig" ref="modalRef" />
  </div>
</template>

<script lang="ts" setup>
import { ref, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'
import { VXETable, VxeTableInstance } from 'vxe-table'
import XEUtils from 'xe-utils'
import useInstallStore from '@/stores/public/install/install'
import usePageModal from '@/hooks/usePageModal'
import pageModal from '@/components/pages/page-modal/page-modal.vue'
import modalConfig from './config/modal.config'

interface RowVO {
  id: number
  parentId: number | null
  title: string
  type: string
  url: string
  icon: string
  status: string
}

const installStore = useInstallStore()
const { modalRef, handleNewDataClick, handleEditDataClick } = usePageModal()

const xTreeRef = ref<VxeTableInstance<RowVO>>()
const maxId = ref<number>(0)

const tableData = ref<RowVO[]>([])
const { initMenu } = storeToRefs(installStore)
async function getMenuList() {
  await installStore.getInitMenu(modalConfig.pageName)
  tableData.value = formatDataTree(initMenu.value)
}

// 格式化数据的函数，根据你的实际需求编写
function formatDataTree(data) {
  return data.map((item) => {
    if (item.uid * 1 > maxId.value) {
      maxId.value = item.uid
    }
    return {
      id: item.uuid,
      parentId: item.parent_id,
      title: item.title,
      type: item.type,
      url: item.url,
      icon: item.icon,
      status: '启用'
    }
  })
  // return result
}
// const tableData = ref<RowVO[]>([
//   { id: 10000, parentId: null, name: 'test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
//   { id: 10050, parentId: null, name: 'Test2', type: 'mp4', size: 0, date: '2021-04-01' },
//   { id: 24300, parentId: 10050, name: 'Test3', type: 'avi', size: 1024, date: '2020-03-01' },
// ])

const hasRowExpand = (row: RowVO) => {
  const $table = xTreeRef.value
  if ($table) {
    return $table.isTreeExpandByRow(row)
  }
  return false
}

const removeRowEvent = async (row: RowVO) => {
  const type = await VXETable.modal.confirm('您确定要删除吗？')
  if (type === 'confirm') {
    const matchObj = XEUtils.findTree(tableData.value, (item) => item.id === row.id)
    if (matchObj) {
      // 从树节点中移除
      matchObj.items.splice(matchObj.index, 1)
    }
  }
}

const editHandler = async (row: RowVO) => {
  console.log('点击了编辑操作row', row)
  handleEditDataClick(row)
}

const addNav = async () => {
  console.log('添加的菜单级别')
  // handleNewDataClick()
  const $table = xTreeRef.value
  let selectRow = null
  if ($table) {
    selectRow = $table.getRadioRecord()
    console.log('$table', selectRow)
  }
  if (selectRow) {
    const selectObj = formatSelect(selectRow)
    handleEditDataClick(selectObj)
  } else {
    VXETable.modal.alert(`请选择想要添加的父级菜单，选中后再新建即可！`)
  }
}
// 格式化显示
function formatSelect(selectRow: { id: string; type: string; url: string }) {
  const selectObj = {
    id: maxId.value + 1,
    parentId: selectRow.id,
    title: '',
    type: Number(selectRow.type) + 1 + '',
    url: selectRow.url,
    icon: '',
    status: '启用'
  }
  switch (selectRow.type) {
    case '1':
    case '2':
    case '3':
      return selectObj
    default:
      return {}
  }
}
getMenuList()
</script>

<style lang="less" scoped>
.admin-install {
  margin: 10px;
  .top-handler {
    height: 40px;
    display: flex;
    flex-flow: row-reverse;
    padding-top: 30px;
  }
}
</style>
