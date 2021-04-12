<template>
  <div id="register">
    <el-form
      ref="registerForm"
      :model="registerForm"
      status-icon
      :rules="rules"
      class="demo-registerForm"
    >
      <el-form-item label="用户名" prop="username" :label-width="labelWidth">
        <el-input v-model="registerForm.username" placeholder="输入您的用户名" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="labelWidth">
        <el-input
          v-model="registerForm.email"
          placeholder="输入您的邮箱"
          type="email"
          autocomplete="on"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码" prop="password" :label-width="labelWidth">
        <el-input
          v-model="registerForm.password"
          placeholder="输入密码"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordcheck" :label-width="labelWidth">
        <el-input
          v-model="registerForm.passwordcheck"
          placeholder="确认密码"
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
        <el-input v-if="imageCodeUrl" v-model="registerForm.captcha" placeholder="输入验证码" clearable />
      </el-form-item>
      <el-form-item>
        <el-button
          style="display:block;width:100%"
          type="primary"
          size="default"
          @click="submitRegisterForm()"
        >
          注册
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="display:block;width:100%" size="default" @click="routerToLogin">
          已有账号,前往登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Ref } from 'vue-property-decorator'
import CaptchaMixin from '~/mixins/captcha'
import { postUserRegister } from '~/api/login'

@Component({
  head: {
    title: 'Ye博客-用户注册'
  },
  auth: false,
  layout: 'auth'
})
export default class Register extends Mixins(CaptchaMixin) {
  @Ref('registerForm') readonly registerRef!: HTMLFormElement
  labelWidth: string = '80px'
  registerForm = {
    username: '',
    email: '',
    password: '',
    passwordcheck: '',
    captcha: ''
  };

  validatePasswordCheck (rule: any, value: string, callback: Function) {
    if (value === '') { callback(new Error('请输入确认密码')) } else if (value === this.registerForm.password) { callback() } else {
      callback(new Error('两次密码不相同'))
    }
  }

  rules = {
    username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }, { type: 'string', max: 12, trigger: 'blur', message: '用户名不超过12个字符' }],
    email: [{ required: true, trigger: 'blur', message: '邮箱不能为空' }, { pattern: /^([a-zA-Z\d])(\w|\-)+@[a-zA-Z\d]+\.[a-zA-Z]{2,4}$/, trigger: 'blur', message: '邮箱格式错误' }],
    password: [{ required: true, trigger: 'blur', message: '密码不能为空' }, { pattern: /^.*(?=.{6,18})(?=.*\d)(?=.*[A-Za-z]).*$/, trigger: 'blur', message: '密码长度不得超过15个字符' }],
    passwordcheck: [{ validator: this.validatePasswordCheck, trigger: 'blur' }],
    captcha: [{ required: true, trigger: 'blur', message: '图片验证码不能为空' }, { pattern: /^[A-Za-z0-9]{4}$/, trigger: 'blur', message: '请输入正确的图片验证码' }]
  };

  routerToLogin () {
    this.$router.push('/login')
  }

  submitRegisterForm () {
    this.registerRef.validate(async (valid: boolean) => {
      if (valid) {
        const res = await postUserRegister({
          $axios: this.$axios,
          param:
          {
            username: this.registerForm.username,
            email: this.registerForm.email,
            password: this.registerForm.password,
            captcha: this.registerForm.captcha
          }
        })
        if (res.code === 200) { this.$router.push('/login') } else {
          this.getCaptcha()
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
#register {
  margin: auto;
  width: 500px;
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
