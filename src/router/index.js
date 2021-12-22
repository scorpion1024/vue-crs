import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/components/Login.vue";
import Index from "@/components/Index.vue";
Vue.use(VueRouter);
const files = require.context('../views/', true, /\.vue$/);
const pathArr = [];
const subNameArr = { home: "后台管理", user: "用户管理", order: "订单管理" };
const nameArr = { Chart: "图表", Home: "首页", Order: "订单", Auth: "授权", User: "用户" };
const linkArr = [];
files.keys().forEach(key => {
  const arr = key.split('/');
  arr.shift();
  const routeInfo = {
    path: `/${arr[1].split('.').shift().toLowerCase()}`,
    name: arr[1].split('.').shift(),
    component: () => import(/* webpackChunkName: "[request]" */ '../views/' + arr.join('/'))
  };
  const linkInfo = {
    parentName: arr[0],
  };
  pathArr.push(routeInfo);
  linkArr.push(linkInfo);
})
console.log(linkArr);
console.log(pathArr);
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
