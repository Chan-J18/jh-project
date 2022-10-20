<template>
  <div >
    <el-menu
      style="margin-bottom: 20px"
      :default-active= "'/recent'"
      :router="true"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#00BFFF"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :key="1" index="/recent" >最新资讯</el-menu-item>
      <el-menu-item :key="2" index="/recommend">推荐资讯</el-menu-item>
      <el-submenu  index="3" >
        <template slot="title">主题文章</template>
        <el-menu-item :key="3" index="/topic/军事" >军事</el-menu-item>
        <el-menu-item :key="4" index="/topic/娱乐">娱乐</el-menu-item>
        <el-menu-item :key="5" index="/topic/生活">生活</el-menu-item>
      </el-submenu>
      <el-menu-item :key="6" index="/" class="el-icon-switch-button" style="float: right" @click="logout"></el-menu-item>
      <el-menu-item :key="7" index="/Manage/个人中心" class="el-icon-user" style="float: right" ></el-menu-item>
      <el-menu-item :key="8" index="/Manage/主题管理" class="el-icon-tickets" style="float: right"></el-menu-item>
      <el-menu-item :key="9" index="/Publish" class="el-icon-circle-plus" style="float: right" ></el-menu-item>
      <span style="position: absolute;padding-top: 10px;right: 49%;font-size: 30px;font-weight: bold ;color: white">网闻天下事</span>
    </el-menu>
    <router-view :key="key" ></router-view>
    <router-view name="header" ></router-view>
    <div class="container">
      <!-- main中心位置的命名视图 -->
      <router-view name="main" ></router-view>
      <!-- right右侧栏命名视图 -->
      <router-view name="right"  style="margin-left: 20px;"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  },
  data () {
    return {
      articles: []
    }
  },
  mounted () {
  },
  methods: {
    handleSelect (key, keyPath) {
    },
    logout () {
      this.$store.commit('logout')
    }
  }
}
</script>

<style scoped>
  .container{
    display:flex;
    height: 600px;
  }
  .header {
    background-color: orange;
    height: 80px;
  }
  .main {
    background-color: lightgreen;
    flex: 8;
  }

  .right {
    background-color: lightpink;
    flex: 2;
  }
</style>
