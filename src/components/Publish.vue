<template>
  <div style="margin-right: 150px;margin-left: 150px;">
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-page-header @back="goBack" content="编辑器">
      </el-page-header>
    </el-row>
    <el-input
      v-model="article.title"
      style="margin: 10px 0px;font-size: 18px;"
      placeholder="请输入标题">
    </el-input>
    <el-input
      v-model="article.profile"
      style="margin: 10px 0px;font-size: 18px;"
      type="textarea"
      :rows="3"
      placeholder="请输入简介">
    </el-input>
    <mavon-editor
      ref="md"
      :plain="true"
      style="height: 600px"
      @save = "saveArticles"
      fontSize = "16px">
      <button type="button"
              class="el-icon-s-management"
              :title="'封面'"
              slot="left-toolbar-after"
              @click="dialogVisible = true"></button>
    </mavon-editor>
    <el-button type="danger" class="el-icon-delete-solid" @click="cancel" style="float: right;margin-top: 30px;margin-right: 20px;">取消</el-button>
    <el-button type="primary" class="el-icon-finished"  @click="publish" style="float: right;margin-top: 30px;margin-right: 20px;">发布</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <el-divider content-position="left">封面</el-divider>
      <img-upload @change="isUpload = true" ref="Ud" style="margin-top: 5px"></img-upload>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './common/ImgUpload'
export default {
  name: 'Publish',
  components: {ImgUpload},
  data () {
    return {
      article: {
        title: '',
        profile: '',
        contentMd: '',
        contentHtml: '',
        img: '',
        date: ''
      },
      dialogVisible: false,
      isUpload: false
    }
  },
  methods: {
    saveArticles (md, html) {
      if (this.isOk()) {
        this.article.contentMd = md
        this.article.contentHtml = html
        this.article.date = this.getDate()
        this.img = this.$refs.Ud.ImgUrl
        this.$message({type: 'success', message: '保存成功'})
      } else {
        this.$message({type: 'warning', message: '请填写完整信息以及上传封面!'})
      }
    },
    getDate () {
      var today = new Date()
      var day = String(today.getDate()).padStart(2, '0')
      var month = String(today.getMonth() + 1).padStart(2, '0')
      var year = today.getFullYear()
      return year + '-' + month + '-' + day
    },
    goBack () {
      this.$router.push({path: '/home'})
    },
    publish () {
      this.$confirm('是否保存并发布文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.isOk()) {
          var md = this.$refs.md.d_value
          var html = this.$refs.md.d_render
          this.saveArticles(md, html)
          this.$axios
            .post('/article/publish', {
              title: this.article.title,
              md: this.article.contentMd,
              html: this.article.contentHtml,
              img: this.img,
              profile: this.article.profile,
              date: this.article.date
            }).then(resp => {
              if (resp && resp.status === 200) {
                this.$message({
                  type: 'success',
                  message: '已发布'
                })
              }
            })
        } else this.$message({type: 'warning', message: '请填写完整信息以及上传封面!'})
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消发布'
        })
      })
    },
    cancel () {
      this.goBack()
    },
    isOk () {
      var title = this.article.title.length
      var profile = this.article.profile.length
      if (title !== 0 && profile !== 0 && this.isUpload !== false) return true
      else return false
    }
  }
}
</script>

<style scoped>
</style>
