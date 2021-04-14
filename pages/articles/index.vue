<template>
  <div id="article">
    <ul>
      <li v-for="article in articles" :key="article._id">
        <nuxt-link :to="`/articles/${article._id}`">
          <div class="cover">
            <el-image :src="article.coverId.url" fit="cover" :lazy="true" :alt="article.title" />
          </div>
          <div class="other">
            <h4>{{ article.title }}</h4>
            <p class="description">
              简介:{{ article.description }}
            </p>
            <div class="tags">
              <el-tag
                v-for="(tag,index) in article.tags"
                :key="index"
                :color="tag.bgColor"
                size="normal"
                effect="dark"
                @click="handleTagClick(tag._id)"
              >
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-biaoqian" />
                </svg>
                {{ tag.name }}
              </el-tag>
            </div>
            <div class="info">
              <div class="creator">
                <span>
                  <i class="el-icon-user" />
                  {{ article.createUser.username }}
                </span>
              </div>
              <div class="createtime">
                <span>
                  <i class="el-icon-edit" />
                  {{ article.createTime|lll }}
                </span>
              </div>
              <div class="icons">
                <span>
                  <i class="el-icon-view" />
                  {{ article.meta.viewTotal }}
                </span>
                <span>
                  <i class="el-icon-chat-dot-square" />
                  {{ article.meta.commentTotal }}
                </span>
              </div>
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
    <div class="papagination">
      <el-pagination
        background
        :page-size="6"
        :pager-count="11"
        layout="prev, pager, next"
        :total="total"
        @current-change="currentChange"
      />
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { getAllArticle } from '@/api/article'

@Component({
  head: {
    title: 'Ye博客-文章'
  },
  watchQuery: ['page'],
  auth: false,
  async asyncData ({ $axios, query }) {
    const res = await getAllArticle({ $axios, param: { page: query.page } })
    return {
      articles: res.data.articles,
      total: res.data.total
    }
  }
})
export default class Articles extends Vue {
  pageCurrent: number = 1
  currentChange (current: string) {
    this.$router.push({ path: 'articles', query: { page: current } })
  }

  handleTagClick (id:string) {
    this.$router.push(`/tag/${id}`)
  }
}
</script>

<style scoped lang="scss">
#article {
  ul {
    height:1320px;
    li {
      background-color: #fff;
      margin-bottom: 20px;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      transition: all 0.3s;
      &:hover {
        transition: all 0.3s;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      & > a {
        display: block;
        color: #303133;
        box-sizing: border-box;
        height: 200px;
        &::after {
          content: "";
          clear: both;
        }
        .cover {
          height: 100%;
          float: left;
          width: 300px;
          box-sizing: border-box;
          padding: 5px;
          .el-image{
            height: 190px;
          }
        }
        .other {
          height: 100%;
          width: 500px;
          box-sizing: border-box;
          padding: 5px 10px;
          float: left;
          h4 {
            font-size: 20px;
            line-height: 1.5;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 10px;
          }
          .description {
            color: #909399;
            line-height: 1.5;
            height: 70px;
            font-size: 14px;
            margin-bottom: 10px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
          }
          .tags {
            margin-bottom: 10px;
            height: 32px;
            .el-tag {
              margin-right: 10px;
            }
          }
          .info {
            color: #606266;
            display: flex;
            font-size: 13px;
            height: 25px;
            align-items: flex-end;
            justify-content: space-between;
            .creator {
              span {
                i {
                  padding-right: 5px;
                }
              }
            }
            .createtime {
              span {
                i {
                  padding-right: 5px;
                }
              }
            }
            .icons {
              span {
                i {
                  padding: 0 5px;
                }
              }
            }
          }
        }
      }
    }
  }
  .papagination {
    text-align: center;
  }
}
</style>
