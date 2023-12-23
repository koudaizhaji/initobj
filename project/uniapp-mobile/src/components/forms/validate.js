export const rules = {
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