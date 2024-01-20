<template>
  <div class="page-tags">
    <el-tabs v-model="tabConfig.activeName" :tab-position="tabConfig.tabPosition"
    :style="tabConfig.style" class="demo-tabs">
        <div v-for="(item, index) in tabList" :key="index">
          <el-tab-pane :label="item.label" :name="item.name">
           <slot :name="item.slotName"></slot>
          </el-tab-pane>
        </div>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  tabConfig: {
    type: Object,
    default: {
      activeName: "user",
      tabPosition:"left",
      style: {
        height:'100%'
      }
    },
  },
  tabList :{
    type: Array,
    default: () => [
      {
        label: '用户',
        name: 'user',
        slotName: 'user',
      },
      {
        label: '配置',
        name: 'config',
        slotName: 'config',
      },
      {
        label: '角色',
        name: 'role',
        slotName: 'role',
      }
    ]
  }
})



</script>

<style lang="less" scoped>
.page-tags {
  .demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
}
}
</style>
