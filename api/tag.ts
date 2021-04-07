interface params<t> {
    $axios: t,
    param?: t
  }
  // 查找标签
export function searchTag (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/search',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
// 创建标签
export function createTag (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/create',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
// 获取热门标签
export function getHotTag (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/hot',
    method: 'get'
  })
}
