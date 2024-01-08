import type { PageModalConfigType } from '@/global/types/pageModal.type'

const modalConfig: PageModalConfigType = {
  title: '添加字典类型',
  // newtitle: "添加分组",
  // edittitle: "修改分组",
  pageName: 'dictsType',
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'dictsType'
  },
  editUrl: {
    rootPath: 'pcadmin',
    pageName: 'dictsType'
  },
  formItems: [
    // {
    //   prop: 'dictId',
    //   type: 'input',
    //   label: '字典ID',
    //   placeholder: '上级目录前面-的数字'
    // },
    {
      prop: 'dictId',
      type: 'select',
      label: '字典iD',
      placeholder: '请选择字典ID',
      options: [],
      rules: [
        {
          required: true,
          message: '请选择添加的字典',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'type_name',
      type: 'input',
      label: '字典类型',
      placeholder: '输入字典类型名称',
      rules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'type_code',
      type: 'input',
      label: '字典编码',
      placeholder: '同类型名称一致一般',
      rules: [
        {
          required: true,
          message: '不能为空',
          trigger: 'blur'
        }
      ]
    },
    {
      prop: 'type_desc',
      type: 'input',
      label: '类型描述',
      placeholder: '请对字典类型备注说明下'
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
