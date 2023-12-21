export default [ // 自定义底部tabbar
  {
    icon: 'home-silo-outline', // tabBar图标
    img: '../../static/tabbarImg/home.png', // 自定义图片
    text: '首页', // 显示的提示文字
    pagePath: '/pages/home/index', // 点击某一个item时，跳转的路径，此路径必须是pagees.json中tabBar字段中定义的路径
    customIcon: false, // 如果使用自定义扩展的图标库字体，需配置此值为true
    midButton: false, // 如果是凸起按钮项，需配置此值为true
  },
  {
    icon: 'file-search-outline',
    img: '../../static/tabbarImg/find.png',
    text: '发现',
    midButton: false,
    pagePath: '/pages/form/index',
    customIcon: false,
  },
  {
    icon: 'form-select',
    img: '../../static/tabbarImg/find.png',
    text: '统计',
    midButton: false,
    pagePath: '/pages/echart/index',
    customIcon: false,
  },
  {
    icon: 'account-tie',
    img: '../../static/tabbarImg/my.png',
    text: '个人中心',
    customIcon: false,
    pagePath: '/pages/mine/index',
    customIcon: false,
  },
];
