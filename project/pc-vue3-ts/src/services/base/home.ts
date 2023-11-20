import liliRequest from '../index'

export const getMenuList = () =>
  liliRequest.get({
    url: '/pcadmin/menu/list'
  })
