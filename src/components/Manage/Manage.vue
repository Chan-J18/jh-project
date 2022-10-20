<template>
    <el-card style="width: 1200px;margin-top: 40px;margin-left: 400px">
      <el-form ref="form" :model="info" label-width="80px" style="position: relative;left:30%;width: 400px">
        <el-form-item label="用户名">
          <el-input v-model="info.username"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="info.email"></el-input>
        </el-form-item>
        <el-form-item label="座右铭">
          <el-input type="textarea" v-model="info.motto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确认修改</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
</template>

<script>
export default {
  name: 'Manage',
  data () {
    return {
      type: this.$route.params.type,
      info: {}
    }
  },
  mounted () {
    this.$axios.get('/user/getUserInfo')
      .then(resp => {
        this.info = resp.data
        console.log(resp.data)
      })
  },
  methods: {
    onSubmit () {
      this.$confirm('是否确定修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/user/updateUserInfo', {
          username: this.info.username,
          email: this.info.email,
          motto: this.info.motto
        })
      })
    }
  }
}
</script>

<style scoped>
</style>
