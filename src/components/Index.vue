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
            <el-submenu v-for="sub in $menuArr" :index="sub.id" :key="sub.id">
              <template slot="title">
                <i class="el-icon-setting"></i>{{ sub.name }}
              </template>
              <router-link
                v-for="menu in sub.menu"
                :to="menu.path"
                :key="menu.path"
              >
                <el-menu-item :index="menu.path">
                  {{ menu.name }}
                </el-menu-item>
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
      defaultOpeneds: ["home"],
      defaultActive: "/",
    };
  },
  created() {
    console.log(this.$menuArr);
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