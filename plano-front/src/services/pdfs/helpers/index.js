import store from "@/store";
import { isNull, filter, find, orderBy, sortBy } from "lodash-es";
import { imageToDataUrl } from "@/common/utils";
import urlLogoUfjf from "@/assets/images/logo-ufjf.png";
import urlLogoDcc from "@/assets/images/logo-dcc.png";

export function checkTurmaLab(turma) {
  let result = 0;
  store.getters.Laboratorios.forEach((lab) => {
    if (lab.id === turma.Sala1) result += 1;
    if (lab.id === turma.Sala2) result += 2;
  });

  if (result === 1) {
    if (isNull(turma.Sala2)) {
      return 4;
    }
  }
  return result;
}

export function checkTurmaHorarioLabs(turma, horario, lab) {
  if (turma.Horario1 == horario || turma.Horario2 == horario) {
    let sala = checkTurmaLab(turma);
    switch (sala) {
    case 0:
      return false;
    case 1:
      if (turma.Horario1 == horario) return true;
      else return false;
    case 2:
      if (turma.Horario2 == horario) return true;
      else return false;
    case 3:
      if (turma.Sala1 === lab) {
        if (turma.Horario1 == horario) return true;
      } else if (turma.Sala2 === lab) {
        if (turma.Horario2 == horario) return true;
      }
      return false;
    case 4:
      return true;
    }
    return true;
  } else return false;
}

export function checkTurmaHorario(turma, horario) {
  if (turma.Horario1 === horario || turma.Horario2 === horario) return true;
  else return false;
}

export function generateDocentesText(turma) {
  let d1 = find(store.state.docente.Docentes, { id: turma.Docente1 });
  let d2 = find(store.state.docente.Docentes, { id: turma.Docente2 });
  if (d1 === undefined && d2 === undefined) {
    return "";
  } else if (d2 === undefined) {
    return `${d1.nome}`;
  } else if (d1 === undefined) {
    return `${d2.nome}`;
  } else {
    return `${d1.nome} \n ${d2.nome}`;
  }
}

export function generateHorariosText(turma, divider = "\n") {
  const horario1 = find(store.getters.AllHorarios, ["id", turma.Horario1]);
  const horario2 = find(store.getters.AllHorarios, ["id", turma.Horario2]);
  let horariosResult = undefined;

  if (horario1 === undefined && horario2 === undefined) horariosResult = "";
  else if (horario2 === undefined) horariosResult = horario1.horario;
  else if (horario1 === undefined) horariosResult = horario2.horario;
  else horariosResult = horario1.horario + divider + horario2.horario;

  return horariosResult;
}

export function generateSalasText(turma) {
  const sala1 = find(store.getters.AllSalas, ["id", turma.Sala1]);
  const sala2 = find(store.getters.AllSalas, ["id", turma.Sala2]);
  let salasResult = undefined;

  if (sala1 === undefined && sala2 === undefined) salasResult = "";
  else if (sala2 === undefined) salasResult = sala1.nome;
  else if (sala1 === undefined) salasResult = sala2.nome;
  else salasResult = sala1.nome + "\n" + sala2.nome;

  return salasResult;
}

export function getSomatorioDeVagasDaTurma(turma) {
  let pedidos = store.state.pedido.Pedidos[turma.id];
  let vagasP = 0;
  let vagasNP = 0;
  pedidos.forEach((p) => {
    vagasP += p.vagasPeriodizadas;
    vagasNP += p.vagasNaoPeriodizadas;
  });
  return vagasP + vagasNP;
}

export function horasAula(disciplina) {
  return (parseInt(disciplina.cargaPratica) + parseInt(disciplina.cargaTeorica)) * 15;
}

export function getCursoById(cursoId) {
  return find(store.state.curso.Cursos, ["id", cursoId]);
}

export function getPedidosDaTurma(turma) {
  const pedidosFiltered = filter(
    store.state.pedido.Pedidos[turma.id],
    (pedido) => pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0
  );
  return sortBy(pedidosFiltered, (pedido) => getCursoById(pedido.Curso).codigo);
}

export function filterTurmasDoCurso(turmas, cursoId) {
  const turmasDoCurso = [];

  turmas.forEach((turma) => {
    const pedidoFounded = find(store.getters.Pedidos[turma.id], ["Curso", cursoId]);

    if (pedidoFounded.vagasPeriodizadas > 0 || pedidoFounded.vagasNaoPeriodizadas > 0) {
      turmasDoCurso.push({
        ...turma,
        totalVagas: pedidoFounded.vagasPeriodizadas + pedidoFounded.vagasNaoPeriodizadas,
      });
    }
  });

  return orderBy(turmasDoCurso, ["disciplina.codigo", "letra"]);
}

export function getTurmasDoPeriodo(periodoId) {
  const turmasDoPeriodo = store.getters.AllTurmas.filter((turma) => turma.periodo === periodoId);

  return orderBy(turmasDoPeriodo, ["disciplina.codigo", "letra"]);
}

export function getTurmasDaSala(turmas, salaId) {
  return filter(turmas, (turma) => turma.Sala1 === salaId || turma.Sala2 === salaId);
}

export function is1Semestre(value) {
  return value === 1 || value === 2;
}

export function is2Semestre(value) {
  return value === 3 || value === 4;
}

export async function getHeaderImages() {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  return [logoDcc, logoUfjf];
}

//Pdfmake helpers
export function makePageHeader({ images, plano, title, subtitle }) {
  return [
    {
      columns: [
        { image: images[0] || "", fit: [60, 60], alignment: "left", width: "16%" },
        [
          {
            text: "Departamento de Ciência da Computação",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
          { text: title, alignment: "center", bold: true, fontSize: 10 },
          {
            text: plano ? `Plano ${plano.ano} - ${plano.nome}` : "",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
        ],
        { image: images[1] || "", fit: [60, 60], alignment: "right", width: "16%" },
      ],
    },
    { text: "", margin: [0, 0, 0, 10] },
    { text: subtitle, alignment: "center", bold: true, fontSize: 10, margin: [0, 0, 0, 10] },
  ];
}

export function makeEmptyPageWarning(text) {
  return {
    style: "tableExample",
    table: {
      widths: ["*"],
      headerRows: 1,
      color: "#426",
      body: [
        [
          {
            text: text ? text.toUpperCase() : "Nenhuma turma para ser exibida".toUpperCase(),
            alignment: "center",
            bold: true,
            fontSize: 9,
          },
        ],
      ],
    },
    layout: { vLineWidth: () => 0 },
  };
}
