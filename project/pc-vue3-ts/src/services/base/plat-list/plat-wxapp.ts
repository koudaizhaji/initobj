/*
 * @Description: 微信相关请求
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import liliRequest from '@/services'

// ------小程序相关-------
/** 获取页面的数据 */
export function getPageListData(pageName: string, queryInfo: any) {
  return liliRequest.post({
    url: `/wx-app/${pageName}/list`,
    data: queryInfo
  })
}
// 删除页面数据
export function deletePageData(pageName: string, id: number) {
  return liliRequest.post({
    url: `/wx-app/${pageName}/${id}`
  })
}
// 新建页面数据操作
export function newPageData(pageName: string, dataInfo: any) {
  return liliRequest.post({
    url: `/wx-app/${pageName}/add`,
    data: dataInfo
  })
}
// 编辑页面数据
export function editPageData(pageName: string, id: number, dataInfo: any) {
  return liliRequest.post({
    url: `/wx-app/${pageName}/${id}`,
    data: dataInfo
  })
}
