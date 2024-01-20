<template>
  <div class="two-menu" v-for="(item, index) in menus" :key="index">
    <div class="menu-content">
      <div class="title">{{ item.title }}</div>
      <div class="desc">{{ item.desc }}</div>
    </div>
    <div class="three-menu" v-if="item.children">
      <threeMenu :childMenus="item.children" />
    </div>
  </div>
</template>

<script setup lang="ts">
import threeMenu from './three-menu.vue'

defineProps({
  menus: {
    type: Array,
    default: () => [{ title: '默认标题', desc: '默认描述信息', children: [] }]
  }
})
</script>

<style lang="less" scoped>
.two-menu {
  .menu-content:hover {
    color: #409eff;
    background-color: #eee;
  }
  .menu-content {
    padding: 10px 0 10px 10px;
    div:hover,
    div:hover + .desc {
      color: #409eff;
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      color: var(--textColor);
    }
    .desc {
      font-size: 10px; /* 字体大小为12 */
      line-height: 1.5; /* 行高，可根据需要调整 */
      max-height: 20px; /* 两行文字的高度，根据实际字体和行高调整 */
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 显示的行数 */
      -webkit-box-orient: vertical;
      color: #aaa;
      padding: 5px 0 10px;
    }
  }
}
</style>
