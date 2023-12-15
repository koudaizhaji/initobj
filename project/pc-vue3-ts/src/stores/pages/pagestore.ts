/*
 * @Description: 系统相关的store
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import {
  deletePageData,
  editPageData,
  getPageListData,
  newPageData
} from '@/services/pages/pageservice'
import type { IPageUrl } from '@/services/pages/types'
import { defineStore } from 'pinia'
import type { IPageState } from './type'

const pageDatastore = defineStore('pages', {
  state: (): IPageState => ({
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 页面的网络请求
    async getPageListDataAction(pageUrl: IPageUrl, queryInfo: any) {
      console.log('发起请求的参数', pageUrl, queryInfo)
      // 1.请求用户列表数据
      const pageListResult = await getPageListData(pageUrl, queryInfo)
      const { list, total } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = total
      console.log('请求的列表数据', this.pageList, this.pageTotalCount)
      return pageListResult
    },
    // 删除页面数据的请求
    async deletePageDataAction(pageUrl: IPageUrl, id: number) {
      const res = await deletePageData(pageUrl, id)
      console.log('页面删除数据', res)
      this.getPageListDataAction(pageUrl, { offset: 1, size: 10 })
      return res
    },
    async newPageDataAction(pageUrl: IPageUrl, pageData: any) {
      const res = await newPageData(pageUrl, pageData)
      console.log(pageData)
      console.log(res)
      this.getPageListDataAction(pageUrl, { offset: 1, size: 10 })
      return res
    },
    async editPageDataAction(pageUrl: IPageUrl, id: number, pageData: any) {
      const res = await editPageData(pageUrl, id, pageData)
      console.log(res)
      this.getPageListDataAction(pageUrl, { offset: 1, size: 10 })
      return res
    }
  }
})

export default pageDatastore
