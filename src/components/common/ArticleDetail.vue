<template>
    <el-container>
      <el-header>
        <el-row style="margin: 0px 0px 0px 18px ">
          <el-page-header @back="goBack" content="详情">
          </el-page-header>
        </el-row>
      </el-header>
      <el-container style="height: 100%">
        <el-aside style="width:480px;margin-top: 20px;margin-left: 50px;margin-right: 30px" >
          <el-card style="text-align: left;padding-bottom: 15px;" >
            <div v-for="(item, index) in hotNews" :key="index" style="margin-top: 10px">
              <div style="float:left;width:85%;margin-bottom: 35px">
                <a class="article-link" @click="changeArticle(item.id)" ><span style="font-size: 15px"> <strong>{{item.title}}</strong></span></a>
              </div>
            </div>
          </el-card>
        </el-aside>
        <el-main>
          <el-card style="text-align: left;width: 1300px;">
            <div>
              <span style="font-size: 30px"><strong>{{article.title}}</strong></span>
              <el-divider content-position="left">{{article.date}}</el-divider>
              <div class="tag-group">
                <el-tag
                  style="margin-bottom:10px;margin-right: 20px;font-size: 15px"
                  v-for="item in types"
                  :key="item"
                  :type="item"
                >
                  {{ item }}
                </el-tag>
              </div>
              <el-image :src="article.img" style="width: 1260px;height: 700px;margin: 0 auto auto auto"></el-image>
              <div >
                <div class="markdown-body" v-html="article.html"></div>
              </div>
            </div>
            <div style="margin-top: 30px">
              <el-button size="medium" class="el-icon-thumb" round @click.once="clickLike">点赞{{article.atimes}}</el-button>
              <el-button size="medium" class="el-icon-edit-outline" round @click="clickComment">评论{{article.ctimes}}</el-button>
            </div>
          </el-card>
          <el-card v-if="isComment" style="text-align: left;width: 1300px;margin-top: 15px">
            <div style="height: 170px">
              <i class="el-icon-edit"></i>
              <span style="font-size: 17px">添加新评论</span>
              <div style="margin-top: 20px" >
                <el-input class="gray-bg-input"
                          v-model="inputComment"
                          type="textarea"
                          :rows="4"
                          autofocus
                          placeholder="写下你的评论">
                </el-input>
                <div class="btn-control" style="float:right;margin-top: 10px;margin-bottom: 15px">
                  <el-button  type="primary" round @click="commitComment">评论</el-button>
                </div>
              </div>
            </div>
            <el-divider></el-divider>
            <div v-for="(item,index) in comments"
                 :key="index">
              <el-card style="margin-top: 10px">
                <span style="font-size: 20px"><strong>{{item.username}}</strong></span>
                <el-divider content-position="right">{{item.date}}</el-divider>
                <span>{{item.comment}}</span>
              </el-card>
            </div>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: {},
      isComment: false,
      types: [],
      inputComment: '',
      comments: [],
      hotNews: []
    }
  },
  mounted () {
    this.load(this.$route.query.id)
  },
  methods: {
    goBack () {
      this.$router.push({path: this.$route.query.back})
    },
    commitComment () {
      this.comments.unshift({
        username: this.$store.state.user.username,
        comment: this.inputComment,
        date: this.getDate()
      })
      this.$axios.post('/article/addComment/UserComment', {
        content: this.inputComment,
        date: this.getDate()
      }).then(resp => {
        var cid = resp.data
        this.$axios.get('article/addComment/CommentArticle/' + this.$route.query.id + '/' + cid)
        this.article.ctimes += 1
      })
    },
    getDate () {
      var today = new Date()
      var day = String(today.getDate()).padStart(2, '0')
      var month = String(today.getMonth() + 1).padStart(2, '0')
      var year = today.getFullYear()
      return year + '-' + month + '-' + day
    },
    clickLike () {
      this.article.atimes = this.article.atimes + 1
      this.$axios.get('/article/updateApp/' + this.article.id)
    },
    clickComment () {
      if (this.isComment === true) this.isComment = false
      else this.isComment = true
    },
    load (id) {
      var _this = this
      this.$axios.get('/article/detail/' + id)
        .then(resp => {
          _this.article = resp.data
          _this.$axios.get('/article/getType/' + resp.data.id)
            .then(resp => {
              _this.types = resp.data
              _this.$axios.post('/article/updateUserFeature')
            })
          _this.$axios.get('/article/getComments/' + id)
            .then(resp => {
              this.comments = resp.data
            })
        })
      this.$axios.get('/article/hot/' + 10)
        .then(resp => {
          _this.hotNews = resp.data.content
        })
    },
    changeArticle (id) {
      this.load(id)
    }
  }
}
</script>

<style scoped>
  .article-link {
    text-decoration: none;
    color: #606266;
  }

  .article-link:hover {
    color: #409EFF;
  }
</style>
