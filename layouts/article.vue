<template>
  <div
    id="default"
    :style="{backgroundImage:`url(${auth.loginIn?auth.user.bgImageId.url:'https://ceshi123123123.oss-cn-beijing.aliyuncs.com/blog/background/bgimage.jpg'})`}"
  >
    <Header />
    <Nuxt />
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
export default class Art extends Vue {
  @State auth: any
}
</script>
<style lang="scss" scoped>
#default {
  background-attachment: fixed;
  background-color: #f7f8fa;
}

.el-menu-item {
  .avatar {
    .el-icon-user-solid {
      margin-right: 0 !important;
    }
  }
}
</style>
