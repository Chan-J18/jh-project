<template>
  <el-card style="width: 100%;height: 100%">
    <div>
      <el-dialog
        title="修改用户信息"
        :visible.sync="dialogFormVisible">
        <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
          <el-form-item label="用户名" label-width="120px" prop="username">
            <label>{{selectedUser.username}}</label>
          </el-form-item>
          <el-form-item label="邮箱" label-width="120px" prop="email">
            <el-input v-model="selectedUser.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="座右铭" label-width="120px" prop="email">
            <el-input type="textarea" v-model="selectedUser.motto" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit(selectedUser)">确 定</el-button>
        </div>
      </el-dialog>
      <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>用户信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-card style="margin: 18px 2%;width: 95%">
        <el-table
          ref="multipleTable"
          :data="users"
          stripe
          :default-sort = "{prop: 'id', order: 'ascending'}"
          style="width: 100%"
          :max-height="tableHeight">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="id"
            sortable
            width="100">
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="300px"
            >
          </el-table-column>
          <el-table-column
            prop="motto"
            label="座右铭"
            show-overflow-tooltip
            fit>
          </el-table-column>
          <el-table-column
            label="操作"
            width="120">
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
  name: 'UserProfile',
  data () {
    return {
      dialogFormVisible: false,
      selectedUser: {},
      selectedIndex: '',
      users: []
    }
  },
  mounted () {
    this.listUsers()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    listUsers () {
      var _this = this
      this.$axios.get('/admin/user/list').then(resp => {
        _this.users = resp.data
      })
    },
    onSubmit () {
      this.$axios.post('/admin/user/update', {
        id: this.selectedUser.id,
        username: this.selectedUser.username,
        password: this.selectedUser.password,
        salt: this.selectedUser.password,
        email: this.selectedUser.email,
        motto: this.selectedUser.motto
      }).then(() => {
        this.users[this.selectedIndex] = this.selectedUser
        this.dialogFormVisible = false
      })
    },
    editUser (user, index) {
      this.dialogFormVisible = true
      this.selectedUser = user
      this.selectedIndex = index
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
      this.$refs.multipleTable.selection.forEach(user => {
        this.$axios.get('/admin/user/delete/' + user.id)
          .then(() => {
            this.users.forEach((u, index) => {
              if (u.id === user.id) {
                this.users.splice(index)
              }
            })
          })
      })
      this.$refs.multipleTable.clearSelection()
    },
    deleteRow (index) {
      this.$axios.get('/admin/user/delete/' + this.users[index].id)
        .then(() => {
          this.users.splice(index, 1)
        })
    }
  }
}
</script>

<style scoped>

</style>
