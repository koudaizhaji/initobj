// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/config'
import liliRequest from '../index'

export function getInitMenuJson() {
  return liliRequest.post({
    url: '/pcadmin/getInitJson',
    data: ''
  })
}
