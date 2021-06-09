import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routes";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
  linkExactActiveClass: "active",
  saveScrollPosition: true,
});

router.beforeEach((to, from, next) => {
  store.dispatch("setLoading", { type: "route", value: true });
  next();
});

router.afterEach(() => {
  store.dispatch("setLoading", { type: "route", value: false, wait: 500 });
});

export default router;
