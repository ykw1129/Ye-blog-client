<template>
  <div>
    {{ $route.params.id }}
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class project extends Vue {

}
</script>

<style scoped>

</style>
