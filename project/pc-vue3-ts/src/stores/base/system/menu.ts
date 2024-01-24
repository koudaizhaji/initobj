/*
 * @Description: 获取全部的数据：分组数据，菜单数据与角色数据，用于添加时动态选项
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import { defineStore } from 'pinia'
import { changePassword } from '@/services/base/system/menu'

const useSysTemMenuStore = defineStore('menu', {
  state: () => ({

  }),
  actions: {
    // 修改密码的方法
    async changePasswordAction(formdata: {password:string,newPassword:string}) {
      const res = await changePassword(formdata)
      if(res.code==0){
        return res
      }
      return res
    },
  }
})

export default useSysTemMenuStore
