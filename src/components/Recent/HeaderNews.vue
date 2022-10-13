<template>
  <div >
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in 6" :key="item">
        <img src="../../assets/tmp.png">
        <h3 class="medium">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <el-divider ></el-divider>
  </div>
</template>

<script>
export default {
  name: 'Recent',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
