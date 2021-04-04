<template>
  <div class="reply">
    <div class="input">
      <el-avatar
        v-if="auth.loggedIn"
        icon="el-icon-user-solid"
        size="large"
        shape="circle"
        :src="auth.user.avatarId.url"
        fit="fill"
      />
      <el-avatar
        v-else
        icon="el-icon-user-solid"
        size="large"
        shape="circle"
        fit="fill"
      />
      <el-form ref="form" style="display:inline-block;vertical-align: middle;" :model="replyForm" :rules="rules" size="normal">
        <el-form-item prop="content">
          <el-input
            v-model="replyForm.content"
            :disabled="!auth.loggedIn"
            :placeholder="auth.loggedIn?'请输入你的回复':'请先登录'"
            size="normal"
            clearable
          />
          <el-button
            style="display:inline-block;"
            plain
            :disabled="!auth.loggedIn"
            type="primary"
            size="default"
            @click="submitComment()"
          >
            回复
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Emit, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { postReplyComment } from '@/api/comment'
@Component
export default class ReplyComment extends Vue {
    @State auth:any;
    // state中的用户信息
    @Ref('form') readonly formRef!:HTMLFormElement
    // 表单DOM
    @Prop({ type: String }) articleId!:string
    // 文章ID
    @Prop({ type: String }) commentId!:string
    // 所要回复的评论ID
    @Prop({ type: String }) toUserId!:string
    // 被回复的用户ID
    @Emit()
    runFetch () {
      // 此方法的作用是触发父组件的fetch方法
    }

      replyForm = {
        // 回复的post表单
        articleId: '',
        content: '',
        commentId: '',
        userId: '',
        toUserId: ''
      }

  // 回复的rules
  rules = {
    content: [{ required: true, trigger: 'blur', message: '请填写您的评论' }, { max: 30, trigger: 'change', message: '评论超出字数' }]
  }

  created () {
    this.replyForm.commentId = this.commentId
    this.replyForm.toUserId = this.toUserId
    this.replyForm.articleId = this.articleId
    this.replyForm.userId = this.auth.loggedIn && this.auth.user._id
  }

  // 提交回复
  submitComment () {
    this.formRef.validate(async (valid: boolean) => {
      if (valid) {
        const res = await postReplyComment({ $axios: this.$axios, param: this.replyForm })
        if (res.code === 200) {
          this.runFetch()
          this.replyForm.content = ''
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
.reply{
     .input {
    display: flex;
    padding: 0 10px;
    margin-bottom: 5px;
    .el-avatar {
      margin-right: 10px;
    }
    .el-input {
      width: 500px;
      margin-right: 10px;
    }
  }

}
</style>
