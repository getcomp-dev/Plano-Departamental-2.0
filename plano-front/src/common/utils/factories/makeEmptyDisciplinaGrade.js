function makeEmptyDisciplinaGrade(overwriteValues = {}) {
  const { periodo = 1, Disciplina = "", Grade = "", disciplina = {} } = overwriteValues;
  return { periodo, Disciplina, Grade, disciplina };
}
export default makeEmptyDisciplinaGrade;
