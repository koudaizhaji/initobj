/*
 * @Description: 系统相关的store
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import {
  deletePageData,
  editPageData,
  getPageListData,
  newPageData
} from '@/services/pages/page-service'
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
      console.log('发起请求的参数11111', pageUrl, queryInfo)
      // 1.请求用户列表数据
      const pageListResult = await getPageListData(pageUrl, queryInfo)
      if (pageListResult.code === 0) {
        const { list, total } = pageListResult.data
        this.pageList = list
        this.pageTotalCount = total
        console.log('请求的列表数据', this.pageList, this.pageTotalCount)
        return pageListResult
      } else {
        return {
          code: pageListResult.code,
          message: pageListResult.message
        }
      }
    },
    // 删除页面数据的请求
    async deletePageDataAction(pageUrl: IPageUrl, id: number, range: any) {
      const res = await deletePageData(pageUrl, id)
      console.log('页面删除数据', res)
      this.getPageListDataAction(pageUrl, { pageNum: range.pageNum, pageSize: range.pageSize })
      return res
    },
    // 新建页面数据
    async newPageDataAction(pageUrl: IPageUrl, pageData: any) {
      const res = await newPageData(pageUrl, pageData)
      console.log(pageData)
      console.log(res)
      return res
    },
    // 编辑页面数据
    async editPageDataAction(pageUrl: IPageUrl, id: number, pageData: any) {
      const res = await editPageData(pageUrl, id, pageData)
      console.log(res)
      return res
    }
  }
})

export default pageDatastore
