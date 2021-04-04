<script>
export default {
  name: 'HomePage',
  middleware ({ store, route, redirect, params, query, req, res }) {
    redirect('/articles') // 默认跳转页面的路由
  }
  // 下面两个也能达到目的，但是体验不好，会有明显的从无到有的缓动效果
  // beforeCreate() {
  //   this.$router.push('/homeIndex')
  // },
  // created() {
  //   this.$router.push('/homeIndex')
  // },
}
</script>
