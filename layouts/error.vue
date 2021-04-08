<template>
  <div class="error">
    <el-image :src="image404" fit="cover" :lazy="true" />
    <i>{{ error.message }}</i>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  head: {
    title: '页面好像崩溃了'
  },
  props: ['error']
})
export default class Error extends Vue {
    image404:string = require('@/assets/image/404.png')
}
</script>

<style scoped lang="scss">
.error {
    i{
        display: block;
        text-align: center;
        font-style: italic;
        font-size: 50px;
        margin: 30px 0;
    }
}
</style>
