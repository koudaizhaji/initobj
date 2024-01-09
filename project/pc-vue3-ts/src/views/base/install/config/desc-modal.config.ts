import type { PageModalConfigType } from '@/global/types/pageModal.type'

const modalConfig: PageModalConfigType = {
  title: '添加字典',
  // newtitle: "添加分组",
  // edittitle: "修改分组",
  pageName: 'dicts',
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'dicts'
  },
  editUrl: {
    rootPath: 'pcadmin',
    pageName: 'dicts'
  },
  formItems: [
    {
      prop: 'name',
      type: 'input',
      label: '字典名',
      placeholder: '请输入分组名称',
      rules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
    },

    {
      prop: 'intro',
      type: 'input',
      label: '字典描述',
      placeholder: '请对分组进行描述'
    },
    {
      prop: 'source',
      type: 'input',
      label: '字典来源',
      placeholder: '请输入来源',
      rules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
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
