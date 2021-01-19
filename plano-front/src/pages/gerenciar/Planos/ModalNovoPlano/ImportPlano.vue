<template>
  <div>
    <p class="alert alert-secondary">
      Selecione arquivos
      <b>.csv</b>
      para importar as turmas de cada periodo do novo plano.
      <br />
      Note que o formato do arquivo requerido é o relatorio de plano departamental gerado pelo SIGA
      na página: Acadêmico > Consultas > Plano Departamental.
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
import { readFileToBinary, generateEmptyTurma, normalizeText } from "@/common/utils";

export default {
  name: "ModalImportPlano",
  props: { plano: { type: Object, required: true } },

  methods: {
    ...mapActions(["createPlano", "createTurma", "createPedidoOferecido"]),

    async handleImportPlano() {
      const [file1Periodo] = this.$refs.input1periodo.files;
      const [file3Periodo] = this.$refs.input3periodo.files;
      if (!file1Periodo && !file3Periodo) {
        throw new Error("Nenhum arquivo selecionado");
      }

      this.setLoading({ type: "partial", value: true });
      try {
        const planoCreated = await this.createPlano({ data: this.plano });
        if (file1Periodo) await this.readInputFileTurmas(file1Periodo, planoCreated.id, 1);
        if (file3Periodo) await this.readInputFileTurmas(file3Periodo, planoCreated.id, 3);
      } catch (error) {
        console.log("Erros durante import", error);
      }

      this.setLoading({ type: "partial", value: false });
      this.pushNotification({
        type: "success",
        text: "Plano criado e turmas importadas",
      });
    },
    async readInputFileTurmas(inputFile, planoId, periodo) {
      const fileBase64 = await readFileToBinary(inputFile);
      const workbook = XLSX.read(fileBase64, { type: "binary" });
      const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];
      const dataString = JSON.stringify(XLSX.utils.sheet_to_json(firstWorksheet));
      const dataStringNormalized = dataString
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s/g, "")
        .toUpperCase();
      const turmas = JSON.parse(dataStringNormalized);
      await this.createTurmasImported(turmas, planoId, periodo);
      console.clear();
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
        if (!newTurma.letra) continue;

        this.setDisciplina(newTurma, turmaFile[keys.disciplinaCod]);
        if (!newTurma.Disciplina) continue;

        this.setHorariosESalas(newTurma, turmaFile[keys.horarioESala]);
        if (!newTurma.turno1) continue;

        this.setDocentes(newTurma, turmaFile[keys.docentes]);

        //Se a nova newTurma é igual a currentTurma, não cria a turma e apenas cria o pedido
        if (this.turmasIsEqual(currentTurma, newTurma)) {
          await this.handleCreatePedidoOferecido(turmaFile, keys, currentTurma.id);
        } else {
          //Se é uma turma nova então cria a turma, atualiza currentTurma e cria o pedido
          const turmaCreated = await this.createTurma({ data: newTurma });
          currentTurma = { ...turmaCreated };
          await this.handleCreatePedidoOferecido(turmaFile, keys, turmaCreated.id);
        }
      }
    },

    //Helpers
    async handleCreatePedidoOferecido(turmaFile, keys, turmaId) {
      const pedidoOferecido = this.makePedidoOferecido(turmaFile, keys, turmaId);

      if (pedidoOferecido) {
        await this.createPedidoOferecido({ data: pedidoOferecido }).catch(() =>
          console.log("Error na criacao de pedido")
        );
      }
    },
    makePedidoOferecido(turmaFile, keys, turmaId) {
      const pedido = {
        Turma: null,
        Curso: null,
        vagasOferecidas: 0,
        vagasOcupadas: 0,
      };
      pedido.Turma = turmaId;
      pedido.Curso = this.findCursoIdByCodigo(turmaFile[keys.cursoCod]);
      pedido.vagasOferecidas = parseInt(turmaFile[keys.vagas1], 10);
      pedido.vagasOcupadas = parseInt(turmaFile[keys.vagas2], 10);

      if (pedido.Curso) {
        return pedido;
      } else {
        // console.log("Curso não econtrado: " + turmaFile[keys.cursoCod], turmaFile);
        return null;
      }
    },
    setDisciplina(turma, strCodigo) {
      if (!strCodigo) return;

      const disciplinaFounded = find(this.AllDisciplinas, ["codigo", strCodigo]);
      if (disciplinaFounded) {
        turma.Disciplina = disciplinaFounded.id;
        turma.creditoTotal = disciplinaFounded.creditoTotal;
      } else {
        turma.Disciplina = null;
      }
    },
    setHorariosESalas(turma, strHorarioESala) {
      if (!strHorarioESala) return;

      const [str1, str2] = strHorarioESala.split(";");
      turma.Horario1 = this.findHorarioId(str1);
      if (turma.creditoTotal >= 4) turma.Horario2 = this.findHorarioId(str2);

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
      } else if (horario1Id === 31) {
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
    findCursoIdByCodigo(cursoCodigo) {
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
      const horario = this.covertDiaEHoraEmHorario(dia, hora);

      if (horario) {
        const horarioFounded = find(this.AllHorarios, ["horario", horario]);
        return horarioFounded ? horarioFounded.id : null;
      }
      //Caso não tenha achando nenhum horario, verifica se tem sala EAD
      if (sala.includes("EAD")) {
        // console.log("Encotrou sala EAD", sala);
        return 31; //Id horario EAD
      }

      return null;
    },
    covertDiaEHoraEmHorario(dia, hora) {
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
      return turma1.letra === turma2.letra && turma1.Disciplina === turma2.Disciplina;
    },
  },

  computed: {
    ...mapGetters([
      "AllHorarios",
      "HorariosNoturno",
      "AllDisciplinas",
      "AllCursos",
      "AllSalas",
      "AllDocentes",
      "PeriodosLetivos",
    ]),
  },
};
</script>
