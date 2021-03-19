<template>
  <div>
    {{ $router.params.id }}
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class articles extends Vue {

}
</script>

<style scoped>

</style>
