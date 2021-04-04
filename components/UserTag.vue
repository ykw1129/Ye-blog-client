<template>
  <ul>
    <li v-for="tag in tags" :key="tag._id">
      <el-tag size="normal" effect="dark" :color="tag.bgColor">
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
    @Prop({ type: Array }) private tags:string|undefined
}
</script>

<style scoped lang="scss">
ul{
    li{
        display: inline-block;
        margin-right: 20px;
        cursor: pointer;
    }
}

</style>
