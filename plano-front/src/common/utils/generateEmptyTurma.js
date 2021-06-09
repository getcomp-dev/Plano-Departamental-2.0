function generateEmptyTurma({
  periodo = null,
  letra = null,
  turno1 = null,
  turno2 = null,
  Disciplina = null,
  Docente1 = null,
  Docente2 = null,
  Horario1 = null,
  Horario2 = null,
  Sala1 = null,
  Sala2 = null,
  disciplina = null,
  Plano = null,
} = {}) {
  return {
    id: null,
    periodo,
    letra,
    turno1,
    turno2,
    Disciplina,
    Docente1,
    Docente2,
    Horario1,
    Horario2,
    Sala1,
    Sala2,
    disciplina,
    Plano,
  };
}
export default generateEmptyTurma;
