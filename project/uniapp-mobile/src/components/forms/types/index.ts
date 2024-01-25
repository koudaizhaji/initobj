type MYFormType =
  | 'text'
  | 'password'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date'
  | 'datepicker'
  | 'time'
  | 'textarea'
  | 'upload'
  | 'switch'
  | 'slider'
    'sex'
    'hobby'

export interface MYGroupConfig {
  groups: any[]
}

export interface MYFormItem {
  type: MYFormType
  label: string
  placeholder?: any
  // 用于select、radio、checkbox
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  required?: boolean
  placeholderStyle?:string
  inputBorder?:boolean
  name:string
  min?:string
  max?:string
  step?:string
}

export interface MYFormConfig {
  formItems: MYFormItem[]
  labelWidth?: string
  colLayout?: any
  itemStyle?: any

}

export interface MYRulesConfig {
  rules?: any[]
}
