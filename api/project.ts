interface params<t> {
    $axios: t,
    param?: t
  }
export function postProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
export function getAllProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'get'
  })
}
export function getUserProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project/user',
    method: 'get',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
export function getProjectContent (payload:params<any>) {
  return payload.$axios.request({
    url: '/project/content',
    method: 'get',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
export function putUserProject (payload:params<any>) {
  return payload.$axios.request({
    url: '/project',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
