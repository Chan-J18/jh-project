<template>
    <el-card style="width: 100%;height: 100%">
      <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/admin/content/article'}">文章管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章编辑器</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-input
        v-model="article.title"
        style="margin: 10px 0px;font-size: 18px;"
        placeholder="请输入标题">
      </el-input>
      <div style="float:left;">
        <label >主题:</label>
        <el-tag
          v-for="(tag,index) in labelTags"
          :key="index+1"
          closable
          :disable-transitions="false"
          @close="handleClose(index)">
          {{tag}}
        </el-tag>
        <el-select v-model="selectedType" placeholder="请选择" class="button-new-tag" size="small">
          <el-option
            v-for="(item,index) in defaultTags"
            :key="index+1"
            :label="item "
            :value="index+1">
          </el-option>
        </el-select>
        <el-button  class="button-new-tag" size="small" icon="el-icon-plus" @click="addType"></el-button>
      </div>
      <el-input
        v-model="article.profile"
        style="margin: 10px 0px;font-size: 18px;"
        type="textarea"
        :rows="3"
        placeholder="请输入简介">
      </el-input>
      <mavon-editor
        ref="md"
        :value="article.md"
        :plain="true"
        style="height: 500px"
        @save = "saveArticles"
        fontSize = "16px">
      </mavon-editor>
      <el-button type="danger" class="el-icon-delete-solid" @click="cancel" style="float: right;margin-top: 30px;margin-right: 20px;">取消</el-button>
      <el-button type="primary" class="el-icon-finished"  @click="publish" style="float: right;margin-top: 30px;margin-right: 20px;">确定修改</el-button>
    </el-card>
</template>

<script>
import ImgUpload from '../../common/ImgUpload'
export default {
  name: 'Detail',
  components: {ImgUpload},
  data () {
    return {
      article: {}, // 文章内容
      dialogVisible: false,
      defaultTags: ['军事', '生活', '娱乐'], // 默认标签类型
      selectedType: 1, // 目前所选标签类型
      labelTags: [], // 文章标签String
      indexTags: []
    }
  },
  mounted () {
    this.loadArticle()
  },
  methods: {
    loadArticle () {
      this.$axios.get('/article/detail/' + this.$route.query.id)
        .then(resp => {
          this.article = resp.data
          this.$axios.get('/article/getTags/' + this.$route.query.id)
            .then(resp => {
              this.indexTags = resp.data // 得到的是数字
              this.indexTags.forEach(index => {
                this.labelTags.push(this.defaultTags[index - 1])
              })
            })
        })
    },
    isOk () {
      var title = this.article.title.length
      var profile = this.article.profile.length
      var types = this.indexTags.length
      if (title !== 0 && profile !== 0 && types !== 0) return true
      else return false
    },
    cancel () {
      this.$router.push('/admin/content/article')
    },
    publish () {
      if (this.isOk()) {
        var md = this.$refs.md.d_value
        var html = this.$refs.md.d_render
        this.saveArticles(md, html)
        this.$axios
          .post('/article/publish', {
            id: this.article.id,
            title: this.article.title,
            md: this.article.contentMd,
            html: this.article.contentHtml,
            img: this.article.img,
            profile: this.article.profile,
            date: this.article.date
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.$axios.post('article/types', {
                aid: this.article.id,
                types: this.indexTags // 要传递数字
              }).then(resp => {
                this.$router.push('/admin/content/article')
              })
            }
          })
      } else this.$message({type: 'warning', message: '请填写完整信息!'})
    },
    saveArticles (md, html) {
      if (this.isOk()) {
        this.article.contentMd = md
        this.article.contentHtml = html
        this.$message({type: 'success', message: '保存成功'})
      } else {
        this.$message({type: 'warning', message: '请填写完整信息!'})
      }
    },
    addType () {
      if (!this.indexTags.includes(this.selectedType)) {
        this.labelTags.push(this.defaultTags[this.selectedType - 1])
        this.indexTags.push(this.selectedType)
      }
    },
    handleClose (index) {
      this.labelTags.splice(index, 1)
      this.indexTags.splice(index, 1)
    }
  }
}
</script>

<style scoped>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    width: 90px;
    vertical-align: bottom;
  }
</style>
