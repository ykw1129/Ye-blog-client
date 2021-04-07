<template>
  <div
    id="default"
    :style="{backgroundImage:`url(${auth.loginIn?auth.user.bgImageId.url:'http://ceshi123123123.oss-cn-beijing.aliyuncs.com/blog/background/bgimage.jpg'})`}"
  >
    <Header />
    <div id="content">
      <main>
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import Header from '~/components/index/Header.vue'

@Component({
  components: {
    Header
  }

})
export default class defaul extends Vue {
  @State auth: any
}
</script>
<style lang="scss" scoped>
#default {
  height: 100vh;
  background-size: cover;
  background-attachment:fixed;
  #content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    &:after {
      content: "";
      display: block;
      clear: both;
    }
    main {
      position: absolute;
      margin: auto;
      border-radius: 15px;
      background-color: #fff;
      padding: 30px 30px;
      box-sizing: border-box;
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
