import Vue from "vue";
import VueRouter from "vue-router";
import store from "./vuex/store";

// Dashboard
import Login from "@/components/Dashboard/TheLogin";
import Dashboard from "@/components/Dashboard/TheDashboard";
import DashboardHome from "@/components/Dashboard/Home";
// Plano
import DashboardPedidos from "@/components/plano/turma-principal/DashboardPrototipo";
import DashboardTurmasExternas from "@/components/plano/turma-externa/TurmasExternas";
import DashboardCargaPos from "@/components/plano/carga-pos/CargaPos";
import DashboardValidacoes from "@/components/plano/validacoes/Validacoes";
// Relatorios
import DashboardHorarios from "@/components/relatorios/horarios-curso/Horarios";
import DashboardCargaProfessores from "@/components/relatorios/CargaProfessores";
import DashboardRelatorioDisciplinas from "@/components/relatorios/RelatorioDisciplinas";
import DashboardGradeDisciplinas from "@/components/relatorios/GradeDisciplinas";
import DashboardLaboratoriosAlocacao from "@/components/relatorios/LaboratoriosAlocacao";

// Gerenciar
import DashboardCursos from "@/components/gerenciar/Cursos";
import DashboardDocentes from "@/components/gerenciar/Docentes";
import DashboardGradesEdit from "@/components/gerenciar/GradesEdit";
import DashboardGrades from "@/components/gerenciar/Grades";
import DashboardPerfis from "@/components/gerenciar/Perfis";
import DashboardDisciplinas from "@/components/gerenciar/Disciplinas";
import DashboardSalas from "@/components/gerenciar/Salas";
import DashboardHistory from "@/components/gerenciar/History";

/*
//Componentes desabilitados 
import DashboardRelatorios from "@/components/Relatorios";
 { path: "relatorios", name: "relatorios",  component: DashboardRelatorios},
import DashboardHorariosResumo from "./components/Dashboard/horarios-curso/HorariosResumo";
 { path: "horariosResumo", name: "horariosResumo", component: DashboardHorariosResumo},
import DashboardTurmas from "./components/Dashboard/Turmas";
 { path: "turmas", name: "turmas", component: DashboardTurmas },
*/

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
      { path: "pedidos", name: "pedidos", component: DashboardPedidos },

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
        component: DashboardLaboratoriosAlocacao,
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
    beforeEnter: function(to, from, next) {
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
