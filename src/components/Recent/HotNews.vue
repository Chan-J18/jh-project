<template>
  <div style="margin-top: 40px">
    <div >
      <el-card style="text-align: left;padding-bottom: 35px" >
        <i class="el-icon-thumb" style="font-size: 25px;"><strong>热点资讯</strong></i>
        <div v-for="(item, index) in hotNews" :key="index" style="margin-top: 15px">
          <div style="float:left;width:85%;margin-top: 20px">
            <router-link class="article-link" :to="{path:'/article',query:{id: item.id, back: '/recent'}}" ><span style="font-size: 15px"> <strong>{{item.title}}</strong></span></router-link>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotNews',
  data () {
    return {
      hotNews: []
    }
  },
  mounted () {
    this.load()
  },
  updated () {
    this.load()
  },
  methods: {
    load () {
      var _this = this
      this.$axios.get('/article/hot/' + 5)
        .then(resp => {
          _this.hotNews = resp.data.content
        })
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
