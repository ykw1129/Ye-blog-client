<template>
  <ul>
    <li v-for="tag in tags" :key="tag._id">
      <el-tag size="normal" effect="dark" :color="tag.bgColor" @click="handleTagClick(tag._id)">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-biaoqian" />
        </svg>
        {{ tag.name }}
      </el-tag>
    </li>
  </ul>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({

})
export default class HotTag extends Vue {
  @Prop({ type: Array }) private tags: string | undefined
  handleTagClick (id: string) {
    this.$router.push(`/tag/${id}`)
  }
}
</script>

<style scoped lang="scss">
ul {
  li {
    margin-bottom: 10px;
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }
}
</style>
