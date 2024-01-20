import type { IPageUrl } from '@/services/public/pages/types'
interface modalFormItemsType {
  prop?: string
  type?: string
  label?: string
  placeholder?: string
  isHidden?: boolean
  options?: { id: string | number; label: string; value: string | number }[]
  slotName?: string
  initialValue?: any
  disabled?: boolean
  otherConfig?: Object
  rules?: {
    required?: boolean
    message?: string
    trigger?: string
  }[]
}

export interface PageModalConfigType {
  // 弹窗顶部显示名称
  title: string
  pageUrl: IPageUrl
  // 弹窗编辑名称
  editTitle?: string
  // 页面名称
  pageName?: string
  editUrl?: IPageUrl
  // 页面其他配置
  formItems: modalFormItemsType[]
}
