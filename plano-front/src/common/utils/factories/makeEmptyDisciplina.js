function makeEmptyDisciplina(overwriteValues = {}) {
  const {
    id = null,
    nome = "",
    codigo = "",
    Perfil = "",
    cargaTeorica = 0,
    cargaPratica = 0,
    laboratorio = 0,
    ead = 0,
    departamento = 1,
  } = overwriteValues;

  return {
    id,
    nome,
    codigo,
    Perfil,
    cargaTeorica,
    cargaPratica,
    laboratorio,
    ead,
    departamento,
  };
}
export default makeEmptyDisciplina;
