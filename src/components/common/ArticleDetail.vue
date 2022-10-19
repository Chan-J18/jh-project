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
        <div class="tag-group">
          <el-tag
            style="margin-top:15px;margin-right: 20px;font-size: 15px"
            v-for="item in types"
            :key="item"
            :type="item"
          >
            {{ item }}
          </el-tag>
        </div>
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
      article: {},
      types: []
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/article/detail/' + this.$route.query.id)
      .then(resp => {
        _this.article = resp.data
        _this.$axios.get('/article/getType/' + resp.data.id)
          .then(resp => {
            _this.types = resp.data
            _this.$axios.post('/article/updateUserFeature')
          })
      })
  },
  methods: {
    goBack () {
      this.$router.push(this.$route.query.back)
    }
  }
}
</script>

<style scoped>

</style>
