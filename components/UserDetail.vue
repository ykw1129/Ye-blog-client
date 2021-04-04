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
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class ComponentName extends Vue {
    @Prop({ type: Object, required: true }) private createUser:string|undefined
}
</script>

<style scoped lang="scss">
      .user-detail {
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
      }
</style>
