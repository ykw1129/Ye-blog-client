<template>
  <div />
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component({
  layout: 'user',
  middleware ({ redirect }) {
    redirect('/user/articles')
  }
})
export default class Index extends Vue {

}
</script>

<style scoped>

</style>
