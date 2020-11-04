export default {
  methods: {
    cursoPopoverContent(curso) {
      let text = "";
      switch (curso.semestreInicial) {
        case 1:
          text += `1º - ${curso.alunosEntrada}`;
          break;
        case 2:
          text += `2º - ${curso.alunosEntrada2}`;
          break;
        case 3:
          text += `1º - ${curso.alunosEntrada}\n2º - ${curso.alunosEntrada2}`;
          break;
        default:
          text += "";
          break;
      }

      return text + "\nTurno " + curso.turno;
    },
  },
};
