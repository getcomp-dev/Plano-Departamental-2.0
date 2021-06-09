function makeEmptyPerfil(overwriteValues = {}) {
  const { id = null, nome = "", abreviacao = "", cor = "#8E79F6" } = overwriteValues;
  return { id, nome, abreviacao, cor };
}
export default makeEmptyPerfil;
