<template>
  <el-card style="height: 70px;background: #00BFFF">
    <div style="position:absolute;left: 900px;">
      <span style="font-size: 27px;margin-left: 15px;font-weight: bold ;color: white"><strong>后台管理</strong></span>
    </div>
    <el-button class="el-icon-switch-button" size="medium" round v-on:click="logout" style="float: right"></el-button>
  </el-card>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
    }
  },
  methods: {
    logout () {
      this.$router.replace({path: '/'})
      this.$store.commit('logout')
    }
  }
}
</script>

<style scoped>

</style>
