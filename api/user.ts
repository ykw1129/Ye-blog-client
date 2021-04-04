interface params<t> {
    $axios: t,
    param?: t
  }
export function upload (payload:params<any>) {
  return payload.$axios.request({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: payload.param
  })
}
export function putUserInfo (payload:params<any>) {
  return payload.$axios.request({
    url: '/user/info',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
export function getUserArticle (payload:params<any>) {
  return payload.$axios.request({
    url: '/article/user',
    method: 'get',
    params: { id: payload.param.id },
    withCredentials: true
  })
}
