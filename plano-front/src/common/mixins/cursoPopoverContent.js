export default {
  methods: {
    cursoPopoverContent(curso) {
      switch (curso.semestreInicial) {
        case 1:
          return `1º - ${curso.alunosEntrada}`;
        case 2:
          return `2º - ${curso.alunosEntrada2}`;
        case 3:
          return `1º - ${curso.alunosEntrada}\n2º - ${curso.alunosEntrada2}`;
        default:
          return "";
      }
    },
  },
};
