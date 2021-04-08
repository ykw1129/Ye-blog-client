<template>
  <div id="content">
    <Article-Main :content="content" />
    <aside>
      <Article-User-Detail :create-user="user" />
      <div class="user-tag">
        <h2>
          <i class="el-icon-collection-tag" /> 本文标签
        </h2>
        <Article-Tag :tags="content.tags" />
      </div>
      <div class="user-article">
        <h2>
          <i class="el-icon-tickets" /> 他的其他文章
        </h2>
        <Article-Other :about-articles="about" />
      </div>
    </aside>
  </div>
</template>

<script lang='ts'>
// 防止v-html被xss攻击
import VueDOMPurifyHTML from 'vue-dompurify-html'
import { Component, Vue } from 'vue-property-decorator'
import { getArticleContent, getAboutArticle } from '@/api/article'
import ArticleUserDtail from '~/components/article/ArticleUserDetail.vue'
import ArticleTag from '~/components/article/ArticleTag.vue'
import ArticleOther from '~/components/article/ArticleOther.vue'
import ArticleMain from '~/components/article/ArticleMain.vue'
Vue.use(VueDOMPurifyHTML)
@Component({
  head: {
  },
  loading: true,
  components: {
    ArticleTag,
    ArticleOther,
    ArticleMain,
    ArticleUserDtail
  },

  layout: 'article',
  auth: false,
  async asyncData ({ app, params, $axios }) {
    let about
    if (params.id) {
      const content = await getArticleContent({ $axios, param: { id: params.id } })
      if (content.code === 200) {
        (app as any).head!.title = content.data.title
        // 将文章名赋值给title
        about = await getAboutArticle({ $axios, param: { id: content.data.createUser._id, articleId: content.data._id } })
        return {
          content: content.data,
          user: content.data.createUser,
          about: about.data
        }
      }
    }
  }
})
export default class articles extends Vue {

}
</script>

<style scoped lang="scss">
#content {
  padding-top: 120px;
  width: 1200px;
  margin: auto;
  &:after {
    content: "";
    display: block;
    clear: both;
  }
  aside {
    box-sizing: border-box;
    float: right;
    width: 350px;
    .user-tag {
      margin-bottom: 20px;
      background-color: #fff;
      padding: 20px;
      h2 {
        text-align: center;
        font-size: 20px;
        margin-bottom: 30px;
      }
    }
    .user-article {
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
  ol {
    list-style: upper-roman !important;
  }
}
</style>
