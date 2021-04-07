<template>
  <div class="hot">
    <ul>
      <li v-for="item in articles" :key="item.id">
        <nuxt-link :to="`/articles/${item._id}`">
          <div class="cover">
            <img :src="item.coverId.url" :alt="item.coverId.name">
          </div>
          <div class="info">
            <h3 class="title">
              <i class="el-icon-reading" /> {{ item.title }}
            </h3>
            <div class="description">
              <i class="el-icon-document" />{{ item.description }}
            </div>
          </div>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
})
export default class HotArticle extends Vue {
    @Prop({ type: Array }) private articles:string|undefined
}
</script>

<style scoped lang="scss">
.hot {
  ul {
    li {
      height: 175px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      margin-bottom: 20px;
      a {
        overflow: hidden;
        display: block;
        height: 100%;
        position: relative;
        text-decoration: none;
        .cover {
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        &:hover {
          .info {
            bottom: 0;
            transition: all 0.5s;
          }
        }
        .info {
          box-sizing: border-box;
          overflow: hidden;
          width: 100%;
          padding: 4px;
          background-color: rgba($color: #fff, $alpha: 0.7);
          bottom: -64px;
          transition: all 0.5s;
          position: absolute;

          .title {
            overflow: hidden;
            height: 20px;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 16px;
            color: #303133;
          }
          .description {
            height: 60px;
            color: #606266;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
