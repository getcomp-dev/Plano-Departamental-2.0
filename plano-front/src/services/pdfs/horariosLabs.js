import {
  makePageHeader,
  makeEmptyPageWarning,
  getHeaderImages,
  getTurmasDaSala,
  checkTurmaHorarioLabs,
} from "./helpers";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

async function pdfHorariosLabs(data) {
  const { laboratorios, turmas, periodosAtivos, plano } = data;
  const tables = [];
  const headerImages = await getHeaderImages();

  if (!laboratorios.length || !periodosAtivos.length) {
    tables.push(
      makePageHeader({
        images: headerImages,
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
          images: headerImages,
          plano,
          title: "Relação de horários das turmas em laboratórios",
          subtitle: `${periodo.id}º Período Letivo${periodoNome}`,
        })
      );

      const turmasDoPeriodo = turmas.filter((turma) => turma.periodo === periodo.id);
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
              { text: "Segunda", alignment: "center", bold: true, fontSize: 8 },
              { text: "Terça", alignment: "center", bold: true, fontSize: 8 },
              { text: "Quarta", alignment: "center", bold: true, fontSize: 8 },
              { text: "Quinta", alignment: "center", bold: true, fontSize: 8 },
              { text: "Sexta", alignment: "center", bold: true, fontSize: 8 },
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
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 1:
              tableLabsBody.push([
                { text: "10 - 12", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 2:
              tableLabsBody.push([
                { text: "14 - 16", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 3:
              tableLabsBody.push([
                { text: "16 - 18", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 4:
              tableLabsBody.push([
                { text: "17 - 19", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 5:
              tableLabsBody.push([
                { text: "18 - 20", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 6:
              tableLabsBody.push([
                { text: "19 - 21", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
                { text: sex, alignment: "center", fontSize: 8 },
              ]);
              break;
            case 7:
              tableLabsBody.push([
                { text: "21 - 23", alignment: "center", fontSize: 8 },
                { text: seg, alignment: "center", fontSize: 8 },
                { text: ter, alignment: "center", fontSize: 8 },
                { text: qua, alignment: "center", fontSize: 8 },
                { text: qui, alignment: "center", fontSize: 8 },
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

      if (index + 1 !== periodosAtivos.length) {
        tables.push({ text: "", pageBreak: "before" }); //page break;
      }
    });
  }

  const docDefinition = {
    info: { title: "Horários - Laborátorios" },
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

export default pdfHorariosLabs;
