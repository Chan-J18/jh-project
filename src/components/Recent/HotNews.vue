<template>
  <div style="margin-top: 40px">
    <div class="articles-area">
      <el-card style="text-align: left">
        <div v-for="index in 1" :key="index">
          <div style="float:left;width:85%;height: 150px;">
            <router-link class="article-link" to="/" ><span style="font-size: 20px"><strong>title</strong></span></router-link>
            <el-divider content-position="right">发布时间</el-divider>
            <router-link class="article-link" to="/"><p>abstract</p></router-link>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotNews'
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
