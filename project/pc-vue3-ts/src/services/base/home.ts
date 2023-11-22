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
