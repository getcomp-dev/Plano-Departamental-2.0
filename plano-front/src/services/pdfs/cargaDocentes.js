import {
  makePageHeader,
  makeEmptyPageWarning,
  generateHorariosText,
  getHeaderImages,
  is1Semestre,
  is2Semestre,
} from "./helpers";
import store from "@/vuex/store";
import { orderBy, some } from "lodash-es";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfCargaDocentes(data) {
  const { docentesCarga, docenteSemAlocacaoCarga, periodosAtivos, plano } = data;
  const tables = [];
  const headerImages = await getHeaderImages();
  const semestre1EstaAtivo = some(periodosAtivos, ["semestreId", 1]);
  const semestre2EstaAtivo = some(periodosAtivos, ["semestreId", 2]);
  const ehCargaParcial = periodosAtivos.length !== 4; //Se não possui algum periodos é uma carga parcial

  tables.push(
    makePageHeader({
      images: headerImages,
      plano,
      title: "Relação de disciplinas ministradas pelos docentes",
    })
  );

  if ((!docentesCarga.length && !docenteSemAlocacaoCarga) || !periodosAtivos.length) {
    tables.push(makeEmptyPageWarning());
  } else {
    const docentesOrdered = orderBy(docentesCarga, "nome");
    let possuiAlgumaTurma = false;

    docentesOrdered.forEach((docente) => {
      if (
        docente.turmas.semestre1.length ||
        docente.turmas.semestre2.length ||
        docente.cargasPos.semestre2.length ||
        docente.cargasPos.semestre2.length
      ) {
        possuiAlgumaTurma = true;
        const cargaDoDocente = docente.creditos1Semestre + docente.creditos2Semestre;
        tables.push({
          style: "tableExample",
          table: {
            widths: ["*", 75],
            headerRows: 1,
            color: "#426",
            body: [
              [
                { text: docente.nome, alignment: "left", fontSize: 9, bold: true },
                {
                  text: `Carga ${ehCargaParcial ? "parcial" : "total"}: ${cargaDoDocente}`,
                  alignment: "center",
                  fontSize: 9,
                  bold: true,
                },
              ],
            ],
          },
          layout: { vLineWidth: () => 0 },
        });
        const tableBodyDocente = [makeDocenteBodyHeader()];

        store.getters.SemestresLetivos.forEach((semestre) => {
          docente.turmas[`semestre${semestre.id}`].forEach((turma) => {
            tableBodyDocente.push([
              "",
              { text: turma.periodo, fontSize: 6, alignment: "left" },
              { text: turma.disciplina.codigo, fontSize: 6, alignment: "left" },
              { text: turma.disciplina.nome, fontSize: 6, alignment: "left" },
              { text: turma.letra, fontSize: 6, alignment: "center" },
              { text: generateHorariosText(turma, " / "), fontSize: 6, alignment: "center" },
              {
                text: is1Semestre(turma.periodo) ? turma.creditosDaTurma : "",
                fontSize: 6,
                alignment: "center",
              },
              {
                text: is2Semestre(turma.periodo) ? turma.creditosDaTurma : "",
                fontSize: 6,
                alignment: "center",
              },
            ]);
          });

          docente.cargasPos[`semestre${semestre.id}`].forEach((carga) => {
            tableBodyDocente.push([
              "",
              { text: carga.trimestre, fontSize: 6, alignment: "left" },
              "",
              { text: "DISCIPLINA DO " + carga.programa, fontSize: 6, alignment: "left" },
              "",
              "",
              {
                text: is1Semestre(carga.trimestre) ? carga.creditos : "",
                fontSize: 6,
                alignment: "center",
              },
              {
                text: is2Semestre(carga.trimestre) ? carga.creditos : "",
                fontSize: 6,
                alignment: "center",
              },
            ]);
          });
        });

        tableBodyDocente.push([
          "",
          "",
          "",
          "",
          "",
          {
            text: "CARGA POR SEMESTRE:",
            fontSize: 6,
            alignment: "right",
            bold: true,
            margin: [0, 5, 0, 0],
          },
          {
            text: semestre1EstaAtivo ? docente.creditos1Semestre : "",
            fontSize: 6,
            alignment: "center",
            bold: true,
            margin: [0, 5, 0, 0],
          },
          {
            text: semestre2EstaAtivo ? docente.creditos2Semestre : "",
            fontSize: 6,
            alignment: "center",
            bold: true,
            margin: [0, 5, 0, 0],
          },
        ]);

        tables.push({
          style: "tableExample",
          table: {
            widths: [20, 8, 40, "*", 24, 104, 32, 32],
            headerRows: 1,
            color: "#426",
            body: tableBodyDocente,
          },
          layout: { vLineWidth: () => 0, hLineWidth: () => 0 },
          margin: [0, 0, 0, 5],
        });
      }
    });

    if (docenteSemAlocacaoCarga && docenteSemAlocacaoCarga.turmas.length) {
      possuiAlgumaTurma = true;
      const cargaDoDocente =
        docenteSemAlocacaoCarga.creditos1Semestre + docenteSemAlocacaoCarga.creditos2Semestre;
      tables.push({
        style: "tableExample",
        table: {
          widths: ["*", 75],
          headerRows: 1,
          color: "#426",
          body: [
            [
              { text: docenteSemAlocacaoCarga.nome, alignment: "left", fontSize: 9, bold: true },
              {
                text: `Carga ${ehCargaParcial ? "parcial" : "total"} : ${cargaDoDocente}`,
                alignment: "center",
                fontSize: 9,
                bold: true,
              },
            ],
          ],
        },
        layout: {
          vLineWidth: () => 0,
        },
      });
      const tableBodyDocenteSemAlocacao = [makeDocenteBodyHeader()];

      docenteSemAlocacaoCarga.turmas.forEach((turma) => {
        tableBodyDocenteSemAlocacao.push([
          "",
          { text: turma.periodo, fontSize: 6, alignment: "left" },
          { text: turma.disciplina.codigo, fontSize: 6, alignment: "left" },
          { text: turma.disciplina.nome, fontSize: 6, alignment: "left" },
          { text: turma.letra, fontSize: 6, alignment: "center" },
          { text: generateHorariosText(turma, " / "), fontSize: 6, alignment: "center" },
          {
            text: is1Semestre(turma.periodo) ? turma.creditosDaTurma : "",
            fontSize: 6,
            alignment: "center",
          },
          {
            text: is2Semestre(turma.periodo) ? turma.creditosDaTurma : "",
            fontSize: 6,
            alignment: "center",
          },
        ]);
      });

      tableBodyDocenteSemAlocacao.push([
        "",
        "",
        "",
        "",
        "",
        {
          text: "CARGA POR SEMESTRE:",
          fontSize: 6,
          alignment: "right",
          bold: true,
          margin: [0, 5, 0, 0],
        },
        {
          text: semestre1EstaAtivo ? docenteSemAlocacaoCarga.creditos1Semestre : "",
          fontSize: 6,
          alignment: "center",
          bold: true,
          margin: [0, 5, 0, 0],
        },
        {
          text: semestre2EstaAtivo ? docenteSemAlocacaoCarga.creditos2Semestre : "",
          fontSize: 6,
          alignment: "center",
          bold: true,
          margin: [0, 5, 0, 0],
        },
      ]);

      tables.push({
        style: "tableExample",
        table: {
          widths: [20, 8, 40, "*", 24, 104, 32, 32],
          headerRows: 1,
          color: "#426",
          body: tableBodyDocenteSemAlocacao,
        },
        layout: { vLineWidth: () => 0, hLineWidth: () => 0 },
        margin: [0, 0, 0, 5],
      });
    }

    if (!possuiAlgumaTurma) {
      tables.push(makeEmptyPageWarning());
    }
  }

  const docDefinition = {
    info: { title: "Carga Docentes" },
    content: tables,
    footer: (currentPage, pageCount) => {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: "left",
          },
          {
            text: currentPage.toString() + " de " + pageCount,
            alignment: "right",
            margin: [0, 10, 30, 0],
            fontSize: 8,
          },
        ],
      };
    },
  };
  pdfMake.createPdf(docDefinition).open();
}

export default pdfCargaDocentes;

function makeDocenteBodyHeader() {
  return [
    "",
    { text: "S.", fontSize: 8, bold: true },
    { text: "Cód.", fontSize: 8, bold: true },
    { text: "Disciplina", fontSize: 8, bold: true },
    { text: "Turma", alignment: "center", fontSize: 8, bold: true },
    { text: "Horário", alignment: "center", fontSize: 8, bold: true },
    { text: "CS1", alignment: "center", fontSize: 8, bold: true },
    { text: "CS2", alignment: "center", fontSize: 8, bold: true },
  ];
}
