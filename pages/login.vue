<template>
  <div id="login">
    <el-form
      ref="loginForm"
      :model="loginForm"
      status-icon
      :rules="rules"
      class="demo-loginForm"
    >
      <el-form-item label="邮箱" prop="email" :label-width="labelWidth">
        <el-input v-model="loginForm.email" placeholder="邮箱" autocomplete="on" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="labelWidth">
        <el-input
          v-model="loginForm.password"
          placeholder="输入密码"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="验证码" class="imagecode" prop="captcha" :label-width="labelWidth">
        <div class="img">
          <img v-if="imageCodeUrl" :src="imageCodeUrl" alt="图片验证码" @click="getCaptcha">
        </div>
        <el-button
          v-if="!imageCodeUrl"
          type="primary"
          size="default"
          @click="getCaptcha"
        >
          {{ captchaTip }}
        </el-button>
        <el-input v-if="imageCodeUrl" v-model="loginForm.captcha" placeholder="输入验证码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          style="display:block;width:100%"
          type="primary"
          size="default"
          @click="submitLoginForm()"
        >
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          style="display:block;width:100%"
          size="default"
          @clikc="routerToRegister"
        >
          没有账号,前往注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Ref } from 'vue-property-decorator'
import CaptchaMixin from '@/mixins/captcha'
@Component({
  layout: 'auth'
})
export default class login extends Mixins(CaptchaMixin) {
  @Ref('loginForm') readonly loginRef!: HTMLFormElement
  labelWidth: string = '60px'
  loginForm = {
    email: '',
    password: '',
    captcha: ''
  };

  rules = {
    email: [{ required: true, trigger: 'blur', message: '邮箱不能为空' }, { pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, trigger: 'blur', message: '邮箱格式错误' }],
    password: [{ required: true, trigger: 'blur', message: '密码不能为空' }, { pattern: /^.*(?=.{6,18})(?=.*\d)(?=.*[A-Za-z]).*$/, trigger: 'blur', message: '密码长度不得超过15个字符' }],
    captcha: [{ required: true, trigger: 'blur', message: '图片验证码不能为空' }, { pattern: /^[A-Za-z0-9]{4}$/, trigger: 'change', message: '请输入正确的图片验证码' }]
  };

  routerToRegister () {
    this.$router.push('/register')
  }

  created () {
    if (this.$auth.loggedIn) { this.$router.push('/') }
  }

  submitLoginForm () {
    this.loginRef.validate(async (valid: boolean) => {
      if (valid) {
        const res = await this.$auth.loginWith('local', { data: this.loginForm })
        if ((res as any).code === 200) { console.log(res) } else {
          this.getCaptcha()
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
#login {
  form {
    width: 500px;
    margin: auto;
    .el-input__inner {
      height: 42px;
      line-height: 42px;
    }

    .imagecode {
      .img {
        vertical-align: top;
        display: inline-block;
      }
      .el-form-item__content {
        position: relative;
        .el-button {
          position: absolute;
          right: 0;
        }
        .el-input {
          width: 180px;
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
