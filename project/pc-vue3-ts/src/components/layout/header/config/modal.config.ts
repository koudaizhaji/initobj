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
      prop: 'oldPassword',
      type: 'input',
      label: '当前密码',
      placeholder: '请输入当前密码',
      rules:[
        { required: true, message: '请输入当前密码', trigger: 'blur' },
      ]
    },
    {
      prop: 'newPassword',
      type: 'input',
      label: '新密码',
      placeholder: '请输入新密码',
      rules:[
        { required: true, message: '请输入新密码', trigger: 'blur' },
      ]
    },
    {
      prop: 'confirmPassword',
      type: 'password',
      label: '确认密码',
      placeholder: '请在此输入新密码',
      rules:[
        { required: true, message: '请再次输入新密码', trigger: 'blur' },

      ]
    }
  ]
}

export default modalConfig
