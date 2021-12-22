import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as api from "@/utils/api";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$api = api;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
