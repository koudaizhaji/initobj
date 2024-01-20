/*
 * @Description: 获取全部的数据：分组数据，菜单数据与角色数据，用于添加时动态选项
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import { defineStore } from 'pinia'
import { getGroupData, getMenuData, getRoleData } from '@/services/base/system/system'
import type { IMainState } from './type'

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireGroups: [],
    entireRoles: [],
    entireMenus: []
  }),
  actions: {
    async fetchEntireDataAction() {
      const groupResult = await getGroupData({ pageNum: 1, pageSize: 100 })
      const roleResult = await getRoleData({ pageNum: 1, pageSize: 100 })
      const menuResult = await getMenuData()
      this.entireGroups = groupResult.data.list
      this.entireRoles = roleResult.data.list
      this.entireMenus = menuResult.data.list
      // console.log('格式化后的列表', this.entireGroups, this.entireRoles, this.entireMenus)
    }
  }
})

export default useMainStore
