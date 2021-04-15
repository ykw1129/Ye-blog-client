interface params<t> {
    $axios: t,
    param?: t
  }
  // 上传
export function upload (payload:params<any>) {
  return payload.$axios.request({
    url: '/upload',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: payload.param,
    withCredentials: true
  })
}
// 更新用户信息
export function putUserInfo (payload:params<any>) {
  return payload.$axios.request({
    url: '/user/info',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
// 更新用户链接
export function putUserLinks (payload:params<any>) {
  return payload.$axios.request({
    url: '/user/link',
    method: 'put',
    data: payload.param,
    withCredentials: true
  })
}
