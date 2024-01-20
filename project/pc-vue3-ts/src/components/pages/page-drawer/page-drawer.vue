<template>
  <div class="page-drawer">
    <el-drawer v-model="isDrawer"
      :title="drawerConfig.title" :with-header="drawerConfig.withHeader" :size="drawerConfig.size"
      :direction="drawerConfig.direction">
      <slot name="content"></slot>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref,defineProps,computed } from 'vue'
// interface Idirection = 'ltr' | 'rtl' | 'ttb' | 'bbt'
const props = defineProps({
  drawerConfig: {
    type: Object,
    default: {
      title:"title",
      withHeader: false,
      size: '80%',
      direction:"ltr"
    }
  },
})
const isDrawer = ref(false)

const setDialogVisible = ()=>{
  isDrawer.value =  !isDrawer.value
}

defineExpose({
  setDialogVisible,
})
</script>

<style lang="less" scoped>
.page-drawer {
}
</style>
