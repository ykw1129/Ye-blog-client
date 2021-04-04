<template>
  <div id="default">
    <Header />
    <div id="content">
      <main>
        <Nuxt />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import Header from '@/components/Header.vue'
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
    Header
  }

})
export default class defaul extends Vue {

}
</script>
<style lang="scss" scoped>
#default {
  background-color: #f7f8fa;
  #content {
    padding-top: 120px;
    width: 1200px;
    margin: auto;
    &:after {
      content: "";
      display: block;
      clear: both;
    }
    main {
      float: left;
      width: 100%;
      background-color: #fff;
      padding: 10px;
      box-sizing: border-box;
      min-height: 100vh;
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
