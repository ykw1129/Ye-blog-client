<template>
  <header>
    <client-only>
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        router
        @select="handleSelect"
      >
        <el-menu-item index="/articles">
          <i class="el-icon-notebook-1" />
          文章
        </el-menu-item>
        <el-menu-item index="/project">
          <i class="el-icon-folder-opened" />
          项目
        </el-menu-item>

        <el-submenu v-if="auth.loggedIn" class="right" index="/">
          <template slot="title">
            <span class="username">{{ auth.user.username }}</span>
            <el-avatar
              icon="el-icon-user-solid"
              size="large"
              shape="circle"
              fit="cover"
              :src="auth.user.avatarId.url"
            />
          </template>
          <el-menu-item index="/user/articles">
            个人中心
          </el-menu-item>
          <el-menu-item @click="logout">
            登出
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-if="!auth.loggedIn" index="/register" class="right">
          <i class="el-icon-user-solid" />
          注册
        </el-menu-item>
        <el-menu-item v-if="!auth.loggedIn" index="/login" class="right">
          <i class="el-icon-user" />
          登录
        </el-menu-item>
        <el-menu-item class="right">
          <el-autocomplete
            v-model="searchWord"
            highlight-first-item
            :trigger-on-focus="false"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入关键字"
            prefix-icon="el-icon-search"
            style="width:300px"
            @select="handleSelect"
          />
        </el-menu-item>
      </el-menu>
    </client-only>
  </header>
</template>

<script lang="ts">
import { State } from 'vuex-class'
import { searchArticle } from '@/api/article'
import { Component, Vue } from 'vue-property-decorator'
@Component({

})
export default class Header extends Vue {
  @State auth: any
  activeIndex: string = '/artcle'
  searchWord: string = ''
  logout () {
    this.$auth.logout()
  }

  mounted () {
    const arr = this.$route.fullPath.split('/')
    this.activeIndex = '/' + arr[1].split('?')[0]
  }

  async querySearchAsync (queryString:string, cb:Function) {
    const res = await searchArticle({ $axios: this.$axios, param: { word: queryString } })
    if (res.code === 200) {
      cb(res.data)
    }
  }

  handleSelect (item:any) {
    if (item) {
      this.$router.push(`/articles/${item._id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  background-color: #fff;
  border-bottom: solid 1px #e6e6e6;
  z-index: 999;
  .el-menu {
    width: 1200px;
    margin: auto;
    border-bottom: none;
  }
}
.el-menu-item.right,
.el-submenu.right {
  float: right;
  .username {
    padding: 0 10px;
  }
  .el-icon-user-solid {
    margin-right: 0 !important;
  }
}
</style>
