<script setup lang="ts">
import { ElButton, ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import { deleteMenu, getMenuList } from '@/services/base/home'
import { menuList } from './hooks'
import CreateOrEditButton from './CreateOrEditButton.vue'
import moment from 'moment'

const loading = ref<boolean>(true)
const getList = () =>
  getMenuList()
    .then(({ data }) => {
      menuList.value = data
    })
    .finally(() => {
      loading.value = false
    })
getList()

const deleteMenuBtn = (id: number | string) => {
  ElMessageBox.confirm('是否删除当前菜单', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const waiting = ElMessage.info({
      message: '删除中...',
      duration: 0
    })
    deleteMenu(id).then(({ code }) => {
      waiting.close()
      if (code === 0) {
        ElMessage.success('删除成功')
        getList()
      } else {
        ElMessage.error('删除失败')
      }
    })
  })
}
</script>

<template>
  <div class="m-l-16px w-full h-full flex flex-col flex-justify-left">
    <div class="">
      <CreateOrEditButton @refresh="getList" :loading="loading" type="primary">
        创建
      </CreateOrEditButton>
    </div>
    <div class="m-t-8px h-full overflow-auto">
      <el-table
        :data="menuList"
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
        <el-table-column label="操作">
          <template v-slot:default="scope">
            <CreateOrEditButton isEdit @refresh="getList" :data="scope.row" link>
              编辑
            </CreateOrEditButton>
            <el-button type="danger" @click="deleteMenuBtn(Number(scope.row.id))" link>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
