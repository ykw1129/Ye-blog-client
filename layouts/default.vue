<template>
  <div>
    <Header />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
export default Vue.extend({
  components: {
    Header
  }
})
</script>
<style lang="scss">
.el-menu-item {
  .avatar {
    .el-icon-user-solid {
      margin-right: 0 !important;
    }
  }
}
</style>
