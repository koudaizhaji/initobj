/*
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */

import { LOGIN_TOKEN } from '@/config'
import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { firstMenu, mapMenusToRoutes } from '@/utils/map-menus'
import { urlMatch } from '@/utils/format'

// 路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/base'
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/public/login/login.vue')
    },
    {
      path: '/base',
      name: 'base',
      component: () => import('@/views/base/base.vue'),
      children: [
        {
          path: '/userInfo',
          name: 'userInfo',
          component: () => import('../views/base/public/userinfo/userinfo.vue')
        }
      ]
    },
    {
      path: '/template',
      name: 'template',
      component: () => import('@/views/template/template.vue')
    },
    {
      path: '/unit',
      name: 'unit',
      component: () => import('@/views/unit/unit.vue')
    },
    {
      path: '/plan',
      name: 'plan',
      component: () => import('@/views/plan/plan.vue')
    },
    {
      path: '/admin/install',
      name: 'install',
      component: () => import('../views/public/install/home.vue')
    },
    {
      path: '/md/read',
      name: 'mdread',
      component: () => import('../views/template/form/mdread/mdread.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/public/err-page/404-view.vue')
    },
    {
      path: '/403',
      name: '403',
      component: () => import('../views/public/err-page/403-view.vue')
    }
  ]
})

// 动态添加路由
export function addRoutesWithMenu(menus: any) {
  // console.log('addRoutesWithMenu',addRoutesWithMenu)
  // 1.获取匹配到的所有的路由
  const routes = mapMenusToRoutes(menus)

  // 2.动态添加到router中
  for (const route of routes) {
    // console.log('添加前记录',route.path)
    // 获取根路径名称base,weixin
    const rootPath = urlMatch(route.path)
    router.addRoute('base', route)
  }
  console.log('此时的router', router)
}

router.beforeEach((to, from, next) => {
  const token = localCache.getCache(LOGIN_TOKEN)

  // console.log('to.path:', to.path);

  if (to.path !== '/login' && !token) {
    console.log('Not on login page')
    // 仅当未登录时才重定向到登录页
    return next('/login')
  }
  // console.log('1111111',to.path,firstMenu,Object.keys(firstMenu).includes(to.path))
  if (Object.keys(firstMenu).includes(to.path)) {
    return next(firstMenu[to.path])
  }

  // 如果已经在登录页，正常导航
  console.log('Already on login page, proceeding with navigation')
  return next()
})

export default router
