<template>
  <div>
    主页
    {{ res }}
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { getUser } from '@/api/login'
@Component({
  async asyncData ({ $axios }) {
    const res = await getUser({ $axios })
    return { res }
  }
})
export default class index extends Vue {
  sum:number=2
}
</script>

<style scoped>

</style>
