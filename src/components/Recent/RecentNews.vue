<template>
  <div style="margin-top: 40px">
    <div class="articles-area">
      <el-card style="text-align: left">
        <div v-for="index in 1" :key="index">
          <div style="float:left;width:85%;height: 150px;">
            <router-link class="article-link" to="/"><span style="font-size: 20px"><strong>title</strong></span></router-link>
            <el-divider content-position="right">发布时间</el-divider>
            <router-link class="article-link" to="/"><p>abstract</p></router-link>
          </div>
          <el-image
            style="margin:18px 0 0 30px;width:100px;height: 100px"
            :src="require('@/assets/tmp.png')"
            fit="cover"></el-image>
          <el-divider></el-divider>
        </div>
      </el-card>
    </div>
    <el-pagination
      :page-size="20"
      :pager-count="11"
      style=" position: fixed;bottom: 0;height: 40px;width: 100%;text-align: center"
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'RecentNews',
  data () {
    return {
      articles: [],
      pagesize: '',
      total: ''
    }
  }
}
</script>

<style scoped>
  .articles-area {
    width: 1500px;
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
