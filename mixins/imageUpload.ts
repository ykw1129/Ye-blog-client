import { Component, Vue } from 'vue-property-decorator'
@Component
export default class UploadMixin extends Vue {
    imageUrl: string = ''
    imageFile: any
    imageType:string = ''
    // 上传状态改变时
    onUploadChange (file: any) {
      console.log(file)
      this.imageFile = file.raw
      this.imageType = file.name.substring(file.name.lastIndexOf('.') + 1)
      this.imageUrl = URL.createObjectURL(file.raw)
    }

    // 文件上传前
    beforeUpload (file: any) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    }
}
