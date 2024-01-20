<template>
  <div class="page-sidebar">
    <div class="top-menu" v-for="(item, index) in menus" :key="index">
      {{ item.title }}
      <twoMenu :menus="item.children"> </twoMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
import twoMenu from './two-menu.vue'

const menus = [
  {
    title: '前端',
    children: [
      {
        title: 'JavaScript',
        desc: 'JavaScript的内容描述,JavaScript的内容描述,JavaScript的内容描述，JavaScript的内容描述',
        children: [
          {
            title: 'JavaScript中的名词概念'
          },
          {
            title: '数据类型转换'
          },
          {
            title: 'ES5面向对象'
          },
          {
            title: 'ES6面向对象'
          },
          {
            title: 'new命令原理'
          }
        ]
      }
    ]
  },
  {
    title: '后端',
    children: [
      {
        title: 'Node.js',
        desc: '可进行接口开发',
        children: [
          {
            title: 'Node.js入门'
          }
        ]
      }
    ]
  }
]
</script>

<style lang="less" scoped>
.page-sidebar {
  width: 200px;
  height: 100vh;
  background: #fff;
  overflow: auto;
  .top-menu {
    padding: 15px;
    border-bottom: 1px solid #eee;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>
