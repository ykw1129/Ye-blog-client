<template>
  <ul>
    <li v-for="tag in tags" :key="tag._id">
      <el-tag size="normal" effect="dark" :color="tag.tag[0].bgColor" @click="handleTagClick(tag._id)">
        {{ tag.tag[0].name }}
      </el-tag>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({
})
export default class HotTag extends Vue {
  @Prop({ type: Array }) private tags:string|undefined
  handleTagClick (id:string) {
    this.$router.push(`/tag/${id}`)
  }
}
</script>

<style scoped lang="scss">
ul{
    li{
        display: inline-block;
        margin-right: 20px;
        margin-bottom: 10px;
        cursor: pointer;
    }
}

</style>
