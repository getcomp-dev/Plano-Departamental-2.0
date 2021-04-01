function makeEmptyGrade(overwriteValues = {}) {
  const { id = null, nome = "", periodoInicio = "", Curso = null } = overwriteValues;
  return { id, nome, periodoInicio, Curso };
}
export default makeEmptyGrade;
