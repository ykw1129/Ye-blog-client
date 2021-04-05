<template>
  <div id="project">
    <ul>
      <li v-for="item in data" :key="item._id">
        <div class="img">
          <img :src="item.coverImageId.url" :alt="item.coverImageId.name">
        </div>
        <div class="txt">
          <h4>
            <p class="title">
              {{ item.name }}
            </p>
            <div class="creator">
              <div class="avatar">
                <el-avatar
                  icon="el-icon-user-solid"
                  size="medium"
                  shape="circle"
                  :src="item.createUser.avatarId.url"
                  fit="fill"
                />
              </div>
              <div class="username">
                {{ item.createUser.username }}
              </div>
            </div>
          </h4>
          <div class="description">
            {{ item.description }}
          </div>
          <div class="project-url">
            代码地址/仓库:
            <a :href="item.linkUrl" target="_blank">
              {{ item.linkUrl }}
            </a>
          </div>
          <div class="project-url">
            部署地址:
            <a :href="item.projectUrl" target="_blank">
              {{ item.projectUrl }}
            </a>
          </div>
          <div class="info">
            <span class="time">{{ item.startTime }}-{{ item.endTime||'至今' }}</span>
            <div class="status">
              {{ statusArr[item.status-1] }}
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { getAllProject } from '@/api/project'
@Component({

  auth: false,
  async asyncData ({ $axios }) {
    const res = await getAllProject({ $axios })
    return {
      data: res.data
    }
  }
})
export default class project extends Vue {
  statusArr: string[] = ['已完成', '进行中', '已废弃']
}
</script>

<style scoped lang="scss">
#project {
  ul {
    li {
      float: left;
      width: 380px;
      margin-bottom: 20px;
      .img {
        img {
          width: 100%;
          height: 220px;
        }
      }
      .txt {
        height: 240px;
        padding: 4px 8px;
        box-shadow: 1px 2px 3px 0px rgba($color: #000000, $alpha: 0.1);
        h4 {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
          .title {
            max-width: 250px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 25px;
            color: #303133;
          }
          .creator {
            font-size: 14px;
            color: #909399;
            .avatar {
              text-align: center;
            }
            .username {
              max-width: 60px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .description {
          margin-bottom: 20px;
          line-height: 1.2;
          height: 60px;
          width: 364px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          color: rgba(0, 0, 0, 0.45);
        }
        .project-url {
          margin-bottom: 10px;
          font-size: 14px;
          a {
            display: block;
            color: #909399;
            overflow: hidden;
            text-overflow: ellipsis;

            white-space: nowrap;
            &:hover {
              color: #e6a23c;
            }
          }
        }
        .info {
          justify-content: space-between;
          display: flex;
          color: #909399;
          .time {
            font-size: 16px;
          }
          .status {
            font-size: 16px;
          }
        }
      }

      &:nth-child(odd) {
        margin-right: 40px;
      }
    }
  }
}
</style>
