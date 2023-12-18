<!-- 展示表格数据，进行基础的增删改查操作控制 -->
<template>
  <div class="content">
    <div v-if="contentConfig.header" class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <div class="handerClass">
        <div class="left-handler">
          <el-icon class="icon" v-if="isCreate" @click="handleNewData"><Plus /></el-icon>
          <el-icon class="icon"><Calendar /></el-icon>
          <!-- <el-button
            type="primary"
            plain
            v-if="isCreate"
            @click="handleNewData"
            class="handler handler-center"
          >
            {{ contentConfig.header?.btnTitle }}
          </el-button> -->
          <el-icon class="icon"><Printer /></el-icon>
        </div>
        <div class="right-handler">
          <!-- <el-button type="primary"> 导出表格 </el-button> -->
          <slot name="rightBtn"></slot>
        </div>
      </div>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        stripe
        :border="true"
        height="calc(90%)"
        v-bind="contentConfig.childrenProps"
        :style="getPageStyle(contentConfig.propsList)"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" :prop="item.prop" v-bind="item" sortable>
              <template #default="scope">
                {{ utcFormat(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column align="center" :label="item.label" v-bind="item">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  type="primary"
                  size="small"
                  icon="EditPen"
                  link
                  @click="handleEditClick(scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                  v-if="isDelete"
                  type="danger"
                  size="small"
                  icon="Delete"
                  link
                  @click="handleDeleteClick(scope.row.id)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </template>
          <!-- 父组件进行筛选的操作测试 暂无头绪 -->
          <!-- <template v-else-if="item.type === 'custom' && item?.filters">
            <el-table-column
              align="center"
              :label="item.label"
              v-bind="item"
              :filter-method="filterHandlerFn"
            >
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template> -->

          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" :label="item.label" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.filters">
            <el-table-column align="center" v-bind="item" :filter-method="pageFilterHandler" />
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-show="isShowFooter"
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[2, 3, 5]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @current-change="handleCurrentChange"
        @size-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts" name="content">
import { storeToRefs } from 'pinia'
import pageDataStore from '@/stores/pages/pagestore'
import type { IPageUrl } from '@/services/pages/types'
import { utcFormat } from '@/utils/format'
import { ref, computed } from 'vue'
import usePermission from '@/hooks/usePermission'
import type { TableColumnCtx } from 'element-plus'
import { ElMessage } from 'element-plus'

interface IProps {
  contentConfig: {
    pageName: string
    pageUrl: IPageUrl
    header?: {
      title: string
      btnTitle: string
    }
    propsList: any[]
    childrenProps?: any
    showFooter?: boolean
  }
}
const props = defineProps<IProps>()
const emit = defineEmits(['newClick', 'editClick', 'filterMethod'])
const isShowFooter = computed(() => props.contentConfig.showFooter ?? true)
// 0.判断是否有增删改查的权限
const isCreate = usePermission(props.contentConfig.pageName, 'create')
const isDelete = usePermission(props.contentConfig.pageName, 'delete')
const isUpdate = usePermission(props.contentConfig.pageName, 'update')
const isQuery = usePermission(props.contentConfig.pageName, 'query')
console.log('对应的增删改查权限', isCreate, isDelete, isUpdate, isQuery)
// const isCreate = true
// const isDelete = true
// const isUpdate = true
// const isQuery = true
// 检索列表内是否存在fixed:'right'，存在返回width:92%否则返回width:100%
function getPageStyle(pageList: any[]) {
  const width = pageList.some((item: any) => item.fixed === 'right') ? '92%' : '100%'
  return { width }
}

// 1.请求数据
const pageStore = pageDataStore()
const currentPage = ref(1)
const pageSize = ref(2)
async function fetchPageListData(queryInfo: any = {}) {
  if (!isQuery) return
  // 1.获取offset和size
  const size = pageSize.value
  const offset = currentPage.value
  console.log('请求参数2222s', offset, size, queryInfo)
  // 2.发生网络请求
  const res = await pageStore.getPageListDataAction(props.contentConfig.pageUrl, {
    pageNum: offset,
    pageSize: size,
    ...queryInfo
  })
  // ElMessage.success({ message: res.message })
  if (res.code != 0) {
    ElMessage.error({ message: res.message })
  }
}
fetchPageListData()
// 监听pageStore里的actions被执行
pageStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'editPageDataAction' ||
      name === 'newPageDataAction' ||
      name === 'deletePageDataAction'
    ) {
      currentPage.value = 1
      // pageSize.value = 10
    }
  })
})

// 2.展示数据
const { pageList, pageTotalCount } = storeToRefs(pageStore)
console.log('拿到的页面数据', pageList, pageTotalCount)
// 3.绑定分页数据
function handleCurrentChange() {
  fetchPageListData()
}
function handleResetClick() {
  currentPage.value = 1
  pageSize.value = 10
  fetchPageListData()
}

// 4.新建数据的处理
function handleNewData() {
  // console.log('点击了新建按钮')
  emit('newClick')
}

// 5.删除和编辑操作
async function handleDeleteClick(id: number) {
  const res = await pageStore.deletePageDataAction(props.contentConfig.pageUrl, id)
  res.code === 0
    ? ElMessage.success({ message: res.message })
    : ElMessage.error({ message: res.message })
}

function handleEditClick(data: any) {
  emit('editClick', data)
}
// 父组件操作
async function filterHandlerFn(value: string, row: any, column: TableColumnCtx<any>) {
  // console.log('点击了表格的某个行', scope)
  emit('filterMethod', value, row, column)
  // const property = column['property']
  // console.log('property', property, row[property], value)
  // return row[property] === value
}
// 当前页面操作
function pageFilterHandler(value: string, row: any, column: TableColumnCtx<any>) {
  // console.log('点击了表格的某个行', scope)
  const property = column['property']
  console.log('property', property, row[property], value)
  return row[property] === value
}

// 暴露函数
defineExpose({
  fetchPageListData,
  handleResetClick
})
</script>

<style scoped lang="less">
.content {
  padding: 10px;
  background-color: #fff;

  .header {
    height: 45px;
    padding: 0 5px;
    margin-bottom: 25px;
    .title {
      font-size: 18px;
      font-weight: 700;
      margin: 10px 0;
    }
    .handerClass {
      display: flex;
      justify-content: space-between;

      .left-handler {
        display: flex;
        // justify-content: space-between;
        align-items: center;
      }

      .icon {
        font-size: 14px;
        margin-right: 10px;
        color: rgba(0, 0, 0, 0.7);
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: #409eff;
        }
        &:active {
          color: #fff;
          background-color: #409eff;
        }
      }
      .right-handler {
        margin-right: 36px;
      }
    }
  }

  .table {
    :deep(.el-table__cell) {
      padding: 14px 0;
    }
    /*设置显示隐藏部分内容，按50%显示*/
    :deep(.el-tooltip__popper) {
      font-size: 14px;
      max-width: 50%;
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }
}
</style>