<template>
  <div id="register">
    <el-form
      ref="registerForm"
      :model="registerForm"
      status-icon
      :rules="rules"
      label-width="80px"
      class="demo-registerForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="registerForm.username" placeholder="输入您的用户名" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="registerForm.email"
          placeholder="输入您的邮箱"
          type="email"
          autocomplete="on"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerForm.password"
          placeholder="输入密码"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwordcheck">
        <el-input
          v-model="registerForm.passwordcheck"
          placeholder="确认密码"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="验证码" class="imagecode" prop="captcha">
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
import { validateUsername, validateEmail, validatePassword, validatePasswordCheck, validateCaptcha } from '@/validate/register'
import CaptchaMixin from '~/mixins/captcha'
import { postUserRegister } from '~/api/login'
@Component({
  auth: false,
  layout: 'auth'
})
export default class Register extends Mixins(CaptchaMixin) {
  @Ref('registerForm') readonly registerRef!:HTMLFormElement
  registerForm = {
    username: '',
    email: '',
    password: '',
    passwordcheck: '',
    captcha: ''
  };

  rules = {
    username: [{ validator: validateUsername, trigger: 'blur' }],
    email: [{ validator: validateEmail, trigger: 'blur' }],
    password: [{ validator: validatePassword, trigger: 'blur' }],
    passwordcheck: [{ validator: validatePasswordCheck, trigger: 'blur' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
  };

  routerToLogin () {
    this.$router.push('/login')
  }

  submitRegisterForm () {
    this.registerRef.validate(async (valid:boolean) => {
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 62px);
  form {
    width: 500px;
    height: 500px;
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
