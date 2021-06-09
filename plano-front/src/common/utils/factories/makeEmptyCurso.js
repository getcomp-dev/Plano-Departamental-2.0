function makeEmptyCurso(overwriteValues = {}) {
  const {
    id = null,
    semestreInicial = null,
    posicao = null,
    nome = "",
    codigo = "",
    turno = "",
    alunosEntrada = 0,
    alunosEntrada2 = 0,
  } = overwriteValues;

  return {
    id,
    semestreInicial,
    posicao,
    nome,
    codigo,
    turno,
    alunosEntrada,
    alunosEntrada2,
  };
}
export default makeEmptyCurso;
