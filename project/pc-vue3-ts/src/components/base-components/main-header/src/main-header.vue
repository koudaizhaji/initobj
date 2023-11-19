<template>
  <div class="main-header">
    <!-- 顶层引导 -->
    <div class="main-guide">
      <div @click="handleFoldClick">
        <!-- <el-icon class="menu-icon" v-if="isFoldshow"><Fold /></el-icon>
      <el-icon class="menu-icon" v-else><Expand /></el-icon> -->
        <el-icon class="menu-icon"
          ><component :is="isFoldshow ? 'Fold' : 'Expand'"></component
        ></el-icon>
      </div>
      <div class="content">
        <div>
          <LILIBreadcrumb :breadcrumbs="breadcrumbsValue" />
        </div>
        <!-- 用户信息 -->
        <userInfo />
      </div>
    </div>
    <!-- 顶层菜单 -->
    <div class="main-top-menu">
      <div>菜单1</div>
      <div>菜单2</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="main-header">
import { ref, defineEmits, computed } from 'vue'
import userInfo from './user-info.vue'
import LILIBreadcrumb from '@/base-ui/breadcrumb'

import { pathMapBreadcrumbs } from '@/utils/map-menus'

import { useStore } from '@/store'
import { useRoute } from 'vue-router'

const emit = defineEmits(['foldChange'])

const isFoldshow = ref(false)
const handleFoldClick = () => {
  // console.log("handleFoldClick")
  isFoldshow.value = !isFoldshow.value
  emit('foldChange', isFoldshow.value)
}
// 面包屑的数据 [{name: '首页', path: '/'}]
const store = useStore()
const route = useRoute()
const breadcrumbsValue = computed(() => {
  const userMenus = store.state.login.userMenus
  const currentPath = route.path
  return pathMapBreadcrumbs(userMenus, currentPath)
})
</script>
<style lang="less" scoped>
.main-header {
  display: flex;
  flex-direction: column;
  width: 100%;

  .main-guide {
    display: flex;
    width: 100%;
    .menu-icon {
      font-size: 26px;
      cursor: pointer;
    }
    .content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
  }
  .main-top-menu {
    height: 48px;
    display: flex;
    width: 100%;
    .menu-icon {
      font-size: 26px;
      cursor: pointer;
    }
    .content {
      flex: 1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }
  }
}
</style>
