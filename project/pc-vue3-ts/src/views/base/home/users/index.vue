<script setup lang="ts">
import { ElInput, ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, deleteUser } from '@/services/base/home'
import { ref, watch } from 'vue'
import CreateOrEditButton from './CreateOrEditButton.vue'
import moment from 'moment'

// 添加 编辑 删除 分页 --- 未完成
const searchID = ref<string>('')
const searchName = ref<string>('')
const selectStatus = ref<string>('')
const tableData = ref<any[]>([])
const currentPage = ref<number>(1)

const getUserInfo = (pageNum:number, pageSize:number, name?:String) => {
  getUserList({
    pageNum,
    pageSize,
    name
  }).then(({ data }) => {
    console.log(data)
    tableData.value = data
  })
}
getUserInfo(1, 5)
// 按钮点击事件
const handleButton = (type: string) => {
 if (type === 'query') {
  console.log('查询')
  getUserInfo(1, 5, searchName.value)
  
 } else if (type === 'reset') {
  console.log('重置')
  searchID.value = ''
  searchName.value = ''
  selectStatus.value = ''
  getUserInfo(1, 5)
 }
}
const onDel = (id:string|number) => {
  ElMessageBox.confirm('是否删除当前菜单', '删除', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    const waiting = ElMessage.info({
      message: '删除中...',
      duration: 0
    })
    deleteUser(id).then(({ code }) => {
      waiting.close()
      if (code === 0) {
        ElMessage.success('删除成功')
        getUserInfo(1, 5)
      } else {
        ElMessage.error('删除失败')
      }
    })
  })
}
watch(currentPage, (newVal, oldVal) => {
  console.log(`当前页码从 ${oldVal} 变为 ${newVal}`);

  getUserInfo(newVal, 5)
  // 在这里处理页码改变后的逻辑
})

</script>

<template>
  <!-- 查询 -->
  <div class="query-box">
    <div class="filtrate-box">
      <ElInput v-model="searchID" placeholder="请输入ID" />
      <ElInput v-model="searchName" placeholder="请输入用户名" />
      <ElSelect v-model="selectStatus" placeholder="请选择状态">
        <ElOption label="启用" value="1" />
        <ElOption label="禁用" value="0" />
      </ElSelect>
    </div>
    <div class="button-box">
      <ElButton type="primary" @click="handleButton('query')">查询</ElButton>
      <ElButton type="primary" @click="handleButton('reset')">重置</ElButton>
    </div>
  </div>
  <!-- 操作按钮 -->
  <div>
    <CreateOrEditButton @refresh="getUserInfo(1, 5)" type="primary" round>添加管理员</CreateOrEditButton>
  </div>
  <!-- 表格 -->
  <div class="table-box">
    <ElTable
      border
      :data="tableData.list"
      style="width: 100%"
    >
      <ElTableColumn prop="id" label="ID" />
      <ElTableColumn prop="username" label="用户名" />
      <ElTableColumn prop="status" label="状态">
        <template v-slot:default="scope">
          <ElTag v-if="scope.row.status === 1" class="ml-2" type="success">启用</ElTag>
          <ElTag v-else class="ml-2" type="danger">禁用</ElTag>
        </template>
        
      </ElTableColumn>
      <ElTableColumn label="创建时间">
          <template v-slot:default="scope">{{
            moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
          }}</template>
        </ElTableColumn>
      <ElTableColumn label="更新时间">
          <template v-slot:default="scope">{{
            moment(scope.row.createdAt).format('YYYY-MM-DD HH:mm:ss')
          }}</template>
        </ElTableColumn>
        <ElTableColumn label="操作">
          <template v-slot:default="scope">
            <CreateOrEditButton isEdit link @refresh="getUserInfo(1, 5)" :data="scope.row">
              编辑
            </CreateOrEditButton>
            <ElButton type="danger" link @click="onDel(scope.row.id)">删除</ElButton>
          </template>
        </ElTableColumn>
    </ElTable>
    <ElPagination
      layout="prev, pager, next"
      :total="tableData.total"
      :default-page-size="5"
      v-model:current-page="currentPage"
    />
  </div>
</template>
<style scoped lang="less">
.query-box{
  border: 1px dashed rgb(0, 162, 255);
  border-radius: 10px;
  padding: 15px 15px;
  margin-bottom: 20px;
  .filtrate-box {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 20px;
    .el-input,
    .el-select {
      width: 200px;
      margin-right: 20px;
    }
  }
  .button-box{
    display: flex;
    justify-content: end;
    .el-button{
      margin-right: 20px;
    }
  }
}
.table-box{
  margin-top: 15px;
}
</style>
