import type { PageModalConfigType } from '@/global/types/pageModal.type'
import { findMdClass,addMd, addMdClass } from '@/services/template/markdown/markdown'
let mdType=[]
  let res=await findMdClass()
  for(let i=0;i<res.data.length;i++){
      mdType.push({
        id:res.data[i].id,
        value:res.data[i].name,
        label:res.data[i].name
      })
  }
export const MdConfig: PageModalConfigType = {
  title: '添加文章',
  pageName: 'md',
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'md'
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
      options: mdType
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