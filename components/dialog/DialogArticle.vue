<template>
  <el-dialog title="发布文章" :visible="ArticleVisible" width="70%" @close="dialogClose">
    <el-form ref="articleForm" :model="articleForm" status-icon :rules="articleRules">
      <el-form-item label="文章标题" :label-width="formLabelWidth" prop="title">
        <el-input v-model="articleForm.title" autocomplete="off" placeholder="输入你的文章标题" />
      </el-form-item>
      <el-form-item label="添加标签" :label-width="formLabelWidth">
        <el-tag
          v-for="(tag,index) in tags"
          :key="index"
          closable
          :color="tag.bgColor"
          :disable-transitions="false"
          style="color:#fff"
          @close="handleClose(tag)"
        >
          {{ tag.name }}
        </el-tag>
        <div v-if="inputVisible" style="display:inline-block;position: relative;">
          <el-autocomplete
            ref="saveTagInput"
            v-model="inputValue"
            class="input-new-tag"
            size="small"
            :fetch-suggestions="querySearch"
            placeholder="请输入标签"
            :trigger-on-focus="false"
            @keyup.enter.native="handleInputConfirm"
            @select="handleSelect"
          />
          <el-color-picker
            v-model="color"
            show-alpha
            size="mini"
            :predefine="predefineColors"
            style="vertical-align: middle; position:absolute;right:1px;top:50.5%;transform:translateY(-50%);"
          />
        </div>
        <el-button
          v-if="inputVisible"
          icon="el-icon-circle-check"
          type="success"
          size="mini"
          @click="handleInputConfirm"
        >
          添加标签
        </el-button>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">
          + 点击增加标签
        </el-button>
      </el-form-item>
      <el-form-item label="封面图片" :label-width="formLabelWidth">
        <el-upload
          accept="image/jpeg, image/gif, image/png, image/jpg"
          class="uploader"
          action="/"
          :auto-upload="false"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-change="onUploadChange"
        >
          <img v-if="imageUrl" :src="imageUrl" class="image">
          <i v-else class="el-icon-plus" />
        </el-upload>
      </el-form-item>
      <el-form-item label="文章描述" :label-width="formLabelWidth" prop="description">
        <el-input v-model="articleForm.description" autocomplete="off" placeholder="输入你的文章描述" />
      </el-form-item>
      <el-form-item label="书写方式" :label-width="formLabelWidth">
        <el-radio-group v-model="articleForm.contentType">
          <el-radio border label="0">
            富文本工具
          </el-radio>
          <el-radio border label="1">
            Markdown
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item
        v-show="articleForm.contentType=='0'"
        label="文章内容"
        :label-width="formLabelWidth"
      >
        <div
          v-quill:myQuillEditor="editorOption"
          class="quill-editor"
          :content="articleForm.content"
          style="min-height:400px"
          @change="onEditorChange($event)"
        />
      </el-form-item>
      <el-form-item
        v-show="articleForm.contentType=='1'"
        label="文章内容"
        :label-width="formLabelWidth"
      >
        <mavon-editor
          ref="mavon"
          v-model="articleForm.markContent"
          :ishljs="true"
          style="min-height:500px"
          @imgAdd="$imgAdd"
        />
      </el-form-item>
      <el-form-item label="发布" :label-width="formLabelWidth">
        <el-radio-group v-model="articleForm.status">
          <el-radio border label="0">
            存为草稿
          </el-radio>
          <el-radio border label="1">
            直接发布
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" class="imagecode" prop="captcha">
        <div class="img">
          <img v-if="imageCodeUrl" :src="imageCodeUrl" alt="图片验证码" @click="getCaptcha">
        </div>
        <el-button
          v-if="!imageCodeUrl"
          type="primary"
          size="default"
          @click="getCaptcha"
        >
          {{ captchaTip }}
        </el-button>
        <el-input v-if="imageCodeUrl" v-model="articleForm.captcha" placeholder="输入验证码" clearable />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="articleVisible = false">
        取 消
      </el-button>
      <el-button type="primary" @click="postArticle()">
        发布
      </el-button>
    </div>
  </el-dialog>
</template>

<script lang='ts'>
import { validateCaptcha } from '@/validate/edit'
import { searchTag, createTag } from '@/api/tag'
import { postArticle } from '@/api/article'
import { Component, Prop, Mixins, Ref, Emit } from 'vue-property-decorator'
import { upload } from '@/api/user'
import { State } from 'vuex-class'
import UploadMixin from '@/mixins/imageUpload'
import CaptchaMixin from '@/mixins/captcha'
const toolbar = [
  ['bold', 'italic', 'underline', 'strike'], // 加粗 斜体 下划线 删除线
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 字体大小
  [{ direction: 'rtl' }],
  ['blockquote', 'code-block'], // 引用  代码块
  [{ list: 'ordered' }, { list: 'bullet' }], // 有序、无序列表
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['link', 'image', 'video'], // 链接、图片、视频
  [{ script: 'sub' }, { script: 'super' }], // 上标/下标
  [{ indent: '-1' }, { indent: '+1' }], // 缩进
  [{ size: ['small', false, 'large', 'huge'] }],
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  ['clean'] // 清除文本格式
]
@Component({})
export default class DialogArticle extends Mixins(UploadMixin, CaptchaMixin) {
  @State auth: any
  @Prop({ type: Boolean }) private ArticleVisible: any
  @Ref('articleForm') readonly articleRef!: HTMLFormElement
  @Ref('saveTagInput') readonly saveRef!: any
  @Ref('mavon') readonly mavonRef!: any
  @Emit() dialogClose () { return false }//   dialog关闭前的回调

  // 标签颜色
  color: string = '#409EFF'
  // label的宽度
  formLabelWidth: string = '120px'
  // 标签文本框是否显示
  inputVisible: boolean = false
  // 文本框输入的值
  inputValue: string = ''
  // 显示的标签
  tags: object[] = []
  // 文章内容
  content: string = '<h2>I am Example</h2>'
  // 拾色器的常用颜色
  predefineColors: string[] = [
    '#ff4500',
    '#ff8c00',
    '#ffd700',
    '#90ee90',
    '#00ced1',
    '#1e90ff',
    '#c71585'
  ]

  // vue-quill的配置
  editorOption = {
    modules: {
      toolbar: {
        container: toolbar,
        handlers: {
        }
      }
    }

  }

  // 文章表单
  articleForm = {
    title: '',
    description: '',
    contentType: '0',
    markContent: '',
    content: '',
    coverId: '',
    status: '0',
    captcha: '',
    tags: []
  }

  // 文章表单验证
  articleRules = {
    title: [{ required: true, trigger: 'blur', message: '请填写文章标题' }, { max: 20, trigger: 'change', message: '标题最大为20个字符' }],
    description: [{ required: true, trigger: 'blur', message: '请填写文章描述' }, { max: 30, trigger: 'change', message: '描述最大为30个字符' }],
    captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
  }

  // 点击选择搜索出的标签时触发
  handleSelect (item: any) {
    // console.log(item)
    (this.articleForm.tags as any).push(item._id)
    this.tags.push({ name: item.value, bgColor: item.bgColor, createUser: item.createUser })
    this.inputVisible = false
    this.inputValue = ''
  }

  // 绑定@imgAdd event
  async $imgAdd (pos: string, $file: any) {
    // 第一步.将图片上传到服务器.
    console.log(pos)
    const formData = new FormData()
    formData.append('file', $file, `${Date.now()}-${$file.name}`)
    formData.append('name', this.articleForm.title)
    formData.append('type', 'article')
    const res = await upload({ $axios: this.$axios, param: formData })
    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    // $vm.$img2Url 详情见本页末尾
    this.mavonRef.$img2Url(pos, res.data.url)
  }

  // 上传文章
  postArticle () {
    const formData = new FormData()
    this.articleRef.validate(async (valid: boolean) => {
      if (valid) {
        if (this.imageFile) {
          formData.append('file', this.imageFile, `${Date.now()}.${this.imageType}`)
          formData.append('name', this.articleForm.title)
          formData.append('type', 'article')
          const res = await upload({ $axios: this.$axios, param: formData })
          this.articleForm.coverId = res.data._id
        }
        const res = await postArticle({
          $axios: this.$axios,
          param:
          {
            title: this.articleForm.title,
            description: this.articleForm.description,
            coverId: this.articleForm.coverId,
            captcha: this.articleForm.captcha,
            status: this.articleForm.status,
            content: this.articleForm.contentType === '0' ? this.articleForm.content : this.articleForm.markContent,
            tags: this.articleForm.tags,
            contentType: this.articleForm.contentType
          }
        })
        if (res.code === 200) {
          this.$router.push('/articles')
        }
      }
    })
  }

  // 标签输入框查找事件
  async querySearch (queryString: any, cb: Function) {
    const results = await searchTag({ $axios: this.$axios, param: { name: queryString } })
    // 调用 callback 返回建议列表的数据
    cb(results.data)
  }

  // 标签文本框展示
  showInput () {
    this.inputVisible = true
    this.$nextTick(() => {
      this.saveRef.focus()
    })
  }

  // 关闭标签时触发
  handleClose (tag: any) {
    this.tags.splice(this.tags.indexOf(tag), 1)
    this.articleForm.tags.splice((this.articleForm.tags as any).indexOf(tag.createUser), 1)
  }

  // 处理标签提交
  async handleInputConfirm () {
    const value = { name: this.inputValue, bgColor: this.color, createUser: this.auth.user._id }
    const isEixit = this.tags.some((item: any) => item.name === value.name)
    if (value.name) {
      if (isEixit) {
        this.$message({ type: 'warning', message: '已存在该标签' })
      } else {
        const res = await createTag({ $axios: this.$axios, param: value });
        (this.articleForm.tags as any).push(res.data)
        this.tags.push(value)
      }
    } else {
      this.$message({ type: 'warning', message: '请输入标签' })
    }
    console.log(this.articleForm.tags)
    this.inputVisible = false
    this.inputValue = ''
  }

  // 编辑器状态改变
  onEditorChange (e: any) {
    this.articleForm.content = e.html
  }
}
</script>

<style scoped lang="scss">
// 上传图片样式
.uploader {
  width: 400px;
  height: 200px;
  display: inline-block;
  border-radius: 6px;
  overflow: hidden;
  line-height: 200px;
  text-align: center;
  cursor: pointer;
  border: 1px dashed #8c939d;
  &:hover {
    border-color: #409eff;
  }
}
// 验证码样式
.imagecode {
  .img {
    vertical-align: top;
    display: inline-block;
  }
  .el-form-item__content {
    position: relative;
    .el-button {
      position: absolute;
      right: 0;
    }
    .el-input {
      width: 180px;
      position: absolute;
      right: 0;
    }
  }
}
// 标签样式
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 130px;
  margin-left: 10px;
  vertical-align: bottom;
}
.uploader {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
