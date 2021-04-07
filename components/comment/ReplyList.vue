<template>
  <div class="reply-comment-list">
    <ul>
      <li v-for="reply in replyList" :key="reply._id">
        <div class="avatar">
          <el-avatar
            icon="el-icon-user-solid"
            :src="reply.replyUser.avatarId.url"
            size="large"
            shape="circle"
            fit="fill"
          />
        </div>
        <div class="info">
          <p class="name">
            {{ reply.replyUser.username }}
          </p>
          <p class="content">
            {{ reply.content }}
          </p>
          <div class="bottom">
            <span class="time">{{ reply.createTime |fromNow }}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ReplyList extends Vue {
  @Prop({ type: Array }) replyList: any
}
</script>

<style scoped lang="scss">
.reply-comment-list {
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
          color: #303133;
          font-size: 15px;
          margin-bottom: 10px;
        }
        .bottom {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          .time {
            font-size: 12px;
            color: #909399;
          }
          .reply {
            font-size: 14px;
            color: #303133;
          }
        }
      }
    }
  }
}
</style>
