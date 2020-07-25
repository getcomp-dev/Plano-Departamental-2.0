import _ from "lodash";

const state = {
  routesPlano: [
    {
      title: "Graduação - DCC",
      routeName: "turmasDcc",
      icon: "fa-clipboard",
      description: `Página onde encontra-se o cadastro de todas as turmas
        de todas as disciplinas oferecidas pelo DCC. Permite a alteração
        de vagas, horários, sala e docentes de todas as disciplinas.`,
    },
    {
      title: "Graduação - Outros",
      routeName: "turmasExternas",
      icon: "fa-clipboard",
      description: `Similar a Tabela Interna, onde encontra-se o cadastro
        de todas as turmas de disciplinas oferecidas por outros departamentos
        (externos ao DCC), e que fazem parte da grade dos cursos cadastrados.`,
    },
    {
      title: "Pós Graduação",
      routeName: "cargaPos",
      icon: "fa-clipboard",
      description: `Tela onde localiza-se uma tabela com as cargas horárias
        de cada docente encarregado das bolsas de pós-graduação.`,
    },
    {
      title: "Validações",
      routeName: "validacoes",
      icon: "fa-calendar-check",
      description: `Tela onde localiza-se as validações do Plano Departamental.`,
    },
  ],
  routesRelatorios: [
    {
      title: "Carga Professores",
      routeName: "cargaProfessores",
      icon: "fa-file-alt",
      description: `Listagem de todos professores e as disciplinas que estes
        ministram, além das bolsas de pós-gradução. Mostra o somatório
        parcial por semestre, e o total da carga horária de cada docente.`,
    },
    {
      title: "Grades Disciplinas",
      routeName: "gradeDisciplinas",
      icon: "fa-file-alt",
      description: `Listagem das disciplinas do DCC, divididas de acordo com seus
          perfis. Mostra, além disso, quais semestres e períodos cada uma é
          ofertada nas grades dos cursos.`,
    },
    {
      title: "Horários - Cursos",
      routeName: "horariosCursos",
      icon: "fa-file-alt",
      description: `Página onde listam-se os horarios dos cursos do DCC, permitindo
        filtragem por semestres e cursos.`,
    },
    {
      title: "Horários - Laboratórios",
      routeName: "horariosLaboratorios",
      icon: "fa-file-alt",
      description: `Lista as alocações dos laboratórios em ambos os semestres.`,
    },
    {
      title: "Plano Departamental",
      routeName: "relatorioDisciplinas",
      icon: "fa-file-alt",
      description: `Lista as turmas, horários e professores alocados por disciplina.`,
    },
  ],
  routesGerenciar: [
    {
      title: "Planos",
      routeName: "planos",
      icon: "fa-calendar-alt",
      description: `Lista todos os planos presentes no sistemas, e permite a adição,edição e exclusão de planos.`,
    },
    {
      title: "Cursos",
      routeName: "cursos",
      icon: "fa-graduation-cap",
      description: `Lista todos os cursos presentes no sistemas (além dos externos ao
        DCC), e permite a adição e alteração das informações dos cursos.`,
    },
    {
      title: "Usuários",
      routeName: "usuarios",
      icon: "fa-user",
      description: `Lista todos os usuários presentes no sistemas, e permite a adição e alteração de usuários.`,
    },
    {
      title: "Disciplinas",
      routeName: "disciplinas",
      icon: "fa-calendar-alt",
      description: `Listagem de disciplinas de todos os departamentos cadastrados no
        sistema. Permite a alteração de nome, código, carga teórica e
        pratica, perfis e também define se é EAD ou não.`,
    },
    {
      title: "Disciplinas na Grade",
      routeName: "gradesEdit",
      icon: "fa-table",
      description: `Onde encontram-se as disciplinas de cada grade do DCC atuais e
        antigas que ainda estão em atividade, e permite a alteração ou
        adição de novas disciplinas.`,
    },
    {
      title: "Docentes",
      routeName: "docentes",
      icon: "fa-users",
      description: `Listagem de todos os docentes ativo e inativos do DCC, além de
        permitir a alteração de seus perfis.`,
    },
    {
      title: "Grades",
      routeName: "grades",
      icon: "fa-sitemap",
      description: `Onde encontram-se as grades dos cursos do DCC atuais e antigas que
        ainda estão em atividade, e permite a adição de novas grades.`,
    },
    {
      title: "Log",
      routeName: "history",
      icon: "fa-history",
      description: `Listagem de todas as modificações feitas pelos usuários no
        sistema.`,
    },
    {
      title: "Perfis",
      routeName: "perfis",
      icon: "fa-th-list",
      description: `Onde encontram-se os perfis definidos para cada disciplina nas
        tabelas, permitindo também a adição e alteração de perfis, seus
        nomes e as cores destinadas a eles.`,
    },
    {
      title: "Salas",
      routeName: "salas",
      icon: "fa-university",
      description: `Listagem de todas as salas registradas no sistema. Permite a
        adição de novas salas e laboratórios.`,
    },
  ],
};

const mutations = {};

const actions = {};

const getters = {
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
