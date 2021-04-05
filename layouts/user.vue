<template>
  <div id="user">
    <User-Header />
    <div class="mainBox" :style="{backgroundImage:`url(${auth.user.bgImageId.url})`}" />
    <main>
      <div class="userDtail" :style="{backgroundImage:`url(${auth.user.bgImageId.url})`}">
        <div class="avatar">
          <img :src="auth.user.avatarId.url" :alt="auth.user.username">
        </div>
        <h1>{{ auth.user.username }}</h1>
        <p class="description">
          {{ auth.user.description }}
        </p>
      </div>

      <div class="userSet">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router>
          <el-menu-item index="/user/articles">
            <i class="el-icon-notebook-1" />
            我的文章
          </el-menu-item>
          <el-menu-item index="/user/project">
            <i class="el-icon-folder-opened" />
            我的项目
          </el-menu-item>
          <el-menu-item index="/user/edit">
            <i class="el-icon-setting" />
            资料修改
          </el-menu-item>
          <el-menu-item index="/user/set">
            <i class="el-icon-bank-card" />
            密码修改
          </el-menu-item>
        </el-menu>
      </div>
      <div class="content">
        <Nuxt />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import {
  State
} from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import UserHeader from '@/components/UserHeader.vue'
@Component({
  components: {
    UserHeader
  }
})
export default class user extends Vue {
  activeIndex: string = '/user/articles'
  @State auth: any
  created () {
    this.activeIndex = this.$route.fullPath
  }
}
</script>
<style lang="scss" scoped>
body {
  background-color: #eee;
  #user {
    height: 100%;
    .mainBox {
      position: fixed;
      z-index: -1;
      width: 100%;
      top: 0;
      height: 100%;
      filter: blur(5px);
      background-size: cover;
    }
    main {
      height: 100%;
      .userSet {
        padding-top: 10px;
        max-width: 1200px;
        margin: auto;
      }
      .userDtail {
        background-position: top center;
        background-size: cover;
        height: 500px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        .avatar {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h1 {
          font-family: KaiTi;
          margin: 30px 0;
          font-weight: bold;
          font-size: 30px;
        }
        .description {
          font-size: 24px;
        }
      }
      .content {
        max-width: 1200px;
        margin: auto;
        padding: 10px;
        height: 100%;
        min-height: 500px;
        box-sizing: border-box;
        margin-top: 10px;
        background-color: #fff;
      }
    }
  }
}
</style>
