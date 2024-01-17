/*
 * 相关开发文件头自动添加：联系微信huaiplayboy
 */
import type { LILIFormConfig } from '@/global/types/pageSearch.type'

const searchConfig: LILIFormConfig = {
  pageName: 'roles',
  labelWidth: '120px',
  // itemStyle: { padding: "10px 40px" },
  // colLayout: { span: 8 },
  pageUrl: {
    rootPath: 'pcadmin',
    pageName: 'roles'
  },
  formItems: [
    // {
    //   prop: 'id',
    //   type: 'input',
    //   label: 'id',
    //   rules: [],
    //   placeholder: '请输入id'
    // },
    {
      prop: 'name',
      type: 'input',
      label: '权限名',
      rules: [],
      placeholder: '请输入权限名'
    },
    {
      prop: 'intro',
      type: 'input',
      label: '权限介绍',
      rules: [],
      placeholder: '请输入权限介绍'
    },
    {
      prop: 'createdAt',
      type: 'date-picker',
      label: '创建时间',
      // placeholder: "请选择创建时间"
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间'
      }
    }
  ]
}

export default searchConfig
