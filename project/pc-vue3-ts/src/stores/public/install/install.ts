/*
 * @Description: 参考代码，从登录到登录成功后的所作操作
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import { getInitMenuJson } from '@/services/public/install/install'
import { defineStore } from 'pinia'

interface InstallState {
  initMenu: any[]
}

const useInstallStore = defineStore('install', {
  state: (): InstallState => ({
    initMenu: []
  }),
  actions: {
    async getInitMenu(data: string) {
      const res = await getInitMenuJson()
      console.log('获取安装数据', res, data)
      if (res.code == 0) {
        this.initMenu = res.data
      }
      return res
    }
  }
})

export default useInstallStore
