import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";

// Dashboard
import Login from "@/pages/dashboard/TheLogin";
import Dashboard from "@/pages/dashboard/TheDashboard";
import DashboardHome from "@/pages/home/Home";
// Plano
import DashboardTurmasDCC from "@/pages/plano/turmas-dcc/TurmasDCC";
import DashboardTurmasExternas from "@/pages/plano/turmas-externas/TurmasExternas";
import DashboardCargaPos from "@/pages/plano/turmas-pos/CargaPos";
import DashboardValidacoes from "@/pages/plano/validacoes/Validacoes";
// Relatorios
import DashboardCargaProfessores from "@/pages/relatorios/CargaProfessores";
import DashboardGradeDisciplinas from "@/pages/relatorios/GradeDisciplinas";
import DashboardHorarios from "@/pages/relatorios/horarios-cursos/Horarios";
import DashboardHorariosLaboratorios from "@/pages/relatorios/horarios-labs/HorariosLabs";
import DashboardRelatorioDisciplinas from "@/pages/relatorios/RelatorioDisciplinas";
// Gerenciar
import DashboardCursos from "@/pages/gerenciar/Cursos";
import DashboardDocentes from "@/pages/gerenciar/Docentes";
import DashboardGradesEdit from "@/pages/gerenciar/GradesEdit";
import DashboardGrades from "@/pages/gerenciar/Grades";
import DashboardPerfis from "@/pages/gerenciar/Perfis";
import DashboardDisciplinas from "@/pages/gerenciar/Disciplinas";
import DashboardSalas from "@/pages/gerenciar/Salas";
import DashboardHistory from "@/pages/gerenciar/History";

import { USER_LOGGED_OUT } from "./vuex/mutation-types";
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

const routes = [
  { path: "/", name: "home", redirect: "/dashboard", beforeEnter: requireAuth },
  { path: "/login", name: "login", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    beforeEnter: requireAuth,
    children: [
      { path: "", name: "dashboard", component: DashboardHome },
      { path: "pedidos", name: "pedidos", component: DashboardTurmasDCC },

      {
        path: "turmasExternas",
        name: "turmasExternas",
        component: DashboardTurmasExternas,
      },

      { path: "horarios", name: "horarios", component: DashboardHorarios },
      { path: "cursos", name: "cursos", component: DashboardCursos },
      { path: "docentes", name: "docentes", component: DashboardDocentes },
      { path: "grades", name: "grades", component: DashboardGrades },
      {
        path: "gradeDisciplinas",
        name: "gradeDisciplinas",
        component: DashboardGradeDisciplinas,
      },
      {
        path: "disciplinas",
        name: "disciplinas",
        component: DashboardDisciplinas,
      },
      { path: "perfis", name: "perfis", component: DashboardPerfis },
      {
        path: "cargaProfessores",
        name: "cargaProfessores",
        component: DashboardCargaProfessores,
      },
      {
        path: "laboratoriosAlocacao",
        name: "laboratoriosAlocacao",
        component: DashboardHorariosLaboratorios,
      },
      { path: "cargaPos", name: "cargaPos", component: DashboardCargaPos },
      { path: "salas", name: "salas", component: DashboardSalas },

      {
        path: "relatorioDisciplinas",
        name: "relatorioDisciplinas",
        component: DashboardRelatorioDisciplinas,
      },
      { path: "gradeEdit", name: "gradeEdit", component: DashboardGradesEdit },
      { path: "history", name: "history", component: DashboardHistory },
      {
        path: "validacoes",
        name: "validacoes",
        component: DashboardValidacoes,
      },
    ],
  },
  {
    path: "/logout",
    name: "logout",
    beforeEnter: function (to, from, next) {
      store.commit(USER_LOGGED_OUT);
      next("/login");
    },
  },
  { path: "/*", redirect: "/" },
];
export default new VueRouter({
  routes,
  mode: "history",
  linkExactActiveClass: "active",
  saveScrollPosition: true,
});
