import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CaptchaMixin extends Vue {
    captchaTip: string = '点击获取图片验证码'
    imageCodeUrl: string = ''
    getCaptcha () {
      this.imageCodeUrl = `https://lcoalhost:7001/captcha?timestamp=${Date.now()}`
    }

    cancel () {
      console.log('你取消了')
    }
}
