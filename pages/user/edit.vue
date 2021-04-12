<template>
  <div id="edit">
    <el-form ref="editForm" :model="editForm" status-icon :rules="editRules">
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="editForm.email" type="email" autocomplete="off" disabled style="width:300px" />
      </el-form-item>
      <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
        <el-input v-model="editForm.username" autocomplete="off" placeholder="输入你的项目描述" />
      </el-form-item>
      <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="editForm.phone" type="phone" autocomplete="off" placeholder="输入你的手机号码" />
      </el-form-item>
      <el-form-item label="签名" :label-width="formLabelWidth" prop="phone">
        <el-input
          v-model="editForm.description"
          type="textarea"
          autocomplete="off"
          placeholder="输入你的个人签名"
        />
      </el-form-item>
      <el-form-item label="头像" :label-width="formLabelWidth">
        <el-upload
          accept="image/jpeg, image/gif, image/png, image/jpg"
          class="uploader"
          action="/"
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-change="onUploadChange"
        >
          <el-image v-if="imageUrl" class="avatar-uploader" :src="imageUrl" fit="cover" />
          <i v-else class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" class="imagecode" prop="captcha">
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
        <el-input v-if="imageCodeUrl" v-model="editForm.captcha" placeholder="输入验证码" clearable />
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
        <el-button type="primary" size="default" @click="submitForm()">
          修改信息
        </el-button>
        <el-button type="info" size="default">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Mixins, Ref } from 'vue-property-decorator'
import { upload, putUserInfo } from '@/api/user'
import { State } from 'vuex-class'
import CaptchaMixin from '~/mixins/captcha'
import UploadMixin from '~/mixins/imageUpload'

@Component({
  head: {
    title: 'Ye博客-用户资料管理'
  },
  layout: 'user'
})
export default class Edit extends Mixins(CaptchaMixin, UploadMixin) {
  @State auth: any
  @Ref('editForm') readonly editRef!:HTMLFormElement
  formLabelWidth: string = '80px'
  editForm = {
    username: '',
    phone: '',
    email: '',
    description: '',
    captcha: '',
    avatarId: ''
  }

  submitForm () {
    const avatarData = new FormData()
    this.editRef.validate(async (valid: boolean) => {
      if (valid) {
        if (this.imageFile) {
          avatarData.append('file', this.imageFile, `${Date.now()}.jpg`)
          avatarData.append('name', this.editForm.username)
          avatarData.append('type', 'avatar')
          const res = await upload({ $axios: this.$axios, param: avatarData })
          this.editForm.avatarId = res.data._id
        }
        console.log(this.editForm)
        const res = await putUserInfo({
          $axios: this.$axios,
          param:
          {
            username: this.editForm.username,
            phone: this.editForm.phone,
            email: this.editForm.email,
            description: this.editForm.description,
            avatarId: this.editForm.avatarId,
            captcha: this.editForm.captcha
          }
        })
        if (res.code === 200) {
          const res = await this.$auth.fetchUser()
          this.getCaptcha()
          this.editForm.captcha = ''
        } else {
          this.getCaptcha()
          this.editForm.captcha = ''
        }
      }
    })
  }

  created () {
    this.editForm.email = this.auth.user.email
    this.editForm.username = this.auth.user.username
    this.editForm.phone = this.auth.user.phone
    this.editForm.description = this.auth.user.description
    this.imageUrl = this.auth.user.avatarId.url
  }

  editRules = {
    username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }, { type: 'string', max: 12, trigger: 'change', message: '用户名不超过12个字符' }],
    phone: [{ pattern: /^1[34578]\d{9}$/, trigger: 'blur', message: '手机号码格式错误' }],
    captcha: [{ required: true, trigger: 'blur', message: '图片验证码不能为空' }, { pattern: /^[A-Za-z0-9]{4}$/, trigger: 'blur', message: '请输入正确的图片验证码' }],
    description: [{ required: true, trigger: 'blur', message: '个人简介不能为空' }, { type: 'string', max: 50, trigger: 'change', message: '个人简介不超过50个字符' }]
  };
}
</script>

<style scoped lang="scss">
#edit {
  padding: 20px 100px 20px 80px;
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
        width: 300px;
        position: absolute;
        right: 0;
      }
    }
  }
  .uploader {
    width: 200px;
    height: 200px;
    display: inline-block;
    border-radius: 6px;
    line-height: 200px;
    cursor: pointer;
    text-align: center;
    overflow: hidden;
    border: 1px dashed #8c939d;
    &:hover {
      border-color: #409eff;
    }
    .avatar-uploader {
      width: 200px;
      height: 200px;
    }
  }
}
</style>
