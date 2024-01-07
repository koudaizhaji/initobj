export const column = [
  { type: 'selection', fixed: true, width: 50 },
  {
    name: 'name', label: '姓名', fixed: true, width: 80, emptyString: '--',
  },
  {
    name: 'join_field', label: '报名专业', align: 'right',
  },
  { name: 'fee_sum', label: '缴费额' },
  { name: 'head', label: '负责人' },
  { name: 'id', label: '编号' },
  { name: 'join_data', label: '报名时间', sorter: true },
  { name: 'source', label: '学生来源' },
  { name: 'teacher', label: '教务老师' },
  { name: 'over_status', label: '是否结算', align: 'right' },

  // {
  //   name: 'operation',
  //   type: 'operation',
  //   label: '操作',
  //   renders: [
  //     {
  //       name: '编辑',
  //       func: 'edit', // func 代表子元素点击的事件 父元素接收的事件 父元素 @edit
  //     },
  //     {
  //       name: '删除',
  //       type: 'warn',
  //       func: 'dele',
  //     },
  //   ],
  // },
];
