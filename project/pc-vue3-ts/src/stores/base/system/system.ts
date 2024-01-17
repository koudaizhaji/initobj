/*
 * @Description: 系统相关的store
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import {
  deletePageData,
  editPageData,
  getPageListData,
  newPageData,
  getDictTreeData,
  importExcelData,
  getDownloadUrlData
} from '@/services/base/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersTotalCount: 0,
    usersList: [],
    pageList: [],
    pageTotalCount: 0,
    dictTree: []
  }),
  actions: {
    // 页面的网络请求
    async getPageListDataAction(pageName: string, queryInfo?: any = {}) {
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
    },
    // 获取字典树请求
    async getDescTree(pageName: string, queryInfo: any) {
      const res = await getDictTreeData(pageName, queryInfo)
      // console.log('请求结果111', res)
      if (res.code === 0) {
        this.dictTree = res.data.list
      }
      return res
    },
    // 导入excel操作
    async importExcel(position: string, data: { excelBody: string }) {
      const res = await importExcelData(position, data)
      console.log('导入excel', res)
      return res
    },
    // 获取下载链接
    async getDownloadUrl(fileName: string) {
      const res = await getDownloadUrlData(fileName)
      console.log('下载链接', res)
      return res
    },
    // 获取menuList
    async getMenuList(pageName: string, queryInfo?: any) {
      const pageListResult = await getPageListData(pageName, (queryInfo = {}))
      console.log('pageListResult', pageListResult)
      if (pageListResult.code != 0) {
        console.log('请求出错了', pageListResult.code)
        return []
      }
      console.log('qingqi结果', pageListResult.data)
      return pageListResult.data
    }
  }
})

export default useSystemStore
