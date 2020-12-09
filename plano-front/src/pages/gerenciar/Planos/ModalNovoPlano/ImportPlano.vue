<template>
  <div>
    <p class="alert alert-secondary">
      Selecione arquivos
      <b>.csv</b>
      para importar as turmas de cada periodo do novo plano.
      <br />
      Note que o formato do arquivo requerido é o relatorio de plano departamental gerado
      pelo SIGA na página: Acadêmico > Consultas > Plano Departamental.
    </p>

    <div class="form-row">
      <div class="form-group">
        <label for="turmas1">
          Turmas do
          <b>primeiro</b>
          período:
        </label>
        <input
          id="turmas1"
          type="file"
          ref="input1periodo"
          class="w-100 form-control-file"
          accept=".csv"
        />
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <label for="turmas2">
          Turmas do
          <b>terceiro</b>
          período:
        </label>
        <input
          id="turmas3"
          type="file"
          ref="input3periodo"
          class="w-100 form-control-file"
          accept=".csv"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { find, some } from "lodash-es";
import XLSX from "xlsx";
import planoService from "@/common/services/plano";
import { generateEmptyTurma, normalizeText } from "@/common/utils";

export default {
  name: "ModalImportPlano",
  props: { plano: { type: Object, required: true } },

  methods: {
    ...mapActions(["createTurma", "editPedido"]),

    async handleImportPlano() {
      const [inputFile1Periodo] = this.$refs.input1periodo.files;
      const [inputFile3Periodo] = this.$refs.input3periodo.files;
      if (!inputFile1Periodo && !inputFile3Periodo) {
        throw new Error("Nenhum arquivo selecionado");
      }

      const response = await planoService.create(this.plano);
      await this.readInputFileTurmas(inputFile1Periodo, response.Plano.id, 1);
      await this.readInputFileTurmas(inputFile3Periodo, response.Plano.id, 3);
    },
    async readInputFileTurmas(inputFile, planoId, periodo) {
      const reader = new FileReader();

      reader.onload = async (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
        const dataString = JSON.stringify(XLSX.utils.sheet_to_json(firstWorksheet));
        const dataStringNormalized = dataString
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "");

        const turmas = JSON.parse(dataStringNormalized);
        await this.createTurmasImported(turmas, planoId, periodo);
      };

      reader.readAsBinaryString(inputFile);
    },

    async createTurmasImported(turmasImported, planoId, periodo) {
      const keys = {
        disciplinaCod: null,
        letra: null,
        cursoCod: null,
        vagas1: null,
        vagas2: null,
        horarioESala: null,
        docentes: null,
      };
      let i = 0;
      for (const key in turmasImported[0]) {
        if (i === 1) keys.disciplinaCod = key;
        else if (i === 2) keys.letra = key;
        else if (i === 3) keys.cursoCod = key;
        else if (i === 5) keys.vagas1 = key;
        else if (i === 6) keys.vagas2 = key;
        else if (i === 7) keys.horarioESala = key;
        else if (i === 8) keys.docentes = key;
        i++;
      }

      let currentTurma = {};

      for (const turmaFile of turmasImported) {
        const newTurma = generateEmptyTurma({
          periodo,
          Plano: planoId,
          letra: turmaFile[keys.letra] || null,
        });

        this.setDisciplina(newTurma, turmaFile[keys.disciplinaCod]);
        this.setHorariosESalas(newTurma, turmaFile[keys.horarioESala]);
        this.setDocentes(newTurma, turmaFile[keys.docentes]);

        //Se não achou a Disciplina, letra ou turno1 não cria a turma
        if (!newTurma.Disciplina || !newTurma.letra || !newTurma.turno1) {
          continue;
        }
        //Se a nova turma é igual a currentTurma, não cria a turma e cria apenas a vaga
        if (this.turmasIsEqual(currentTurma, newTurma)) {
          // await this.createPedido(turmaFile, keys, currentTurma.id); //Não esta funcionando
          continue;
        }

        const turmaCreated = await this.createTurma(newTurma); //Se é uma turma nova cria
        // await this.createPedido(turmaFile, keys, turmaCreated.id); //E cria pedido da turma
        currentTurma = { ...turmaCreated }; //Atualiza currentTurma
      }
    },
    async createPedido(turmaFile, keys, turmaId) {
      const pedido = {
        Turma: null,
        Curso: null,
        vagasNaoPeriodizadas: 0,
        vagasPeriodizadas: 0,
        vagasOferecidas: 0,
        vagasOcupadas: 0,
      };
      pedido.Turma = turmaId;
      pedido.Curso = this.findCursoId(turmaFile[keys.cursoCod]);
      pedido.vagasOferecidas = turmaFile[keys.vagas1];
      pedido.vagasOcupadas = turmaFile[keys.vagas2];

      if (pedido.Curso) {
        await this.editPedido(pedido);
      } else {
        console.log("Curso não econtrado: " + turmaFile[keys.cursoCod]);
      }
    },

    setDisciplina(turma, strCodigo) {
      if (!strCodigo) return;

      const disciplinaFounded = find(this.AllDisciplinas, ["codigo", strCodigo]);
      turma.Disciplina = disciplinaFounded ? disciplinaFounded.id : null;
    },
    setHorariosESalas(turma, strHorarioESala) {
      if (!strHorarioESala) return;

      const [str1, str2] = strHorarioESala.split(";");
      turma.Horario1 = this.findHorarioId(str1);
      turma.Horario2 = this.findHorarioId(str2);
      turma.turno1 = this.findTurno(turma.Horario1, turma.Horario2);

      if (turma.turno1 !== "EAD") {
        turma.Sala1 = this.findSalaId(str1);
        turma.Sala2 = this.findSalaId(str2);
      }
    },
    setDocentes(turma, strDocentes) {
      if (!strDocentes) return;

      const [docente1Str, docente2Str] = strDocentes.split(";");
      turma.Docente1 = this.findDocenteId(docente1Str);
      turma.Docente2 = this.findDocenteId(docente2Str);
    },
    findTurno(horario1Id, horario2Id) {
      if (!horario1Id && !horario2Id) {
        return null;
      } else if (horario1Id == 31) {
        return "EAD";
      } else if (
        some(this.HorariosNoturno, ["id", horario1Id]) ||
        some(this.HorariosNoturno, ["id", horario2Id])
      ) {
        return "Noturno";
      } else {
        return "Diurno";
      }
    },
    findCursoId(cursoCodigo) {
      if (!cursoCodigo) return null;

      const cursoFounded = find(this.AllCursos, ["codigo", cursoCodigo]);
      return cursoFounded ? cursoFounded.id : null;
    },
    findDocenteId(nomeSiga) {
      if (!nomeSiga) return null;

      const docenteFounded = find(
        this.AllDocentes,
        (docente) => normalizeText(docente.nome) === normalizeText(nomeSiga)
      );
      return docenteFounded ? docenteFounded.id : null;
    },
    findHorarioId(strHorario) {
      if (!strHorario) return null;

      const [dia, hora, sala] = strHorario.split(",");
      const nomeHorario = this.findHorarioNomeByDiaEHora(dia, hora);

      if (nomeHorario) {
        const horarioFounded = find(this.AllHorarios, ["horario", nomeHorario]);
        return horarioFounded ? horarioFounded.id : null;
      }

      //Caso não tenha achando nenhum horario mas tenha uma sala EAD
      if (normalizeText(sala).includes(normalizeText("HORÁRIO EAD"))) {
        console.log("EAD sala", sala);
        return 31; //Id horario EAD
      }
      return null;
    },
    findHorarioNomeByDiaEHora(dia, hora) {
      if (!dia || !hora) return null;

      let diaNormalized = null;
      let horaNormalized = null;
      switch (
        dia
          .trim()
          .substring(0, 3)
          .toLowerCase()
      ) {
        case "seg":
          diaNormalized = "2a";
          break;
        case "ter":
          diaNormalized = "3a";
          break;
        case "qua":
          diaNormalized = "4a";
          break;
        case "qui":
          diaNormalized = "5a";
          break;
        case "sex":
          diaNormalized = "6a";
          break;
        case "sab":
          return "EAD";
      }

      const horarioFounded = find(this.ListaDeTodosHorarios, (horarioItem) =>
        horarioItem.nome.includes(hora.substring(0, 2) + "-")
      );
      horaNormalized = horarioFounded ? horarioFounded.nome : null;

      if (diaNormalized && horaNormalized) {
        return diaNormalized + " " + horaNormalized;
      } else {
        return null;
      }
    },
    findSalaId(strSala) {
      if (!strSala) return null;

      const [, , sala] = strSala.split(",");
      const strSalaNormalized = normalizeText(sala);

      const salaFounded = find(this.AllSalas, (sala) => {
        const nomeNormalized = normalizeText(sala.nome);
        return strSalaNormalized.includes(nomeNormalized);
      });
      return salaFounded ? salaFounded.id : null;
    },
    turmasIsEqual(turma1, turma2) {
      return (
        turma1.letra === turma2.letra &&
        turma1.Disciplina === turma2.Disciplina &&
        turma1.Horario1 === turma2.Horario1 &&
        turma1.Horario2 === turma2.Horario2
      );
    },
  },

  computed: {
    ...mapGetters([
      "AllHorarios",
      "HorariosNoturno",
      "AllDisciplinas",
      "AllCursos",
      "ListaDeTodosHorarios",
      "AllTurmas",
      "AllSalas",
      "AllDocentes",
      "PeriodosLetivos",
    ]),
  },
};
</script>
