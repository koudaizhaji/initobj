<template>
  <el-table :data="tableData" border style="width: 100%;">
    <!-- <template v-for="(item, index) in uniTime" :key="index"> -->
    <el-table-column prop="time" label="" width="180"></el-table-column>
    <!-- </template> -->
    <template v-for="(item, index) in uniDate" :key="index">
      <el-table-column :label="item" width="180">
        <template #default="scope">
          {{ showData(item, scope.row) }}
        </template>
      </el-table-column>
      <!-- <template v-for="(item, index) in uniTime" :key="index">
        <el-button>{{ item }}</el-button>
      </template> -->
      <!-- <template #default="scope"> -->
      <!-- <el-button>{{ scope.$index }}</el-button> -->
      <!-- {{ scope.row }}
        {{ scope.$index }} -->
      <!-- </template></el-table-column> -->
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fatDataList } from './data.js'
const dataList = fatDataList()
// console.log(dataList)
const tableData = ref([])
const uniDate = ref([])
const uniTime = ref([])
tableData.value = dataList.dataList
uniDate.value = dataList.dates
// uniTime.value = dataList.uniTime
console.log(tableData.value, uniDate.value, uniTime.value)
// 如果时间存在就返回，否则return
const showData = (item, row: any) => {
  console.log('item', item, row.data)
  let data = '🧨'
  row.data.forEach((value: any) => {
    console.log('value', value)
    if (value.date == item && value.time) {
      data = value.userName.join(',')
    }
  })
  return data
  // if (item == row.date && row.time) {
  //   return row.data.userName
  // }
  // row.data.map((value: any) => {
  //   if (value.date == item && value.time) {
  //     return value.userName
  //   }
  // })
}
</script>
