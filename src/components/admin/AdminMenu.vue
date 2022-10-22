<template>
    <el-menu
      style="width: 430px;"
      router
      mode="vertical">
      <div style="height: 80px;"></div>
      <template v-for="(item,i) in Menus">
        <!--index 没有用但是必需字段且为 string -->
        <el-submenu :key="i" :index="i + ''" style="text-align: left">
          <span slot="title" style="font-size: 17px;">
            <i :class="item.iconCls"></i>
            {{item.nameZh }}
          </span>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <i :class="child.icon"></i>
            {{ child.nameZh }}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
</template>

<script>
export default {
  name: 'AdminMenu',
  data () {
    return {
      activeIndex: ''
    }
  },
  computed: {
    Menus () {
      return this.$store.state.Menus
    }
  },
  mounted () {
  }
}
</script>

<style scoped>

</style>
