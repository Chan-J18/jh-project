<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-page-header @back="goBack" content="详情">
      </el-page-header>
    </el-row>
    <el-card style="text-align: left;width: 1300px;margin: 35px auto 0 auto">
      <div>
        <el-image :src="article.img" style="width: 1300px;height: 750px"></el-image>
        <span style="font-size: 30px"><strong>{{article.title}}</strong></span>
        <el-divider content-position="left">{{article.date}}</el-divider>
        <div >
          <div v-html="article.html"></div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: {}
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/article/detail/' + this.$route.query.id)
      .then(resp => {
        _this.article = resp.data
      })
  },
  methods: {
    goBack () {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>

</style>
