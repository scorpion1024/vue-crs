<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="230px">
          <el-menu
            :default-openeds="defaultOpeneds"
            :default-active="defaultActive"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>后台管理
              </template>
              <router-link to="/">
                <el-menu-item index="1-1">首页</el-menu-item>
              </router-link>
              <router-link to="/order">
                <el-menu-item index="1-2">订单</el-menu-item>
              </router-link>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      defaultOpeneds: ["1"],
      defaultActive: "1-1",
    };
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
.el-menu {
  border: 0;
}
.el-aside {
  color: #333;
  border-right: solid 1px #e6e6e6;
  background-color: rgb(238, 241, 246);
}
</style>