export const rules = {
  name: {
    rules: [{
      required: true,
      errorMessage: '请输入用户名',
    },
    ],
  },
  joinData: {
    rules: [{
      required: true,
      errorMessage: '请选择报名时间',
    },
    ],
  },
  joinField: {
    rules: [{
      required: true,
      errorMessage: '请选择报名专业',
    },
    ],
  },
  source: {
    rules: [{
      required: true,
      errorMessage: '请输入订单来源',
    },
    ],
  },
  schoolType: {
    rules: [{
      required: true,
      errorMessage: '请选择报名学习类型',
    },
    ],
  },
  feeSum: {
    rules: [{
      required: true,
      errorMessage: '请输入收费金额',
    },
    ],
  },
  teacher: {
    rules: [{
      required: true,
      errorMessage: '请选择负责的教务老师',
    },
    ],
  },
};
