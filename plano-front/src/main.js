import Vue from "vue";
import App from "./App.vue";

import store from "./vuex/store";
import router from "./router";
import { sync } from "vuex-router-sync";

sync(store, router);

import axios from "./common/services/axios";

axios(Vue, store);
// css
import "./assets/css/botoes.css";
import "./assets/css/tables.css";
import "./assets/css/global.css";
// bootstrap
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/css/fontawesome-all.css";
Vue.use(BootstrapVue);

import PortalVue from "portal-vue";
Vue.use(PortalVue);

import Notifications from "vue-notification";

Vue.use(Notifications);

import socketio from "socket.io-client";
import VueSocketio from "vue-socket.io";

Vue.use(
  VueSocketio,
  socketio("http://200.131.219.57:3000", { autoConnect: false }),
  store
);

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

global.vm = vm;
