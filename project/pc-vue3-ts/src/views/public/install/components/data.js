export const menuList = [
  {
    uid: '1',
    url: '/base',
    title: '基础',
    icon: 'Burger',
    type: '1',
    parent_id: 0,
    children: [
      {
        uid: '5',
        url: '/base/home',
        title: '首页',
        icon: 'HomeFilled',
        type: '2',
        parent_id: 1,
        children: [
          {
            uid: '24',
            url: '/base/home/welcome',
            title: '欢迎页',
            icon: '',
            type: '3',
            parent_id: 7
          }
        ]
      },
      {
        uid: '6',
        url: '/base/system',
        title: '系统管理',
        icon: 'Tools',
        type: '2',
        parent_id: 1,
        children: [
          {
            uid: '25',
            url: '/base/system/menus',
            title: '菜单管理',
            icon: '',
            type: '3',
            parent_id: 8,
            children: [
              {
                title: '添加菜单',
                icon: '',
                type: '5',
                parent_id: 25,
                permission: 'base:system:menus:create'
              },
              {
                title: '删除菜单',
                icon: '',
                type: '5',
                parent_id: 25,
                permission: 'base:system:menus:delete'
              },
              {
                title: '编辑菜单',
                icon: '',
                type: '5',
                parent_id: 25,
                permission: 'base:system:menus:update'
              },
              {
                title: '查询菜单',
                icon: '',
                type: '5',
                parent_id: 25,
                permission: 'base:system:menus:query'
              }
            ]
          },
          {
            uid: '26',
            url: '/base/system/users',
            title: '人员管理',
            icon: '',
            type: '3',
            parent_id: 8,
            children: [
              {
                title: '添加管理',
                icon: '',
                type: '5',
                parent_id: 26,
                permission: 'base:system:users:create'
              },
              {
                title: '删除管理',
                icon: '',
                type: '5',
                parent_id: 26,
                permission: 'base:system:users:delete'
              },
              {
                title: '修改管理',
                icon: '',
                type: '5',
                parent_id: 26,
                permission: 'base:system:users:update'
              },
              {
                title: '查询管理',
                icon: '',
                type: '5',
                parent_id: 26,
                permission: 'base:system:users:query'
              }
            ]
          },
          {
            uid: '27',
            url: '/base/system/groups',
            title: '分组管理',
            icon: '',
            type: '3',
            parent_id: 8,
            children: [
              {
                title: '添加分组',
                icon: '',
                type: '5',
                parent_id: 27,
                permission: 'base:system:groups:create'
              },
              {
                title: '删除分组',
                icon: '',
                type: '5',
                parent_id: 27,
                permission: 'base:system:groups:delete'
              },
              {
                title: '修改分组',
                icon: '',
                type: '5',
                parent_id: 27,
                permission: 'base:system:groups:update'
              },
              {
                title: '查询分组',
                icon: '',
                type: '5',
                parent_id: 27,
                permission: 'base:system:groups:query'
              }
            ]
          },
          {
            uid: '28',
            url: '/base/system/roles',
            title: '角色权限',
            icon: '',
            type: '3',
            parent_id: 8,
            children: [
              {
                title: '添加角色',
                icon: '',
                type: '5',
                parent_id: 28,
                permission: 'base:system:roles:create'
              },
              {
                title: '删除角色',
                icon: '',
                type: '5',
                parent_id: 28,
                permission: 'base:system:roles:delete'
              },
              {
                title: '修改角色',
                icon: '',
                type: '5',
                parent_id: 28,
                permission: 'base:system:roles:update'
              },
              {
                title: '查询角色',
                icon: '',
                type: '5',
                parent_id: 28,
                permission: 'base:system:roles:query'
              }
            ]
          },
          {
            uid: '29',
            url: '/base/system/descs',
            title: '数据字典',
            icon: '',
            type: '3',
            parent_id: 8
          }
        ]
      },
      {
        uid: '7',
        url: '/base/plat',
        title: '平台管理',
        icon: 'Menu',
        type: '2',
        parent_id: 1,
        children: [
          {
            uid: '30',
            url: '/base/plat/wxh5',
            title: '公众号列表',
            icon: '',
            type: '3',
            parent_id: 9,
            children: [
              {
                title: '添加公众号',
                icon: '',
                type: '5',
                parent_id: 30,
                permission: 'base:plat:wxh5:create'
              },
              {
                title: '删除公众号',
                icon: '',
                type: '5',
                parent_id: 30,
                permission: 'base:plat:wxh5:delete'
              },
              {
                title: '修改公众号',
                icon: '',
                type: '5',
                parent_id: 30,
                permission: 'base:plat:wxh5:update'
              },
              {
                title: '查询公众号',
                icon: '',
                type: '5',
                parent_id: 30,
                permission: 'base:plat:wxh5:query'
              }
            ]
          },
          {
            uid: '31',
            url: '/base/plat/wxapp',
            title: '小程序列表',
            icon: '',
            type: '3',
            parent_id: 9,
            children: [
              {
                title: '添加小程序',
                icon: '',
                type: '5',
                parent_id: 31,
                permission: 'base:plat:wxapp:create'
              },
              {
                title: '删除小程序',
                icon: '',
                type: '5',
                parent_id: 31,
                permission: 'base:plat:wxapp:delete'
              },
              {
                title: '修改小程序',
                icon: '',
                type: '5',
                parent_id: 31,
                permission: 'base:plat:wxapp:update'
              },
              {
                title: '查询小程序',
                icon: '',
                type: '5',
                parent_id: 31,
                permission: 'base:plat:wxapp:query'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    uid: '2',
    url: '/weixin',
    title: '组件',
    icon: 'ChatDotRound',
    type: '1',
    parent_id: 0,
    children: [
      {
        uid: '8',
        url: '/weixin/home',
        title: '首页',
        icon: 'TrendCharts',
        type: '2',
        parent_id: 2,
        children: [
          {
            uid: '38',
            url: '/template/home/home',
            title: '引导页',
            icon: '',
            type: '3',
            parent_id: 13
          }
        ]
      },
      {
        uid: '14',
        url: '/template/table',
        title: '表格操作',
        icon: 'Platform',
        type: '2',
        parent_id: 3,
        children: [
          {
            uid: '39',
            url: '/template/table/import',
            title: '导入excel',
            icon: '',
            type: '3',
            parent_id: 14
          },
          {
            uid: '40',
            url: '/template/table/export',
            title: '导出excel',
            icon: '',
            type: '3',
            parent_id: 14
          }
        ]
      },
      {
        uid: '15',
        url: '/template/form',
        title: '表单相关',
        icon: 'SwitchFilled',
        type: '2',
        parent_id: 3,
        children: [
          {
            uid: '41',
            url: '/template/form/editor',
            title: '富文本',
            icon: '',
            type: '3',
            parent_id: 15
          },
          {
            uid: '42',
            url: '/template/form/markdown',
            title: 'md编写',
            icon: '',
            type: '3',
            parent_id: 15
          }
        ]
      },
      {
        uid: '16',
        url: '/template/help',
        title: '辅助操作',
        icon: 'QuestionFilled',
        type: '2',
        parent_id: 3,
        children: [
          {
            uid: '43',
            url: '/template/help/tabs',
            title: '选项卡切换',
            icon: '',
            type: '3',
            parent_id: 16
          }
        ]
      }
    ]
  },
  {
    uid: '3',
    url: '/template',
    title: '基建',
    icon: 'FirstAidKit',
    type: '1',
    parent_id: 0,
    children: [
      {
        uid: '13',
        url: '/template/home',
        title: '首页',
        icon: 'Opportunity',
        type: '2',
        parent_id: 3
      }
    ]
  },
  {
    uid: '4',
    url: '/screen',
    title: '方案',
    icon: 'Odometer',
    type: '1',
    parent_id: 0,
    children: [
      {
        uid: '17',
        url: '/screen/home',
        title: '首页',
        icon: 'Opportunity',
        type: '2',
        parent_id: 4
      },
      {
        uid: '9',
        url: '/weixin/mph5',
        title: '公众号',
        icon: 'Briefcase',
        type: '2',
        parent_id: 4,
        children: [
          {
            uid: '32',
            url: '/weixin/home/welcome',
            title: '欢迎页',
            icon: '',
            type: '3',
            parent_id: 10
          },
          {
            uid: '33',
            url: '/weixin/mph5/users',
            title: '用户管理',
            icon: '',
            type: '3',
            parent_id: 11
          },
          {
            uid: '34',
            url: '/weixin/mph5/messages',
            title: '消息管理',
            icon: '',
            type: '3',
            parent_id: 11
          },
          {
            uid: '35',
            url: '/weixin/mph5/menus',
            title: '菜单管理',
            icon: '',
            type: '3',
            parent_id: 11
          }
        ]
      },
      {
        uid: '10',
        url: '/weixin/wxapp',
        title: '小程序',
        icon: 'Stamp',
        type: '2',
        parent_id: 4,
        children: [
          {
            uid: '36',
            url: '/weixin/mph5/keywords',
            title: '关键字回复',
            icon: '',
            type: '3',
            parent_id: 11
          },
          {
            uid: '37',
            url: '/weixin/wxapp/users',
            title: '用户管理',
            icon: '',
            type: '3',
            parent_id: 12
          }
        ]
      }
    ]
  }
]
