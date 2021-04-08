<template>
  <div id="links">
    <el-form
      ref="linkForm"
      :model="linkForm"
      :rules="linkRules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="github" prop="link">
        <el-input v-model="linkForm.github" />
      </el-form-item>
      <el-form-item label="知乎" prop="link">
        <el-input v-model="linkForm.zhihu" />
      </el-form-item>
      <el-form-item label="微博" prop="link">
        <el-input v-model="linkForm.weibo" />
      </el-form-item>
      <el-form-item label="哔哩哔哩" prop="link">
        <el-input v-model="linkForm.bilibili" />
      </el-form-item>
      <el-form-item label="QQ" prop="link">
        <el-input v-model="linkForm.qq" placeholder="输入您的QQ号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:600px" @click="linkOnSubmit">
          立即更新
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { putUserLinks } from '@/api/user'

@Component({
  head: {
    title: 'Ye博客-用户链接管理'
  },
  layout: 'user'
})
export default class Links extends Vue {
  @State auth: any
  @Ref('linkForm') readonly linkRef!: HTMLFormElement

  linkForm = {
    id: '',
    zhihu: '',
    weibo: '',
    github: '',
    bilibili: '',
    qq: ''
  }

  linkRules = {
    link: [{ pattern: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/, trigger: 'change', message: '请输入正确的格式!' }],
    qq: [{ max: 15, trigger: 'change', message: '请输入正确的QQ号!' }]
  }

  linkOnSubmit () {
    this.linkRef.validate(async (valid: boolean) => {
      if (valid) {
        const res = await putUserLinks({
          $axios: this.$axios,
          param: this.linkForm
        })
        if (res.code === 200) {
          this.$router.push('/articles')
        }
      }
    })
  }

  mounted () {
    this.linkForm.id = this.auth.user._id
    if (this.auth.user.meta.zhihu) { this.linkForm.zhihu = this.auth.user.meta.zhihu }
    if (this.auth.user.meta.weibo) { this.linkForm.weibo = this.auth.user.meta.weibo }
    if (this.auth.user.meta.github) { this.linkForm.github = this.auth.user.meta.github }
    if (this.auth.user.meta.bilibili) { this.linkForm.bilibili = this.auth.user.meta.bilibili }
  }
}
</script>

<style scoped lang="scss">
#links {
  padding: 20px 100px 20px 80px;
  .el-form {
    .el-input {
      width: 600px;
    }
  }
}
</style>
