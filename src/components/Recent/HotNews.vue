<template>
  <div style="margin-top: 40px">
    <div class="articles-area">
      <el-card style="text-align: center" @click="newDetail">
        <i class="el-icon-thumb" style="font-size: 40px;"><strong>热点资讯</strong></i>
        <div v-for="(item, index) in hotNews" :key="index" style="margin-top: 10px">
          <div style="float:left;width:85%;height:35px;">
            <router-link class="article-link" :to="{path:'/article',query:{id: item.id, back: '/recent'}}" ><span style="font-size: 15px">{{index+1}}、 {{item.title}}</span></router-link>
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
    var _this = this
    this.$axios.get('/article/hot')
      .then(resp => {
        _this.hotNews = resp.data.content
      })
  },
  methods: {
    newDetail () {
    }
  }
}
</script>

<style scoped>
  .articles-area {
    width: 450px;
    height: 750px;
    margin-left: auto;
    margin-right: auto;
  }

  .article-link {
    text-decoration: none;
    color: #606266;
  }

  .article-link:hover {
    color: #409EFF;
  }
</style>
