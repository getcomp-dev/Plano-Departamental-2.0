import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import axios from "./services/axios";
import { sync } from "vuex-router-sync";
import SocketIoInstance from "./socketInstance.js";
import VueSocketio from "vue-socket.io";
sync(store, router);
axios(Vue, store);
Vue.use(VueSocketio, SocketIoInstance, store);

import PortalVue from "portal-vue";
import Notifications from "vue-notification";
import Vuelidate from "vuelidate";
Vue.use(PortalVue);
Vue.use(Notifications);
Vue.use(Vuelidate);

import {
  VBPopover,
  FormPlugin,
  FormSelectPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  BFormCheckbox,
  BFormTextarea,
  BFormFile,
} from "bootstrap-vue";
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormSelectPlugin);
Vue.directive("b-popover", VBPopover);
Vue.component("b-form-checkbox", BFormCheckbox);
Vue.component("b-form-textarea", BFormTextarea);
Vue.component("b-form-file", BFormFile);

//Global components
import { BaseTable, BaseModal, BaseButton, VTd, VTh, VThOrdination } from "./components/global";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("BaseButton", BaseButton);
Vue.component("BaseTable", BaseTable);
Vue.component("BaseModal", BaseModal);
Vue.component("v-td", VTd);
Vue.component("v-th", VTh);
Vue.component("v-th-ordination", VThOrdination);

//Global mixins
import { mapActions, mapGetters } from "vuex";
Vue.mixin({
  methods: {
    ...mapActions(["pushNotification", "setLoading"]),
  },
  computed: {
    ...mapGetters(["currentPlano"]),
  },
});

//css
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/global.scss";

Vue.config.productionTip = false;

var vm = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

global.vm = vm;
