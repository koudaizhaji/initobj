import type { PageModalConfigType } from '@/global/types/pageModal.type'
export const articleConfig: PageModalConfigType = {
  title: '添加文章',
  pageName: 'md',
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'set',
    handleName:"markdown/add"
  },
  editUrl:{
    rootPath: 'pcadmin',
    pageName: 'set',
    handleName:"/markdownClass/list"
  },
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
      prop: 'classId',
      type: 'select',
      label: '文章分类',
      placeholder: '请选择文章分类',
      options: []
    }
  ]
}

