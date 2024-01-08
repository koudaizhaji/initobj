import type { IPageUrl } from '@/services/pages/types'
type LILIFormType =
  | 'input'
  | 'password'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'datepicker'
  | 'time'
  | 'textarea'
  | 'upload'
  | 'editor'
  | 'custom'

export interface LILIFormItem {
  prop: string
  type: LILIFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 用于select、radio、checkbox
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
  initialValue?: any
}

export interface LILIFormConfig {
  pageName: string
  pageUrl?: IPageUrl
  formItems: LILIFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any
}
