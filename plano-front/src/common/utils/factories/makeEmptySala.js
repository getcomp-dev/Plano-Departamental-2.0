function makeEmptySala(overwriteValues = {}) {
  const { id = null, nome = "", laboratorio = 0, lotacao_maxima = 0 } = overwriteValues;
  return { id, nome, laboratorio, lotacao_maxima };
}
export default makeEmptySala;
