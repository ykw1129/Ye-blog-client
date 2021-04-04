// 存放表单验证规则
let passwordVal: string = ''
export const validateUsername = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '' || value.length === 0) { callback(new Error('请输入用户名')) } else if (value.length > 12) { callback(new Error('用户名过长!')) } else { callback() }
}
export const validateEmail = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '') { callback(new Error('请输入邮箱')) } else if (!/^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/.test(value)) { callback(new Error('请输入正确的邮箱格式')) } else { callback() }
}
export const validatePassword = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '') { callback(new Error('请输入密码')) } else if (!/^.*(?=.{6,18})(?=.*\d)(?=.*[A-Za-z]).*$/.test(value)) { callback(new Error('密码必须6-18位字母及数字构成')) } else { passwordVal = value; callback() }
}
export const validatePasswordCheck = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '') { callback(new Error('请输入确认密码')) } else if (value === passwordVal) { callback() } else {
    callback(new Error('两次密码不相同'))
  }
}
export const validateCaptcha = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '') { callback(new Error('请输入图片验证码')) } else if (value.length !== 4) { callback(new Error('验证码格式有误')) } else { callback() }
}
