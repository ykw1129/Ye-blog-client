interface params<t> {
    $axios: t,
    param?: t
  }
  // 发布文章
export function postArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
// 获取所有文章
export function getAllArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'get',
    params: { page: payload.param.page }
  })
}
// 获取文章内容
export function getArticleContent (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/content',
    method: 'get',
    params: { id: payload.param.id }
  })
}
// 获取热门文章
export function getHotArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/hot',
    method: 'get'
  })
}
// 获取该作者的其他文章
export function getAboutArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/about',
    method: 'get',
    params: { id: payload.param.id, articleId: payload.param.articleId }
  })
}
// 获取登录用户的文章
export function putUserArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
// 删除登录用户的文章
export function deleteUserArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article',
    method: 'delete',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
// 查找文章
export function searchArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/search',
    method: 'get',
    params: { word: payload.param.word }
  })
}
// 获取含有该标签的文章
export function getTagArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/tag/article',
    method: 'get',
    params: { id: payload.param.id, page: payload.param.page }
  })
}
// 获取登录用户的文章
export function getUserArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/user',
    method: 'get',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
