import store from "../../vuex/store";
import { isNull, filter, find, orderBy, sortBy, some } from "lodash-es";
import { imageToDataUrl } from "../utils";
import urlLogoUfjf from "../../assets/logo-ufjf.png";
import urlLogoDcc from "../../assets/logo-dcc.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfPlanoDepartamental({ disciplinasInTurmas, periodosAtivos, plano }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const disciplinasOrdered = orderBy(disciplinasInTurmas, "codigo");

  if (!disciplinasInTurmas.length || !periodosAtivos.length) {
    tables.push(
      makePageHeader({ images: [logoDcc, logoUfjf], plano, title: "Relação de turmas oferecidas" })
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
          images: [logoDcc, logoUfjf],
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
            layout: {
              vLineWidth: function() {
                return 0;
              },
            },
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
                hLineWidth: function(i) {
                  return i === 0 ? (j === 0 ? 0 : 0.5) : 0;
                },
                vLineWidth: function() {
                  return 0;
                },
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
                layout: {
                  hLineWidth: function() {
                    return 0;
                  },
                  vLineWidth: function() {
                    return 0;
                  },
                },
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
    info: {
      title: "Plano Departamental",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
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

async function pdfHorariosCursos({ horariosAtivos, cursosAtivos, periodosAtivos, plano }) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const tables = [];
  const periodos = filter(periodosAtivos, (periodo) => periodo.id === 1 || periodo.id === 3); //Somente aceita periodo 1 e 3 por enquanto

  if (!cursosAtivos.length || !periodos.length) {
    tables.push(
      makePageHeader({ images: [logoDcc, logoUfjf], plano, title: "Horários dos cursos" })
    );
    tables.push(makeEmptyPageWarning());
  } else {
    periodos.forEach((periodo, index) => {
      tables.push(
        makePageHeader({
          images: [logoDcc, logoUfjf],
          plano,
          title: "Horários dos cursos",
          subtitle: `${periodo.id}º Período Letivo`,
        })
      );

      let cursosIndex = 0;
      let seg = "",
        ter = "",
        qua = "",
        qui = "",
        sex = "";

      //Ciencia compt Diurno
      if (some(cursosAtivos, ["codigo", "65C"])) {
        tables.push({
          text: "Ciência da Computação - Integral",
          bold: true,
          fontSize: 10,
        });
        const periodosCCD = horariosAtivos[`periodo${periodo.id}`].CCD;
        const indexInicial = periodo.id === 1 ? 0 : 1; //Determinado pelo periodo inicial da grade

        for (let i = indexInicial; i < 9; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          const tableHorarios = [makeTableHorarioHeader()];

          for (let d = 0; d < 4; d++) {
            periodosCCD[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "diurno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Ciencia compt Noturno
      if (some(cursosAtivos, ["codigo", "35A"])) {
        tables.push({
          text: "Ciência da Computação - Noturno",
          bold: true,
          fontSize: 10,
        });
        const periodosCCN = horariosAtivos[`periodo${periodo.id}`].CCN;
        const indexInicial = periodo.id === 1 ? 1 : 0;

        for (let i = indexInicial; i < 9; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          const tableHorarios = [makeTableHorarioHeader()];

          for (let d = 4; d < 6; d++) {
            periodosCCN[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "noturno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Sistemas de informacao
      if (some(cursosAtivos, ["codigo", "76A"])) {
        tables.push({
          text: "Sistemas de Informação",
          bold: true,
          fontSize: 10,
        });
        const periodosSI = horariosAtivos[`periodo${periodo.id}`].SI;
        const indexInicial = periodo.id === 1 ? 1 : 0;

        for (let i = indexInicial; i < 8; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          let tableHorarios = [makeTableHorarioHeader()];

          for (let d = 4; d < 6; d++) {
            periodosSI[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "noturno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Engenharia compt
      if (some(cursosAtivos, ["codigo", "65B"])) {
        tables.push({
          text: "Engenharia Computacional",
          bold: true,
          fontSize: 10,
        });
        const periodosEC = horariosAtivos[`periodo${periodo.id}`].EC;
        const indexInicial = periodo.id === 1 ? 0 : 1;

        for (let i = indexInicial; i < 10; i += 2) {
          tables.push({
            text: i + 1 + "º Período",
            fontSize: 8,
            bold: true,
            margin: [0, 5, 0, 5],
          });
          let tableHorarios = [makeTableHorarioHeader()];

          for (let d = 0; d < 4; d++) {
            periodosEC[i].forEach((turma) => {
              if (checkTurmaHorario(turma, 1 + d)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 7 + d)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 13 + d)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 19 + d)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, 25 + d)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "diurno"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
      //Eletivas
      if (some(cursosAtivos, ["codigo", "-"])) {
        tables.push({
          text: "Eletivas",
          bold: true,
          fontSize: 10,
        });
        const turmasEletivas = horariosAtivos[`periodo${periodo.id}`].Eletivas;

        if (turmasEletivas.length) {
          let tableHorarios = [makeTableHorarioHeader()];

          for (let d = 0; d < 8; d++) {
            const horarioSeg = (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d);
            const horarioTer = (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d);
            const horarioQua = (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d);
            const horarioQui = (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d);
            const horarioSex = (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d);

            turmasEletivas.forEach((turma) => {
              if (checkTurmaHorario(turma, horarioSeg)) {
                if (seg !== "") seg = seg + "\n";
                seg = seg + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioTer)) {
                if (ter != "") ter = ter + "\n";
                ter = ter + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioQua)) {
                if (qua != "") qua = qua + "\n";
                qua = qua + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioQui)) {
                if (qui != "") qui = qui + "\n";
                qui = qui + turma.disciplina.codigo + " " + turma.letra;
              }
              if (checkTurmaHorario(turma, horarioSex)) {
                if (sex != "") sex = sex + "\n";
                sex = sex + turma.disciplina.codigo + " " + turma.letra;
              }
            });

            tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "eletiva"));
            seg = ter = qua = qui = sex = "";
          }

          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        }

        if (cursosIndex + 1 !== cursosAtivos.length || index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
        cursosIndex++;
      }
    });
  }

  const docDefinition = {
    content: tables,
    info: {
      title: "Horários - Cursos",
    },
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
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

async function pdfHorariosLabs({ laboratorios, turmasETurmasExternas, periodosAtivos, plano }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  if (!laboratorios.length || !periodosAtivos.length) {
    tables.push(
      makePageHeader({
        images: [logoDcc, logoUfjf],
        plano,
        title: "Relação de horários das turmas em laboratórios",
      })
    );
    tables.push(makeEmptyPageWarning());
  } else {
    periodosAtivos.forEach((periodo, index) => {
      let periodoNome = "";
      if (periodo.id === 2 || periodo.id === 4) {
        periodoNome = periodo.nome.includes("(") ? " " + periodo.nome.split(" ")[1] : ""; //Pega texto entre parênteses
      }
      tables.push(
        makePageHeader({
          images: [logoDcc, logoUfjf],
          plano,
          title: "Relação de horários das turmas em laboratórios",
          subtitle: `${periodo.id}º Período Letivo${periodoNome}`,
        })
      );

      const turmasDoPeriodo = filter(turmasETurmasExternas, ["periodo", periodo.id]);
      if (!turmasDoPeriodo.length) {
        tables.push(makeEmptyPageWarning());
      } else {
        let numeroDeTabelas = 0;

        laboratorios.forEach((laboratorio) => {
          //Verifica quando possuir 4 tabelas na mesma pagina adiciona pageBreak antes da quinta tabela
          if (numeroDeTabelas % 4 === 0 && numeroDeTabelas !== 0) {
            tables.push({ text: "", pageBreak: "before" });
          }

          tables.push({
            text: laboratorio.nome,
            bold: true,
            margin: [0, 10],
            fontSize: 9,
          });
          const tableLabsBody = [
            [
              { text: "Horário", alignment: "center", bold: true, fontSize: 8 },
              {
                text: "Segunda",
                alignment: "center",
                bold: true,
                fontSize: 8,
              },
              {
                text: "Terça",
                alignment: "center",
                bold: true,
                fontSize: 8,
              },
              {
                text: "Quarta",
                alignment: "center",
                bold: true,
                fontSize: 8,
              },
              {
                text: "Quinta",
                alignment: "center",
                bold: true,
                fontSize: 8,
              },
              {
                text: "Sexta",
                alignment: "center",
                bold: true,
                fontSize: 8,
              },
            ],
          ];
          const turmasDoLaboratorio = getTurmasDaSala(turmasDoPeriodo, laboratorio.id);

          for (let d = 0; d < 8; d++) {
            let seg = "",
              ter = "",
              qua = "",
              qui = "",
              sex = "";
            turmasDoLaboratorio.forEach((turma) => {
              if (d < 4) {
                if (checkTurmaHorarioLabs(turma, 1 + d, laboratorio.id)) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 7 + d, laboratorio.id)) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 13 + d, laboratorio.id)) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 19 + d, laboratorio.id)) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 25 + d, laboratorio.id)) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + turma.disciplina.codigo + " " + turma.letra;
                }
              } else if (d === 4 || d === 5) {
                if (checkTurmaHorarioLabs(turma, 28 + d, laboratorio.id)) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 30 + d, laboratorio.id)) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 32 + d, laboratorio.id)) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 34 + d, laboratorio.id)) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 36 + d, laboratorio.id)) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + turma.disciplina.codigo + " " + turma.letra;
                }
              } else if (d > 5) {
                if (checkTurmaHorarioLabs(turma, d - 1)) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 5 + d, laboratorio.id)) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 11 + d, laboratorio.id)) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 17 + d, laboratorio.id)) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + turma.disciplina.codigo + " " + turma.letra;
                }
                if (checkTurmaHorarioLabs(turma, 23 + d, laboratorio.id)) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + turma.disciplina.codigo + " " + turma.letra;
                }
              }
            });

            switch (d) {
              case 0:
                tableLabsBody.push([
                  { text: "08 - 10", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 1:
                tableLabsBody.push([
                  { text: "10 - 12", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 2:
                tableLabsBody.push([
                  { text: "14 - 16", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 3:
                tableLabsBody.push([
                  { text: "16 - 18", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 4:
                tableLabsBody.push([
                  { text: "17 - 19", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 5:
                tableLabsBody.push([
                  { text: "18 - 20", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 6:
                tableLabsBody.push([
                  { text: "19 - 21", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
              case 7:
                tableLabsBody.push([
                  { text: "21 - 23", alignment: "center", fontSize: 8 },
                  {
                    text: seg,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: ter, alignment: "center", fontSize: 8 },
                  { text: qua, alignment: "center", fontSize: 8 },
                  {
                    text: qui,
                    alignment: "center",
                    fontSize: 8,
                  },
                  { text: sex, alignment: "center", fontSize: 8 },
                ]);
                break;
            }
          }

          numeroDeTabelas++;
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableLabsBody,
            },
          });
        });
      }

      if (index + 1 != periodosAtivos.length) {
        tables.push({ text: "", pageBreak: "before" }); //page break;
      }
    });
  }

  const docDefinition = {
    info: {
      title: "Horários - Laborátorios",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
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

async function pdfCargaProfessores({ docentes, semAlocacaoAtivo, periodosAtivos, plano }) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const tables = [];

  tables.push(
    makePageHeader({
      images: [logoDcc, logoUfjf],
      plano,
      title: "Relação de disciplinas ministradas pelos professores",
    })
  );

  if ((!docentes.length && !semAlocacaoAtivo) || !periodosAtivos.length) {
    tables.push(makeEmptyPageWarning());
  } else {
    const docentesOrdered = orderBy(docentes, "nome");
    const periodos1semestre = filter(periodosAtivos, ["semestreId", 1]);
    const periodos2semestre = filter(periodosAtivos, ["semestreId", 2]);
    let possuiAlgumaTurmas = false;

    for (let i = 0; i < docentesOrdered.length; i++) {
      const turmas1Semestre = getTurmasDoDocente(docentesOrdered[i], periodos1semestre);
      const turmas2Semestre = getTurmasDoDocente(docentesOrdered[i], periodos2semestre);
      const cargaPos1Semestre = getCargaPosDoDocente(docentesOrdered[i], periodos1semestre);
      const cargaPos2Semestre = getCargaPosDoDocente(docentesOrdered[i], periodos2semestre);

      if (
        turmas1Semestre.length ||
        turmas2Semestre.length ||
        cargaPos1Semestre.length ||
        cargaPos2Semestre.length
      ) {
        tables.push({
          style: "tableExample",
          table: {
            widths: ["*", 75],
            headerRows: 1,
            color: "#426",
            body: [
              [
                {
                  text: docentesOrdered[i].nome,
                  alignment: "left",
                  fontSize: 9,
                  bold: true,
                },
                {
                  text:
                    "Carga total: " +
                    (creditos1(docentesOrdered[i]) + creditos2(docentesOrdered[i])),
                  alignment: "center",
                  fontSize: 9,
                  bold: true,
                },
              ],
            ],
          },
          layout: {
            vLineWidth: function() {
              return 0;
            },
          },
        });
        possuiAlgumaTurmas = true;

        const tableDocenteBody = [
          [
            "",
            {
              text: "S.",
              fontSize: 8,
              bold: true,
            },
            {
              text: "Cód.",
              fontSize: 8,
              bold: true,
            },
            {
              text: "Disciplina",
              fontSize: 8,
              bold: true,
            },
            {
              text: "Turma",
              alignment: "center",
              fontSize: 8,
              bold: true,
            },
            {
              text: "Horário",
              alignment: "center",
              fontSize: 8,
              bold: true,
            },
            {
              text: "CS1",
              alignment: "center",
              fontSize: 8,
              bold: true,
            },
            {
              text: "CS2",
              alignment: "center",
              fontSize: 8,
              bold: true,
            },
          ],
        ];

        for (let j = 0; j < turmas1Semestre.length; j++) {
          var disciplina = undefined;
          var horario1 = undefined;
          var horario2 = undefined;
          var c1 = 0;
          var c2 = 0;
          for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
            if (turmas1Semestre[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
              disciplina = store.state.disciplina.Disciplinas[k];
            }
          }
          for (var l = 0; l < store.state.horario.Horarios.length; l++) {
            if (turmas1Semestre[j].Horario1 === store.state.horario.Horarios[l].id) {
              horario1 = store.state.horario.Horarios[l];
            }
          }

          for (var m = 0; m < store.state.horario.Horarios.length; m++) {
            if (turmas1Semestre[j].Horario2 === store.state.horario.Horarios[m].id) {
              horario2 = store.state.horario.Horarios[m];
            }
          }
          if (horario1 === undefined && horario2 === undefined) {
            horarioTotal = "";
          } else if (horario2 === undefined) {
            var horarioTotal = horario1.horario;
          } else if (horario1 === undefined) {
            var horarioTotal = horario2.horario;
          } else {
            var horarioTotal = horario1.horario + "/" + horario2.horario;
          }
          if (turmas1Semestre[j].periodo === 1 || turmas1Semestre[j].periodo === 2) {
            if (turmas1Semestre[j].Docente1 > 0 && turmas1Semestre[j].Docente2 > 0)
              c1 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
            else c1 = disciplina.cargaTeorica + disciplina.cargaPratica;
          } else {
            if (turmas1Semestre[j].Docente1 > 0 && turmas1Semestre[j].Docente2 > 0)
              c2 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
            else c2 = disciplina.cargaTeorica + disciplina.cargaPratica;
          }
          tableDocenteBody.push([
            "",
            {
              text: turmas1Semestre[j].periodo,
              fontSize: 6,
              alignment: "left",
            },
            {
              text: disciplina.codigo,
              fontSize: 6,
              alignment: "left",
            },
            {
              text: disciplina.nome,
              fontSize: 6,
              alignment: "left",
            },
            {
              text: turmas1Semestre[j].letra,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: horarioTotal,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: c1 === 0 ? "" : c1,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: c2 === 0 ? "" : c2,
              fontSize: 6,
              alignment: "center",
            },
          ]);
        }
        for (let n = 0; n < cargaPos1Semestre.length; n++) {
          var c1 = 0;
          var c2 = 0;
          if (cargaPos1Semestre[n].trimestre === 1 || cargaPos1Semestre[n].trimestre === 2) {
            c1 = cargaPos1Semestre[n].creditos;
          } else {
            c2 = cargaPos1Semestre[n].creditos;
          }
          tableDocenteBody.push([
            "",
            {
              text: cargaPos1Semestre[n].trimestre,
              fontSize: 6,
              alignment: "left",
            },
            "",
            {
              text: "DISCIPLINA DO " + cargaPos1Semestre[n].programa,
              fontSize: 6,
              alignment: "left",
            },
            "",
            "",
            {
              text: c1 === 0 ? "" : c1,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: c2 === 0 ? "" : c2,
              fontSize: 6,
              alignment: "center",
            },
          ]);
        }

        for (let j = 0; j < turmas2Semestre.length; j++) {
          var disciplina = undefined;
          var horario1 = undefined;
          var horario2 = undefined;
          var c1 = 0;
          var c2 = 0;
          for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
            if (turmas2Semestre[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
              disciplina = store.state.disciplina.Disciplinas[k];
            }
          }
          for (var l = 0; l < store.state.horario.Horarios.length; l++) {
            if (turmas2Semestre[j].Horario1 === store.state.horario.Horarios[l].id) {
              horario1 = store.state.horario.Horarios[l];
            }
          }

          for (var m = 0; m < store.state.horario.Horarios.length; m++) {
            if (turmas2Semestre[j].Horario2 === store.state.horario.Horarios[m].id) {
              horario2 = store.state.horario.Horarios[m];
            }
          }
          if (horario1 === undefined && horario2 === undefined) {
            horarioTotal = "";
          } else if (horario2 === undefined) {
            var horarioTotal = horario1.horario;
          } else if (horario1 === undefined) {
            var horarioTotal = horario2.horario;
          } else {
            var horarioTotal = horario1.horario + "/" + horario2.horario;
          }
          if (turmas2Semestre[j].periodo === 1 || turmas2Semestre[j].periodo === 2) {
            if (turmas2Semestre[j].Docente1 > 0 && turmas2Semestre[j].Docente2 > 0)
              c1 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
            else c1 = disciplina.cargaTeorica + disciplina.cargaPratica;
          } else {
            if (turmas2Semestre[j].Docente1 > 0 && turmas2Semestre[j].Docente2 > 0)
              c2 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
            else c2 = disciplina.cargaTeorica + disciplina.cargaPratica;
          }
          tableDocenteBody.push([
            "",
            {
              text: turmas2Semestre[j].periodo,
              fontSize: 6,
              alignment: "left",
            },
            {
              text: disciplina.codigo,
              fontSize: 6,
              alignment: "left",
            },
            {
              text: disciplina.nome,
              fontSize: 6,
              alignment: "left",
            },
            {
              text: turmas2Semestre[j].letra,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: horarioTotal,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: c1 === 0 ? "" : c1,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: c2 === 0 ? "" : c2,
              fontSize: 6,
              alignment: "center",
            },
          ]);
        }
        for (let n = 0; n < cargaPos2Semestre.length; n++) {
          let c1 = 0;
          let c2 = 0;
          if (cargaPos2Semestre[n].trimestre === 1 || cargaPos2Semestre[n].trimestre === 2) {
            c1 = cargaPos2Semestre[n].creditos;
          } else {
            c2 = cargaPos2Semestre[n].creditos;
          }
          tableDocenteBody.push([
            "",
            {
              text: cargaPos2Semestre[n].trimestre,
              fontSize: 6,
              alignment: "left",
            },
            "",
            {
              text: "DISCIPLINA DO " + cargaPos2Semestre[n].programa,
              fontSize: 6,
              alignment: "left",
            },
            "",
            "",
            {
              text: c1 === 0 ? "" : c1,
              fontSize: 6,
              alignment: "center",
            },
            {
              text: c2 === 0 ? "" : c2,
              fontSize: 6,
              alignment: "center",
            },
          ]);
        }

        tableDocenteBody.push([
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
            text: creditos1(docentesOrdered[i]),
            fontSize: 6,
            alignment: "center",
            bold: true,
            margin: [0, 5, 0, 0],
          },
          {
            text: creditos2(docentesOrdered[i]),
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
            body: tableDocenteBody,
          },
          layout: {
            vLineWidth: function() {
              return 0;
            },
            hLineWidth: function() {
              return 0;
            },
          },
          margin: [0, 0, 0, 5],
        });
      }
    }

    let turmasSemAlocacao = [];
    if (semAlocacaoAtivo) turmasSemAlocacao = getTurmasSemAlocacao(periodosAtivos);

    if (turmasSemAlocacao.length) {
      tables.push({
        style: "tableExample",
        table: {
          widths: ["*", 32, 32],
          headerRows: 1,
          color: "#426",
          body: [
            [
              {
                text: "SEM ALOCAÇÃO",
                alignment: "left",
                fontSize: 9,
                bold: true,
              },
              "",
              "",
            ],
          ],
        },
        layout: {
          vLineWidth: function() {
            return 0;
          },
        },
      });
      possuiAlgumaTurmas = true;
      let tableSemAlocacaoBody = [
        [
          "",
          {
            text: "S.",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Cód.",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Disciplina",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Turma",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: "Horário",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: "C1",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
          {
            text: "C2",
            alignment: "center",
            fontSize: 8,
            bold: true,
          },
        ],
      ];

      for (var j = 0; j < turmasSemAlocacao.length; j++) {
        var disciplina = undefined;
        var horario1 = undefined;
        var horario2 = undefined;
        var c1 = 0;
        var c2 = 0;
        for (var k = 0; k < store.state.disciplina.Disciplinas.length; k++) {
          if (turmasSemAlocacao[j].Disciplina === store.state.disciplina.Disciplinas[k].id) {
            disciplina = store.state.disciplina.Disciplinas[k];
          }
        }
        for (var l = 0; l < store.state.horario.Horarios.length; l++) {
          if (turmasSemAlocacao[j].Horario1 === store.state.horario.Horarios[l].id) {
            horario1 = store.state.horario.Horarios[l];
          }
        }

        for (var m = 0; m < store.state.horario.Horarios.length; m++) {
          if (turmasSemAlocacao[j].Horario2 === store.state.horario.Horarios[m].id) {
            horario2 = store.state.horario.Horarios[m];
          }
        }
        if (horario1 === undefined && horario2 === undefined) {
          horarioTotal = "";
        } else if (horario2 === undefined) {
          var horarioTotal = horario1.horario;
        } else if (horario1 === undefined) {
          var horarioTotal = horario2.horario;
        } else {
          var horarioTotal = horario1.horario + "/" + horario2.horario;
        }
        if (turmasSemAlocacao[j].periodo === 1 || turmasSemAlocacao[j].periodo === 2) {
          if (turmasSemAlocacao[j].Docente1 > 0 && turmasSemAlocacao[j].Docente2 > 0)
            c1 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
          else c1 = disciplina.cargaTeorica + disciplina.cargaPratica;
        } else {
          if (turmasSemAlocacao[j].Docente1 > 0 && turmasSemAlocacao[j].Docente2 > 0)
            c2 = (disciplina.cargaTeorica + disciplina.cargaPratica) / 2;
          else c2 = disciplina.cargaTeorica + disciplina.cargaPratica;
        }
        tableSemAlocacaoBody.push([
          "",
          {
            text: turmasSemAlocacao[j].periodo,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: disciplina.codigo,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: disciplina.nome,
            fontSize: 6,
            alignment: "left",
          },
          {
            text: turmasSemAlocacao[j].letra,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: horarioTotal,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c1 === 0 ? "" : c1,
            fontSize: 6,
            alignment: "center",
          },
          {
            text: c2 === 0 ? "" : c2,
            fontSize: 6,
            alignment: "center",
          },
        ]);
      }

      tables.push({
        style: "tableExample",
        table: {
          widths: [20, 8, 40, "*", 24, 104, 32, 32],
          headerRows: 1,
          color: "#426",
          body: tableSemAlocacaoBody,
        },
        layout: {
          vLineWidth: function() {
            return 0;
          },
          hLineWidth: function() {
            return 0;
          },
        },
        margin: [0, 0, 0, 5],
      });
    }

    if (!possuiAlgumaTurmas) {
      tables.push(makeEmptyPageWarning());
    }
  }

  const docDefinition = {
    info: {
      title: "Carga Professores",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
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

async function pdfTurmasCursos({ cursos, periodos, plano }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  if (!cursos.length || !periodos.length) {
    tables.push(
      makePageHeader({
        images: [logoDcc, logoUfjf],
        plano,
        title: "Relação de turmas oferecidas para cada curso",
      })
    );
    tables.push(makeEmptyPageWarning());
  } else {
    periodos.forEach((periodo, index) => {
      let periodoNome = "";
      if (periodo.id === 2 || periodo.id === 4) {
        periodoNome = periodo.nome.includes("(") ? " " + periodo.nome.split(" ")[1] : ""; //Pega texto entre parênteses
      }
      tables.push(
        makePageHeader({
          images: [logoDcc, logoUfjf],
          plano,
          title: "Relação de turmas oferecidas para cada curso",
          subtitle: `${periodo.id}º Período Letivo${periodoNome}`,
        })
      );

      const turmasDoPeriodo = filter(store.getters.TurmasInDisciplinasPerfis, [
        "periodo",
        periodo.id,
      ]);
      let possuiAlgumaTurmas = false;

      cursos.forEach((curso) => {
        const turmasDoCurso = getTurmasDoCurso(turmasDoPeriodo, curso.id);

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
                  {
                    text: curso.codigo,
                    alignment: "left",
                    bold: true,
                    fontSize: 9,
                  },
                  {
                    text: curso.nome,
                    alignment: "left",
                    bold: true,
                    fontSize: 9,
                  },
                ],
              ],
            },

            layout: {
              vLineWidth: function() {
                return 0;
              },
            },
          });
          const tabelaTurmasBody = [
            [
              { text: "Período", alignment: "left", bold: "true", fontSize: 8 },
              { text: "Cód.", alignment: "left", bold: "true", fontSize: 8 },
              { text: "Disciplina", alignment: "left", bold: "true", fontSize: 8 },
              {
                text: "Turma",
                alignment: "center",
                bold: "true",
                fontSize: 8,
              },
              { text: "Horário", alignment: "center", bold: "true", fontSize: 8 },
              {
                text: "Vagas",
                alignment: "center",
                bold: "true",
                fontSize: 8,
              },
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
                text: generateHorariosText(turma, "/"),
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
    info: {
      title: "Turmas - Cursos",
    },
    content: tables,
    footer: function(currentPage, pageCount) {
      return {
        columns: [
          {
            text: new Date(Date.now()).toLocaleString(),
            margin: [30, 10, 0, 0],
            fontSize: 8,
            alignment: `left`,
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

export {
  pdfPlanoDepartamental,
  pdfHorariosCursos,
  pdfHorariosLabs,
  pdfCargaProfessores,
  pdfTurmasCursos,
};

//Funções auxiliares
function checkTurmaLab(turma) {
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

function checkTurmaHorarioLabs(turma, horario, lab) {
  if (turma.Horario1 == horario || turma.Horario2 == horario) {
    let sala = checkTurmaLab(turma);
    switch (sala) {
      case 0:
        return false;
        break;
      case 1:
        if (turma.Horario1 == horario) return true;
        else return false;
        break;
      case 2:
        if (turma.Horario2 == horario) return true;
        else return false;
        break;
      case 3:
        if (turma.Sala1 === lab) {
          if (turma.Horario1 == horario) return true;
        } else if (turma.Sala2 === lab) {
          if (turma.Horario2 == horario) return true;
        }
        return false;
      case 4:
        return true;
        break;
    }
    return true;
  } else return false;
}

function checkTurmaHorario(turma, horario) {
  if (turma.Horario1 === horario || turma.Horario2 === horario) return true;
  else return false;
}

function getTurmasDoDocente(docente, periodosAtivos) {
  if (!periodosAtivos.length) return [];

  const turmasFiltered = filter(
    store.getters.TurmasInDisciplinasPerfis,
    (turma) =>
      (turma.Docente1 === docente.id || turma.Docente2 === docente.id) &&
      some(periodosAtivos, ["id", turma.periodo])
  );

  return orderBy(turmasFiltered, ["periodo", "disciplina.nome", "letra"]);
}

function getTurmasSemAlocacao(periodosAtivos) {
  if (!periodosAtivos.length) return [];

  const turmasFiltered = filter(
    store.getters.TurmasInDisciplinasPerfis,
    (turma) =>
      turma.Docente1 == null &&
      turma.Docente2 == null &&
      turma.Disciplina != null &&
      some(periodosAtivos, ["id", turma.periodo])
  );

  return orderBy(turmasFiltered, ["periodo", "disciplina.nome", "letra"]);
}

function getCargaPosDoDocente(docente, periodosAtivos) {
  if (!periodosAtivos.length) return [];

  const cargaposFiltered = filter(
    store.getters.AllCargasPos,
    (carga) => carga.Docente === docente.id && some(periodosAtivos, ["id", carga.trimestre])
  );

  return orderBy(cargaposFiltered, "trimestre");
}

function creditos1(professor) {
  var c = 0;
  for (let t = 0; t < store.state.turma.Turmas.length; t++) {
    if (
      (store.state.turma.Turmas[t].periodo === 1 || store.state.turma.Turmas[t].periodo === 2) &&
      (store.state.turma.Turmas[t].Docente1 === professor.id ||
        store.state.turma.Turmas[t].Docente2 === professor.id)
    ) {
      for (let d = 0; d < store.state.disciplina.Disciplinas.length; d++) {
        if (store.state.disciplina.Disciplinas[d].id === store.state.turma.Turmas[t].Disciplina) {
          if (
            store.state.turma.Turmas[t].Docente1 > 0 &&
            store.state.turma.Turmas[t].Docente2 > 0
          ) {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica) / 2;
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica) / 2;
          } else {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica);
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica);
          }
        }
      }
    }
  }
  for (let t = 0; t < store.state.cargaPos.Cargas.length; t++) {
    if (store.state.cargaPos.Cargas[t].Docente === professor.id) {
      if (
        store.state.cargaPos.Cargas[t].trimestre == 1 ||
        store.state.cargaPos.Cargas[t].trimestre == 2
      ) {
        c += parseFloat(store.state.cargaPos.Cargas[t].creditos);
      }
    }
  }
  return c;
}

function creditos2(professor) {
  var c = 0;
  for (let t = 0; t < store.state.turma.Turmas.length; t++) {
    if (
      (store.state.turma.Turmas[t].periodo === 3 || store.state.turma.Turmas[t].periodo === 4) &&
      (store.state.turma.Turmas[t].Docente1 === professor.id ||
        store.state.turma.Turmas[t].Docente2 === professor.id)
    ) {
      for (let d = 0; d < store.state.disciplina.Disciplinas.length; d++) {
        if (store.state.disciplina.Disciplinas[d].id === store.state.turma.Turmas[t].Disciplina) {
          if (
            store.state.turma.Turmas[t].Docente1 > 0 &&
            store.state.turma.Turmas[t].Docente2 > 0
          ) {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica) / 2;
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica) / 2;
          } else {
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaPratica);
            c += parseFloat(store.state.disciplina.Disciplinas[d].cargaTeorica);
          }
        }
      }
    }
  }
  for (let t = 0; t < store.state.cargaPos.Cargas.length; t++) {
    if (store.state.cargaPos.Cargas[t].Docente === professor.id) {
      if (
        store.state.cargaPos.Cargas[t].trimestre == 3 ||
        store.state.cargaPos.Cargas[t].trimestre == 4
      ) {
        c += parseFloat(store.state.cargaPos.Cargas[t].creditos);
      }
    }
  }
  return c;
}

function generateDocentesText(turma) {
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

function generateHorariosText(turma, divider = "\n") {
  const horario1 = find(store.getters.AllHorarios, ["id", turma.Horario1]);
  const horario2 = find(store.getters.AllHorarios, ["id", turma.Horario2]);
  let horariosResult = undefined;

  if (horario1 === undefined && horario2 === undefined) horariosResult = "";
  else if (horario2 === undefined) horariosResult = horario1.horario;
  else if (horario1 === undefined) horariosResult = horario2.horario;
  else horariosResult = horario1.horario + divider + horario2.horario;

  return horariosResult;
}

function generateSalasText(turma) {
  const sala1 = find(store.getters.AllSalas, ["id", turma.Sala1]);
  const sala2 = find(store.getters.AllSalas, ["id", turma.Sala2]);
  let salasResult = undefined;

  if (sala1 === undefined && sala2 === undefined) salasResult = "";
  else if (sala2 === undefined) salasResult = sala1.nome;
  else if (sala1 === undefined) salasResult = sala2.nome;
  else salasResult = sala1.nome + "\n" + sala2.nome;

  return salasResult;
}

function getSomatorioDeVagasDaTurma(turma) {
  let pedidos = store.state.pedido.Pedidos[turma.id];
  let vagasP = 0;
  let vagasNP = 0;
  pedidos.forEach((p) => {
    vagasP += p.vagasPeriodizadas;
    vagasNP += p.vagasNaoPeriodizadas;
  });
  return vagasP + vagasNP;
}

function horasAula(disciplina) {
  return (parseInt(disciplina.cargaPratica) + parseInt(disciplina.cargaTeorica)) * 15;
}

function getCursoById(cursoId) {
  return find(store.state.curso.Cursos, ["id", cursoId]);
}

function getPedidosDaTurma(turma) {
  const pedidosFiltered = filter(
    store.state.pedido.Pedidos[turma.id],
    (pedido) => pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0
  );
  return sortBy(pedidosFiltered, (pedido) => getCursoById(pedido.Curso).codigo);
}

function getTurmasDoCurso(turmas, cursoId) {
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

function getTurmasDaSala(turmas, salaId) {
  return filter(turmas, (turma) => turma.Sala1 === salaId || turma.Sala2 === salaId);
}

//Pdfmake aux
function makeTableHorarioHeader() {
  return [
    { text: "Horário", alignment: "center", fontSize: 8, bold: true },
    { text: "Segunda", alignment: "center", fontSize: 8, bold: true },
    { text: "Terça", alignment: "center", fontSize: 8, bold: true },
    { text: "Quarta", alignment: "center", fontSize: 8, bold: true },
    { text: "Quinta", alignment: "center", fontSize: 8, bold: true },
    { text: "Sexta", alignment: "center", fontSize: 8, bold: true },
  ];
}

function makeTableHorariosBody(d, dias, turno) {
  const body = [];
  //Horarios possiveis para Diurno
  if (turno === "diurno") {
    if (d === 0) body.push({ text: "08 - 10", alignment: "center", fontSize: 8 });
    else if (d === 1) body.push({ text: "10 - 12", alignment: "center", fontSize: 8 });
    else if (d === 2) body.push({ text: "14 - 16", alignment: "center", fontSize: 8 });
    else if (d === 3) body.push({ text: "16 - 18", alignment: "center", fontSize: 8 });
  }
  //Horarios possiveis para Noturno
  else if (turno === "noturno") {
    if (d === 4) body.push({ text: "19 - 21", alignment: "center", fontSize: 8 });
    else if (d === 5) body.push({ text: "21 - 23", alignment: "center", fontSize: 8 });
  }
  //Horarios possiveis para Eletivas
  else if (turno === "eletiva") {
    if (d === 0) body.push({ text: "08 - 10", alignment: "center", fontSize: 8 });
    else if (d === 1) body.push({ text: "10 - 12", alignment: "center", fontSize: 8 });
    else if (d === 2) body.push({ text: "14 - 16", alignment: "center", fontSize: 8 });
    else if (d === 3) body.push({ text: "16 - 18", alignment: "center", fontSize: 8 });
    else if (d === 4) body.push({ text: "17 - 19", alignment: "center", fontSize: 8 });
    else if (d === 5) body.push({ text: "18 - 20", alignment: "center", fontSize: 8 });
    else if (d === 6) body.push({ text: "19 - 21", alignment: "center", fontSize: 8 });
    else if (d === 7) body.push({ text: "21 - 23", alignment: "center", fontSize: 8 });
  }

  body.push(
    { text: dias.seg, alignment: "center", fontSize: 8 },
    { text: dias.ter, alignment: "center", fontSize: 8 },
    { text: dias.qua, alignment: "center", fontSize: 8 },
    { text: dias.qui, alignment: "center", fontSize: 8 },
    { text: dias.sex, alignment: "center", fontSize: 8 }
  );
  return body;
}

function makePageHeader({ images, plano, title, subtitle }) {
  return [
    {
      columns: [
        { image: images[0] || "", fit: [60, 60], alignment: "left", width: "16%" },
        [
          { text: title, alignment: "center", bold: true, fontSize: 10 },
          {
            text: "Departamento de Ciência da Computação",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
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

function makeEmptyPageWarning(text) {
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
