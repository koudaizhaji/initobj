/*
 * @Description: 页面相关请求封装
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import liliRequest from '@/services'
import type { IPageUrl } from './types'

/** 获取页面的数据 */
export function getPageListData(pageUrl: IPageUrl, queryInfo: any) {
  const { rootPath, pageName, handleName = '/list' } = pageUrl
  return liliRequest.post({
    url: `/${rootPath}/${pageName}${handleName}`,
    // url: `/pcadmin/${pageName}/list`,
    data: queryInfo
  })
}
// 删除页面数据
export function deletePageData(pageUrl: IPageUrl, id: number) {
  const { rootPath, pageName, handleName = id } = pageUrl
  return liliRequest.delete({
    url: `/${rootPath}/${pageName}${handleName}/${id}`
    // url: `/pcadmin/${pageName}/${id}`
  })
}
// 新建页面数据操作
export function newPageData(pageUrl: IPageUrl, dataInfo: any) {
  const { rootPath, pageName, handleName = 'add' } = pageUrl
  return liliRequest.post({
    url: `/${rootPath}/${pageName}/${handleName}`,
    // url: `/pcadmin/${pageName}/add`,
    data: dataInfo
  })
}
// 编辑页面数据
export function editPageData(pageUrl: IPageUrl, id: number, dataInfo: any) {
  const { rootPath, pageName, handleName = id } = pageUrl
  return liliRequest.patch({
    url: `/${rootPath}/${pageName}/${handleName}`,
    // url: `/pcadmin/${pageName}/${id}`,
    data: dataInfo
  })
}
