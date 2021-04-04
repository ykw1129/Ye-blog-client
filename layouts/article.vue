<template>
  <div id="default">
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">

import Header from '@/components/Header.vue'
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

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
