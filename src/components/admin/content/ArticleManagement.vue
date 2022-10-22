<template>
  <el-card style="width: 100%;height: 100%">
    <div>
      <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item ref="item" :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
          <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-card style="margin: 18px 2%;width: 95%">
        <el-table
          ref="multipleTable"
          :data="articles"
          stripe
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%"
          :max-height="tableHeight">
          <el-table-column
            type="selection"
            fit>
          </el-table-column>
          <el-table-column
            prop="id"
            label="id"
            sortable
            width="100px">
          </el-table-column>
          <el-table-column
            prop="title"
            label="文章标题"
            fit
          >
          </el-table-column>
          <el-table-column
            prop="profile"
            label="简介"
            width="500px"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            width="200px">
            <template slot-scope="scope">
              <el-button
                @click="editUser(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="deleteRow(scope.$index)">
                移除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="margin: 20px 0 20px 0;float: left">
          <el-button type="primary" @click="toggleSelection()">取消选择</el-button>
          <el-button type="danger" @click="deleteList()">批量删除</el-button>
        </div>
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'ArticleManagement',
  data () {
    return {
      articles: [],
      dialogFormVisible: false,
      selectedArticle: {}
    }
  },
  mounted () {
    this.listArticles()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    editUser (article, index) {
      this.selectedArticle = article
      this.selectedIndex = index
      this.$router.push({path: '/admin/article/detail', query: {id: this.selectedArticle.id}})
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    deleteList () {
    },
    deleteRow () {
    },
    listArticles () {
      var _this = this
      this.$axios.get('/admin/article/list').then(resp => {
        _this.articles = resp.data
      })
    }
  }
}
</script>

<style scoped>

</style>
