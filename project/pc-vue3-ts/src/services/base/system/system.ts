/*
 * @Description: 系统相关请求
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import liliRequest from '@/services'

/** 获取页面的数据 */
export function getPageListData(pageName: string, queryInfo: any) {
  return liliRequest.post({
    url: `/pcadmin/${pageName}/list`,
    data: queryInfo
  })
}
// 删除页面数据
export function deletePageData(pageName: string, id: number) {
  return liliRequest.post({
    url: `/pcadmin/${pageName}/${id}`
  })
}
// 新建页面数据操作
export function newPageData(pageName: string, dataInfo: any) {
  return liliRequest.post({
    url: `/pcadmin/${pageName}/add`,
    data: dataInfo
  })
}
// 编辑页面数据
export function editPageData(pageName: string, id: number, dataInfo: any) {
  return liliRequest.post({
    url: `/pcadmin/${pageName}/${id}`,
    data: dataInfo
  })
}

/** 获取部门的信息 */
export function getGroupData(queryInfo: any) {
  return liliRequest.post({
    url: '/pcadmin/groups/list',
    data: queryInfo
  })
}

/** 获取角色的信息 */
export function getRoleData(queryInfo: any) {
  return liliRequest.post({
    url: '/pcadmin/roles/list',
    data: queryInfo
  })
}

/** 获取菜单的信息 */
export function getMenuData() {
  return liliRequest.post({
    url: '/pcadmin/menus/list'
  })
}

/**
 * 获取字典树请求
 */
export function getDictTreeData(pageName: string, dataInfo: any) {
  return liliRequest.post({
    url: `/pcadmin/${pageName}`,
    data: dataInfo
  })
}

// 导入excel操作
export function importExcelData(position: string, data: { excelBody: string }) {
  return liliRequest.post({
    url: `/pcadmin/set/excel/${position}`,
    data: data
  })
}

// 获取下载文件链接
export function getDownloadUrlData(fileName: string = 'all') {
  return liliRequest.get({
    url: `/pcadmin/set/download/${fileName}`
  })
}
