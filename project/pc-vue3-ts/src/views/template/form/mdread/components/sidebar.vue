<template>
  <div class="sidebar">
    <el-tree
      ref="treeRef"
      class="filter-tree"
      accordion
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    >
      <template #default="{ node }">
        <div class="title">
          <span :class="styleFn(node.data)">{{ node.label }}</span>
          <div v-if="node.data.desc" class="desc" :class="styleName(node.data)">
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted,toRaw } from 'vue'
import { ElTree } from 'element-plus'
const emits = defineEmits(['nodeClick', 'newDescClick', 'newDescTypeClick'])
const props = defineProps({
  treeList: {
    type: Array,
    default: () => []
  },
  showLevel: {
    type: Number,
    default: 4
  }
})
let dataList=ref([])
onMounted(() => {
  console.log('onMounted')
  // 在这里执行你的代码
  // calculativeWidth()
})
watch(props, (newValue, oldValue) => {
  let res=toRaw(newValue.treeList)
  res.map((item)=>{
      item.title=item.name
      delete item.name
  })
  dataList.value=res
    // console.log('更新了', res);
});
const dataFormat = computed(() => {
  return dataList.value.map((item) => formatData(item, 1)) // 从层级0开始
})

const formatData = (item: any, level: number) => {
  // console.log('item===🚀===>', item)
  return {
    id: item.id,
    label: `${item.title}`,
    children:
      level < props.showLevel && item.children
        ? item.children.map((child: any) => formatData(child, level + 1))
        : [],
    desc: level <= 3 ? item.desc : '',
    level: level // 添加层级标识
  }
}

const styleFn = (node: any) => {
  // console.log('node===🚀===>', node.level)
  return node.level === 1 ? 'firstLevel' : node.level === 2 ? 'secondLevel' : 'thirdLevel' // 根据层级添加不同的样式
}
const styleName = (node: any) => {
  return node.level === 1 ? 'first' : node.level === 2 ? 'second' : 'third'
}

const data: Tree[] = dataFormat

interface Tree {
  [key: string]: any
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label'
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

// 节点被点击触发
const handleNodeClick = (value: any) => {
  console.log('handleNodeClick', value)
  // 给对应的节点添加颜色
  emits('nodeClick', value)
}
const calculativeWidth = () => {
  let sidebar = document.getElementsByClassName('sidebar')
  let domF = document.getElementsByClassName('firstLevel')
  let domS = document.getElementsByClassName('secondLevel')
  let domT = document.getElementsByClassName('thirdLevel')

  let F = document.querySelectorAll('.first')
  let S = document.querySelectorAll('.second')
  let T = document.querySelectorAll('.third')

  let sidebarDom = sidebar[0].getBoundingClientRect().right
  let leftF = domF[0].getBoundingClientRect().left
  let leftS = domS[0].getBoundingClientRect().left
  let leftT = domT[0].getBoundingClientRect().left

  Array.from(F).forEach((element: Element) => {
    ;(element as HTMLElement).style.width = sidebarDom - leftF - 10 + 'px'
  })
  Array.from(S).forEach((element: Element) => {
    ;(element as HTMLElement).style.width = sidebarDom - leftS - 10 + 'px'
  })
  Array.from(T).forEach((element: Element) => {
    ;(element as HTMLElement).style.width = sidebarDom - leftT - 10 + 'px'
  })
}
</script>

<style lang="less" scoped>
.sidebar {
  position: relative;
  .desc {
    font-size: 10px;
    color: #bbb;
    white-space: nowrap; /* 不换行 */
    overflow: hidden; /* 超出部分隐藏 */
    text-overflow: ellipsis; /* 显示省略号 */
  }
  .firstLevel {
    color: #183e41;
    font-size: 18px;
  }

  .secondLevel {
    color: #555;
    font-size: 15px;
  }
  .thirdLevel {
    color: #999;
    font-size: 12px;
  }
  .input-search {
    margin-bottom: 16px;
  }
  .icon {
    position: absolute;
    top: 2px;
    right: 8px;
    font-size: 28px;
    .iconPlus {
      border: 1px solid rgba(38, 38, 38, 0.15);
      border-radius: 20%;
      padding: 2px 6px;
      font-size: 12px;
      line-height: 20px;
      text-align: center;
      color: #333;
      &:hover {
        background: #626aef;
        color: #fff;
      }
    }
  }
  .buttons {
    .el-button {
      margin: 10px 0;
    }
  }
  // 选中的tree添加高亮
}
/deep/ .el-tree-node__content  {
    height: 32px !important;
  }
</style>
