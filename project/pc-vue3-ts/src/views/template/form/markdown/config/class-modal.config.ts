import type { PageModalConfigType } from '@/global/types/pageModal.type'

export const ClassConfig: PageModalConfigType = {
  title: '提交分类',
  pageName: 'class',
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'md/class'
  },
  editUrl: {
    rootPath: 'pcadmin',
    pageName: 'md/class'
  },
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '分类名称',
      placeholder: '请输入分类名称'
    },
    {
      prop: 'desc',
      type: 'input',
      label: '分类描述',
      placeholder: '请输入分类描述'
    }
  ]
}
