<template>
  <div
    id="default"
    :style="{backgroundImage:`url(${auth.loginIn?auth.user.bgImageId.url:'https://ceshi123123123.oss-cn-beijing.aliyuncs.com/blog/background/bgimage.jpg'})`}"
  >
    <Header />
    <div id="content">
      <main>
        <Nuxt />
      </main>
      <aside>
        <div v-if="auth.user" class="user-detail">
          <User-Detail :user="auth.user" />
        </div>
        <div v-if="auth.loggedIn" class="post">
          <h2>
            <i class="el-icon-folder-add" /> 发布
          </h2>
          <PostButton />
        </div>
        <div class="hot-tag">
          <h2>
            <i class="el-icon-collection-tag" /> 热门标签
          </h2>
          <Hot-Tag :tags="tags" />
        </div>
        <div class="hot-article">
          <h2>
            <i class="el-icon-tickets" /> 热门文章
          </h2>
          <Hot-Article :articles="articles" />
        </div>
      </aside>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { getHotArticle } from '@/api/article'
import { getHotTag } from '@/api/tag'
import UserDetail from '../components/aside/UserDetail.vue'
import PostButton from '../components/aside/PostButton.vue'
import Header from '~/components/index/Header.vue'
import HotTag from '~/components/aside/HotTag.vue'
import HotArticle from '~/components/aside/HotArticle.vue'
@Component({
  components: {
    Header,
    HotTag,
    HotArticle,
    PostButton,
    UserDetail
  },
  async fetch () {
    const [tags, articles] = await Promise.all([
      getHotTag({ $axios: this.$axios }),
      getHotArticle({ $axios: this.$axios })
    ]);
    (this as any).tags = tags.data;
    (this as any).articles = articles.data
  }
})
export default class defaul extends Vue {
  @State auth: any
  tags: [] = []
  articles: [] = []
}
</script>
<style lang="scss" scoped>
#default {
  background-size: cover;
  background-attachment: fixed;
  #content {
    padding-top: 120px;
    width: 1200px;
    margin: auto;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    main {
      float: left;
      width: 820px;
      background-color: rgba($color: #fff, $alpha: 0.9);
      padding: 10px;
      box-sizing: border-box;
      min-height: 100vh;
    }
    aside {
      box-sizing: border-box;
      float: right;
      width: 350px;
      .post {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
        h2 {
          text-align: center;
          font-size: 20px;
          margin-bottom: 30px;
        }
      }
      .hot-tag {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
        h2 {
          text-align: center;
          font-size: 20px;
          margin-bottom: 30px;
        }
      }
      .hot-article {
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
        h2 {
          text-align: center;
          font-size: 20px;
          margin-bottom: 30px;
        }
      }
    }
  }
}

.el-menu-item {
  .avatar {
    .el-icon-user-solid {
      margin-right: 0 !important;
    }
  }
}
</style>
