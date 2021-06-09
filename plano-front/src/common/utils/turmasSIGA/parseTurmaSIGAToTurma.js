import store from "@/store";
import { some, find } from "lodash-es";
import { generateEmptyTurma, normalizeText } from "@/common/utils";

export default function parseTurmaSIGAToTurma(turmasSIGA, keysTurmaSIGA, planoId, periodo) {
  const newTurma = generateEmptyTurma({
    periodo: periodo || null,
    Plano: planoId || null,
    letra: turmasSIGA[keysTurmaSIGA.letra] || null,
  });
  if (!newTurma.letra) return null;

  setDisciplina(newTurma, turmasSIGA[keysTurmaSIGA.disciplinaCod]);
  if (!newTurma.Disciplina) return null;

  setHorariosESalas(newTurma, turmasSIGA[keysTurmaSIGA.horarioESala]);
  if (!newTurma.turno1) return null;

  setDocentes(newTurma, turmasSIGA[keysTurmaSIGA.docentes]);

  return newTurma;
}

// helpers
function setDisciplina(turma, disciplinaCodigo) {
  if (!disciplinaCodigo) return;

  const disciplinaFounded = find(store.getters.AllDisciplinas, ["codigo", disciplinaCodigo]);
  if (disciplinaFounded) {
    turma.Disciplina = disciplinaFounded.id;
    turma.creditoTotal = disciplinaFounded.creditoTotal;
  } else {
    turma.Disciplina = null;
  }
}

function setHorariosESalas(turma, strHorarioESala) {
  if (!strHorarioESala) return;

  const [str1, str2] = strHorarioESala.split(";");
  turma.Horario1 = findHorarioId(str1);
  if (turma.creditoTotal >= 4) turma.Horario2 = findHorarioId(str2);

  turma.turno1 = findTurno(turma.Horario1, turma.Horario2);

  if (turma.turno1 !== "EAD") {
    turma.Sala1 = findSalaId(str1);
    turma.Sala2 = findSalaId(str2);
  }
}

function setDocentes(turma, strDocentes) {
  if (!strDocentes) return;

  const [docente1Str, docente2Str] = strDocentes.split(";");
  turma.Docente1 = findDocenteId(docente1Str);
  turma.Docente2 = findDocenteId(docente2Str);
}

function findTurno(horario1Id, horario2Id) {
  if (!horario1Id && !horario2Id) {
    return null;
  } else if (horario1Id === 31) {
    return "EAD";
  } else if (
    some(store.getters.HorariosNoturno, ["id", horario1Id]) ||
    some(store.getters.HorariosNoturno, ["id", horario2Id])
  ) {
    return "Noturno";
  } else {
    return "Diurno";
  }
}

function findDocenteId(docenteNome) {
  if (!docenteNome) return null;

  const docenteFounded = find(
    store.getters.AllDocentes,
    (docente) => normalizeText(docente.nome) === normalizeText(docenteNome)
  );
  return docenteFounded ? docenteFounded.id : null;
}

function findHorarioId(strHorario) {
  if (!strHorario) return null;

  const [dia, hora, sala] = strHorario.split(",");
  const horario = covertDiaEHoraEmHorario(dia, hora);

  if (horario) {
    const horarioFounded = find(store.getters.AllHorarios, ["horario", horario]);
    return horarioFounded ? horarioFounded.id : null;
  }
  //Caso não tenha achando nenhum horario, verifica se tem sala EAD
  if (sala.includes("EAD")) {
    // console.log("Encotrou sala EAD", sala);
    return 31; //Id horario EAD
  }

  return null;
}

function covertDiaEHoraEmHorario(dia, hora) {
  if (!dia || !hora) return null;

  let diaNormalized = null;
  switch (dia.trim().substring(0, 3)) {
  case "SEG":
    diaNormalized = "2a";
    break;
  case "TER":
    diaNormalized = "3a";
    break;
  case "QUA":
    diaNormalized = "4a";
    break;
  case "QUI":
    diaNormalized = "5a";
    break;
  case "SEX":
    diaNormalized = "6a";
    break;
  case "SAB":
    return "EAD"; //Se é sabado ja retorna EAD, pois não possui hora
  default:
    return null; //Se não achou ja retorna null e nem verifica hora
  }

  const [horaInicial, horaFinal] = hora.split("AS");
  if (!horaInicial || !horaFinal) return null;

  const horaInicialNormalized = horaInicial.trim().substring(0, 2);
  const horaFinalNormalized = horaFinal.trim().substring(0, 2);

  return `${diaNormalized} ${horaInicialNormalized}-${horaFinalNormalized}`;
}

function findSalaId(strSala) {
  if (!strSala) return null;

  const [, , sala] = strSala.split(",");
  const strSalaNormalized = normalizeText(sala);

  const salaFounded = find(store.getters.AllSalas, (sala) => {
    const nomeNormalized = normalizeText(sala.nome);
    return strSalaNormalized.includes(nomeNormalized);
  });
  return salaFounded ? salaFounded.id : null;
}
