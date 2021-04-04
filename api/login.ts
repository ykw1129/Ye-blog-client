interface params<t> {
  $axios: t,
  param?: t
}
// 获取图片验证码
export function getLoginCaptcha (payload: params<any>) {
  return payload.$axios.get('/captcha')
}
// 用户注册
export function postUserRegister (payload: params<any>) {
  return payload.$axios.post('/user/register', {
    captcha: payload.param.captcha,
    username: payload.param.username,
    email: payload.param.email,
    password: payload.param.password
  }, { withCredentials: true })
}
