interface params<t> {
    $axios: t,
    param?: t
  }
  // 发表项目
export function postProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
// 获取所有项目
export function getAllProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'get',
    params: { page: payload.param.page }
  })
}
// 获取登录用户的项目
export function getUserProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project/user',
    method: 'get',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
// 获取项目内容
export function getProjectContent (payload:params<any>) {
  return payload.$axios.request({
    url: '/project/content',
    method: 'get',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
// 更新登录用户的项目
export function putUserProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
// 删除登录用户的项目
export function deleteUserProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'delete',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
