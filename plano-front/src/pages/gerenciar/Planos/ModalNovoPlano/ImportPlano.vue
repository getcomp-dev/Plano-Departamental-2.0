<template>
  <div>
    <p class="alert alert-secondary">
      Selecione um arquivo
      <b>.csv</b>
      para importar as turmas para o novo plano.
    </p>

    <div class="form-row">
      <div class="form-group col-4">
        <label for="periodoPlano">Período:</label>
        <select
          id="periodoPlano"
          v-model.number="periodoTurmas"
          class="form-control w-100"
        >
          <option
            v-for="periodo in PeriodosLetivos"
            :key="periodo.id + periodo.nome"
            :value="periodo.id"
          >
            {{ periodo.nome }}
          </option>
        </select>
      </div>
    </div>

    <div class="form-row">
      <div class="form-group col">
        <input
          type="file"
          ref="inputFilePlano"
          class="w-100 form-control-file"
          accept=".csv"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import XLSX from "xlsx";
import planoService from "@/common/services/plano";
import { generateEmptyTurma, normalizeText } from "@/common/utils";

export default {
  name: "ModalImportPlano",
  props: { plano: { type: Object, required: true } },
  data() {
    return {
      periodoTurmas: null,
    };
  },

  methods: {
    ...mapActions(["createTurma", "editPedido"]),

    async handleImportPlano() {
      if (!this.periodoTurmas) {
        throw new Error("Escolha o período do plano");
      }

      this.setPartialLoading(true);
      const [inputFile] = this.$refs.inputFilePlano.files;
      const reader = new FileReader();

      reader.onload = async (event) => {
        const workbook = XLSX.read(event.target.result, { type: "binary" });
        const firstWorksheet = workbook.Sheets[workbook.SheetNames[0]];

        const dataString = JSON.stringify(XLSX.utils.sheet_to_json(firstWorksheet));
        const dataStringNormalized = dataString
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/\s/g, "");

        const turmasDoPlano = JSON.parse(dataStringNormalized);

        await this.createPlanoImported(turmasDoPlano, this.periodoTurmas);
        // await this.$store.dispatch("fetchAll"); //Não é necessario ?
        this.setPartialLoading(false);
      };

      reader.readAsBinaryString(inputFile);
    },
    async createPlanoImported(turmasImported, periodo) {
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
      const response = await planoService.create(this.plano);

      for (const turmaFile of turmasImported) {
        const newTurma = generateEmptyTurma({
          periodo,
          Plano: response.Plano.id,
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

      const disciplinaFounded = this.$_.find(this.AllDisciplinas, ["codigo", strCodigo]);
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
        this.$_.some(this.HorariosNoturno, ["id", horario1Id]) ||
        this.$_.some(this.HorariosNoturno, ["id", horario2Id])
      ) {
        return "Noturno";
      } else {
        return "Diurno";
      }
    },
    findCursoId(cursoCodigo) {
      if (!cursoCodigo) return null;

      const cursoFounded = this.$_.find(this.AllCursos, ["codigo", cursoCodigo]);
      return cursoFounded ? cursoFounded.id : null;
    },
    findDocenteId(nomeSiga) {
      if (!nomeSiga) return null;

      const docenteFounded = this.$_.find(
        this.AllDocentes,
        (docente) => normalizeText(docente.nomesiga) === normalizeText(nomeSiga)
      );
      return docenteFounded ? docenteFounded.id : null;
    },
    findHorarioId(strHorario) {
      if (!strHorario) return null;

      const [dia, hora, sala] = strHorario.split(",");
      const nomeHorario = this.findHorarioNomeByDiaEHora(dia, hora);

      if (nomeHorario) {
        const horarioFounded = this.$_.find(this.AllHorarios, ["horario", nomeHorario]);
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

      const horarioFounded = this.$_.find(this.ListaDeTodosHorarios, (horarioItem) =>
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

      const salaFounded = this.$_.find(this.AllSalas, (sala) => {
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
