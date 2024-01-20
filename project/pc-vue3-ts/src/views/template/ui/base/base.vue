<template>
  <div class="ui-base">
    <el-button type="primary" style="margin-left: 16px;" @click="changeDrawer">
    open
    </el-button>
    <page-drawer ref="drawerRef" :drawerConfig="drawerConfig">
      <template #content>
        <pageTags>
          <template #user>
            <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
          </el-table>
          </template>
        </pageTags>
      </template>
    </page-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import pageDrawer from "@/components/pages/page-drawer/page-drawer.vue"
import pageTags from "@/components/pages/page-tags/page-tags.vue"
const drawerRef = ref(false)
const drawerConfig = ref({
  title: "个人中心",
  withHeader:true,
  size:"80%",
  direction:"rtl"
})
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
const changeDrawer = () =>{
  drawerRef.value?.setDialogVisible()
}
</script>

<style lang="less" scoped>
.ui-base {
}
</style>
