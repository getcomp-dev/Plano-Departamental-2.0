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
  store.commit("SET_LOADING", { type: "partial", value: true });
  next();
});

router.afterEach((to) => {
  //Exceto rotas que fazem requisição pelo componente
  if (to.path !== "/gerenciar/history") {
    setTimeout(() => {
      store.commit("SET_LOADING", { type: "partial", value: false });
    }, 500);
  }
});

export default router;
