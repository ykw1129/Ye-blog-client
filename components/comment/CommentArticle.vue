<template>
  <div class="comment">
    <div class="input">
      <el-avatar
        v-if="auth.loggedIn"
        icon="el-icon-user-solid"
        size="large"
        shape="circle"
        :src="auth.user.avatarId.url"
        fit="fill"
      />
      <el-avatar v-else icon="el-icon-user-solid" size="large" shape="circle" fit="fill" />
      <el-form ref="commentForm" :model="commentForm" :rules="rules" size="normal">
        <el-form-item prop="content">
          <el-input
            v-model="commentForm.content"
            :disabled="!auth.loggedIn"
            :placeholder="auth.loggedIn?'请输入你的评论':'请先登录'"
            size="normal"
            clearable
          />
          <el-button
            style="display:inline-block"
            plain
            type="primary"
            size="default"
            :disabled="!auth.loggedIn"
            @click="submitComment()"
          >
            评论
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="comment-list">
      <ul ref="ulRef">
        <li v-for="(comment,index) in commentList" :key="index">
          <div class="avatar">
            <el-avatar
              icon="el-icon-user-solid"
              :src="comment.createUser.avatarId.url"
              size="large"
              shape="circle"
              fit="fill"
            />
          </div>
          <div class="info">
            <p class="name">
              {{ comment.createUser.username }}
            </p>
            <p class="content">
              {{ comment.content }}
            </p>
            <div class="bottom">
              <span class="time">{{ comment.createTime |fromNow }}</span>
              <span class="reply">
                <el-button
                  v-if="auth.loggedIn"
                  type="success"
                  size="mini"
                  @click="showReplyInput(index)"
                >回复</el-button>
              </span>
            </div>
            <div class="reply-input">
              <Reply-Comment
                :to-user-id="comment.createUser._id"
                :comment-id="comment._id"
                :article-id="comment.articleId"
                @run-fetch="fetch"
              />
            </div>
            <div class="reply-list">
              <Reply-List :reply-list="comment.replyCommentList" />
            </div>
            <el-badge
              v-if="comment.replyCommentNum!==0"
              :value="comment.replyCommentNum"
              class="item"
            >
              <el-button class="reply-btn" size="small" @click="showReplyList(index)">
                展开回复
              </el-button>
            </el-badge>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { postComment, getComment } from '@/api/comment'
import ReplyComment from '~/components/comment/ReplyComment.vue'
import ReplyList from '~/components/comment/ReplyList.vue'
@Component({
  components: {
    ReplyComment,
    ReplyList
  },
  directives: {

  }
})
export default class ComponentName extends Vue {
  replyShow: boolean = false
  commentList: [] = []
  @Prop({ required: true, type: String }) private articleId: any
  @Ref('commentForm') readonly commentRef!:HTMLFormElement
  @Ref('ulRef') readonly ulRef!:HTMLUListElement
  async fetch () {
    const res = await getComment({ $axios: this.$axios, param: { id: this.articleId } })
    this.commentList = res.data
  }

  @State auth: any
  commentForm = {
    id: '',
    content: '',
    createUser: ''
  }

  rules = {
    content: [{ required: true, trigger: 'blur', message: '请填写您的评论' }, { max: 30, trigger: 'change', message: '评论超出字数' }]
  }

  created () {
    this.commentForm.id = this.articleId
    this.commentForm.createUser = this.auth.loggedIn && this.auth.user._id
    this.fetch()
  }

  showReplyInput (index: number) {
    const inputArr = this.ulRef.getElementsByClassName('reply-input')
    Array.from(inputArr).forEach((element: any) => {
      if (element.classList.contains('show')) {
        element.classList.remove('show')
      }
    })
    inputArr[index].classList.add('show')
  }

  showReplyList (index: number) {
    const replyArr = this.ulRef.getElementsByClassName('reply-list')
    if (replyArr[index].classList.contains('show')) {
      replyArr[index].classList.remove('show')
      replyArr[index].nextElementSibling!.getElementsByTagName('span')[0].innerHTML = '展开回复'
    } else {
      replyArr[index].classList.add('show')
      replyArr[index].nextElementSibling!.getElementsByTagName('span')[0].innerHTML = '收起回复'
    }
  }

  submitComment () {
    this.commentRef.validate(async (valid: boolean) => {
      if (valid) {
        const res = await postComment({ $axios: this.$axios, param: this.commentForm })
        if (res.code === 200) {
          this.commentForm.content = ''
          this.fetch()
        }
      }
    })
  }
}
</script>

<style scoped lang="scss">
.comment {
  .input {
    display: flex;
    padding: 0 10px;
    margin-bottom: 20px;
    .el-avatar {
      margin-right: 10px;
    }
    .el-input {
      width: 645px;
      margin-right: 10px;
    }
  }
  .comment-list {
    padding: 0 10px;
    ul {
      li {
        margin-bottom: 20px;
        display: flex;
        .avatar {
          margin-right: 10px;
        }
        .info {
          width: 100%;
          .name {
            color: #606266;
            font-size: 14px;
            margin-bottom: 10px;
          }
          .content {
            margin-bottom: 5px;
            color: #303133;
            font-size: 15px;
          }
          .bottom {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            margin-bottom: 10px;
            .time {
              font-size: 12px;
              color: #909399;
            }
            .reply {
              font-size: 14px;
              color: #303133;
            }
          }
          .reply-input {
            display: none;
            &.show {
              display: block;
            }
          }
          .reply-list {
            display: none;
            &.show {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
