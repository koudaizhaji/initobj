export const rules = {
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
