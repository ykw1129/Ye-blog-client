<template>
  <header>
    <div class="container">
      <ul class="nav">
        <li>
          <nuxt-link to="/articles">
            文章
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/project">
            项目
          </nuxt-link>
        </li>
      </ul>
      <ul class="btn">
        <li>
          <el-dropdown size="mini" split-button type="primary">
            发布
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <p @click="ProjectVisible = true">
                  发布项目
                </p>
              </el-dropdown-item>
              <el-dropdown-item>
                <p @click="ArticleVisible = true">
                  发布文章
                </p>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
        <li>
          <el-button type="danger" plain size="mini" @click="logout">
            注销
          </el-button>
        </li>
        <li>{{ auth.user.username }}</li>
        <li>
          <el-avatar
            icon="el-icon-user-solid"
            size="small"
            shape="circle"
            :src="auth.user.avatarId.url"
            fit="fill"
          />
        </li>
      </ul>
    </div>
    <Dialog-Article :article-visible="ArticleVisible" @dialog-close="close" />
    <Dialog-Project :project-visible="ProjectVisible" @dialog-close="close" />
  </header>
</template>

<script lang='ts'>
import { State } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import DialogArticle from '@/components/dialog/DialogArticle.vue'
import DialogProject from '@/components/dialog/DialogProject.vue'
@Component({
  name: 'UserHeader',
  components: {
    DialogArticle,
    DialogProject
  }
})
export default class UserHeader extends Vue {
  @State auth: any
  // 项目dialog显示
  ProjectVisible: boolean = false
  // 文章dialog显示
  ArticleVisible: boolean = false
  // 模态框关闭时，将值设为false
  close (e: boolean) {
    this.ArticleVisible = e
    this.ProjectVisible = e
  }

  logout () {
    this.$auth.logout()
  }
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  font-family: "Microsoft Yahei";
}
header {
  box-sizing: border-box;
  padding: 10px 0;
  background: #333;
  .container {
    max-width: 1200px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    ul.nav {
      li {
        float: left;
        margin-right: 50px;
        a {
          color: #fff;
          font-size: 14px;
          line-height: 30px;
          &:hover {
            color: orange;
          }
        }
      }
      &::after {
        display: block;
        content: "";
        clear: both;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      li {
        color: #fff;
        margin-left: 20px;
      }
    }
  }
}
</style>
