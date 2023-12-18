<template>
  <ElContainer class="main-content">
    <!-- 菜单栏 -->
    <ElAside width="200px">
      <TopMenu :data="props.menuList" @change="setTopMenuId" />
      <MainMenu :menuList="mainMenuLise || []" />
    </ElAside>
    <!-- 主要内容 -->
    <ElContainer>
      <ElHeader height="40px">
        <Header />
      </ElHeader>
      <ElMain>
        <slot v-if="route.meta.isSpecially"></slot>
        <!-- <ElCard v-else>
          <slot></slot>
        </ElCard> -->
        <PageWrapLayout v-else>
          <slot></slot>
        </PageWrapLayout>
      </ElMain>
      <!-- <el-footer height="30px">
        Footer
      </el-footer>-->
    </ElContainer>
  </ElContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElContainer, ElAside, ElHeader, ElMain, ElCard } from 'element-plus'
import type { MenuProps } from './index.ts'
// 引入自定义的组件布局-全局
import PageWrapLayout from './page-wrap-layout/index.vue'

import Header from '@/components/layout/header'
import MainMenu from './main-menu'
import TopMenu from './top-menu'

const props = defineProps<{
  menuList: MenuProps
  // loading: boolean
}>()
const route = useRoute()
// 因为element breadcrumb 无法跳转路由而设置的
const router = useRouter()
const topMenuId = ref<number | string>()
const setTopMenuId = (id: string | number) => {
  topMenuId.value = id
}
const mainMenuLise = computed(() => {
  return props.menuList.find((item) => item.id === topMenuId.value)?.children
})
</script>

<style scoped lang="less">
.main-content {
  height: 100%;
  width: 100%;

  .logo {
    width: 100rpx;
    background-color: green;
  }
}

.el-aside {
  height: 100%;
  display: flex;
  justify-content: left;
  background-color: #252f3c;
  .top-menu {
    width: 75px;
    max-width: 75px;
    overflow: hidden;
  }
  .main-menu {
    width: 175px;
    max-width: 175px;
    overflow: hidden;
  }
}
.el-header {
  background-color: #ffffff;
  padding: 0;
}
.el-main {
  background-color: #f7fbff;
}
.cardClass {
  margin-left: -10px;
  margin-right: -10px;
}
:deep(.el-card) {
  .el-card__body {
    height: calc(100% - 40px);
  }
}
</style>
