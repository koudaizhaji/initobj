<script setup lang="ts">
import { ElInput } from 'element-plus'
import { getUserList } from '@/services/base/home'
import { ref } from 'vue'
import moment from 'moment'

// 添加 编辑 删除 分页 --- 未完成
const searchID = ref<string>('')
const searchName = ref<string>('')
const selectStatus = ref<string>('')
const tableData = ref<any[]>([])

const getUserInfo = (pageNum:number, pageSize:number, name?:String) => {
  getUserList({
    pageNum,
    pageSize,
    name
  }).then(({ data }) => {
    console.log(data)
    tableData.value = data.list
  })
}
getUserInfo(1, 10)
// 按钮点击事件
const handleButton = (type: string) => {
 if (type === 'query') {
  console.log('查询')
  getUserInfo(1, 10, searchName.value)
  
 } else if (type === 'reset') {
  console.log('重置')
  searchID.value = ''
  searchName.value = ''
  selectStatus.value = ''
  getUserInfo(1, 10)
 }
}
const addAdmin = () => {
  console.log('添加管理员')
}

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
      <ElButton type="primary" @click="()=> handleButton('query')">查询</ElButton>
      <ElButton type="primary" @click="()=> handleButton('reset')">重置</ElButton>
    </div>
  </div>
  <!-- 操作按钮 -->
  <div>
    <ElButton type="primary" round @click="addAdmin">添加管理员</ElButton>
  </div>
  <!-- 表格 -->
  <div class="table-box">
    <ElTable border :data="tableData">
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
            <ElButton link>
              编辑
            </ElButton>
            <ElButton type="danger" link>删除</ElButton>
          </template>
        </ElTableColumn>
    </ElTable>
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
