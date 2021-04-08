<template>
  <div class="my-article">
    <el-table ref="articleTable" :data="data" style="width: 100%">
      <el-table-column
        :prop="tableInfo.coverId.name"
        :label="tableInfo.coverId.label"
        :width="tableInfo.coverId.width"
      >
        <template slot-scope="scope">
          <div class="cover">
            <el-image
              :alt="scope.row.coverId.name"
              :src="scope.row.coverId.url"
              fit="contain"
              :lazy="true"
            />
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.title.name"
        :label="tableInfo.title.label"
        :width="tableInfo.title.width"
      >
        <template slot-scope="scope">
          <nuxt-link :to="`/articles/${scope.row._id}`" class="link">
            {{ scope.row.title }}
          </nuxt-link>
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.tags.name"
        :label="tableInfo.tags.label"
        :width="tableInfo.tags.width"
      >
        <template slot-scope="scope">
          <el-tooltip
            v-for="tag in scope.row.tags"
            :key="tag._id"
            class="item"
            effect="dark"
            :content="tag.name"
            placement="top-start"
          >
            <el-tag
              class="tag"
              type="dark"
              :color="tag.bgColor"
              size="normal"
            >
              {{ tag.name }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.status.name"
        :label="tableInfo.status.label"
        :width="tableInfo.status.width"
      >
        <template slot-scope="scope">
          <el-radio
            v-model="scope.row.status"
            :label="scope.row.status"
            border
          >
            {{ scope.row.status==='0'?'草稿':'已发布' }}
          </el-radio>
        </template>
      </el-table-column>
      <el-table-column
        :prop="tableInfo.updateTime.name"
        :label="tableInfo.updateTime.label"
        :width="tableInfo.updateTime.width"
      >
        <template slot-scope="scope">
          {{ scope.row.updateTime|lll }}
        </template>
      </el-table-column>
      <el-table-column :label="tableInfo.operation.label" :width="tableInfo.operation.width">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="edit(scope.row._id)"
            />
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button
              size="small"
              type="danger"
              icon="el-icon-remove"
              @click="remove(scope.row._id,scope.row.title)"
            />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <Dialog-Article-Edit
      :article-conent="articleConent"
      :article-edit-visible="ArticleEditVisible"
      @dialog-close="close"
    />
  </div>
</template>

<script lang='ts'>

import { Component, Vue, Ref } from 'vue-property-decorator'
import { State } from 'vuex-class'
import DialogArticleEdit from '@/components/dialog/DialogArticleEdit.vue'
import { getUserArticle, getArticleContent, deleteUserArticle } from '@/api/article'
@Component({
  head: {
    title: 'Ye博客-用户文章管理'
  },
  components: {
    DialogArticleEdit
  },
  layout: 'user',
  async asyncData ({ $axios, store }) {
    const res = await getUserArticle({ $axios, param: { id: store.state.auth.user._id } })
    return {
      data: res.data
    }
  }
})
export default class UserArticle extends Vue {
  @State auth: any
  @Ref('articleTable') readonly tableRef!: HTMLTableElement
  // 编辑表的dialog显示与隐藏
  ArticleEditVisible: boolean = false
  // 文章表结构
  tableInfo: object = {
    coverId: { name: 'coverId', label: '封面图片', width: 150 },
    title: { name: 'title', label: '文章名', width: 190 },
    tags: { name: 'tags', label: '标签', width: 300 },
    status: { name: 'status', label: '状态', width: 180 },
    updateTime: { name: 'updateTime', label: '更新时间', width: 180 },
    operation: { label: '操作', width: 180 }
  }

  articleConent: object = {}
  // 获取文章信息
  async getArticleInfo (id: string) {
    const res = await getArticleContent({ $axios: this.$axios, param: { id } })
    this.articleConent = res.data
    if (res.code === 200) {
      this.ArticleEditVisible = true
    }
  }

  // 打开文章表单
  edit (e: string) {
    this.getArticleInfo(e)
  }

  remove (id: string, title: string) {
    this.$msgbox({
      title: '文章删除',
      message: `确定删除文章“${title}”吗?`,
      showCancelButton: true,
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      beforeClose: async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true
          instance.confirmButtonText = '执行中...'
          const res = await deleteUserArticle({ $axios: this.$axios, param: { id } })
          if (res.code === 200) {
            instance.confirmButtonLoading = false
            done()
            location.reload()
          }
        } else {
          done()
        }
      }
    })
  }

  // 模态框关闭时，将值设为false
  close (e: boolean) {
    this.ArticleEditVisible = e
  }
}
</script>

<style scoped lang="scss">
.my-article {
  .cover {
    img {
      width: 100%;
    }
  }
  .tag {
    margin-right: 5px;
    max-width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .link{
    font-size: 13px;
    color: #606266;
    &:hover{
      color: #409EFF;
    }
  }
}
</style>
