export default function validateDisciplinasGrades(disciplinasGrades) {
  if (!disciplinasGrades.length) return;

  const expectedKeys = ["CODIGO", "DISCIPLINA", "PERIODO", "OBRIGATORIA"];

  if (Object.keys(disciplinasGrades[0]).length < expectedKeys.length) {
    throw new Error("Verifique a integridade e o formato do arquivo");
  }
}
