export interface IDepartment {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}

export interface IMainState {
  entireGroups: any[]
  entireRoles: any[]
  entireMenus: any[]
}
