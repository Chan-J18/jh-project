<template >
    <el-container id="admin-body">
      <el-header style="z-index: 1;height: 80px;">
        <Header style="position: absolute;width: 98%;"></Header>
      </el-header>
      <!--<el-row style="height: 100%;">-->
      <el-container>
        <el-aside style="height:700px;margin-top: 20px;width: 450px">
          <admin-menu></admin-menu>
        </el-aside>
        <el-main>
          <router-view :key="key"/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import AdminMenu from './AdminMenu'
import Header from './Header'
export default {
  name: 'AdminIndex',
  components: {AdminMenu, Header},
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {
    key () {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  #admin-body {
    height: 95vh;
  }
</style>
