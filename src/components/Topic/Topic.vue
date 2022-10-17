<template>
  <div style="margin-top: 40px">
    <div class="articles-area">
      <el-card style="text-align: left">
        <div v-for="(item,index) in articles" :key="index">
          <div style="float:left;width:85%;height: 150px;">
            <router-link class="article-link" :to="{path:'/article',query:{id: item.id}}"><span style="font-size: 20px"><strong>{{item.title}}</strong></span></router-link>
            <el-divider content-position="right">{{item.date}}</el-divider>
            <router-link class="article-link" :to="{path:'/article',query:{id: item.id}}"><p>{{item.profile}}</p></router-link>
          </div>
          <el-image
            style="margin:18px 0 0 30px;width:100px;height: 100px"
            :src="item.img"
            fit="cover"></el-image>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
    <el-pagination
      :page-size="pagesize"
      style=" position: fixed;bottom: 0;height: 40px;width: 100%;text-align: center"
      layout="prev, pager, next"
      :current-page="page"
      @current-change="handleCurrentChange"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'Topic',
  data () {
    return {
      articles: [],
      page: 1,
      pagesize: 10,
      total: 0
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/topic/' + _this.$route.params.type + '/' + _this.pagesize + '/1')
      .then(resp => {
        _this.articles = resp.data.content
        _this.total = resp.data.totalElements
      })
  },
  methods: {
    handleCurrentChange (page) {
      var _this = this
      this.$axios.get('/topic/' + _this.$route.params.type + '/' + _this.pagesize + '/' + page)
        .then(resp => {
          if (resp && resp.status === 200) {
            _this.articles = resp.data.content
            _this.total = resp.data.totalElements
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
