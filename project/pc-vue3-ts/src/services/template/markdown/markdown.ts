/*
 * @Author: 挽歌
 * @Date: 2024-01-13
 * @Description: markdown模块前端接口
 */
import liliRequest from '@/services'
// 添加markdown
export function addMd(formdata: object) {
  return liliRequest.post({
    url: '/pcadmin/set/markdown/add',
    data: formdata
  })
}
// 查询md内容列表
export function findMdListById(pageNum: string, pageSize: string, classId: string) {
  return liliRequest.post({
    url: '/pcadmin/set/markdown/list',
    data: {
      pageNum,
      pageSize,
      classId
    }
  })
}
// 添加md的分类
export function addMdClass(formdata: object) {
  return liliRequest.post({
    url: '/pcadmin/set/markdownClass/add',
    data: formdata
  })
}
// 查询md的分类
export function findMdClass(pageNum: string, pageSize: string) {
  return liliRequest.post({
    url: '/pcadmin/set/markdownClass/list',
    data: {
      pageNum,
      pageSize
    }
  })
}
