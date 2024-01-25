<template>
  <div class="three-menu" v-for="(item, index) in childMenus" :key="index">
    <div class="content">
      {{ item.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const props = defineProps({
  childMenus: {
    type: Array,
    default: () => {}
  }
})
onMounted(() => {
  console.log('props', props.childMenus)
})
</script>

<style lang="less" scoped>
.three-menu {
  padding-left: 20px;
  font-size: 14px;
  font-weight: 500;
  &:hover {
    color: #409eff;
    background-color: #eee;
  }
  .content {
    cursor: pointer;
    padding: 4px 0;
    font-size: 14px;
    line-height: 20px;
    line-height: 1.5; /* 行高，可根据需要调整 */
    max-height: 20px; /* 两行文字的高度，根据实际字体和行高调整 */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* 显示的行数 */
    -webkit-box-orient: vertical;
  }
}
</style>
