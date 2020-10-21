<template>
  <BaseModal
    ref="baseModal"
    title="Importar plano"
    position="right"
    :hasFooter="true"
  >
    <template #modal-body>
      <input type="file" ref="inputFilePlano" />
    </template>

    <template #modal-footer>
      <BaseButton
        color="lightblue"
        text="Importar"
        class="ml-auto"
        @click="handleImportPlano"
      />
    </template>
  </BaseModal>
</template>

<script>
import XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
import { generateEmptyTurma } from "@/common/utils";
// import planoService from "../../../common/services/plano";

export default {
  name: "ModalImportPlano",
  mounted() {
    console.log(this.AllTurmas);
  },
  methods: {
    ...mapActions(["createTurma", "editPedido"]),

    open() {
      this.$refs.baseModal.open();
    },
    toggle() {
      this.$refs.baseModal.toggle();
    },
    close() {
      this.$refs.baseModal.close();
    },

    async handleImportPlano() {
      if (this.AllTurmas.length) {
        this.pushNotification({
          type: "error",
          text: `Plano atual deve estar vázio para fazer a importação!`,
        });
        this.$refs.baseModal.close();
        return;
      }

      this.setPartialLoading(true);
      const inputFile = this.$refs.inputFilePlano.files[0];
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

        const [, periodoStr] = inputFile.name.split(".");
        const periodoDoPlano = parseInt(periodoStr) || null;

        await this.createPlanoImported(turmasDoPlano.slice(0, 5), periodoDoPlano);
        await this.$store.dispatch("fetchAll");

        this.$refs.baseModal.close();
        this.setPartialLoading(false);
      };

      reader.readAsBinaryString(inputFile);
    },

    async createPlanoImported(turmasImported, periodo = 1) {
      // Create plano
      // const newPlano = this.createPlano()
      const keys = {
        disciplinaCod: null,
        letra: null,
        cursoCod: null,
        vagas1: null,
        vagas2: null,
        horarios: null,
      };
      let i = 0;
      for (const key in turmasImported[0]) {
        if (i === 1) keys.disciplinaCod = key;
        else if (i === 2) keys.letra = key;
        else if (i === 3) keys.cursoCod = key;
        else if (i === 5) keys.vagas1 = key;
        else if (i === 6) keys.vagas2 = key;
        else if (i === 7) keys.horarios = key;
        i++;
      }
      let currentTurma = {};

      for (const turmaFile of turmasImported) {
        const newTurma = generateEmptyTurma();
        //newTurma.Plano = newPlano.id;
        newTurma.periodo = periodo;
        newTurma.letra = turmaFile[keys.letra] || null;
        newTurma.Disciplina = this.findDisciplinaId(turmaFile[keys.disciplinaCod]);

        if (turmaFile[keys.horarios]) {
          const [strHorario1, strHorario2] = turmaFile[keys.horarios].split(";");
          newTurma.Horario1 = this.findHorarioId(strHorario1);
          newTurma.Horario2 = this.findHorarioId(strHorario2);

          newTurma.turno1 = this.findTurno(newTurma.Horario1, newTurma.Horario2);
        }

        //Se não achou a Disciplina, letra ou turno1 não cria a turma
        if (!newTurma.Disciplina || !newTurma.letra || !newTurma.turno1) {
          continue;
        }

        //Se é igual a turma anterior, então cria apenas a vaga
        if (this.isTheSameTurma(currentTurma, newTurma)) {
          await this.createPedido(turmaFile, keys, currentTurma.id);
          continue;
        }

        //Cria a turma
        const turmaCreated = await this.createTurma(newTurma);
        //Atualiza currentTurma
        currentTurma = { ...turmaCreated };
        //Cria pedido
        await this.createPedido(turmaFile, keys, turmaCreated.id);
      }
    },
    async createPedido(turmaFile, keys, turmaId) {
      const pedido = {
        Turma: null,
        Curso: null,
        vagasNaoPeriodizadas: 0,
        vagasPeriodizadas: 0,
      };
      pedido.Turma = turmaId;
      pedido.Curso = this.findCursoId(turmaFile[keys.cursoCod]);
      pedido.vagasPeriodizadas = turmaFile[keys.vagas1];
      pedido.vagasNaoPeriodizadas = turmaFile[keys.vagas2];

      if (pedido.Curso) {
        await this.editPedido(pedido);
      } else {
        console.log("Curso não econtrado");
      }
    },

    findTurno(horario1Id, horario2Id) {
      if (!horario1Id && !horario2Id) return null;
      else if (horario1Id <= 28 || horario2Id <= 28) return "Diurno";
      else return "Noturno";
    },
    findCursoId(cursoCodigo) {
      const cursoFounded = this.$_.find(this.AllCursos, ["codigo", cursoCodigo]);
      return cursoFounded ? cursoFounded.id : null;
    },
    findDisciplinaId(disciplinaCodigo) {
      const disciplinaFounded = this.$_.find(this.AllDisciplinas, [
        "codigo",
        disciplinaCodigo,
      ]);

      return disciplinaFounded ? disciplinaFounded.id : null;
    },
    findHorarioId(horarioString) {
      const [dia, hora] = horarioString.split(",");
      const nomeHorario = this.parseDiaEHora(dia, hora);

      if (nomeHorario) {
        const horarioFounded = this.$_.find(this.AllHorarios, [
          "horario",
          nomeHorario,
        ]);

        return horarioFounded ? horarioFounded.id : null;
      }
    },
    parseDiaEHora(dia, hora) {
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
      }

      const horarioFounded =
        this.$_.find(this.ListaDeTodosHorarios, (horarioItem) =>
          horarioItem.nome.includes(hora.substring(0, 1) + "-")
        ) || {};

      horaNormalized = horarioFounded.nome;

      if (diaNormalized && horaNormalized) {
        return diaNormalized + " " + horaNormalized;
      }

      return null;
    },
    isTheSameTurma(turma1, turma2) {
      return (
        turma1.letra === turma2.letra &&
        turma1.Disciplina === turma2.Disciplina &&
        turma1.turno1 === turma2.turno1 &&
        turma1.Horario1 === turma2.Horario1 &&
        turma1.Horario2 === turma2.Horario2
      );
    },
  },

  computed: {
    ...mapGetters([
      "AllHorarios",
      "AllDisciplinas",
      "AllCursos",
      "ListaDeTodosHorarios",
      "AllTurmas",
    ]),
  },
};
</script>
