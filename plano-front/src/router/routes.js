import { lazyLoad, requireAdmin, requireSuperAdmin, requireAuth } from "./helpers";
import Home from "@/pages/dashboard/Home";
import PageWrapper from "@/pages/dashboard/PageWrapper";

const routesPlano = [
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
];
const routesRelatorios = [
  {
    path: "/relatorios/carga-docentes",
    component: lazyLoad("relatorios/CargaDocentes"),
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
];
const routesGerenciar = [
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
    path: "/gerenciar/disciplinas-grades-dcc",
    component: lazyLoad("gerenciar/DisciplinasGradesDCC"),
    beforeEnter: requireSuperAdmin,
  },
  {
    path: "/gerenciar/disciplinas-grades-outros",
    component: lazyLoad("gerenciar/DisciplinasGradesExternas"),
    beforeEnter: requireSuperAdmin,
  },
  {
    path: "/gerenciar/docentes",
    component: lazyLoad("gerenciar/Docentes"),
    beforeEnter: requireSuperAdmin,
  },
  {
    path: "/gerenciar/grades-cursos-dcc",
    component: lazyLoad("gerenciar/GradesCursosDCC"),
    beforeEnter: requireSuperAdmin,
  },
  {
    path: "/gerenciar/grades-cursos-outros",
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
];
const routesHistorico = [
  {
    path: "/historico/buscar-turmas",
    component: lazyLoad("historico/BuscarTurmas"),
  },
];
const routesValidacoes = [
  {
    path: "/validacoes/graduacao-dcc",
    component: lazyLoad("validacoes/graduacaoDCC"),
    beforeEnter: requireAdmin,
  },
  {
    path: "/validacoes/lancamento-siga",
    component: lazyLoad("validacoes/lancamentoSIGA"),
    beforeEnter: requireAdmin,
  },
];

export default [
  {
    path: "*",
    redirect: "/",
  },
  {
    path: "/login",
    component: lazyLoad("dashboard/Login"),
  },
  {
    path: "/",
    redirect: "/home",
    component: PageWrapper,
    beforeEnter: requireAuth,
    children: [
      { path: "/home", component: Home },
      ...routesPlano,
      ...routesRelatorios,
      ...routesGerenciar,
      ...routesHistorico,
      ...routesValidacoes,
    ],
  },
];
