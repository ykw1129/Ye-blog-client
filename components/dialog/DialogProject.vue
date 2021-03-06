<template>
  <el-dialog title="发布项目" :visible="ProjectVisible" @close="dialogClose">
    <el-form ref="projectForm" :model="projectForm" status-icon :rules="projectRules">
      <el-form-item label="项目名称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="projectForm.name" autocomplete="off" placeholder="输入你的项目名称" />
      </el-form-item>
      <el-form-item label="项目描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="projectForm.description" autocomplete="off" placeholder="输入你的项目描述" />
      </el-form-item>
      <el-form-item label="项目封面" :label-width="formLabelWidth">
        <el-upload
          accept="image/jpeg, image/gif, image/png, image/jpg"
          class="uploader"
          action="/"
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-change="onUploadChange"
        >
          <el-image v-if="imageUrl" class="image" :src="imageUrl" fit="fill" />
          <i v-else class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="仓库/代码地址" :label-width="formLabelWidth" prop="linkUrl">
        <el-input v-model="projectForm.linkUrl" autocomplete="off" placeholder="输入你的仓库/代码地址" />
      </el-form-item>
      <el-form-item label="项目/部署地址" :label-width="formLabelWidth" prop="projectUrl">
        <el-input v-model="projectForm.projectUrl" autocomplete="off" placeholder="输入你的项目地址" />
      </el-form-item>
      <el-form-item label="项目状态" :label-width="formLabelWidth">
        <el-radio-group v-model="projectForm.status">
          <el-radio border label="1">
            已完成
          </el-radio>
          <el-radio border label="2">
            进行中
          </el-radio>
          <el-radio border label="3">
            已废弃
          </el-radio>
        </el-radio-group>
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
        <el-input
          v-if="imageCodeUrl"
          v-model="projectForm.captcha"
          placeholder="输入验证码"
          clearable
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogClose">
        取 消
      </el-button>
      <el-button type="primary" @click="postProject()">
        发布
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
import UploadMixin from '@/mixins/imageUpload'
import CaptchaMixin from '@/mixins/captcha'
import { Component, Prop, Mixins, Ref, Emit } from 'vue-property-decorator'
import { postProject } from '@/api/project'
import { upload } from '@/api/user'

@Component
export default class DialogProject extends Mixins(UploadMixin, CaptchaMixin) {
    @Prop({ type: Boolean }) private ProjectVisible:any
    @Ref('projectForm') readonly projectRef!:HTMLFormElement
    @Emit()dialogClose () { return false }//   dialog关闭前的回调

    // label的宽度
  formLabelWidth: string = '120px'

  // 项目表单
  projectForm = {
    name: '',
    description: '',
    linkUrl: '',
    projectUrl: '',
    coverImageId: '',
    captcha: '',
    status: '2'
  }

  // 项目表单验证
  projectRules = {
    name: [{ required: true, trigger: 'blur', message: '请填写项目标题' }, { max: 20, trigger: 'change', message: '标题最大为20个字符' }],
    linkUrl: [{ required: true, trigger: 'blur', message: '请填写仓库/代码地址' }, { pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/, trigger: 'change', message: '请输入正确的格式!' }],
    projectUrl: [{ required: true, trigger: 'blur', message: '请填写项目/部署地址' }, { pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/, trigger: 'change', message: '请输入正确的格式!' }],
    captcha: [{ required: true, trigger: 'blur', message: '图片验证码不能为空' }, { pattern: /^[A-Za-z0-9]{4}$/, trigger: 'blur', message: '请输入正确的图片验证码' }],
    description: [{ required: true, trigger: 'blur', message: '请填写项目描述' }, { max: 30, trigger: 'change', message: '描述最大为30个字符' }]
  };

  // 发送项目表单
  postProject () {
    const formData = new FormData()
    this.projectRef.validate(async (valid: boolean) => {
      if (valid) {
        if (this.imageFile) {
          formData.append('file', this.imageFile, `${Date.now()}..${this.imageType}`)
          formData.append('name', this.projectForm.name)
          formData.append('type', 'project')
          const res = await upload({ $axios: this.$axios, param: formData })
          this.projectForm.coverImageId = res.data._id
        }
        const res = await postProject({
          $axios: this.$axios,
          param:
          {
            name: this.projectForm.name,
            description: this.projectForm.description,
            coverImageId: this.projectForm.coverImageId,
            captcha: this.projectForm.captcha,
            linkUrl: this.projectForm.linkUrl,
            status: this.projectForm.status,
            projectUrl: this.projectForm.projectUrl
          }
        })
        if (res.code === 200) {
          const info = await this.$auth.fetchUser()
          if ((info as any).code === 200) {
            this.projectRef.resetFields()
            this.dialogClose()
            location.reload()
          }
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
.uploader {
  width: 400px;
  height: 200px;
  display: inline-block;
  border-radius: 6px;
  overflow: hidden;
  line-height: 200px;
  text-align: center;
  cursor: pointer;
  border: 1px dashed #8c939d;
  &:hover {
    border-color: #409eff;
  }
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
</style>
