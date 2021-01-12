import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";
// Dashboard
import Home from "@/pages/dashboard/Home";
import Login from "@/pages/dashboard/Login";
import Dashboard from "@/pages/dashboard/Dashboard";

Vue.use(VueRouter);

async function requireAuth(to, from, next) {
  try {
    await store.dispatch("fetchUsuario");
    next();
  } catch (error) {
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
}

function requireAdmin(to, from, next) {
  if (!store.getters.currentUser.isAdmin) next("/");
  else next();
}

function requireSuperAdmin(to, from, next) {
  if (!store.getters.currentUser.isSuperAdmin) next("/");
  else next();
}

function lazyLoad(componentPath) {
  return () => import("./pages/" + componentPath);
}

const routes = [
  { path: "*", redirect: "/" },
  { path: "/login", component: Login },
  {
    path: "/",
    redirect: "/home",
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      //home
      { path: "/home", component: Home },
      //plano
      {
        path: "/plano/turmas-dcc",
        component: lazyLoad("plano/TurmasDCC"),
        beforeEnter: requireAdmin,
      },
      {
        path: "/plano/turmas-externas",
        component: lazyLoad("plano/TurmasExternas"),
        beforeEnter: requireAdmin,
      },
      {
        path: "/plano/carga-pos",
        component: lazyLoad("plano/CargaPos"),
        beforeEnter: requireAdmin,
      },
      //relatorios
      {
        path: "/relatorios/carga-professores",
        component: lazyLoad("relatorios/CargaProfessores"),
      },
      {
        path: "/relatorios/grades-dcc",
        component: lazyLoad("relatorios/GradesDCC"),
      },
      {
        path: "/relatorios/grades-outros",
        component: lazyLoad("relatorios/GradesOutros"),
      },
      {
        path: "/relatorios/horarios-cursos",
        component: lazyLoad("relatorios/HorariosCursos"),
      },
      {
        path: "/relatorios/horarios-laboratorios",
        component: lazyLoad("relatorios/HorariosLabs"),
      },
      {
        path: "/relatorios/plano-departamental",
        component: lazyLoad("relatorios/PlanoDepartamental"),
      },
      {
        path: "/relatorios/turmas-cursos",
        component: lazyLoad("relatorios/TurmasCursos"),
      },
      //gerenciar
      {
        path: "/gerenciar/cursos",
        component: lazyLoad("gerenciar/Cursos"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/disciplinas",
        component: lazyLoad("gerenciar/Disciplinas"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/grades-edit",
        component: lazyLoad("gerenciar/GradesEdit"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/grades-cursos-externos-edit",
        component: lazyLoad("gerenciar/GradesCursosExternosEdit"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/docentes",
        component: lazyLoad("gerenciar/Docentes"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/grades",
        component: lazyLoad("gerenciar/Grades"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/gradesCursosExternos",
        component: lazyLoad("gerenciar/GradesCursosExternos"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/history",
        component: lazyLoad("gerenciar/History"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/perfis",

        component: lazyLoad("gerenciar/Perfis"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/plano-departamental",
        component: lazyLoad("gerenciar/Planos"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/preferencias-docentes",
        component: lazyLoad("gerenciar/PreferenciasDocentes"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/salas",
        component: lazyLoad("gerenciar/Salas"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/usuarios",
        component: lazyLoad("gerenciar/Usuarios"),
        beforeEnter: requireSuperAdmin,
      },
      //historico
      {
        path: "/historico/buscar-turmas",
        component: lazyLoad("historico/BuscarTurmas"),
      },
      //validacoes
      {
        path: "/validacoes/graduacao-dcc",
        component: lazyLoad("validacoes/graduacaoDCC"),
        beforeEnter: requireAdmin,
      },
    ],
  },
];

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
