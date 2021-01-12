import {
  makePageHeader,
  makeEmptyPageWarning,
  generateHorariosText,
  getHeaderImages,
  filterTurmasDoCurso,
  getTurmasDoPeriodo,
} from "./helpers";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfTurmasCursos(data) {
  const { cursos, periodos, plano } = data;
  const tables = [];
  const headerImages = await getHeaderImages();

  if (!cursos.length || !periodos.length) {
    tables.push(
      makePageHeader({
        images: headerImages,
        plano,
        title: "Relação de turmas oferecidas para cada curso",
      }),
      makeEmptyPageWarning()
    );
  } else {
    periodos.forEach((periodo, index) => {
      let periodoNome = "";
      if (periodo.id === 2 || periodo.id === 4) {
        periodoNome = periodo.nome.includes("(") ? " " + periodo.nome.split(" ")[1] : ""; //Pega texto entre parênteses
      }
      tables.push(
        makePageHeader({
          images: headerImages,
          plano,
          title: "Relação de turmas oferecidas para cada curso",
          subtitle: `${periodo.id}º Período Letivo${periodoNome}`,
        })
      );

      const turmasDoPeriodo = getTurmasDoPeriodo(periodo.id);
      let possuiAlgumaTurmas = false;

      cursos.forEach((curso) => {
        const turmasDoCurso = filterTurmasDoCurso(turmasDoPeriodo, curso.id);

        if (turmasDoCurso.length) {
          possuiAlgumaTurmas = true;
          tables.push({
            style: "tableExample",
            table: {
              widths: [60, "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: curso.codigo, alignment: "left", bold: true, fontSize: 9 },
                  { text: curso.nome, alignment: "left", bold: true, fontSize: 9 },
                ],
              ],
            },
            layout: { vLineWidth: () => 0 },
          });
          const tabelaTurmasBody = [
            [
              { text: "Período", alignment: "left", bold: "true", fontSize: 8 },
              { text: "Cód.", alignment: "left", bold: "true", fontSize: 8 },
              { text: "Disciplina", alignment: "left", bold: "true", fontSize: 8 },
              { text: "Turma", alignment: "center", bold: "true", fontSize: 8 },
              { text: "Horário", alignment: "center", bold: "true", fontSize: 8 },
              { text: "Vagas", alignment: "center", bold: "true", fontSize: 8 },
            ],
          ];

          turmasDoCurso.forEach((turma, turmaIndex) => {
            tabelaTurmasBody.push([
              {
                text: turma.periodo,
                alignment: "center",
                fontSize: 6,
                bold: false,
                margin: [0, 0, 0, turmaIndex === turmasDoCurso.length - 1 ? 10 : 0],
              },
              { text: turma.disciplina.codigo, alignment: "left", fontSize: 6, bold: false },
              { text: turma.disciplina.nome, alignment: "left", fontSize: 6, bold: false },
              { text: turma.letra, alignment: "center", fontSize: 6, bold: false },
              {
                text: generateHorariosText(turma, " / "),
                alignment: "center",
                fontSize: 6,
                bold: false,
              },
              { text: turma.totalVagas, alignment: "center", fontSize: 6, bold: false },
            ]);
          });

          tables.push({
            style: "tableExample",
            table: {
              widths: [28, 48, "*", 24, 68, 40],
              headerRows: 1,
              color: "#426",
              body: tabelaTurmasBody,
            },
            layout: { hLineWidth: () => 0, vLineWidth: () => 0 },
          });
        }
      });

      if (!possuiAlgumaTurmas) {
        tables.push(makeEmptyPageWarning());
      }
      if (index + 1 != periodos.length) {
        tables.push({ text: "", pageBreak: "before" }); //page break;
      }
    });
  }

  const docDefinition = {
    info: { title: "Turmas - Cursos" },
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

export default pdfTurmasCursos;
