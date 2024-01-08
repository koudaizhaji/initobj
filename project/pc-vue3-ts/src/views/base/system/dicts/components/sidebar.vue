<template>
  <div class="sidebar">
    <!-- <login-panel /> -->
    <el-input v-model="filterText" placeholder="搜索菜单" class="input-search" />
    <el-popover placement="bottom" :width="220" trigger="click">
      <template #reference>
        <el-icon class="icon"><Plus class="iconPlus" /></el-icon>
      </template>
      <div class="buttons">
        <el-button @click="handleNewData('desc')">添加字典</el-button>
        <el-button @click="handleNewData('descType')">添加类型</el-button>
      </div>
    </el-popover>

    <el-tree
      ref="treeRef"
      class="filter-tree"
      accordion
      :data="data"
      :props="defaultProps"
      default-expand-all
      :filter-node-method="filterNode"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ElTree } from 'element-plus'
const emits = defineEmits(['nodeClick', 'newDescClick', 'newDescTypeClick'])
const props = defineProps({
  treeList: {
    type: Array,
    default: () => []
  }
})

// 格式化一下propsTreeList成data
const dataFormat = computed(() => {
  return props.treeList.map((item: any) => {
    return {
      id: item.id,
      label: `${item.name}`,
      children: item.children.map((item: any) => {
        return {
          id: `type_${item.type_id}`,
          label: `${item.type_name}`
          // children: item.children
        }
      })
    }
  })
})
const data: Tree[] = dataFormat
// nextTick(() => {
//   data = dataFormat
//   // console.log('dataFormat', dataFormat)
// })
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
  // console.log('handleNodeClick', value)
  // 给对应的节点添加颜色
  emits('nodeClick', value)
}

// 新建数据的处理
function handleNewData(type: string) {
  // console.log('handleNewData', type)
  if (type === 'desc') {
    emits('newDescClick')
  } else {
    emits('newDescTypeClick')
  }
}
// [
//   {
//     id: 1,
//     label: 'Level one 1',
//     children: [
//       {
//         id: 4,
//         label: '2',
//         children: [
//           {
//             id: 9,
//             label: 'Level three 1-1-1'
//           },
//           {
//             id: 10,
//             label: 'Level three 1-1-2'
//           }
//         ]
//       }
//     ]
//   },
//   {
//     id: 2,
//     label: 'Level one 2',
//     children: [
//       {
//         id: 5,
//         label: 'Level two 2-1'
//       },
//       {
//         id: 6,
//         label: 'Level two 2-2'
//       }
//     ]
//   },
//   {
//     id: 3,
//     label: 'Level one 3',
//     children: [
//       {
//         id: 7,
//         label: 'Level two 3-1'
//       },
//       {
//         id: 8,
//         label: 'Level two 3-2'
//       }
//     ]
//   }
// ]
</script>

<style lang="less" scoped>
.sidebar {
  position: relative;
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
</style>
