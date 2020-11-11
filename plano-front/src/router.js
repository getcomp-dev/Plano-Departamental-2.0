import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";
// Dashboard
import Login from "@/pages/dashboard/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import DashboardHome from "@/pages/dashboard/Home";

Vue.use(VueRouter);

function requireAuth(to, from, next) {
  store
    .dispatch("fetchUsuario")
    .then(() => {
      next();
    })
    .catch(() => {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    });
}

function requireAdmin(to, from, next) {
  if (!store.getters.Admin) next("/");
  else next();
}

function requireSuperAdmin(to, from, next) {
  if (!store.getters.SuperAdmin) next("/");
  else next();
}

function lazyLoad(componentPath) {
  return () => import("./pages/" + componentPath);
}

const routes = [
  { path: "*", redirect: "/dashboard" },

  {
    path: "/login",
    name: "login",
    component: Login,
  },

  {
    path: "/logout",
    name: "logout",
    beforeEnter: (to, from, next) => {
      store.commit("USER_LOGGED_OUT");
      next("/login");
    },
  },

  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      { path: "", name: "dashboardHome", component: DashboardHome },

      //plano
      {
        path: "/plano/turmas-dcc",
        name: "turmasDcc",
        component: lazyLoad("plano/TurmasDCC"),
        beforeEnter: requireAdmin,
      },
      {
        path: "/plano/turmas-externas",
        name: "turmasExternas",
        component: lazyLoad("plano/TurmasExternas"),
        beforeEnter: requireAdmin,
      },
      {
        path: "/plano/carga-pos",
        name: "cargaPos",
        component: lazyLoad("plano/CargaPos"),
        beforeEnter: requireAdmin,
      },
      {
        path: "/plano/validacoes",
        name: "validacoes",
        component: lazyLoad("plano/Validacoes"),
        beforeEnter: requireAdmin,
      },

      //relatorios
      {
        path: "/relatorios/carga-professores",
        name: "cargaProfessores",
        component: lazyLoad("relatorios/CargaProfessores"),
      },
      {
        path: "/relatorios/grade-disciplinas",
        name: "gradeDisciplinas",
        component: lazyLoad("relatorios/GradeDisciplinas"),
      },
      {
        path: "/relatorios/horarios-cursos",
        name: "horariosCursos",
        component: lazyLoad("relatorios/HorariosCursos"),
      },
      {
        path: "/relatorios/horarios-laboratorios",
        name: "horariosLaboratorios",
        component: lazyLoad("relatorios/HorariosLabs"),
      },
      {
        path: "/relatorios/relatorio-disciplinas",
        name: "relatorioDisciplinas",
        component: lazyLoad("relatorios/PlanoDepartamental"),
      },
      {
        path: "/relatorios/turmas-cursos",
        name: "turmasCursos",
        component: lazyLoad("relatorios/TurmasCursos"),
      },

      //gerenciar
      {
        path: "/gerenciar/cursos",
        name: "cursos",
        component: lazyLoad("gerenciar/Cursos"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/disciplinas",
        name: "disciplinas",
        component: lazyLoad("gerenciar/Disciplinas"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/docentes",
        name: "docentes",
        component: lazyLoad("gerenciar/Docentes"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/grades",
        name: "grades",
        component: lazyLoad("gerenciar/Grades"),
        beforeEnter: requireSuperAdmin,
      },

      {
        path: "/gerenciar/perfis",
        name: "perfis",
        component: lazyLoad("gerenciar/Perfis"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/grades-edit",
        name: "gradesEdit",
        component: lazyLoad("gerenciar/GradesEdit"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/history",
        name: "history",
        component: lazyLoad("gerenciar/History"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/planos",
        name: "planos",
        component: lazyLoad("gerenciar/Planos"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/salas",
        name: "salas",
        component: lazyLoad("gerenciar/Salas"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/usuarios",
        name: "usuarios",
        component: lazyLoad("gerenciar/Usuarios"),
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "/gerenciar/preferencias-docentes",
        name: "preferenciasDocentes",
        component: lazyLoad("gerenciar/PreferenciasDocentes"),
        beforeEnter: requireSuperAdmin,
      },

      //historico
      {
        path: "/historico/buscar-turmas",
        name: "buscarTurmas",
        component: lazyLoad("historico/BuscarTurmas"),
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
  store.commit("SET_PARTIAL_LOADING", true);
  next();
});

router.afterEach(() => {
  setTimeout(() => store.commit("SET_PARTIAL_LOADING", false), 500);
});

export default router;
