<template>
  <div id="default">
    <Header />
    <div id="content">
      <main>
        <Nuxt />
      </main>
      <aside>
        <div v-if="auth.user" class="user-detail">
          <h1>
            <img :src="auth.user.avatarId.url" alt="auth.user.username">
          </h1>
          <h2>
            <i class="el-icon-user" />
            {{ auth.user.username }}
          </h2>
          <h3>
            <i class="el-icon-edit-outline" />
            {{ auth.user.description }}
          </h3>
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
import HotArticle from '@/components/HotArticle.vue'
import HotTag from '@/components/HotTag.vue'
import Header from '@/components/Header.vue'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { getHotArticle } from '@/api/article'
import { getHotTag } from '@/api/tag'
@Component({
  components: {
    Header,
    HotTag,
    HotArticle
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
  background-color: #f7f8fa;
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
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      min-height: 100vh;
    }
    aside {
      box-sizing: border-box;
      float: right;
      width: 350px;
      .user-detail {
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        position: relative;
        h1 {
          position: absolute;
          left: 50%;
          top: -20px;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          margin: auto;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #dcdfe6;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h2 {
          text-align: center;
          font-size: 20px;
          padding-top: 70px;
          font-family: KaiTi;
        }
        h3 {
          padding-top: 20px;
          font-size: 16px;
          text-align: center;
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
