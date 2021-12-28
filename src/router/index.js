import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Index from "@/components/Index.vue";
Vue.use(VueRouter);
const files = require.context('../views/', true, /\.vue$/);
const pathArr = [];
const subNameArr = { home: "后台管理", user: "用户管理", order: "订单管理" };
const subNameIcon = { home: "el-icon-s-tools", user: "el-icon-s-custom", order: "el-icon-s-shop" };
const nameArr = { Home: "首页", Manage: "图表", Order: "订单", Auth: "授权", User: "用户" };
const linkInfo = {};
files.keys().forEach(key => {
  const arr = key.split('/');
  arr.shift();
  const path = arr[1].split('.').shift().toLowerCase() === 'home' ? '/' : `/${arr[1].split('.').shift().toLowerCase()}`
  const routeInfo = {
    path: path,
    name: arr[1].split('.').shift(),
    component: () => import(/* webpackChunkName: "[request]" */ '../views/' + arr.join('/'))
  };
  linkInfo[subNameArr[arr[0]]] = linkInfo[subNameArr[arr[0]]] ? linkInfo[subNameArr[arr[0]]] : [];
  linkInfo[subNameArr[arr[0]]].push({
    name: nameArr[routeInfo.name],
    parentName: arr[0],
    path: routeInfo.path
  });
  pathArr.push(routeInfo);
});
Vue.prototype.$menuArr = Object.keys(linkInfo).map((key) => {
  return { name: key, id: linkInfo[key][0].parentName, icon: subNameIcon[linkInfo[key][0].parentName], menu: linkInfo[key] };
})
const routes = [
  {
    path: "/",
    component: Index,
    children: pathArr
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
const isAuthenticated = sessionStorage.getItem("token");;
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) {
    next({ name: 'Login' });
  }
  else {
    next();
  };
});
export default router;
