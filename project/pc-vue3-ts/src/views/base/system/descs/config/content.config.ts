/** @description: 用户管理-表格配置
 * 一个配置文件，控制整个表格的相对固定的信息
 */

import type { pageContentTable } from '@/global/types/pageContent.type'

const contentConfig: pageContentTable = {
  pageName: 'descs',
  isPermission: false,
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'dicts',
    handleName: 'types/1/contents'
  },
  header: {
    title: '数据字典',
    btnTitle: '添加字典内容'
  },
  propsList: [
    {
      type: 'selection',
      width: 60,
      label: '选择'
    },
    {
      type: 'index',
      label: '序号',
      width: 60
    },
    {
      type: 'random',
      prop: 'type_id',
      label: '字典所属类型'
    },
    {
      type: 'random',
      prop: 'content_code',
      label: '字典编码'
    },
    {
      type: 'random',
      prop: 'content_desc',
      label: '字典说明'
    },
    { type: 'random', prop: 'content_value', label: '字典值' },
    {
      type: 'status',
      prop: 'status',
      label: '字典状态',
      slotName: 'status'
    },
    {
      type: 'timer',
      prop: 'createdAt',
      label: '创建时间',
      width: '180',
      slotName: 'createdAt'
    },
    {
      type: 'timer',
      prop: 'updatedAt',
      label: '更新时间',
      width: '180',
      slotName: 'updatedAt'
    },
    {
      type: 'handler',
      label: '操作',
      width: '150',
      slotName: 'handler',
      fixed: 'right'
    }
    // {
    //   type: "custom",
    //   slotName: "menulist"
    // }
  ].map((item) => ({ ...item, visible: true }))
}

export default contentConfig
