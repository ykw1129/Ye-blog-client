import { Message } from 'element-ui'
export default function ({ $axios, app }, inject) {
  inject('message', Message)
  $axios.onRequest((config) => {
  })
  $axios.onResponse(({ config, data }) => {
    /*     if (config.url !== '/') {
      if (data.Status) {
        app.$message.success(data.Message)
      } else {
        app.$message.error(data.Message)
      }
    } */
    switch (data.code) {
      case 200:
        Message({ type: 'success', message: data.msg })
        break
      case 422:
        Message({ type: 'error', message: '账号格式错误' })
        break
      default:
        Message({ type: 'warning', message: data.msg })
        break
    }
    return data
  })

  $axios.onError((error) => {
    console.log(error)
  })
}
