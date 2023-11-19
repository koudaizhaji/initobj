<template>
  <div class="nav-menu">
    <div class="logo">
      <img src="~@/assets/img/logo.png" alt="logo" />
      <p v-show="!iscollapse" class="title">超级后台管理</p>
    </div>
    <el-menu
      :default-active="defaultActiveVal"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      :collapse="iscollapse"
      :unique-opened="true"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <!-- 只有1级菜单 -->
        <template v-if="!item.children">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon"><component :is="item.icon"></component></el-icon>
              <span>{{ item.title }}</span>
            </template>
          </el-sub-menu>
        </template>
        <!-- 有子菜单 -->
        <template v-else>
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- <el-icon><House /></el-icon> -->
              <el-icon v-if="item.icon"><component :is="item.icon"></component></el-icon>
              <span>{{ item.title }}</span>
            </template>
            <!-- 子菜单 -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <template #title>
                  <el-icon v-if="subitem.icon"><component :is="subitem.icon"></component></el-icon>
                  <span>{{ subitem.title }}</span>
                </template>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, watchEffect } from 'vue'
// 自己封装的useStore，解决vuex与ts兼容不好的问题
import { useStore } from '@/store'
import { useRouter, useRoute } from 'vue-router'

import { pathMapToMenu } from '@/utils/map-menus'

// const props = defineProps({
//   iscollapse: {
//     type: Boolean,
//     default: false
//   }
// })

// store
const router = useRouter()
const store = useStore()
// 在这里使用的时候，就可以明确的知道store中有哪些类型
// 先发起action请求，在获取菜单数据返回
// 注意点：computed是不支持异步的action，所以要用watchEffect
const userMenus = computed(() => {
  switch (store.state.selectMenus) {
    case 'home':
    case 'weixin':
      return store.state.login.weixinMenus
    default:
      return store.state.login.userMenus
  }
})

watchEffect(() => {
  const newMenus = store.state.selectMenus
  switch (newMenus) {
    case 'home':
    case 'weixin':
      console.log('11111111111111')
      // store.dispatch("login/btnPermissionsAction", userMenus.value)
      break
    default:
      console.log('222222222222222222')
      store
        .dispatch('login/userMenuAction')
        .then((userMenu) => {
          store.dispatch('login/btnPermissionsAction', userMenu)
          store.state.login.userMenus = userMenu
        })
        .catch((error) => {
          console.error('获取用户菜单失败:', error)
        })
      break
  }
})

// console.log("此时的userMenus", userMenus)

// 路由

const route = useRoute()
const currentPath = route.path
console.log('当前的路由', currentPath)
/** data
 * 这里的defaultActiveVal是为了让菜单高亮，可以根据路由来设置
 * 拿到路径，到菜单中去匹配，如果匹配到了，就设置为高亮
 */
// console.log("获取到的参数", userMenus.value, currentPath)
const menu = pathMapToMenu(userMenus.value, currentPath)
console.info('匹配到的菜单', menu)

const defaultActiveVal = ref(menu.id + '')

//  event handle 相关事件处理
// 这里的参数应该是MenuItem的类型,前面没有定义，定义的话可以用
// const handleMenuItemClick = (item:any) => {
const handleMenuItemClick = (item: { url: any }) => {
  // console.info("点击的菜单", item)
  router.push({
    path: item.url ?? '/not-found' // 如果不存在的，就跳转到not-found自定义的页面
  })
}
</script>
<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    img {
      height: 32px;
      margin: 0 10px;
    }

    .title {
      color: #fff;
      font-size: 18px;
      font-weight: 700;
    }
  }

  // 目录样式
  .el-menu {
    border-right: none;
  }
  .el-submenu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  /deep/ .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover高亮
  .el-menu-item:hover {
    background-color: #fff !important;
  }
  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
