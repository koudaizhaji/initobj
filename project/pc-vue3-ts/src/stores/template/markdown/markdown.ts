/*
 * @Description: 参考代码，从登录到登录成功后的所作操作
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import { findMdListById,findMdClass } from '@/services/template/markdown/markdown'
import { defineStore } from 'pinia'

interface InstallState {
  classList: any[]
  articleList: any[]
}


const useInstallStore = defineStore('install', {
  state: (): InstallState => ({
    classList: [],
    articleList:[]
  }),
  actions: {
    // 获取文章分类列表
    async getMdClassAction(pageNum:string,pageSize:string) {
      const res = await findMdClass(pageNum,pageSize)
      console.log('pageSize',pageNum,pageSize);
      console.log('获取安装数据', res )
      if (res.code == 0) {
        this.classList = res.data
      }
      return this.classList
    },
    // 获取文章列表
    async getMdArticleListAction(pageNum:string,pageSize:string,classId:string) {
      const res = await findMdListById(pageNum,pageSize,classId)
      console.log('pageSize',pageNum,pageSize,classId);
      console.log('获取安装数据', res )
      if (res.code == 0) {
        this.articleList = res.data
      }
      return this.articleList
    }
  }
})

export default useInstallStore
