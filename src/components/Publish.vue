<template>
  <div>
    <el-row style="margin: 18px 0px 0px 18px ">
      <el-page-header @back="goBack" content="编辑器">
      </el-page-header>
    </el-row>
    <el-input
      style="margin: 10px 0px;font-size: 18px;"
      placeholder="请输入标题">
    </el-input>
    <el-input
      style="margin: 10px 0px;font-size: 18px;"
      type="textarea"
      :rows="3"
      placeholder="请输入简介">
    </el-input>
    <mavon-editor
      style="height: 600px"
      ref = md
      @save = "saveArticles"
      fontSize = "16px">
      <button type="button"
              class="el-icon-s-management"
              :title="'封面'"
              slot="left-toolbar-after"
              @click="dialogVisible = true"></button>
    </mavon-editor>
    <el-button type="danger" class="el-icon-delete-solid" style="float: right;margin-top: 30px;margin-right: 20px;">取消</el-button>
    <el-button type="primary" class="el-icon-finished" style="float: right;margin-top: 30px;margin-right: 20px;">发布</el-button>
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <el-divider content-position="left">封面</el-divider>
      <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import ImgUpload from './common/ImgUpload'
export default {
  name: 'Publish',
  components: {ImgUpload},
  data () {
    return {
      dialogVisible: false
    }
  },
  methods: {
    saveArticles () {
    },
    uploadImg () {
    },
    goBack () {
      this.$router.push({path: '/home'})
    }
  }
}
</script>

<style scoped>

</style>
