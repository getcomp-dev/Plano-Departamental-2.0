import {
  makePageHeader,
  makeEmptyPageWarning,
  generateHorariosText,
  getHeaderImages,
  horasAula,
  generateDocentesText,
  generateSalasText,
  getSomatorioDeVagasDaTurma,
  getPedidosDaTurma,
  getCursoById,
} from "./helpers";
import { filter, orderBy } from "lodash-es";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfPlanoDepartamental(data) {
  const { disciplinasInTurmas, periodosAtivos, plano } = data;
  const tables = [];
  const headerImages = await getHeaderImages();
  const disciplinasOrdered = orderBy(disciplinasInTurmas, "codigo");

  if (!disciplinasInTurmas.length || !periodosAtivos.length) {
    tables.push(
      makePageHeader({ images: headerImages, plano, title: "Relação de turmas oferecidas" })
    );
    tables.push(makeEmptyPageWarning());
  } else {
    periodosAtivos.forEach((periodo, index) => {
      let periodoNome = "";
      if (periodo.id === 2 || periodo.id === 4) {
        periodoNome = periodo.nome.includes("(") ? periodo.nome.split(" ")[1] + " " : ""; //Pega texto entre parênteses
      }
      tables.push(
        makePageHeader({
          images: headerImages,
          plano,
          title: "Relação de turmas oferecidas",
          subtitle: `${periodo.id}º Período Letivo ${periodoNome}`,
        })
      );

      let periodoPossuiAlgumaTurma = false;
      disciplinasOrdered.forEach((disciplina) => {
        const turmasFiltered = filter(disciplina.turmas, ["periodo", periodo.id]);

        if (turmasFiltered.length) {
          periodoPossuiAlgumaTurma = true;
          tables.push({
            style: "tableExample",
            table: {
              widths: [60, "*", 72, 40],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: disciplina.codigo,
                    alignment: "left",
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: disciplina.nome,
                    alignment: "left",
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: disciplina.perfil.abreviacao,
                    alignment: "center",
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: horasAula(disciplina) + " horas",
                    alignment: "center",
                    bold: true,
                    fontSize: 9,
                  },
                ],
              ],
            },
            layout: { vLineWidth: () => 0 },
          });

          turmasFiltered.forEach((turma, j) => {
            tables.push({
              style: "tableExample",
              table: {
                widths: [36, 35, "*", 18, 36, 28, 32, 42],
                headerRows: 1,
                color: "#426",
                body: [
                  [
                    {
                      text: "Turma: " + turma.letra,
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: "Docentes: ",
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: generateDocentesText(turma),
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: "Sala: ",
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: generateSalasText(turma),
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: "Horário: ",
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: generateHorariosText(turma),
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                    {
                      text: "Vagas: " + getSomatorioDeVagasDaTurma(turma), //tinha segundo paramentro com 1 e 2
                      alignment: "left",
                      fontSize: 8,
                      bold: true,
                    },
                  ],
                ],
              },
              layout: {
                hLineWidth: (i) => {
                  return i === 0 ? (j === 0 ? 0 : 0.5) : 0;
                },
                vLineWidth: () => 0,
              },
            });

            const pedidosDaTurma = getPedidosDaTurma(turma);
            if (pedidosDaTurma.length) {
              const tabelaCursosBody = [
                [
                  { text: "" },
                  { text: "Cód.", alignment: "left", bold: "true", fontSize: 8 },
                  { text: "Curso", alignment: "left", bold: "true", fontSize: 8 },
                  { text: "Grade", alignment: "center", bold: "true", fontSize: 8 },
                  { text: "Extra", alignment: "center", bold: "true", fontSize: 8 },
                  { text: "Total", alignment: "center", bold: "true", fontSize: 8 },
                ],
              ];

              pedidosDaTurma.forEach((pedido) => {
                const vagasTotais = pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas;
                const curso = getCursoById(pedido.Curso);

                tabelaCursosBody.push([
                  { text: "" },
                  { text: curso.codigo, alignment: "left", fontSize: 6 },
                  { text: curso.nome, alignment: "left", fontSize: 6 },
                  { text: pedido.vagasPeriodizadas, alignment: "center", fontSize: 6 },
                  { text: pedido.vagasNaoPeriodizadas, alignment: "center", fontSize: 6 },
                  { text: vagasTotais, alignment: "center", fontSize: 6 },
                ]);
              });

              tables.push({
                style: "tableExample",
                table: {
                  widths: [20, 24, "*", 24, 24, 24],
                  color: "#426",
                  body: tabelaCursosBody,
                },
                layout: { hLineWidth: () => 0, vLineWidth: () => 0 },
                margin: [0, 0, 0, j + 1 === turmasFiltered.length ? 10 : 5],
              });
            }
          });
        }
      });

      if (!periodoPossuiAlgumaTurma) {
        tables.push(makeEmptyPageWarning());
      }
      if (index + 1 !== periodosAtivos.length) {
        tables.push({ text: "", pageBreak: "before" }); //page break;
      }
    });
  }

  let docDefinition = {
    info: { title: "Plano Departamental" },
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

export default pdfPlanoDepartamental;
