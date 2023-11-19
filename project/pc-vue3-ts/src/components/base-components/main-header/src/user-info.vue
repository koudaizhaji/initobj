<template>
  <div class="user-info">
    <!-- 两个部分：一排图标 和 一个下拉框 -->
    <div class="operation">
      <span v-for="(item, index) in IconList" :key="index" @click="handleIconClick(item.code)">
        <i :class="selectedIcon == item.code ? 'dot' : ''"></i>
        <el-tooltip :content="item.title" placement="bottom" effect="light">
          <el-icon :color="selectedIcon == item.code ? '#409EFF' : ''">
            <component :is="item.icon" />
          </el-icon>
        </el-tooltip>
      </span>
    </div>
    <!-- 下拉 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="header-right-info">
          <el-avatar
            size="small"
            :src="userLoginInfo.user_pic ? userLoginInfo.user_pic : defaultAvatar"
          />
          <span>{{
            userLoginInfo.realName ? userLoginInfo.realName : userLoginInfo.username
          }}</span>
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleMenuClick('个人中心')">
              <el-icon><InfoFilled /></el-icon>
              <span>个人中心</span>
            </el-dropdown-item>
            <el-dropdown-item @click="handleMenuClick('修改密码')">
              <el-icon><Lock /></el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <!-- <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>系统管理</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon><InfoFilled /></el-icon>
              <span>公众号管理</span>
            </el-dropdown-item> -->
            <el-dropdown-item divided @click="handleExitClick">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from 'vue'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN, USERMENU, WEIXINMENU } from '@/global/constants'

defineProps({
  menuMsg: {
    type: String,
    default: 'system'
  }
})

const store = useStore() // 使用 useStore 获取 Vuex 的 store 实例
// 头像默认变量
const defaultAvatar = ref('https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
// 获取用户信息显示出来
const userLoginInfo = computed(() => store.state.login.userInfo)

const selectedMenu = ref('个人中心') // 设置初始选中项为个人中心
const selectedIcon = ref('system') // 设置初始选中项为系统设置

const IconList = [
  {
    code: 'system',
    title: '系统设置',
    icon: 'Setting'
  },
  {
    code: 'weixin',
    title: '微信管理',
    icon: 'MessageBox'
  },
  {
    code: 'message',
    title: '消息中心',
    icon: 'ChatDotRound'
  }
]
const handleMenuClick = (option: string) => {
  // selectedMenu.value = option // 切换选中项
  console.log('点击了', option, selectedMenu)
}
const handleIconClick = (option: string) => {
  console.log('点击了图标', option)
  // 存储到vuex中
  store.dispatch('updateMenuOption', option) // 触发 Vuex 的 action 并传递参数
  selectedIcon.value = option // 切换选中项
}

const router = useRouter()
const handleExitClick = () => {
  localCache.removeCache(LOGIN_TOKEN) // 清除缓存
  localCache.removeCache(WEIXINMENU) // 清除微信菜单记录
  localCache.removeCache(USERMENU) // 清除菜单记录
  router.push('/login') // 跳转到登录页
}
</script>
<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;
}
.operation {
  display: inline-flex;
  margin-right: 20px;
  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background-color: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background-color: red;
      border-radius: 100%;
    }
  }
}
.info {
  .header-right-info {
    cursor: pointer;
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 5px;
    }
    .el-icon--right {
      margin-left: 5px;
    }
  }
}

// 右上角下拉加了选择样式且高度加高了
// 这里是写了一个全局的样式。用deep可能找不到，因为被渲染到了app以外了，找不到所以用了global
.info {
  :global(.el-dropdown-menu_item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
