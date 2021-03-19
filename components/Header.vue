<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      router
      @select="handleSelect"
    >
      <el-menu-item index="/">
        <i class="el-icon-house" />
        主页
      </el-menu-item>
      <el-menu-item index="/articles">
        <i class="el-icon-notebook-1" />
        文章
      </el-menu-item>
      <el-menu-item index="/project">
        <i class="el-icon-folder-opened" />
        项目
      </el-menu-item>
      <el-menu-item index="/feedback">
        <i class="el-icon-phone-outline" />
        反馈
      </el-menu-item>
      <el-menu-item v-if="isLogin" class="avatar">
        <span class="username">用户名</span>
        <el-avatar
          icon="el-icon-user-solid"
          size="large"
          shape="circle"
          fit="cover"
        />
      </el-menu-item>
      <el-menu-item v-if="!isLogin" class="avatar">
        <nuxt-link to="/register">
          注册
        </nuxt-link>
      </el-menu-item>
      <el-menu-item v-if="!isLogin" class="avatar">
        <nuxt-link to="/login">
          登录
        </nuxt-link>
      </el-menu-item>
    </el-menu>
  </header>
</template>

<script lang="ts">
import { mapState } from 'vuex'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  computed: mapState(['isLogin'])

})
export default class Header extends Vue {
  activeIndex: string = '/';
  handleSelect (key: string, keyPath: string): void {}
}
</script>

<style lang="scss">
.el-menu-item.avatar  {
  float: right;
  .username{
    padding: 0 10px;

  }
    .el-icon-user-solid {
      margin-right: 0 !important;
    }

}
</style>
