<template>
  <section id="detail">
    <h1>
      <img :src="user.avatarId.url" :alt="user.username">
    </h1>
    <h2>
      <i class="el-icon-user" />
      {{ user.username }}
    </h2>
    <h3>
      <i class="el-icon-edit-outline" />
      {{ user.description }}
    </h3>
    <div class="links">
      <a v-if="user.meta.github" target="_blank" :href="user.meta.github">
        <i class="iconfont icon-huaban881" />
      </a>
      <a v-if="user.meta.zhihu" target="_blank" :href="user.meta.zhihu">
        <i class="iconfont icon-zhihu" />
      </a>
      <a v-if="user.meta.qq" target="_blank" :href="user.meta.qq">
        <i class="iconfont icon-qq" />
      </a>
      <a v-if="user.meta.weibo" target="_blank" :href="user.meta.weibo">
        <i class="iconfont icon-weibo-copy" />
      </a>
      <a v-if="user.meta.bilibili" target="_blank" :href="user.meta.bilibili">
        <i class="iconfont icon-bilibili" />
      </a>
    </div>
  </section>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class UserDetail extends Vue {
  @Prop({ type: Object }) private user:any
}
</script>

<style scoped lang="scss">
      #detail{
        margin-bottom: 20px;
        background-color: #fff;
        padding: 20px;
        position: relative;
        h1 {
          position: absolute;
          left: 50%;
          top: -20px;
          transform: translateX(-50%);
          width: 100px;
          height: 100px;
          margin: auto;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid #dcdfe6;
          img {
            width: 100%;
            height: 100%;
          }
        }
        h2 {
          text-align: center;
          font-size: 20px;
          padding-top: 70px;
          font-family: KaiTi;
        }
        h3 {
          padding-top: 20px;
          font-size: 16px;
          text-align: center;
        }
        .links {
          margin: 20px 10px 10px;
          display: flex;
          justify-content: space-between;
          a {
            display: block;
            text-decoration: none;
            &:hover {
              i {
                color: #67c23a;
              }
            }
            i {
              font-size: 40px;
              color: #909399;
            }
          }
        }
      }
</style>
