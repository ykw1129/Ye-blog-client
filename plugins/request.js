import { Message, MessageBox } from 'element-ui'
export default function ({ $axios, app }, inject) {
  inject('message', Message)
  inject('msgbox', MessageBox)
  $axios.onRequest((config) => {
  })
  $axios.onResponse(({ config, data }) => {
    // 响应的业务码处理
    switch (data.code) {
      case 200:
        if (config.method !== 'get') { Message({ type: 'success', message: data.msg }) }
        break
      case 422:
        Message({ type: 'error', message: data.msg || data.error })
        break
      default:
        Message({ type: 'warning', message: data.msg || data.error })
        break
    }
    return data
  })
}
