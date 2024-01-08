import type { PageModalConfigType } from '@/global/types/pageModal.type'

const modalConfig: PageModalConfigType = {
  title: '添加字典内容',
  // newtitle: "添加分组",
  // edittitle: "修改分组",
  pageName: 'dictsContent',
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'dictsContent'
  },
  formItems: [
    {
      prop: 'dictTypeId',
      type: 'select',
      label: '类型编号',
      placeholder: '请选择字典类型数字',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择字典类型',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'label',
      type: 'input',
      label: '显示内容',
      placeholder: '字典对外显示内容',
      rules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'value',
      type: 'input',
      label: '字典值',
      placeholder: '提交给后端的值',
      rules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'desc',
      type: 'input',
      label: '内容描述',
      placeholder: '备注文字'
    },
    {
      prop: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          id: 1,
          label: '启用',
          value: 1
        },
        {
          id: 0,
          label: '禁用',
          value: 0
        }
      ]
    }
  ]
}

export default modalConfig
