<template>
  <main id="login">
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" placeholder="输入您的用户名" clearable />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="ruleForm.email"
          placeholder="输入您的邮箱"
          type="email"
          autocomplete="on"
          clearable
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="ruleForm.password"
          placeholder="输入密码"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="再次输入密码" prop="passwordCheck">
        <el-input
          v-model="ruleForm.passwordcheck"
          placeholder="再次输入密码"
          type="password"
          show-password
          clearable
        />
      </el-form-item>
      <el-form-item label="图片验证码" class="imagecode" prop="captcha">
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
        <el-input
          v-if="imageCodeUrl"
          v-model="ruleForm.captcha"
          placeholder="输入验证码"
          clearable
        />
      </el-form-item>
      <el-form-item>
        <el-button style="display:block;width:100%" type="primary" size="default" @click="submitRegisterForm('ruleForm')">
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </main>
</template>

<script lang='ts'>
import { Component, Mixins } from 'vue-property-decorator'
import UserLoginMixin from '@/mixins/register'
import { validateUsername, validateEmail, validatePassword, validatePasswordCheck, validateCaptcha } from '@/validate/register'
import { postUserRegister } from '~/api/login'
@Component({})
export default class login extends Mixins(UserLoginMixin) {
  ruleForm = {
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
    passwordCheck: [{ validator: validatePasswordCheck, trigger: 'blur' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
  };

  async submitRegisterForm () {
    const res = await postUserRegister({
      $axios: this.$axios,
      param:
    {
      username: this.ruleForm.username,
      email: this.ruleForm.email,
      password: this.ruleForm.password,
      captcha: this.ruleForm.captcha
    }
    })
    console.log(res)
  }
}
</script>

<style scoped lang="scss">
#login {
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
        .el-input{
          width:180px;
          position: absolute;
          right: 0;
        }
      }
    }
  }
}
</style>
