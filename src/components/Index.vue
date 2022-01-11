<template>
  <div>
    <el-container style="min-height: 100vh">
      <el-header class="clearfix">
        <h1 style="display: inline-block; font-size: 24px">知名后台管理系统</h1>
        <span style="float: right; font-size: 20px">
          {{ userInfo.name }}
          <el-button
            type="primary"
            style="margin-left: 40px; margin-top: 10px"
            @click="loginOut()"
            >退出</el-button
          ></span
        >
      </el-header>
      <el-container>
        <el-aside width="230px">
          <el-menu
            :default-openeds="defaultOpeneds"
            :default-active="defaultActive"
          >
            <el-submenu v-for="sub in $menuArr" :index="sub.id" :key="sub.id">
              <template slot="title">
                <i :class="sub.icon"></i>{{ sub.name }}
              </template>
              <router-link
                v-for="menu in sub.menu"
                :to="menu.path"
                :key="menu.path + '/' + sub.id"
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
import { decode } from "@/utils/utils";
export default {
  data() {
    return {
      defaultOpeneds: ["home"],
      defaultActive: "/",
      userInfo: {},
    };
  },
  created() {
    this.userInfo = JSON.parse(atob(decode(sessionStorage.getItem("token"))));
    this.defaultActive = this.$route.path;
    this.$menuArr.forEach((item) => {
      item.menu.forEach((e) => {
        if (this.$route.path === e.path) {
          this.defaultOpeneds = [e.parentName];
        }
      });
    });
  },
  methods: {
    loginOut() {
      sessionStorage.removeItem("token");
      window.location.href = "/";
    },
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
.el-main {
  position: relative;
}
</style>
