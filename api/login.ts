interface params<t> {
  $axios: t,
  param?: t
}
// 获取全部用户信息
export function getUser (payload: params<any>) {
  return payload.$axios.get('/user')
}
// 获取图片验证码
export function getLoginCaptcha (payload: params<any>) {
  return payload.$axios.get('/captcha')
}
// 用户注册
export function postUserRegister (payload: params<any>) {
  return payload.$axios.post('/user', {
    captcha: payload.param.captcha,
    name: payload.param.username,
    email: payload.param.email,
    password: payload.param.password
  }, { withCredentials: true })
}
