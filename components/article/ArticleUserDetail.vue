<template>
  <div class="user-detail">
    <h1>
      <img :src="createUser.avatarId.url" alt="auth.user.username">
    </h1>
    <h2>
      <i class="el-icon-user" />
      {{ createUser.username }}
    </h2>
    <h3>
      <i class="el-icon-edit-outline" />
      {{ createUser.description }}
    </h3>
    <div class="links">
      <a v-if="createUser.meta.github" target="_blank" :href="createUser.meta.github">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-huaban881" />
        </svg>
      </a>
      <a v-if="createUser.meta.zhihu" target="_blank" :href="createUser.meta.zhihu">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-zhihu" />
        </svg>
      </a>
      <a v-if="createUser.meta.qq" target="_blank" :href="createUser.meta.qq">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-qq" />
        </svg>
      </a>
      <a v-if="createUser.meta.weibo" target="_blank" :href="createUser.meta.weibo">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo-copy" />
        </svg>
      </a>
      <a v-if="createUser.meta.bilibili" target="_blank" :href="createUser.meta.bilibili">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bilibili" />
        </svg>
      </a>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ComponentName extends Vue {
  @Prop({ type: Object, required: true }) private createUser: string | undefined
}
</script>
