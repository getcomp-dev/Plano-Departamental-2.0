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
        "Cadastro de todas as turmas de disciplinas oferecidas pelo DCC. Permite a alteração de vagas, horários, sala e docentes das turmas.",
    },
    {
      path: "/plano/turmas-externas",
      title: "Graduação - Outros",
      description:
        "Cadastro de todas as turmas de disciplinas que não são oferecidas pelo DCC, mas fazem parte das grades de cursos do DCC. Permite a alteração de vagas, horários das turmas.",
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
        "Listagem de todos os docentes com suas respectivas disciplinas (graduação e pós-graduação). Exibindo o somatório parcial por semestre e a carga total de cada docente.",
    },
    {
      path: "/relatorios/grades-dcc",
      title: "Grades - DCC",
      description: "Listagem de todas as disciplinas que compõem as grades dos cursos do DCC.",
    },
    {
      path: "/relatorios/grades-outros",
      title: "Grades - Outros",
      description: "Listagem de todas as disciplinas que compõem as grades dos outros cursos.",
    },
    {
      path: "/relatorios/horarios-cursos",
      title: "Horários - Cursos",
      description: "Visualização das grades horárias dos cursos do DCC.",
    },
    {
      path: "/relatorios/horarios-laboratorios",
      title: "Horários - Laboratórios",
      description: "Visualização das alocações dos laboratórios em ambos os semestres.",
    },
    {
      path: "/relatorios/plano-departamental",
      title: "Plano Departamental",
      description: "Listagem de turmas, horários, vagas e docentes alocados por disciplina.",
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
        "Listagem de todos os cursos cadastradas no sistema (incluindo os externos ao DCC). Permite adicionar, editar e excluir cursos.",
    },

    {
      path: "/gerenciar/disciplinas",
      title: "Disciplinas",
      description:
        "Listagem de todas as disciplinas cadastradas no sistema. Permite adicionar, editar e excluir disciplinas.",
    },
    {
      path: "/gerenciar/disciplinas-grades",
      title: "Disciplinas na Grade",
      description:
        "Listagem de todas as disciplinas de uma grade (atual ou antiga) cadastrada no sistema. Permite adicionar, editar e excluir disciplinas em uma determinada grades.",
    },
    {
      path: "/gerenciar/docentes",
      title: "Docentes",
      description:
        "Listagem de todos os docentes ativos e inativos do DCC. Permite adicionar, editar e excluir docentes e seus perfis.",
    },
    {
      path: "/gerenciar/grades-cursos",
      title: "Grades Cursos",
      description:
        "Listagem de todas as grades (atuais e antigas) de cursos DCC e Outros que ainda estão em atividade. Permite adicionar, editar e excluir grades.",
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
        "Listagem de todos perfis cadastrados para as disciplinas. Permite adicionar, editar e excluir perfis.",
    },
    {
      path: "/gerenciar/plano-departamental",
      title: "Plano Departamental",
      description:
        "Listagem de todos os planos presentes no sistema. Permite adicionar, editar, cópiar e excluir planos, além de também permitir importar planos através do arquivo (.csv) gerado pelo SIGA.",
    },
    {
      path: "/gerenciar/preferencias-docentes",
      title: "Preferências Docentes",
      description:
        "Listagem de preferências de disciplinas dos docentes. Permite adicionar, editar e excluir preferências, alem de também permitir importar preferencias através de um arquivo (.xlsx).",
    },
    {
      path: "/gerenciar/salas",
      title: "Salas",
      description:
        "Listagem de todas as salas e laboratórios cadastradas no sistema. Permite adicionar, editar e excluir salas.",
    },
    {
      path: "/gerenciar/usuarios",
      title: "Usuários",
      description:
        "Listagem de todos os usuários cadastrados no sistema. Permite adicionar, editar e excluir usuários.",
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
        "Listagem das diferenças entre o plano atual do sistemas e o lançamento presente no SIGA. Através da comparação do arquivo (.csv) gerado pelo SIGA.",
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
