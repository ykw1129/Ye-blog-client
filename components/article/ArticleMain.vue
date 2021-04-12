<template>
  <main>
    <h1>{{ content.title }}</h1>
    <div class="creater-info">
      <div class="main">
        <div class="avatar">
          <img :src="content.createUser.avatarId.url" :alt="content.createUser.avatarId.name">
        </div>
        <div class="info">
          <p>{{ content.createUser.username }}</p>
          <div class="user-description">
            {{ content.createUser.description }}
          </div>
        </div>
      </div>
      <div class="other">
        <p>发表时间:{{ content.createTime|fromNow }}</p>
        <div class="other-icon">
          <span>
            <i class="el-icon-view" />
            {{ content.meta.viewTotal }}
          </span>
          <span>
            <i class="el-icon-chat-dot-square" />
            {{ content.meta.commentTotal }}
          </span>
        </div>
      </div>
    </div>
    <div class="description">
      <i>{{ content.description }}</i>
    </div>
    <div class="cover">
      <img :src="content.coverId.url" :alt="content.coverId.name">
    </div>
    <client-only>
      <div v-if="content.contentType==='0'" v-dompurify-html="content.content" class="content" />
      <mavon-editor
        v-else
        ref="md"
        :value="content.content"
        default-open="preview"
        :ishljs="true"
        :toolbars-flag="false"
        :editable="false"
        :subfield="false"
        box-shadow-style="none"
        preview-background="#fff"
      />
    </client-only>
    <Comment-Article :article-id="content._id" />
  </main>
</template>

<script lang='ts'>
import CommentArticle from '@/components/comment/CommentArticle.vue'
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import 'mavon-editor/dist/css/index.css'
@Component({
  components: {
    CommentArticle
  }
})
export default class MainArticle extends Vue {
  @Ref('md') readonly mdRef:any
  @Prop({ type: Object, required: true }) private content: any
}
</script>

<style scoped lang="scss">
main {
  float: left;
  width: 820px;
  background-color: #fff;
  padding: 10px;
  box-sizing: border-box;
  & > h1 {
    text-align: center;
    font-size: 30px;
    margin-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
  }
  .creater-info {
    padding: 5px 30px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.1);
    .main {
      .avatar {
        display: inline-block;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        overflow: hidden;
        vertical-align: middle;
        border: 1px solid rgba($color: #000000, $alpha: 0.1);
        img {
          width: 100%;
          height: 100%;
        }
      }
      .info {
        margin-left: 5px;
        flex-flow: column;
        justify-content: space-around;
        height: 100%;
        vertical-align: middle;
        display: inline-flex;
        p {
          font-size: 14px;
          color: #303133;
        }
        .user-description {
          font-style: italic;
          font-size: 12px;
          color: #606266;
        }
      }
    }

    .other {
      width: 120px;
      flex-flow: column;
      justify-content: space-around;
      height: 100%;

      vertical-align: middle;
      display: inline-flex;
      p {
        font-size: 12px;
        color: #303133;
      }
      .other-icon {
        font-size: 14px;
        color: #606266;
        display: flex;
        justify-content: space-between;
        span {
          i {
            margin-right: 5px;
          }
        }
      }
    }
  }
  .description{
    padding: 8px 25px;
    font-style: italic;
  }
  .cover {
    padding: 8px 25px 15px 25px;
    img {
      width: 100%;
      max-height: 400px;
    }
  }
  .content {
    padding: 10px 30px;
  }
}
</style>
