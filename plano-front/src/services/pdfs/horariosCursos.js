import {
  makePageHeader,
  makeEmptyPageWarning,
  getHeaderImages,
  checkTurmaHorario,
} from "./helpers";
import { some, orderBy } from "lodash-es";

export async function pdfHorariosCursos(data) {
  const { horariosAtivos, cursosAtivos, periodosAtivos, plano } = data;
  const tables = [];
  const headerImages = await getHeaderImages();
  const periodos = orderBy(periodosAtivos, "id");

  if (
    (!cursosAtivos.length && !some(periodos, ["id", 2]) && !some(periodos, ["id", 4])) ||
    !periodos.length
  ) {
    tables.push(makePageHeader({ images: headerImages, plano, title: "Horários dos cursos" }));
    tables.push(makeEmptyPageWarning());
  } else {
    periodos.forEach((periodo, index) => {
      //Horarios das grades dos cursos DCC padrão
      if ((periodo.id === 1 || periodo.id === 3) && cursosAtivos.length) {
        tables.push(
          makePageHeader({
            images: headerImages,
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
            margin: [0, 0, 0, 5],
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
      }
      //Horario dos cursos inverno e verao
      if (periodo.id === 2 || periodo.id === 4) {
        tables.push(
          makePageHeader({
            images: headerImages,
            plano,
            title: "Horários dos cursos",
            subtitle: `${periodo.id}º Período Letivo ${periodo.nome.split(" ")[1]}`,
          })
        );
        const tableHorarios = [makeTableHorarioHeader()];
        let periodoPossuiAlgumaTurma = false;
        let seg = "",
          ter = "",
          qua = "",
          qui = "",
          sex = "";

        for (let d = 0; d < 8; d++) {
          const horarioSeg = (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d);
          const horarioTer = (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d);
          const horarioQua = (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d);
          const horarioQui = (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d);
          const horarioSex = (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d);

          horariosAtivos[`periodo${periodo.id}`].forEach((turma) => {
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

          tableHorarios.push(makeTableHorariosBody(d, { seg, ter, qua, qui, sex }, "todos"));
          if (seg || ter || qua || qui || sex) {
            periodoPossuiAlgumaTurma = true;
          }
          seg = ter = qua = qui = sex = "";
        }

        if (periodoPossuiAlgumaTurma) {
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: tableHorarios,
            },
          });
        } else {
          tables.push(makeEmptyPageWarning());
        }

        if (index + 1 !== periodos.length) {
          tables.push({ text: "", pageBreak: "after" });
        }
      }
    });
  }

  const docDefinition = {
    content: tables,
    info: { title: "Horários - Cursos" },
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

  const { default: pdfMake } = await import("pdfmake/build/pdfmake");
  const { default: pdfFonts } = await import("pdfmake/build/vfs_fonts");
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  pdfMake.createPdf(docDefinition).open();
}

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
  // Horarios possiveis para Diurno
  if (turno === "diurno") {
    if (d === 0) body.push({ text: "08 - 10", alignment: "center", fontSize: 8 });
    else if (d === 1) body.push({ text: "10 - 12", alignment: "center", fontSize: 8 });
    else if (d === 2) body.push({ text: "14 - 16", alignment: "center", fontSize: 8 });
    else if (d === 3) body.push({ text: "16 - 18", alignment: "center", fontSize: 8 });
  }
  // Horarios possiveis para Noturno
  else if (turno === "noturno") {
    if (d === 4) body.push({ text: "19 - 21", alignment: "center", fontSize: 8 });
    else if (d === 5) body.push({ text: "21 - 23", alignment: "center", fontSize: 8 });
  }
  // Horarios possiveis para Eletivas ou cursos extra (todos horarios)
  else if (turno === "eletiva" || turno === "todos") {
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
