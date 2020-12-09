/* eslint-disable */
import store from "../../vuex/store";
import { isNull, filter, find, orderBy, sortBy, some } from "lodash-es";
import { imageToDataUrl } from "../utils";
import urlLogoUfjf from "../../assets/logo-ufjf.png";
import urlLogoDcc from "../../assets/logo-dcc.png";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfDisciplinasTurmas({ disciplinasInTurmas, periodosAtivados, plano }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const disciplinasOrdered = orderBy(disciplinasInTurmas, "codigo");

  periodosAtivados.forEach((periodo, index) => {
    tables.push({
      columns: [
        {
          image: logoDcc,
          fit: [60, 60],
          alignment: "left",
          width: "16%",
          margin: [0, 0, 0, 10],
        },
        [
          {
            text:
              "Relação de turmas oferecidas pelo Departamento de Ciência da Computação",
            alignment: "center",
            bold: true,
            fontSize: 10,
          },
          {
            text: `${periodo.id}º Período letivo - ${plano.ano} - ${plano.nome}`,
            alignment: "center",
            bold: true,
            fontSize: 10,
            margin: [0, 0, 0, 5],
          },
        ],
        {
          image: logoUfjf,
          fit: [60, 60],
          alignment: "right",
          width: "16%",
          margin: [0, 0, 0, 10],
        },
      ],
    });

    disciplinasOrdered.forEach((disciplina) => {
      const turmasFiltered = filter(disciplina.turmas, ["periodo", periodo.id]);

      if (turmasFiltered.length) {
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

    if (index + 1 !== periodosAtivados.length)
      tables.push({ text: "", pageBreak: "before" }); //page break;
  });

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

async function pdfHorariosLabs({ laboratorios, periodosAtivados, plano }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const disciplinasOrdered = orderBy(store.getters.AllDisciplinas, ["nome"]);

  periodosAtivados.forEach((periodo, index) => {
    tables.push(
      {
        columns: [
          {
            image: logoDcc,
            fit: [60, 60],
            alignment: "left",
            width: "16%",
          },
          [
            {
              text: "Relação de horários das turmas em laboratórios do",
              alignment: "center",
              bold: true,
              fontSize: 10,
            },
            {
              text: "Departamento de Ciência da Computação",
              alignment: "center",
              bold: true,
              fontSize: 10,
            },
          ],
          {
            image: logoUfjf,
            fit: [60, 60],
            alignment: "right",
            width: "16%",
          },
        ],
      },
      {
        text: `${periodo.id}º Período letivo ${plano.ano} - ${plano.nome}`,
        alignment: "center",
        bold: true,
        fontSize: 10,
        margin: [0, 0, 0, 5],
      }
    );
    const turmasFiltered = filter(store.state.turma.Turmas, ["periodo", periodo.id]);
    let seg = "",
      ter = "",
      qua = "",
      qui = "",
      sex = "";

    for (let i = 0; i < laboratorios.length; i++) {
      if (i % 4 === 0 && i !== 0) {
        tables.push({
          text: laboratorios[i].nome,
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 9,
          pageBreak: "before",
        });
      } else {
        tables.push({
          text: laboratorios[i].nome,
          bold: true,
          margin: [0, 10, 0, 10],
          fontSize: 9,
        });
      }
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

      for (var d = 0; d < 8; d++) {
        for (var j = 0; j < turmasFiltered.length; j++) {
          if (
            turmasFiltered[j].Sala1 === laboratorios[i].id ||
            turmasFiltered[j].Sala2 === laboratorios[i].id
          ) {
            if (d < 4) {
              if (checkTurmaHorarioLabs(turmasFiltered[j], 1 + d, laboratorios[i].id)) {
                for (var k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 7 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 13 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 19 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 25 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
            } else if (d === 4 || d === 5) {
              if (checkTurmaHorarioLabs(turmasFiltered[j], 28 + d, laboratorios[i].id)) {
                for (var k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 30 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 32 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 34 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 36 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
            } else if (d > 5) {
              if (checkTurmaHorarioLabs(turmasFiltered[j], d - 1)) {
                for (var k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 5 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 11 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 17 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
              if (checkTurmaHorarioLabs(turmasFiltered[j], 23 + d, laboratorios[i].id)) {
                for (k = 0; k < disciplinasOrdered.length; k++) {
                  if (turmasFiltered[j].Disciplina === disciplinasOrdered[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex + disciplinasOrdered[k].codigo + " " + turmasFiltered[j].letra;
                  }
                }
              }
            }
          }
        }

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
        seg = ter = qua = qui = sex = "";
      }
      tables.push({
        table: {
          widths: ["*", "*", "*", "*", "*", "*"],
          headerRows: 1,
          color: "#426",
          body: tableLabsBody,
        },
      });
    }

    if (index + 1 != periodosAtivados.length)
      tables.push({ text: "", pageBreak: "before" }); //page break;
  });

  let docDefinition = {
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

async function pdfCargaProfessores({ docentes, semAlocacao, periodosAtivos, plano }) {
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);
  const tables = [];
  const docentesOrdered = orderBy(docentes, "nome");
  const periodos1semestre = filter(periodosAtivos, ["semestreId", 1]);
  const periodos2semestre = filter(periodosAtivos, ["semestreId", 2]);

  tables.push({
    columns: [
      {
        image: logoDcc,
        fit: [60, 60],
        alignment: "left",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
      [
        {
          text: "Relação de disciplinas ministradas pelos professores do",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
        {
          text:
            "Departamento de Ciência da Computação - " + plano.ano + " - " + plano.nome,
          alignment: "center",
          bold: true,
          fontSize: 10,
          margin: [0, 0, 0, 5],
        },
      ],
      {
        image: logoUfjf,
        fit: [60, 60],
        alignment: "right",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
    ],
  });

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
          if (
            turmas1Semestre[j].Disciplina === store.state.disciplina.Disciplinas[k].id
          ) {
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
        if (turmas1Semestre[j].periodo == 1) {
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
        if (
          cargaPos1Semestre[n].trimestre === 1 ||
          cargaPos1Semestre[n].trimestre === 2
        ) {
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
          if (
            turmas2Semestre[j].Disciplina === store.state.disciplina.Disciplinas[k].id
          ) {
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
        if (turmas2Semestre[j].periodo == 1) {
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
        var c1 = 0;
        var c2 = 0;
        if (
          cargaPos2Semestre[n].trimestre === 1 ||
          cargaPos2Semestre[n].trimestre === 2
        ) {
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
  if (semAlocacao) turmasSemAlocacao = getTurmasSemAlocacao(periodosAtivos);

  if (turmasSemAlocacao.length > 0) {
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
        if (
          turmasSemAlocacao[j].Disciplina === store.state.disciplina.Disciplinas[k].id
        ) {
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
      if (turmasSemAlocacao[j].periodo == 1) {
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
  }

  let docDefinition = {
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

async function pdfTurmasCursos({ cursos, periodos }) {
  const tables = [];
  const logoDcc = await imageToDataUrl(urlLogoDcc);
  const logoUfjf = await imageToDataUrl(urlLogoUfjf);

  tables.push({
    columns: [
      {
        image: logoDcc,
        fit: [60, 60],
        alignment: "left",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
      [
        {
          text:
            "Relação de turmas oferecidas para cada curso pelo Departamento de Ciência da Computação",
          alignment: "center",
          bold: true,
          fontSize: 10,
        },
      ],
      {
        image: logoUfjf,
        fit: [60, 60],
        alignment: "right",
        width: "16%",
        margin: [0, 0, 0, 10],
      },
    ],
  });

  for (let i = 0; i < cursos.length; i++) {
    let turmas = getTurmasDoCurso(cursos[i].id, periodos);
    if (turmas.length > 0) {
      tables.push({
        style: "tableExample",
        table: {
          widths: [60, "*"],
          headerRows: 1,
          color: "#426",
          body: [
            [
              {
                text: cursos[i].codigo,
                alignment: "left",
                bold: true,
                fontSize: 9,
              },
              {
                text: cursos[i].nome,
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

      let tabelaTurmasBody = [
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

      for (let j = 0; j < turmas.length; j++) {
        let horario1 = find(store.state.horario.Horarios, {
          id: turmas[j].turma.Horario1,
        });
        let horario2 = find(store.state.horario.Horarios, {
          id: turmas[j].turma.Horario2,
        });
        let horarioTotal = undefined;
        if (horario1 === undefined && horario2 === undefined) {
          horarioTotal = "";
        } else if (horario2 === undefined) {
          horarioTotal = horario1.horario;
        } else if (horario1 === undefined) {
          horarioTotal = horario2.horario;
        } else {
          horarioTotal = horario1.horario + "/" + horario2.horario;
        }
        tabelaTurmasBody.push([
          {
            text: turmas[j].turma.periodo,
            alignment: "center",
            fontSize: 6,
            bold: false,
            margin: [0, 0, 0, j === turmas.length - 1 ? 10 : 0],
          },
          {
            text: turmas[j].turma.disciplina.codigo,
            alignment: "left",
            fontSize: 6,
            bold: false,
          },
          {
            text: turmas[j].turma.disciplina.nome,
            alignment: "left",
            fontSize: 6,
            bold: false,
          },
          {
            text: turmas[j].turma.letra,
            alignment: "center",
            fontSize: 6,
            bold: false,
          },

          {
            text: horarioTotal,
            alignment: "center",
            fontSize: 6,
            bold: false,
          },
          {
            text: (turmas[j].pedido.vagasPeriodizadas || turmas[j].pedido.vagasNaoPeriodizadas)
              ? turmas[j].pedido.vagasPeriodizadas + turmas[j].pedido.vagasNaoPeriodizadas
              : "",
            alignment: "center",
            fontSize: 6,
            bold: false,
          },
        ]);
      }
      tables.push({
        style: "tableExample",
        table: {
          widths: [28, 48, "*", 24, 68, 40],
          headerRows: 1,
          color: "#426",
          body: tabelaTurmasBody,
        },
        layout: {
          hLineWidth: function() {
            return 0;
          },
          vLineWidth: function() {
            return 0;
          },
        },
      });
    }
  }

  let docDefinition = {
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

export { pdfDisciplinasTurmas, pdfHorariosLabs, pdfCargaProfessores, pdfTurmasCursos };

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

function getTurmasDoDocente(docente, periodosAtivos) {
  if (!periodosAtivos.length) return [];

  const turmasFiltered = filter(
    store.getters.AllTurmas,
    (turma) =>
      (turma.Docente1 === docente.id || turma.Docente2 === docente.id) &&
      some(periodosAtivos, ["id", turma.periodo])
  );

  return orderBy(turmasFiltered, ["periodo", "Disciplina", "letra"]);
}

function getTurmasSemAlocacao(periodosAtivos) {
  if (!periodosAtivos.length) return [];

  const turmasFiltered = filter(
    store.getters.AllTurmas,
    (turma) =>
      turma.Docente1 == null &&
      turma.Docente2 == null &&
      turma.Disciplina != null &&
      some(periodosAtivos, ["id", turma.periodo])
  );

  return orderBy(turmasFiltered, ["periodo", "Disciplina", "letra"]);
}

function getCargaPosDoDocente(docente, periodosAtivos) {
  if (!periodosAtivos.length) return [];

  const cargaposFiltered = filter(
    store.getters.AllCargasPos,
    (carga) =>
      carga.Docente === docente.id && some(periodosAtivos, ["id", carga.trimestre])
  );

  return orderBy(cargaposFiltered, "trimestre");
}

function creditos1(professor) {
  var c = 0;
  for (var t = 0; t < store.state.turma.Turmas.length; t++) {
    if (
      store.state.turma.Turmas[t].periodo === 1 &&
      (store.state.turma.Turmas[t].Docente1 === professor.id ||
        store.state.turma.Turmas[t].Docente2 === professor.id)
    ) {
      for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++) {
        if (
          store.state.disciplina.Disciplinas[d].id ===
          store.state.turma.Turmas[t].Disciplina
        ) {
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
  for (var t = 0; t < store.state.cargaPos.Cargas.length; t++) {
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
  for (var t = 0; t < store.state.turma.Turmas.length; t++) {
    if (
      store.state.turma.Turmas[t].periodo === 3 &&
      (store.state.turma.Turmas[t].Docente1 === professor.id ||
        store.state.turma.Turmas[t].Docente2 === professor.id)
    ) {
      for (var d = 0; d < store.state.disciplina.Disciplinas.length; d++) {
        if (
          store.state.disciplina.Disciplinas[d].id ===
          store.state.turma.Turmas[t].Disciplina
        ) {
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
  for (var t = 0; t < store.state.cargaPos.Cargas.length; t++) {
    if (store.state.cargaPos.Cargas[t].Docente === professor.id) {
      if (store.state.cargaPos.Cargas[t].trimestre == 3) {
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

function generateHorariosText(turma) {
  const horario1 = find(store.getters.AllHorarios, ["id", turma.Horario1]);
  const horario2 = find(store.getters.AllHorarios, ["id", turma.Horario2]);
  let horariosResult = undefined;

  if (horario1 === undefined && horario2 === undefined) horariosResult = "";
  else if (horario2 === undefined) horariosResult = horario1.horario;
  else if (horario1 === undefined) horariosResult = horario2.horario;
  else horariosResult = horario1.horario + "\n" + horario2.horario;

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

function getTurmasDoCurso(curso, periodos) {
  const turmas = [];
  store.getters.TurmasInDisciplinasPerfis.forEach((turma) => {
    const pedido = find(store.getters.Pedidos[turma.id], ["Curso", curso]);

    if (pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0) {
      turmas.push({ turma: turma, pedido: pedido });
    }
  });

  return orderBy(
    orderBy(
      orderBy(
        filter(turmas, (t) => {
          let periodo = false;
          periodos.forEach((p) => {
            if (p == t.turma.periodo) periodo = true;
          });
          return periodo;
        }),
        (t) => {
          return t.turma.letra;
        }
      ),
      (t) => {
        return t.turma.disciplina.codigo;
      }
    ),
    (t) => {
      return t.turma.periodo;
    }
  );
}
