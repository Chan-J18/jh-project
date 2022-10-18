<template>
  <div >
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="(item, index) in headerNews" :key="index" >
        <el-image :src="item.img" class="carousel_image_type" @click="newDetail(item.id)"></el-image>
        <h3 class="medium">{{ item.title }}</h3>
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
      headerNews: []
    }
  },
  mounted () {
    var _this = this
    this.$axios.get('/article/header')
      .then(resp => {
        _this.headerNews = resp.data.content
      })
  },
  methods: {
    newDetail (id) {
      this.$router.push({path: '/article',
        query:
          {
            id: id,
            back: '/recent'
          }})
    }
  }
}
</script>

<style scoped>
  .carousel_image_type{
    width: 90%;
    height: 90%;
  }
</style>
