import { orderBy } from "lodash-es";

const state = {
  PagesHome: [
    {
      path: "/home",
      title: "Início",
      description: "Página inicial.",
    },
  ],
  PagesPlano: [
    {
      path: "/plano/turmas-dcc",
      title: "Graduação - DCC",
      description:
        "Cadastro de todas as turmas de todas as disciplinas oferecidas pelo DCC. Permite a alteração de vagas, horários, sala e docentes de todas as disciplinas.",
    },
    {
      path: "/plano/turmas-externas",
      title: "Graduação - Outros",
      description:
        "Similar a \"Graduação - DCC\", permite o cadastro de todas as turmas de disciplinas que fazem parte das grades dos cursos cadastrados, mas que são oferecidas por outros departamentos.",
    },
    {
      path: "/plano/carga-pos",
      title: "Pós Graduação",
      description: "Cadastro da carga atribuída a cada docente na pós-graduação.",
    },
  ],
  PagesRelatorios: [
    {
      path: "/relatorios/carga-docentes",
      title: "Carga Docentes",

      description:
        "Listagem de todos os docentes com suas respectivas disciplinas (graduação e pós-graduação), exibindo o somatório parcial por semestre e a carga total de cada docente.",
    },
    {
      path: "/relatorios/grades-dcc",
      title: "Grades - DCC",
      description:
        "Listagem de todas as disciplinas que compõem as grades dos cursos do DCC, mostrando a qual período e semestre cada disciplina pertence.",
    },
    {
      path: "/relatorios/grades-outros",
      title: "Grades - Outros",
      description:
        "Listagem de todas as disciplinas que compõem as grades dos outros cursos, mostrando a qual período e semestre cada disciplina pertence.",
    },
    {
      path: "/relatorios/horarios-cursos",
      title: "Horários - Cursos",
      description:
        "Visualização das grades horárias dos cursos do DCC, permitindo filtragem por semestres e cursos.",
    },
    {
      path: "/relatorios/horarios-laboratorios",
      title: "Horários - Laboratórios",
      description: "Visualização das alocações dos laboratórios em ambos os semestres.",
    },
    {
      path: "/relatorios/plano-departamental",
      title: "Plano Departamental",
      description: "Listagem de turmas, horários e docentes alocados por disciplina.",
    },
    {
      path: "/relatorios/turmas-cursos",
      title: "Turmas - Cursos",
      description: "Listagem de turmas alocadas para cada curso.",
    },
  ],
  PagesGerenciar: [
    {
      path: "/gerenciar/cursos",
      title: "Cursos",
      description:
        "Listagem dos cursos presentes no sistema (incluindo os externos ao DCC), permitindo adicionar ou alterar informações dos cursos.",
    },

    {
      path: "/gerenciar/disciplinas",
      title: "Disciplinas",
      description:
        "Listagem de todas as disciplinas cadastradas no sistema. Permite a alteração de nome, código, carga teórica e prática, perfis, além de poder definir se a disciplina é EAD ou não.",
    },
    {
      path: "/gerenciar/disciplinas-grades-dcc",
      title: "Disciplinas na Grade - DCC",
      description:
        "Listagem de todas as disciplinas de uma grade (atual ou antiga) cadastrada no sistema, permitindo a alteração ou adição de novas disciplinas.",
    },
    {
      path: "/gerenciar/disciplinas-grades-outros",
      title: "Disciplinas na Grade - Outros",
      description:
        "Listagem de todas as disciplinas de uma grade (atual ou antiga) de um curso externo cadastrada no sistema, permitindo a alteração ou adição de novas disciplinas.",
    },
    {
      path: "/gerenciar/docentes",
      title: "Docentes",
      description:
        "Listagem de todos os docentes ativos e inativos do DCC, permitindo a alteração de seus perfis.",
    },
    {
      path: "/gerenciar/grades-cursos-dcc",
      title: "Grades de Cursos - DCC",
      description:
        "Listagem das grades (atuais e antigas) dos cursos do DCC que ainda estão em atividade, permitindo a adição de novas grades.",
    },
    {
      path: "/gerenciar/grades-cursos-outros",
      title: "Grades de Cursos - Outros",
      description:
        "Listagem das grades (atuais e antigas) dos cursos externos que ainda estão em atividade, permitindo a adição de novas grades.",
    },
    {
      path: "/gerenciar/history",
      title: "Log",
      description: "Listagem de todas as modificações feitas pelos usuários no sistema.",
    },
    {
      path: "/gerenciar/perfis",
      title: "Perfis",
      description:
        "Listagem dos perfis cadastrados para as disciplinas, permitindo também a adição e a alteração de perfis, seus nomes e as cores destinadas a eles.",
    },
    {
      path: "/gerenciar/plano-departamental",
      title: "Plano Departamental",
      description:
        "Listagem de todos os planos presentes no sistemas, e permite a adição,edição e exclusão de planos.",
    },
    {
      path: "/gerenciar/preferencias-docentes",
      title: "Preferências Docentes",
      description:
        "Listagem de preferências dos docentes, e permite importar um documento xlsx com atualiações das preferências.",
    },
    {
      path: "/gerenciar/salas",
      title: "Salas",
      description:
        "Listagem de todas as salas registradas no sistema. Permite a adição de novas salas e laboratórios.",
    },
    {
      path: "/gerenciar/usuarios",
      title: "Usuários",
      description:
        "Listagem de todos os usuários presentes no sistema, permitindo a adição e a alteração de usuários.",
    },
  ],
  PagesHistorico: [
    {
      path: "/historico/buscar-turmas",
      title: "Buscar Turmas - DCC",
      description: "Permite a busca de turmas em todos os planos do sistema.",
    },
  ],
  PagesValidacoes: [
    {
      path: "/validacoes/graduacao-dcc",
      title: "Graduação - DCC",
      description:
        "Listagem de pendências que precisam ser resolvidas para a finalização do Plano Departamental.",
    },
    {
      path: "/validacoes/lancamento-siga",
      title: "Lançamento SIGA",
      description:
        "Listagem das diferenças entre os pedidos do sistemas e os pedidos lançados no SIGA, através da comparação do arquivo .csv gerado pelo SIGA com o plano atual.",
    },
  ],
};

const getters = {
  AllPages() {
    return state.PagesHome.concat(
      state.PagesPlano,
      state.PagesRelatorios,
      state.PagesGerenciar,
      state.PagesHistorico,
      state.PagesValidacoes
    );
  },

  PagesHome(state) {
    return state.PagesHome;
  },
  PagesPlano(state) {
    return state.PagesPlano;
  },
  PagesRelatorios(state) {
    return orderBy(state.PagesRelatorios, ["title"]);
  },
  PagesGerenciar(state) {
    return orderBy(state.PagesGerenciar, ["title"]);
  },
  PagesHistorico(state) {
    return orderBy(state.PagesHistorico, ["title"]);
  },
  PagesValidacoes(state) {
    return orderBy(state.PagesValidacoes, ["title"]);
  },
};

export default {
  state,
  getters,
};
