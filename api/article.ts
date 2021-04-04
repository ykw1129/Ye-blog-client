interface params<t> {
    $axios: t,
    param?: t
  }
export function postArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
export function getAllArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'get'
  })
}
export function getArticleContent (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/content',
    method: 'get',
    params: { id: payload.param.id }
  })
}
export function getHotArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/hot',
    method: 'get'
  })
}
export function getAboutArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/about',
    method: 'get',
    params: { id: payload.param.id }
  })
}
export function putUserArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
export function deleteUserArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'delete',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
