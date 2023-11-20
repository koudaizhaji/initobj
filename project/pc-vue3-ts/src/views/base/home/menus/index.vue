<script setup lang="ts">
import { ElButton, ElDialog } from 'element-plus'
import { reactive, ref } from 'vue'
import { getMenuList } from '@/services/base/home'
// import CreateOrEditButton from './CreateOrEditButton.vue'
import moment from 'moment'

const treeList = reactive({ data: [] })
const loading = ref<boolean>(true)
getMenuList()
  .then(({ data }) => {
    treeList.data = data
  })
  .finally(() => {
    loading.value = false
  })

const dialogInfo = reactive({
  visible: false,
  type: '',
  data: {},
  loading: false,
  title: ''
})
const open = (type: string, title: string, data?: object) => {
  dialogInfo.type = type
  dialogInfo.title = title
  dialogInfo.data = data || {}
  dialogInfo.visible = true
}
const close = () => {
  dialogInfo.type = ''
  dialogInfo.visible = false
  dialogInfo.title = ''
  dialogInfo.loading = false
  dialogInfo.data = {}
}
</script>

<template>
  <div class="m-l-16px w-full h-full flex flex-col flex-justify-left">
    <div class="">
      <ElButton type="primary" @click="open('create', '创建')">创建新一级</ElButton>
    </div>
    <div class="m-t-8px h-full overflow-auto">
      <el-table
        :data="treeList.data"
        style="width: 100%"
        row-key="id"
        border
        v-loading="loading"
        lazy
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="title" label="菜单名称" />
        <el-table-column prop="url" label="菜单地址" />
        <el-table-column label="创建时间">
          <template v-slot:default="scope">{{
            moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
          }}</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot:default="scope">
            <ElButton @click="open('create', '创建', scope.row)" type="primary">创建子级</ElButton>
            <ElButton @click="open('edit', '编辑', scope.row)">编辑</ElButton>
            <el-button type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
  <ElDialog
    v-if="dialogInfo.visible"
    v-model="dialogInfo.visible"
    :title="dialogInfo.title"
    width="30%"
    :before-close="close"
  >
  </ElDialog>
</template>
