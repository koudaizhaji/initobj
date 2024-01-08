<template>
  <div class="search">
    <!-- 1.1.表单输入 -->
    <el-form :model="searchForm" ref="formRef" label-width="120px" size="large">
      <el-row :gutter="20">
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <el-col :span="8">
            <el-form-item :label="item.label" :prop="item.prop">
              <template v-if="item.type === 'input'">
                <el-input v-model="searchForm[item.prop]" :placeholder="item.placeholder" />
              </template>
              <template v-if="item.type === 'password'">
                <el-input
                  show-password
                  v-model="searchForm[item.prop]"
                  :placeholder="item.placeholder"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select v-model="searchForm[item.prop]" :placeholder="item.placeholder">
                  <template v-for="option in item.options" :key="option.value">
                    <el-option :label="option.label" :value="option.value"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-if="item.type === 'date-picker'">
                <el-date-picker
                  type="daterange"
                  v-bind="item.otherOptions"
                  v-model="searchForm[item.prop]"
                  unlink-panels
                  :shortcuts="shortcuts"
                  :default-value="[new Date(2010, 9, 1), new Date(2030, 10, 1)]"
                />
                <!-- range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间" -->
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <!-- 1.2.搜索按钮  -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button size="large" icon="Search" type="primary" @click="handleQueryClick">
        查询
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="page-search">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
import { utcFormat } from '@/utils/format'

interface IProps {
  searchConfig: {
    pageName: string
    pageUrl: any[]
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['queryClick', 'resetClick'])

// 1.创建表单的数据
const initialForm: any = {}
for (const item of props.searchConfig.formItems) {
  initialForm[item['prop']] = item['initialValue'] ?? ''
}
const searchForm = reactive(initialForm)
// 时间的选项卡
const shortcuts = [
  {
    text: '最近一周',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    }
  },
  {
    text: '最近一个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    }
  },
  {
    text: '最近3个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    }
  }
]
// 2.监听按钮的点击
const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
// 搜索按钮事件
function handleQueryClick() {
  const dataList = []
  dataList.push(utcFormat(searchForm.createdAt[0]))
  dataList.push(utcFormat(searchForm.createdAt[1]))
  // console.log('拿到的搜索信息',dataList)
  searchForm.createdAt = dataList
  emit('queryClick', props.searchConfig.pageUrl, searchForm)
}
</script>

<style scoped lang="less">
.search {
  background-color: #fff;
  // padding: 10px;
  border-radius: 5px;

  .el-form-item {
    padding: 15px 40px;
    margin-bottom: 0;
  }
}

.btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
