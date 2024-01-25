import type { MYFormItem,MYRulesConfig,MYGroupConfig} from '@/comments/forms/types/index.ts'

export const mygroups: MYGroupConfig = {
  groups:[
    {
      title:'基本信息'
    },
    {
      title:'详细信息'
    },
  ]
}

export const myBaseItems: MYFormItem = {
  formItems: [
    { 
      name:'name',
      label: '用户名',
      required:true,
      type: 'input',
      placeholder: '请输入用户名',
      placeholderStyle:'color: #808080',
      inputBorder:true,
    },
    {
      name:'age',
      label: '年龄',
      required:true,
      type: 'input',
      placeholder: '请输入年龄',
      inputBorder:true,
    },
    {
      name:'weight',
      label: '体重',
      step:'5',
      type: 'slider',
      min: '0',
      max:'200',
    },
    {
      name:'birth',
      label: '出生日期',
      required:true,
      type: 'datepicker',
    },
    { 
      name:'email',
      label: '邮箱',
      required:true,
      type: 'input',
      placeholder: '请输入邮箱',
      placeholderStyle:'color: #808080',
    },
    { 
      name:'checked',
      label: '详细信息',
      type: 'switch',
    },
    { 
      name:'sex',
      label: '性别',
      required:true,
      type: 'sex',
      options:[{
				text: '男',
				value: '0'
			},
			{
				text: '女',
				value: '1'
			},
			{
				text: '保密',
				value: '2'
			}
			]
    },
    {
      name:'hobby',
      label: '兴趣爱好',
      required:true,
      type: 'hobby',
      options:[{
				text: '足球',
				value: 0
			},
			{
				text: '篮球',
				value: 1
			},
			{
				text: '游泳',
				value: 2
			}
			]
    },
    {
      name:'remarks',
      label: '备注',
      type: 'textarea',
      placeholder: '请输入备注',
      placeholderStyle:'color: #808080',
      
    },
  ],
  
}

export const myInfoItems: MYFormItem = {
  infoItems: [
    { 
      name:'sex',
      label: '性别',
      required:true,
      type: 'sex',
      options:[{
				text: '男',
				value: '0'
			},
			{
				text: '女',
				value: '1'
			},
			{
				text: '保密',
				value: '2'
			}
			]
    },
    {
      name:'hobby',
      label: '兴趣爱好',
      required:true,
      type: 'hobby',
      options:[{
				text: '足球',
				value: 0
			},
			{
				text: '篮球',
				value: 1
			},
			{
				text: '游泳',
				value: 2
			}
			]
    },
    {
      name:'remarks',
      label: '备注',
      type: 'textarea',
      placeholder: '请输入备注',
      placeholderStyle:'color: #808080',
      
    },
  ],
}

export const myrules:MYRulesConfig = {
  rules: {
    name: {
      rules: [{
        required: true,
        errorMessage: '请输入用户名'
      },
      {
        minLength: 3,
        maxLength: 15,
        errorMessage: '用户名长度在 {minLength} 到 {maxLength} 个字符'
      }
      ]
    },
    age: {
      rules: [{
        required: true,
        errorMessage: '请输入年龄'
      },
      {
        format: 'int',
        errorMessage: '年龄必须是数字'
      },
      {
        minimum: 0,
        maximum: 100,
        errorMessage: '年龄应该大于 {minimum} 岁，小于 {maximum} 岁'
      }
      ]
    },
    weight: {
      rules: [{
        format: 'number',
        errorMessage: '体重必须是数字'
      },
      {
        minimum: 20,
        maximum: 300,
        errorMessage: '体重应该大于 {minimum} 斤，小于 {maximum} 斤'
      }
      ]
    },
    birth: {
      rules: [
        {
          required: true,
          errorMessage: '请选择时间'
        },
        {
          format: 'String',
          errorMessage: '必须是时间戳'
        }
      ]
    },
    email: {
      rules: [{
        required: true,
        errorMessage: '请输入邮箱'
      },
      {
        format: 'email',
        errorMessage: '请输入正确的邮箱地址'
      }]
    },
    checked: {
      rules: [{
        format: 'bool'
      }]
    },
    sex: {
      rules: [{
        format: 'string'
      }]
    },
    hobby: {
      rules: [{
        format: 'array'
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (value.length < 1) {
            callback('请至少勾选一个兴趣爱好')
          }
          return true
        }
      }
      ]
    }
  }
}


