import Vue from "vue";
import App from "@/App";
import router from "@/router";
import i18n from "./i18n";
import "./element";
import store from "./vuex";

Vue.config.productionTip = false;

new Vue({
  router,
  i18n,
  store,
  render: (h) => h(App),
}).$mount("#app");
