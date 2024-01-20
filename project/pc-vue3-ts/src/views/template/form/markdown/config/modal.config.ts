import type { PageModalConfigType } from '@/global/types/pageModal.type'

export const MdConfig: PageModalConfigType = {
  title: '添加文章',
  pageName: 'md',
  formItems: [
    {
      prop: 'title',
      type: 'input',
      label: '文章标题',
      placeholder: '请输入文章标题'
    },
    {
      prop: 'desc',
      type: 'input',
      label: '文章简介',
      placeholder: '请输入文章简介',
    },
    {
      prop: 'types',
      type: 'select',
      label: '文章分类',
      placeholder: '请选择文章分类',
      options: ['分类1','分类2']
    }
  ]
}
export const ClassConfig: PageModalConfigType = {
  title: '提交分类',
  pageName: 'class',
  formItems: [
    {
      prop: 'title',
      type: 'input',
      label: '分类名称',
      placeholder: '请输入分类名称'
    },
    {
      prop: 'desc',
      type: 'input',
      label: '分类描述',
      placeholder: '请输入分类描述',
    }
  ]
}