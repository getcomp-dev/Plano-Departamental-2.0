import Vue from "vue";
import App from "./App.vue";
import store from "./vuex/store";
import router from "./router";
import axios from "./common/services/axios";
import { sync } from "vuex-router-sync";
sync(store, router);
axios(Vue, store);

import SocketIoInstance from "./socketInstance.js";
import VueSocketio from "vue-socket.io";
import LodashVue from "./plugins/lodashVue.js";
import PortalVue from "portal-vue";
import { AlertPlugin, PopoverPlugin } from "bootstrap-vue";
import Notifications from "vue-notification";

Vue.use(VueSocketio, SocketIoInstance, store);
Vue.use(LodashVue);
Vue.use(PortalVue);
Vue.use(Notifications);
Vue.use(AlertPlugin);
Vue.use(PopoverPlugin);

//Global components
import {
  PageHeader,
  BaseTable,
  BaseModal,
  BaseButton,
  VTd,
  VTh,
  VThOrdination,
} from "./components/global";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("BaseButton", BaseButton);
Vue.component("BaseTable", BaseTable);
Vue.component("BaseModal", BaseModal);
Vue.component("PageHeader", PageHeader);
Vue.component("v-td", VTd);
Vue.component("v-th", VTh);
Vue.component("v-th-ordination", VThOrdination);

//Global mixins
import { mapActions, mapGetters } from "vuex";
Vue.mixin({
  methods: {
    ...mapActions(["pushNotification", "setPartialLoading"]),
  },
  computed: {
    ...mapGetters(["currentPlano"]),
  },
});

//css
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./css/global.css";

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

global.vm = vm;
