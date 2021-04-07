<template>
  <div id="post">
    <el-button type="primary" size="default" @click="ArticleVisible = true">
      发布文章
    </el-button>
    <el-button type="primary" size="default" @click="ProjectVisible = true">
      发布项目
    </el-button>
    <Dialog-Article :article-visible="ArticleVisible" @dialog-close="close" />
    <Dialog-Project :project-visible="ProjectVisible" @dialog-close="close" />
  </div>
</template>

<script lang='ts'>
import DialogArticle from '@/components/dialog/DialogArticle.vue'
import DialogProject from '@/components/dialog/DialogProject.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    DialogArticle,
    DialogProject
  }
})
export default class PostButton extends Vue {
  // 项目dialog显示
  ProjectVisible: boolean = false
  // 文章dialog显示
  ArticleVisible: boolean = false
  // 模态框关闭时，将值设为false
  close (e: boolean) {
    this.ArticleVisible = e
    this.ProjectVisible = e
  }
}
</script>

<style scoped lang="scss">
.el-button{
    display: block;
    margin: 10px 0;
    width: 100%;
}
</style>
