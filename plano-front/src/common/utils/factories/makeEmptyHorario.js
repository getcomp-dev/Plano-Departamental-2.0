function makeEmptyHorario(overwriteValues = {}) {
  const { id = null, horario = "", ativo = 0 } = overwriteValues;

  return {
    id,
    horario,
    ativo,
  };
}
export default makeEmptyHorario;
