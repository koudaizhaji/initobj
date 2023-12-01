<template>
  <div class="main">
    <Layout :menuList="menuList.data" :loading="menuList.loading">
      <RouterView />
    </Layout>
  </div>
</template>

<script setup lang="ts">
import Layout from '@/components/public-components/layout/index.vue'
import { getRoleMenus } from '@/services/login/login'
import { USER_MENUS } from '@/config'
import { localCache } from '@/utils/cache'
import { reactive } from 'vue'
const menuList = reactive({
  data: [],
  loading: false
})

// 获取用户菜单
menuList.loading = true
getRoleMenus()
  .then(({ data }) => {
    localCache.setCache(USER_MENUS, data)
    menuList.data = data
  })
  .finally(() => {
    menuList.loading = false
  })
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
}
</style>
