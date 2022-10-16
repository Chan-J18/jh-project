<template>
  <div>
    <el-upload
      action="http://localhost:8443/article/img/add"
      list-type="picture-card"
      :limit="1"
      :on-success="handleSuccess"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i :plain="true"  class="el-icon-plus"></i>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  data () {
    return {
      dialogImageUrl: '',
      ImgUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove (file, fileList) {
      this.dialogImageUrl = ''
      this.$axios.post('/article/img/remove', {url: this.ImgUrl})
        .then(resp => {
          if (resp.data.code === 200) {
            this.ImgUrl = ''
            this.$emit('change', false)
          }
        })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleExceed () {
      this.$message('请先删除图片再上传新图片！')
    },
    handleSuccess (res) {
      this.ImgUrl = res
      this.$emit('change', true)
    }
  }
}
</script>

<style scoped>

</style>
