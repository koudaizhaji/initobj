interface modalFormItemsType {
  prop?: string
  type?: string
  label?: string
  placeholder?: string
  isHidden?: boolean
  options?: { id: string | number; name: string; value: string | number }[]
  slotName?: string
}

export interface PageModalConfigType {
  // 弹窗顶部显示名称
  // newtitle: string
  // 弹窗编辑名称
  // edittitle?: string
  title:string
  // 页面名称
  pageName: string
  // 页面其他配置
  formItems: modalFormItemsType[]
}
