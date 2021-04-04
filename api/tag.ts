interface params<t> {
    $axios: t,
    param?: t
  }
export function searchTag (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/search',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
export function createTag (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/create',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
export function getHotTag (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/hot',
    method: 'get'
  })
}
