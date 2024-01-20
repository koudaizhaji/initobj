/*
 * @Description: 参考代码，从登录到登录成功后的所作操作
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import { findMdListById,findMdClass } from '@/services/template/markdown/markdown'
import { defineStore } from 'pinia'

interface InstallState {
  classList: any[]
}


const useInstallStore = defineStore('install', {
  state: (): InstallState => ({
    classList: []
  }),
  actions: {
    async getMdClassAction(pageNum:string,pageSize:string) {
      const res = await findMdClass(pageNum,pageSize)
      console.log('pageSize',pageNum,pageSize);
      console.log('获取安装数据', res )
      if (res.code == 0) {
        this.classList = res.data
      }
      return this.classList
    }
  }
})

export default useInstallStore
