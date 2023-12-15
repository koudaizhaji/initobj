/*
 * @Description: 微信平台相关操作
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import {
  deletePageData,
  editPageData,
  getPageListData,
  newPageData
} from '@/services/base/plat-list/plat-wxapp'
import { defineStore } from 'pinia'
import type { IPlatWXh5State } from './type'

const platWXh5Store = defineStore('wxh5', {
  state: (): IPlatWXh5State => ({
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 页面的网络请求
    async getPageListDataAction(pageName: string, queryInfo: any) {
      console.log('发起请求的参数', pageName, queryInfo)
      // 1.请求用户列表数据
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { list, total } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = total
      console.log('请求的列表数据', this.pageList, this.pageTotalCount)
      return pageListResult
    },
    // 删除页面数据的请求
    async deletePageDataAction(pageName: string, id: number) {
      const res = await deletePageData(pageName, id)
      console.log('页面删除数据', res)
      this.getPageListDataAction(pageName, { offset: 1, size: 10 })
      return res
    },
    async newPageDataAction(pageName: string, pageData: any) {
      const res = await newPageData(pageName, pageData)
      console.log(pageData)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 1, size: 10 })
      return res
    },
    async editPageDataAction(pageName: string, id: number, pageData: any) {
      const res = await editPageData(pageName, id, pageData)
      console.log(res)
      this.getPageListDataAction(pageName, { offset: 1, size: 10 })
      return res
    }
  }
})

export default platWXh5Store
