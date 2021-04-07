interface params<t> {
    $axios: t,
    param?: t
  }
  // 发表评论
export function postComment (payload:params<any>) {
  return payload.$axios.request({
    url: '/comment',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
// 获取评论
export function getComment (payload:params<any>) {
  return payload.$axios.request({
    url: '/comment',
    method: 'get',
    params: { id: payload.param.id }
  })
}
// 发表评论的回复
export function postReplyComment (payload:params<any>) {
  return payload.$axios.request({
    url: '/comment/reply',
    method: 'post',
    data: payload.param,
    withCredentials: true
  })
}
