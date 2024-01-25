import type { MYFormItem,MYRulesConfig,MYGroupConfig} from '@/comments/forms/types/index.ts'

export const mygroups: MYGroupConfig = {
  groups:[
    {
      title:'基础订单录入'
    },
  ]
}

export const myBaseItems: MYFormItem = {
  formItems: [
    { 
      name:'name',
      label: '学生姓名',
      required:true,
      type: 'input',
      placeholder: '请输入学生姓名',
      placeholderStyle:'color: #808080',
      inputBorder:true,
    },
    {
      name:'joinData',
      label: '报名日期',
      type: 'datepicker',
    },
    {
      name:'joinField',
      label: '报名专业',
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



export const myrules:MYRulesConfig = {
  dictTypeId: {
    rules: [{
      required: true,
      errorMessage: '请选择业务编号',
    },
    ],
  },
  label: {
    rules: [{
      required: true,
      errorMessage: '请输入选择时展示的汉字',
    },
    ],
  },
  value: {
    rules: [{
      required: true,
      errorMessage: '请选择输入字典值',
    },
    {
      pattern: /^[A-Za-z]+$/,
      errorMessage: '请输入英文字符',
    },
    ],
  },
  desc: {
    rules: [{
      required: true,
      errorMessage: '请输入描述',
    },
    ],
  },
  status: {
    rules: [{
      required: true,
      errorMessage: '请选择状态',
    },
    ],
  },
};



