<!-- 展示表格数据，进行基础的增删改查操作控制 -->
<template>
  <div class="content">
    <div v-if="contentConfig.header" class="header">
      <h3 class="title">{{ contentConfig.header?.title }}</h3>
      <div class="handerClass">
        <div class="left-handler">
          <el-icon class="icon" v-if="isCreate" @click="handleNewData"><Plus /></el-icon>
          <el-icon class="icon" ref="buttonRef" @click="handleFormatData"><Calendar /></el-icon>
          <el-popover
            ref="popoverRef"
            :virtual-ref="buttonRef"
            trigger="click"
            title="显示的表格内容"
            virtual-triggering
          >
            <el-checkbox-group
              v-model="checkList"
              v-for="item in contentConfig.propsList"
              :key="item.prop"
            >
              <el-checkbox :label="item.label" />
            </el-checkbox-group>
            <el-button type="primary" @click="formatConfim">确认</el-button>
          </el-popover>
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
        ref="tableRef"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer' && item.visible">
            <el-table-column align="center" :prop="item.prop" v-bind="item" sortable>
              <template #default="scope">
                {{ utcFormat(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler' && item.visible">
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

          <template v-else-if="item.type === 'custom' && item.visible">
            <el-table-column align="center" :label="item.label" v-bind="item">
              <template #default="scope">
                <slot :name="item.slotName" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.filters && item.visible">
            <el-table-column align="center" v-bind="item" :filter-method="pageFilterHandler" />
          </template>
          <template v-else-if="item.visible">
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
        :page-sizes="pageSizeList"
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
import { exportExcelByTable } from '@/utils/xlsx'
import pageDataStore from '@/stores/pages/pagestore'
import type { IPageUrl } from '@/services/pages/types'
import { utcFormat } from '@/utils/format'
import { ref, computed, unref, watch } from 'vue'
import type { Ref } from 'vue'
import usePermission from '@/hooks/usePermission'
import type { TableColumnCtx } from 'element-plus'
import { ElMessage } from 'element-plus'

interface IProps {
  contentConfig: {
    pageName: string
    pageUrl: IPageUrl
    isPermission: boolean
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
// 从专门的页面store进行数据操作
const pageStore = pageDataStore()
const currentPage = ref(1)
const pageSize = ref(10)
const pageSizeList = [10, 30, 50, 'all']
// 判断是否开启增删改查权限
const isPermission =
  props.contentConfig.isPermission === undefined ? true : props.contentConfig.isPermission
const emit = defineEmits(['newClick', 'editClick', 'filterMethod', 'expClick'])
const isShowFooter = computed(() => props.contentConfig.showFooter ?? true)
// 0.判断是否有增删改查的权限
const isCreate = isPermission ? usePermission(props.contentConfig.pageName, 'create') : true
const isDelete = isPermission ? usePermission(props.contentConfig.pageName, 'delete') : true
const isUpdate = isPermission ? usePermission(props.contentConfig.pageName, 'update') : true
const isQuery = isPermission ? usePermission(props.contentConfig.pageName, 'query') : true
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
// 筛选操作处理 start
const buttonRef = ref()
const popoverRef = ref()
const checkList = ref()

// 初始化时默认选中所有项
const initializeCheckList = () => {
  checkList.value = props.contentConfig.propsList.map((item) => {
    // item.visible = true
    if (item.visible) return item.label
  })
}

initializeCheckList()
watch(checkList, (newVal, oldVal) => {
  // console.log('checkList changed:', newVal)
  // 在这里你可以处理 checkList 变化后的逻辑
  updateVisibility()
})
// fetchPageListData()
function handleFormatData() {
  unref(popoverRef).popperRef?.delayHide?.()
}
const updateVisibility = () => {
  props.contentConfig.propsList.forEach((item) => {
    item.visible = checkList.value.includes(item.label)
    // console.log(`${item.label}的状态：${item.visible}`)
  })
}
// 筛选确认,请求数据和隐藏popover
function formatConfim() {
  fetchPageListData(props.contentConfig.pageUrl)
  // unref(popoverRef).popperRef?.hide?.()
  unref(popoverRef).hide?.()
}
// 筛选操作处理 end

// 1.请求数据
async function fetchPageListData(url: IPageUrl, queryInfo: any = {}) {
  if (!isQuery) return
  // 请求的页面大小
  // 2.发生网络请求
  const res = await pageStore.getPageListDataAction(url, {
    pageNum: currentPage.value,
    pageSize: pageSize.value,
    ...queryInfo
  })
  // ElMessage.success({ message: res.message })
  if (res.code != 0) {
    ElMessage.error({ message: res.message })
  }
}

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
      // 重新获取数据
    }
  })
})

// 2.展示数据
const { pageList, pageTotalCount } = storeToRefs(pageStore)
console.log('拿到的页面数据', pageList, pageTotalCount)
// 3.绑定分页数据
function handleCurrentChange() {
  console.log('执行了这里', pageSize.value)
  if (isNaN(pageSize.value)) pageSize.value = pageTotalCount.value
  fetchPageListData(props.contentConfig.pageUrl)
}
function handleResetClick() {
  currentPage.value = 1
  pageSize.value = 10
  fetchPageListData(props.contentConfig.pageUrl)
}

// 4.新建数据的处理
function handleNewData() {
  // console.log('点击了新建按钮')
  emit('newClick')
}

// 5.删除和编辑操作
async function handleDeleteClick(id: number) {
  console.log('删除的id', id)
  const res = await pageStore.deletePageDataAction(props.contentConfig.pageUrl, id, {
    pageNum: currentPage.value,
    pageSize: pageSize.value
  })
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
// const tableRef = ref(null)
const tableRef = ref(null)
function exportExcel() {
  // alert('okk')
  emit('expClick')
  exportExcelByTable(this.$refs.tableRef.$el, props.contentConfig.pageName)
}
fetchPageListData(props.contentConfig.pageUrl)

// 暴露函数
defineExpose({
  fetchPageListData,
  handleResetClick,
  exportExcel
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
