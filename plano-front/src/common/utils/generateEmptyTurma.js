function generateEmptyTurma({ periodo = null, letra = null } = {}) {
  return {
    id: null,
    periodo,
    letra,
    turno1: null,
    turno2: null,
    Disciplina: null,
    Docente1: null,
    Docente2: null,
    Horario1: null,
    Horario2: null,
    Sala1: null,
    Sala2: null,
    disciplina: null,
  };
}
export default generateEmptyTurma;
