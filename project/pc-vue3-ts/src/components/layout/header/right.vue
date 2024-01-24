<template>
  <div class="header-right h-full line-height-100% flex justify-end flex-items-center">
    <el-button class="m-r-4px" link><i class="ri-settings-2-line font-size-20px" /></el-button>
    <el-button class="m-r-4px" link><i class="ri-printer-line font-size-20px" /></el-button>
    <el-button link><i class="ri-message-2-line font-size-20px" /></el-button>
    <div class="w-1px h-30px bg-#ebeef5 m-l-8px m-r-8px" />
    <el-dropdown class="m-r-8px">
      <div
        class="el-dropdown-link cursor-pointer flex flex-items-center focus-visible-outline-0px w-90px"
        style="color: var(--el-color-primary);"
      >
        {{ username }}
        <el-icon class="el-icon-right">
          <ArrowDown />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item divided @click="clearLocal">清除缓存</el-dropdown-item>
          <el-dropdown-item divided @click="goUserInfo">修改密码</el-dropdown-item>
          <el-dropdown-item disabled>样式切换</el-dropdown-item>
          <el-dropdown-item divided @click="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!-- 抽屉 -->
    <page-drawer ref="drawerRef" :drawerConfig="drawerConfig">
      <template #content>
        <pageTags :tabConfig="tabConfig" :tabList="tabList">
          <template #user>
            <lili-form :modalConfig="modalConfig" ref="liliFormRef">
              <!-- <template #footer>
                  <button class="el-button el-button--primary" @click="changePassword(liliFormRef)">修改密码</button>
              </template> -->
            </lili-form>
          </template>
        </pageTags>
      </template>
    </page-drawer>
    <!-- 抽屉 end -->
  </div>
</template>
<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { computed,ref } from 'vue'
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import useLoginStore from '@/stores/public/login/login'
import { USER_MENUS } from '@/config'
import pageDrawer from "@/components/pages/page-drawer/page-drawer.vue"
import pageTags from "@/components/pages/page-tags/page-tags.vue"
import {tabConfigObj,tabListConfig} from "./config/right-config"
import liliForm from '@/base-ui/form'
import modalConfig from "@/components/layout/header/config/modal.config"
const liliFormRef = ref(null)
const loginStore = useLoginStore()
const router = useRouter()
const username = computed(() => localCache.getCache('user_info').username)
const drawerConfig = ref()
const tabConfig = ref(tabConfigObj)
const tabList = ref(tabListConfig)
const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]

const logout = () => {
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 500)
  })
    .then(() => {
      localCache.clearCache()
      ElMessage.success('已经登出系统')
      router.push('/login')
    })
    .catch((error) => {
      console.error(error)
      ElMessage.error('登出失败')
    })
}
const clearLocal = async () => {
  // 清除用户菜单，重新获取
  localCache.removeCache(USER_MENUS)
  // await loginStore.getUserMenus()
  await loginStore.formMenuToPermissions()
  ElMessage.success('清除缓存成功')
  setTimeout(() => {
    location.reload()
  }, 1000)
}
const drawerRef = ref(null)
const goUserInfo = () => {
  console.log('点击了跳转个人信息')
  drawerRef.value?.setDialogVisible()
}

</script>
