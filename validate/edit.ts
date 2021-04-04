export const validateUsername = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '' || value.length === 0) { callback(new Error('请输入用户名')) } else if (value.length > 12) { callback(new Error('用户名过长!')) } else { callback() }
}
export const validateCaptcha = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value === '') { callback(new Error('请输入图片验证码')) } else if (value.length !== 4) { callback(new Error('验证码格式有误')) } else { callback() }
}
export const validateDescription = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (value.length > 50) { callback(new Error('文字长度超出范围!')) } else { callback() }
}
export const validatePhone = (
  rule: any,
  value: string,
  callback: Function
) => {
  if (!(/^1[34578]\d{9}$/.test(value))) { callback(new Error('请输入正确格式的手机号码!')) } else { callback() }
}
