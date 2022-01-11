function makeEmptyDisciplinaGrade(overwriteValues = {}) {
  const {
    periodo = 1,
    Disciplina = "",
    Grade = "",
    disciplina = {},
    obrigatoria = 0,
  } = overwriteValues;
  return { periodo, Disciplina, Grade, disciplina, obrigatoria };
}
export default makeEmptyDisciplinaGrade;
