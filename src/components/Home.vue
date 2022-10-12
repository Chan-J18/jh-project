<template>
  <div>
    <el-menu
      :default-active="'/recent'"
      :router="true"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item :key="1" index="/recent">最新资讯</el-menu-item>
      <el-menu-item :key="2" index="/recommend">推荐资讯</el-menu-item>
      <el-submenu  index="3" >
        <template slot="title">主题文章</template>
        <el-menu-item :key="3" index="/topic?军事" >军事</el-menu-item>
        <el-menu-item :key="4" index="/topic?娱乐">娱乐</el-menu-item>
        <el-menu-item :key="5" index="/topic?生活">生活</el-menu-item>
      </el-submenu>
      <i class="el-icon-switch-button" v-on:click="logout" style="float:right;font-size: 40px;color: #222;padding: 10px;color: white"></i>
      <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold ;color: white">网闻天下事</span>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  methods: {
    handleSelect (key, keyPath) {
    },
    logout () {
      console.log('logout')
    }
  }
}
</script>

<style scoped>
</style>
