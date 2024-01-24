import liliRequest from '@/services'

/** 修改密码 */
export function changePassword(queryInfo: {password: string, newPassword: string}) {
  return liliRequest.post({
    url: `/pcadmin/users/password/update`,
    data: queryInfo
  })
}
