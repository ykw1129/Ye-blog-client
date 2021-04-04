<template>
  <div id="content">
    <Main-Article :content="content" />
    <aside>
      <User-Detail :create-user="User" />
      <div class="user-tag">
        <h2>
          <i class="el-icon-collection-tag" /> 本文标签
        </h2>
        <User-Tag :tags="content.tags" />
      </div>
      <div class="user-article">
        <h2>
          <i class="el-icon-tickets" /> 他的其他文章
        </h2>
        <User-Article :about-articles="about" />
      </div>
    </aside>
  </div>
</template>

<script lang='ts'>
// 防止v-html被xss攻击
import UserDtail from '@/components/UserDetail.vue'
import VueDOMPurifyHTML from 'vue-dompurify-html'
import UserTag from '@/components/UserTag.vue'
import UserArticle from '@/components/UserArticle.vue'
import { Component, Vue } from 'vue-property-decorator'
import { getArticleContent, getAboutArticle } from '@/api/article'
import MainArticle from '@/components/MainArticle.vue'
Vue.use(VueDOMPurifyHTML)
@Component({
  components: {
    UserTag,
    UserArticle,
    MainArticle,
    UserDtail
  },
  layout: 'article',
  auth: false,
  async asyncData ({ params, $axios }) {
    let about
    const content = await getArticleContent({ $axios, param: { id: params.id } })
    if (content.code === 200) {
      about = await getAboutArticle({ $axios, param: { id: content.data.createUser._id } })
    }
    return {
      content: content.data,
      User: content.data.createUser,
      about: about.data,
      loading: false
    }
  }
})
export default class articles extends Vue {
  loading:boolean = true
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
    ol{
      list-style: upper-roman!important;
    }
  }
</style>
