import { orderBy } from "lodash-es";

const state = {
  RoutesHome: [
    {
      path: "/home",
      icon: "home",
      title: "Início",
      description: "Página inicial.",
    },
  ],
  RoutesPlano: [
    {
      path: "/plano/turmas-dcc",
      title: "Graduação - DCC",
      icon: "clipboard",
      description:
        "Cadastro de todas as turmas de todas as disciplinas oferecidas pelo DCC. Permite a alteração de vagas, horários, sala e docentes de todas as disciplinas.",
    },
    {
      path: "/plano/turmas-externas",
      title: "Graduação - Outros",
      icon: "clipboard",
      description:
        "Similar a \"Graduação - DCC\", permite o cadastro de todas as turmas de disciplinas que fazem parte das grades dos cursos cadastrados, mas que são oferecidas por outros departamentos.",
    },
    {
      path: "/plano/carga-pos",
      title: "Pós Graduação",
      icon: "clipboard",
      description: "Cadastro da carga atribuída a cada docente na pós-graduação.",
    },
  ],
  RoutesRelatorios: [
    {
      path: "/relatorios/carga-docentes",
      title: "Carga Docentes",
      icon: "file-alt",
      description:
        "Listagem de todos os docentes com suas respectivas disciplinas (graduação e pós-graduação), exibindo o somatório parcial por semestre e a carga total de cada docente.",
    },
    {
      path: "/relatorios/grades-dcc",
      title: "Grades - DCC",
      icon: "file-alt",
      description:
        "Listagem de todas as disciplinas que compõem as grades dos cursos do DCC, mostrando a qual período e semestre cada disciplina pertence.",
    },
    {
      path: "/relatorios/grades-outros",
      title: "Grades - Outros",
      icon: "file-alt",
      description:
        "Listagem de todas as disciplinas que compõem as grades dos outros cursos, mostrando a qual período e semestre cada disciplina pertence.",
    },
    {
      path: "/relatorios/horarios-cursos",
      title: "Horários - Cursos",
      icon: "file-alt",
      description:
        "Visualização das grades horárias dos cursos do DCC, permitindo filtragem por semestres e cursos.",
    },
    {
      path: "/relatorios/horarios-laboratorios",
      title: "Horários - Laboratórios",
      icon: "file-alt",
      description: "Visualização das alocações dos laboratórios em ambos os semestres.",
    },
    {
      path: "/relatorios/plano-departamental",
      title: "Plano Departamental",
      icon: "file-alt",
      description: "Listagem de turmas, horários e docentes alocados por disciplina.",
    },
    {
      path: "/relatorios/turmas-cursos",
      title: "Turmas - Cursos",
      icon: "file-alt",
      description: "Listagem de turmas alocadas para cada curso.",
    },
  ],
  RoutesGerenciar: [
    {
      path: "/gerenciar/cursos",
      title: "Cursos",
      icon: "graduation-cap",
      description:
        "Listagem dos cursos presentes no sistema (incluindo os externos ao DCC), permitindo adicionar ou alterar informações dos cursos.",
    },

    {
      path: "/gerenciar/disciplinas",
      title: "Disciplinas",
      icon: "calendar-alt",
      description:
        "Listagem de todas as disciplinas cadastradas no sistema. Permite a alteração de nome, código, carga teórica e prática, perfis, além de poder definir se a disciplina é EAD ou não.",
    },
    {
      path: "/gerenciar/grades-edit",
      title: "Disciplinas na Grade - DCC",
      icon: "table",
      description:
        "Listagem de todas as disciplinas de uma grade (atual ou antiga) cadastrada no sistema, permitindo a alteração ou adição de novas disciplinas.",
    },
    {
      path: "/gerenciar/grades-cursos-externos-edit",
      title: "Disciplinas na Grade - Outros",
      icon: "table",
      description:
        "Listagem de todas as disciplinas de uma grade (atual ou antiga) de um curso externo cadastrada no sistema, permitindo a alteração ou adição de novas disciplinas.",
    },
    {
      path: "/gerenciar/docentes",
      title: "Docentes",
      icon: "users",
      description:
        "Listagem de todos os docentes ativos e inativos do DCC, permitindo a alteração de seus perfis.",
    },
    {
      path: "/gerenciar/grades",
      title: "Grades de Cursos - DCC",
      icon: "sitemap",
      description:
        "Listagem das grades (atuais ou antigas) dos cursos do DCC que ainda estão em atividade, permitindo a adição de novas grades.",
    },
    {
      path: "/gerenciar/gradesCursosExternos",
      title: "Grades de Cursos - Outros",
      icon: "sitemap",
      description:
        "Listagem das grades (atuais ou antigas) dos cursos externos que ainda estão em atividade, permitindo a adição de novas grades.",
    },
    {
      path: "/gerenciar/history",
      title: "Log",
      icon: "history",
      description: "Listagem de todas as modificações feitas pelos usuários no sistema.",
    },
    {
      path: "/gerenciar/perfis",
      title: "Perfis",
      icon: "th-list",
      description:
        "Listagem dos perfis cadastrados para as disciplinas, permitindo também a adição e a alteração de perfis, seus nomes e as cores destinadas a eles.",
    },
    {
      path: "/gerenciar/plano-departamental",
      title: "Plano Departamental",
      icon: "calendar-alt",
      description:
        "Listagem de todos os planos presentes no sistemas, e permite a adição,edição e exclusão de planos.",
    },
    {
      path: "/gerenciar/preferencias-docentes",
      title: "Preferências Docentes",
      icon: "users",
      description:
        "Listagem de preferências dos docentes, e permite importar um documento xlsx com atualiações das preferências.",
    },
    {
      path: "/gerenciar/salas",
      title: "Salas",
      icon: "university",
      description:
        "Listagem de todas as salas registradas no sistema. Permite a adição de novas salas e laboratórios.",
    },
    {
      path: "/gerenciar/usuarios",
      title: "Usuários",
      icon: "user",
      description:
        "Listagem de todos os usuários presentes no sistema, permitindo a adição e a alteração de usuários.",
    },
  ],
  RoutesHistorico: [
    {
      path: "/historico/buscar-turmas",
      title: "Buscar Turmas - DCC",
      icon: "search",
      description: "Busca de turmas em todos os planos.",
    },
  ],
  RoutesValidacoes: [
    {
      path: "/validacoes/graduacao-dcc",
      title: "Graduação - DCC",
      icon: "calendar-check",
      description:
        "Listagem de pendências que precisam ser resolvidas para a finalização do Plano Departamental.",
    },
  ],
};

const getters = {
  AllRoutes() {
    return state.RoutesHome.concat(
      state.RoutesPlano,
      state.RoutesRelatorios,
      state.RoutesGerenciar,
      state.RoutesHistorico,
      state.RoutesValidacoes
    );
  },

  RoutesHome(state) {
    return state.RoutesHome;
  },
  RoutesPlano(state) {
    return state.RoutesPlano;
  },
  RoutesRelatorios(state) {
    return orderBy(state.RoutesRelatorios, ["title"]);
  },
  RoutesGerenciar(state) {
    return orderBy(state.RoutesGerenciar, ["title"]);
  },
  RoutesHistorico(state) {
    return orderBy(state.RoutesHistorico, ["title"]);
  },
  RoutesValidacoes(state) {
    return orderBy(state.RoutesValidacoes, ["title"]);
  },
};

export default {
  state,
  getters,
};
