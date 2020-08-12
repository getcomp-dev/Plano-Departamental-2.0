import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";

// Dashboard
import Login from "@/pages/dashboard/Login";
import Dashboard from "@/pages/dashboard/Dashboard";
import DashboardHome from "@/pages/dashboard/Home";
// Plano
import PlanoTurmasDCC from "@/pages/plano/TurmasDCC";
import PlanoTurmasExternas from "@/pages/plano/TurmasExternas";
import PlanoCargaPos from "@/pages/plano/CargaPos";
import PlanoValidacoes from "@/pages/plano/Validacoes";
// Relatorios
import RelatoriosCargaProfessores from "@/pages/relatorios/CargaProfessores";
import RelatoriosGradeDisciplinas from "@/pages/relatorios/GradeDisciplinas";
import RelatoriosHorarios from "@/pages/relatorios/HorariosCursos";
import RelatoriosHorariosLabs from "@/pages/relatorios/HorariosLabs";
import RelatoriosPlanoDepartamental from "@/pages/relatorios/PlanoDepartamental";
// Gerenciar
import GerenciarCursos from "@/pages/gerenciar/Cursos";
import GerenciarDocentes from "@/pages/gerenciar/Docentes";
import GerenciarGradesEdit from "@/pages/gerenciar/GradesEdit";
import GerenciarGrades from "@/pages/gerenciar/Grades";
import GerenciarPerfis from "@/pages/gerenciar/Perfis";
import GerenciarDisciplinas from "@/pages/gerenciar/Disciplinas";
import GerenciarSalas from "@/pages/gerenciar/Salas";
import GerenciarHistory from "@/pages/gerenciar/History";
import GerenciarUsuarios from "@/pages/gerenciar/Usuarios";
import GerenciarPlanos from "@/pages/gerenciar/Planos";

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

const routes = [
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

  { path: "*", redirect: "/dashboard" },

  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      { path: "", name: "dashboardHome", component: DashboardHome },

      //plano
      {
        path: "plano/turmas-dcc",
        name: "turmasDcc",
        component: PlanoTurmasDCC,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/turmas-externas",
        name: "turmasExternas",
        component: PlanoTurmasExternas,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/carga-pos",
        name: "cargaPos",
        component: PlanoCargaPos,
        beforeEnter: requireAdmin,
      },
      {
        path: "plano/validacoes",
        name: "validacoes",
        component: PlanoValidacoes,
        beforeEnter: requireAdmin,
      },

      //relatorios
      {
        path: "relatorios/carga-professores",
        name: "cargaProfessores",
        component: RelatoriosCargaProfessores,
      },
      {
        path: "relatorios/grade-disciplinas",
        name: "gradeDisciplinas",
        component: RelatoriosGradeDisciplinas,
      },
      {
        path: "relatorios/horarios-cursos",
        name: "horariosCursos",
        component: RelatoriosHorarios,
      },
      {
        path: "relatorios/horarios-laboratorios",
        name: "horariosLaboratorios",
        component: RelatoriosHorariosLabs,
      },
      {
        path: "relatorios/relatorio-disciplinas",
        name: "relatorioDisciplinas",
        component: RelatoriosPlanoDepartamental,
      },

      //gerenciar
      {
        path: "gerenciar/cursos",
        name: "cursos",
        component: GerenciarCursos,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/disciplinas",
        name: "disciplinas",
        component: GerenciarDisciplinas,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/docentes",
        name: "docentes",
        component: GerenciarDocentes,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/grades",
        name: "grades",
        component: GerenciarGrades,
        beforeEnter: requireSuperAdmin,
      },

      {
        path: "gerenciar/perfis",
        name: "perfis",
        component: GerenciarPerfis,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/grades-edit",
        name: "gradesEdit",
        component: GerenciarGradesEdit,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/history",
        name: "history",
        component: GerenciarHistory,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/planos",
        name: "planos",
        component: GerenciarPlanos,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/salas",
        name: "salas",
        component: GerenciarSalas,
        beforeEnter: requireSuperAdmin,
      },
      {
        path: "gerenciar/usuarios",
        name: "usuarios",
        component: GerenciarUsuarios,
        beforeEnter: requireSuperAdmin,
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
