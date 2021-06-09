export default function validateTurmasSIGA(turmasSIGA) {
  if (!turmasSIGA.length) return;

  const expectedKeys = [
    "DISCIPLINA",
    "DISCIPLINA_COD.",
    "TURMA",
    "CURSO_COD.",
    "CURSO",
    "VAGASOFERECIDAS",
    "VAGASOCUPADAS",
    "HORARIOS",
    "DOCENTES",
  ];
  if (Object.keys(turmasSIGA[0]).length < expectedKeys.length) {
    throw new Error("Verifique a integridade e o formato do(s) arquivo(s)");
  }
}
