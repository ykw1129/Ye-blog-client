interface params<t> {
    $axios: t,
    param?: t
  }
export function postComment (payload:params<any>) {
  return payload.$axios.request({
    url: '/comment',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
export function getComment (payload:params<any>) {
  return payload.$axios.request({
    url: '/comment',
    method: 'get',
    params: { id: payload.param.id }
  })
}
export function postReplyComment (payload:params<any>) {
  return payload.$axios.request({
    url: '/comment/reply',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
