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
      <a v-show="user.meta.github" target="_blank" :href="user.meta.github">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huaban881" />
        </svg>
      </a>
      <a v-show="user.meta.zhihu" target="_blank" :href="user.meta.zhihu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhihu" />
        </svg>
      </a>
      <a v-show="user.meta.qq" target="_blank" :href="user.meta.qq">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq" />
        </svg>
      </a>
      <a v-show="user.meta.weibo" target="_blank" :href="user.meta.weibo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo-copy" />
        </svg>
      </a>
      <a v-show="user.meta.bilibili" target="_blank" :href="user.meta.bilibili">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bilibili" />
        </svg>
      </a>
    </div>
  </section>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class UserDetail extends Vue {
  @Prop({ type: Object }) private user: any
}
</script>
