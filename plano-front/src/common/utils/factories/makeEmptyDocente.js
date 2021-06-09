function makeEmptyDocente(overwriteValues = {}) {
  const { id = null, nome = "", apelido = "", creditos = 0, ativo = 0 } = overwriteValues;
  return { id, nome, apelido, creditos, ativo };
}
export default makeEmptyDocente;
