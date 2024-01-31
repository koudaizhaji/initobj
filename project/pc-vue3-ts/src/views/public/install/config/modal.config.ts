import type { PageModalConfigType } from '@/global/types/pageModal.type'

const modalConfig: PageModalConfigType = {
  title: '修改初始化菜单',
  // newtitle: "添加分组",
  // edittitle: "修改分组",
  pageName: 'getInitJson',
  editUrl: {
    rootPath: 'pcadmin',
    pageName: 'getInitJson'
  },
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'updateInitJson'
  },
  formItems: [
    {
      prop: 'id',
      type: 'input',
      label: '菜单id'
      // disabled: true
    },
    {
      prop: 'parentId',
      type: 'input',
      label: '父级菜单选择'
    },
    {
      prop: 'type',
      type: 'select',
      label: '菜单类型',
      placeholder: '请选择菜单类型',
      options: [
        {
          id: 1,
          label: '左侧菜单',
          value: 1
        },
        {
          id: 2,
          label: '二级菜单',
          value: 2
        },
        {
          id: 3,
          label: '三级页面',
          value: 3
        },
        {
          id: 4,
          label: '四级权限',
          value: 4
        }
      ]
    },
    {
      prop: 'title',
      type: 'input',
      label: '菜单名称',
      placeholder: '菜单名称'
    },
    {
      prop: 'url',
      type: 'input',
      label: '菜单url',
      placeholder: '菜单url',
      initialValue: '/pcadmin/dictsContent'
    },
    {
      prop: 'icon',
      type: 'input',
      label: '图标',
      placeholder: '图标名称'
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
