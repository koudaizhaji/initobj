/*
 * @Author: 李立
 * @Date: 2023-12-09 12:16:04
 * @LastEditors: 李立
 * @LastEditTime: 2023-12-09 14:11:04
 * @FilePath: \apiObjectc:\Users\Farben\Desktop\initobj\project\pc-vue3-ts\src\views\base\system\menus\config\content.config.ts
 * @Description:
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
/** @description: 用户管理-表格配置
 * 一个配置文件，控制整个表格的相对固定的信息
 */

import type { pageContentTable } from "@/global/types/pageContent.type"

const contentConfig: pageContentTable = {
  pageName: "menus",
  header:{
    title: "系统菜单配置",
    btnTitle: "添加菜单",
  },
  // isDisabled: false,
  propsList: [

    {
      prop: "title",
      label: "菜单名称",
      minWidth: "150"
    },
    {
      prop: 'id',
      label: '菜单编号',
      minWidth:80
    },
    { prop: "type", label: "级别", minWidth: "60" },
    {
      prop: "url",
      label: "菜单url",
      minWidth: "180"
    },
    {
      prop: "icon",
      label: "菜单icon",
      minWidth: "160"
    },
    {
      prop: "sort",
      label: "排序",
      minWidth: "60"
    },
    {
      type: "normal",
      prop: "status",
      label: "菜单状态",
      minWidth: "60",
      slotName: "status"
    },
    {
      prop: "permission",
      label: "权限"
    },
    {
      type: "timer",
      prop: "createdAt",
      label: "创建时间",
      slotName: "createdAt",
      minWidth: "180"
    },
    {
      type: "timer",
      prop: "updateAt",
      label: "更新时间",
      slotName: "updateAt",
      minWidth: "180"
    },
    {
      type: "handler",
      label: "操作",
      width: "150",
      slotName: "handler",
      fixed: "right"
    }
  ],

  // 是否展开菜单
  childrenProps: {
    rowKey: "id",
    // 指定对应的子节点属性名
    treeProps: {
      children: "children"
    }
  },
  // 是否显示分页
  showFooter: false
}

export default contentConfig
