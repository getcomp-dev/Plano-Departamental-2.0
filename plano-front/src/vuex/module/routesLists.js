import _ from "lodash";

const state = {
  routesHome: [
    {
      routeName: "dashboardHome",
      icon: "home",
      title: "Dashboard",
      description: `Página inicial.`,
    },
  ],

  routesPlano: [
    {
      title: "Graduação - DCC",
      routeName: "turmasDcc",
      icon: "clipboard",
      description: `Cadastro de todas as turmas de todas as disciplinas oferecidas pelo DCC. Permite a alteração de vagas, horários, sala e docentes de todas as disciplinas.`,
    },
    {
      title: "Graduação - Outros",
      routeName: "turmasExternas",
      icon: "clipboard",
      description: `Similar a "Graduação - DCC", permite o cadastro de todas as turmas de disciplinas que fazem parte das grades dos cursos cadastrados, mas que são oferecidas por outros departamentos.`,
    },
    {
      title: "Pós Graduação",
      routeName: "cargaPos",
      icon: "clipboard",
      description: `Cadastro da carga atribuída a cada docente na pós-graduação.`,
    },
    {
      title: "Validações",
      routeName: "validacoes",
      icon: "calendar-check",
      description: `Listagem de pendências que precisam ser resolvidas para a finalização do Plano Departamental.`,
    },
  ],
  routesRelatorios: [
    {
      title: "Carga Professores",
      routeName: "cargaProfessores",
      icon: "file-alt",
      description: `Listagem de todos os professores com suas respectivas disciplinas (graduação e pós-graduação), exibindo o somatório parcial por semestre e a carga total de cada docente.`,
    },
    {
      title: "Grades Disciplinas",
      routeName: "gradeDisciplinas",
      icon: "file-alt",
      description: `Listagem de todas as disciplinas que compõem as grades dos cursos do DCC, mostrando a qual período e semestre cada disciplina pertence.`,
    },
    {
      title: "Horários - Cursos",
      routeName: "horariosCursos",
      icon: "file-alt",
      description: `Visualização das grades horárias dos cursos do DCC, permitindo filtragem por semestres e cursos.`,
    },
    {
      title: "Horários - Laboratórios",
      routeName: "horariosLaboratorios",
      icon: "file-alt",
      description: `Visualização das alocações dos laboratórios em ambos os semestres.`,
    },
    {
      title: "Plano Departamental",
      routeName: "relatorioDisciplinas",
      icon: "file-alt",
      description: `Listagem de turmas, horários e professores alocados por disciplina.`,
    },
  ],
  routesGerenciar: [
    {
      title: "Cursos",
      routeName: "cursos",
      icon: "graduation-cap",
      description: `Listagem dos cursos presentes no sistema (incluindo os externos ao DCC), permitindo adicionar ou alterar informações dos cursos.`,
    },

    {
      title: "Disciplinas",
      routeName: "disciplinas",
      icon: "calendar-alt",
      description: `Listagem de todas as disciplinas cadastradas no sistema. Permite a alteração de nome, código, carga teórica e prática, perfis, além de poder definir se a disciplina é EAD ou não.`,
    },
    {
      title: "Disciplinas na Grade",
      routeName: "gradesEdit",
      icon: "table",
      description: `Listagem de todas as disciplinas de uma grade (atual ou antiga) cadastrada no sistema, permitindo a alteração ou adição de novas disciplinas.`,
    },
    {
      title: "Docentes",
      routeName: "docentes",
      icon: "users",
      description: `Listagem de todos os docentes ativos e inativos do DCC, permitindo a alteração de seus perfis.`,
    },
    {
      title: "Grades",
      routeName: "grades",
      icon: "sitemap",
      description: `Listagem das grades (atuais ou antigas) dos cursos do DCC que ainda estão em atividade, permitindo a adição de novas grades.`,
    },
    {
      title: "Log",
      routeName: "history",
      icon: "history",
      description: `Listagem de todas as modificações feitas pelos usuários no sistema.`,
    },
    {
      title: "Perfis",
      routeName: "perfis",
      icon: "th-list",
      description: `Listagem dos perfis cadastrados para as disciplinas, permitindo também a adição e a alteração de perfis, seus nomes e as cores destinadas a eles.`,
    },
    {
      title: "Planos",
      routeName: "planos",
      icon: "calendar-alt",
      description: `Listagem de todos os planos presentes no sistemas, e permite a adição,edição e exclusão de planos.`,
    },
    {
      title: "Salas",
      routeName: "salas",
      icon: "university",
      description: `Listagem de todas as salas registradas no sistema. Permite a adição de novas salas e laboratórios.`,
    },
    {
      title: "Usuários",
      routeName: "usuarios",
      icon: "user",
      description: `Listagem de todos os usuários presentes no sistema, permitindo a adição e a alteração de usuários.`,
    },
  ],
};

const mutations = {};

const actions = {};

const getters = {
  routesHome(state) {
    return state.routesHome;
  },
  routesPlano(state) {
    return state.routesPlano;
  },
  routesRelatorios(state) {
    return _.orderBy(state.routesRelatorios, ["title"]);
  },
  routesGerenciar(state) {
    return _.orderBy(state.routesGerenciar, ["title"]);
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
