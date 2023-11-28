import liliRequest from '../index'

export const getMenuList = () =>
  liliRequest.get({
    url: '/pcadmin/menu/list'
  })

export const addMenu = <T>(data: T) =>
  liliRequest.post({
    url: '/pcadmin/menu/add',
    data: data
  })

export const editMenu = <T>(data: T) =>
  liliRequest.patch({
    url: '/pcadmin/menu',
    data: data
  })

export const deleteMenu = (id: string | number) =>
  liliRequest.patch({
    url: '/pcadmin/menu/' + id
  })

  // 获取管理员用户列表
export const getUserList = <T>(data: T) =>
  liliRequest.get({
    url: 'pcadmin/user/list',
    params: data
  })

// 删除管理用户
export const deleteUser = (id: string | number) =>
  liliRequest.delete({
    url: '/pcadmin/user/' + id
  })

// 添加管理用户
export const addUser = <T>(data: T) =>
  liliRequest.post({
    url: '/pcadmin/user/add',
    data: data
  })

// 编辑管理用户
export const editUser = <T>(data: T) =>
  liliRequest.patch({
    url: '/pcadmin/user/info',
    data: data
  })
