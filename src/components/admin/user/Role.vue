<template>
  <el-card style="width: 100%;height: 100%">
    <div>
      <el-dialog
        style="width: 50%;margin-top: 100px;margin-left: 500px;"
        title="修改角色配置"
        :visible.sync="dialogFormVisible">
        <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
          <el-form-item label="用户名" label-width="120px" prop="username">
            <label>{{selectedUser.username}}</label>
          </el-form-item>
          <el-form-item label="角色" label-width="120px" prop="role">
            <el-radio-group v-model="role" >
              <el-radio :label="1">用户</el-radio>
              <el-radio :label="2">管理员</el-radio>
              <el-radio :label="3">发布者</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit()">确 定</el-button>
        </div>
      </el-dialog>
      <el-row style="margin: 18px 0px 0px 18px ">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          <el-breadcrumb-item>角色配置</el-breadcrumb-item>
        </el-breadcrumb>
      </el-row>
      <el-divider></el-divider>
      <el-card style="margin: 18px 2%;width: 95%">
        <el-table
          ref="multipleTable"
          :data="users"
          stripe
          :default-sort = "{prop: 'uid', order: 'ascending'}"
          style="width: 100%"
          :max-height="tableHeight">
          <el-table-column
            prop="uid"
            label="id"
            sortable
            fit>
          </el-table-column>
          <el-table-column
            prop="username"
            label="用户名"
            fit
          >
          </el-table-column>
          <el-table-column
            prop="rolename"
            label="角色"
            width="300px"
            fit
          >
          </el-table-column>
          <el-table-column
            label="操作"
            fit>
            <template slot-scope="scope">
              <el-button
                @click="editUser(scope.row,scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'role',
  data () {
    return {
      selectedUser: {},
      selectedIndex: '',
      users: [],
      dialogFormVisible: false,
      role: ''
    }
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  mounted () {
    this.list()
  },
  methods: {
    list () {
      this.$axios.get('admin/role/list')
        .then(resp => {
          this.users = resp.data
        })
    },
    editUser (user, index) {
      this.dialogFormVisible = true
      this.selectedUser = user
      this.selectedIndex = index
      this.role = user.rid
    },
    onSubmit () {
      this.$axios.post('/admin/role/update', {
        id: this.selectedUser.id,
        rid: this.role,
        uid: this.selectedUser.uid
      }).then(resp => {
        this.selectedUser.rid = this.role
        this.selectedUser.rolename = resp.data
        this.users[this.selectedIndex] = this.selectedUser
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

<style scoped>

</style>
