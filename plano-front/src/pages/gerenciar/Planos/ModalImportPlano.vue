<template>
  <BaseModal ref="baseModal" title="Importar plano" position="center" :hasBackground="true" :hasFooter="true">
    <template #modal-body>
      <input type="file" ref="inputFilePlano" />
    </template>

    <template #modal-footer>
      <BaseButton color="lightblue" text="Importar" class="ml-auto" @click="handleImportPlano" />
    </template>
  </BaseModal>
</template>

<script>
import XLSX from "xlsx";
import { mapActions, mapGetters } from "vuex";
import { generateEmptyTurma, normalizeText } from "@/common/utils";
// import planoService from "../../../common/services/plano";

export default {
  name: "ModalImportPlano",

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

        await this.createPlanoImported(
          turmasDoPlano.slice(480, 500),
          periodoDoPlano
        );
        await this.$store.dispatch("fetchAll");

        this.$refs.baseModal.close();
        this.setPartialLoading(false);
      };

      reader.readAsBinaryString(inputFile);
    },

    async createPlanoImported(turmasImported, periodo = 1) {
      // Create plano // const newPlano = this.createPlano();
      const keys = {
        disciplinaCod: null,
        letra: null,
        cursoCod: null,
        vagas1: null,
        vagas2: null,
        horarioESala: null,
      };
      let i = 0;
      for (const key in turmasImported[0]) {
        if (i === 1) keys.disciplinaCod = key;
        else if (i === 2) keys.letra = key;
        else if (i === 3) keys.cursoCod = key;
        else if (i === 5) keys.vagas1 = key;
        else if (i === 6) keys.vagas2 = key;
        else if (i === 7) keys.horarioESala = key;
        i++;
      }
      let currentTurma = {};

      for (const turmaFile of turmasImported) {
        const newTurma = generateEmptyTurma();
        //newTurma.Plano = newPlano.id;
        newTurma.periodo = periodo;
        newTurma.letra = turmaFile[keys.letra] || null;
        newTurma.Disciplina = this.findDisciplinaId(turmaFile[keys.disciplinaCod]);

        if (turmaFile[keys.horarioESala]) {
          const [str1, str2] = turmaFile[keys.horarioESala].split(";");
          //Horarios
          newTurma.Horario1 = this.findHorarioId(str1);
          newTurma.Horario2 = this.findHorarioId(str2);
          newTurma.turno1 = this.findTurno(newTurma.Horario1, newTurma.Horario2);

          //Salas
          if (newTurma.turno1 !== "EAD") {
            newTurma.Sala1 = this.findSalaId(str1);
            newTurma.Sala2 = this.findSalaId(str2);
          }
        }

        if (!newTurma.Disciplina || !newTurma.letra || !newTurma.turno1) {
          //Se não achou a Disciplina, letra ou turno1 não cria a turma
          continue;
        }

        if (this.isTheSameTurma(currentTurma, newTurma)) {
          //Se é igual a turma anterior, então cria apenas a vaga
          await this.createPedido(turmaFile, keys, currentTurma.id);
          continue;
        }

        const turmaCreated = await this.createTurma(newTurma); //Cria a turma
        currentTurma = { ...turmaCreated }; //Atualiza currentTurma
        await this.createPedido(turmaFile, keys, turmaCreated.id); //Cria pedido
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

    findTurno(horario1Id, horario2Id) {
      if (!horario1Id && !horario2Id) return null;
      else if (horario1Id == 31) return "EAD";
      else if (
        this.$_.some(this.HorariosNoturno, ["id", horario1Id]) ||
        this.$_.some(this.HorariosNoturno, ["id", horario2Id])
      )
        return "Noturno";
      else return "Diurno";
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
      if (!horarioString) return null;

      const [dia, hora, sala] = horarioString.split(",");
      const nomeHorario = this.parseDiaEHora(dia, hora);

      if (nomeHorario) {
        const horarioFounded = this.$_.find(this.AllHorarios, [
          "horario",
          nomeHorario,
        ]);

        return horarioFounded ? horarioFounded.id : null;
      }

      if (normalizeText(sala).includes(normalizeText("HORÁRIO EAD"))) {
        console.log("EAD sala", sala);
        return 31; //Id EAD
      }

      return null;
    },
    parseDiaEHora(dia, hora) {
      if (!dia || !hora) return null;

      let diaNormalized = null;
      let horaNormalized = null;
      switch (dia.trim().substring(0, 3).toLowerCase()) {
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

      const horarioFounded =
        this.$_.find(this.ListaDeTodosHorarios, (horarioItem) =>
          horarioItem.nome.includes(hora.substring(0, 2) + "-")
        ) || {};

      horaNormalized = horarioFounded.nome;

      if (diaNormalized && horaNormalized) {
        return diaNormalized + " " + horaNormalized;
      } else {
        return null;
      }
    },
    findSalaId(salaString) {
      if (!salaString) return null;

      const [, , sala] = salaString.split(",");
      const salaNormalized = normalizeText(sala);

      const salaFounded = this.$_.find(this.AllSalas, (sala) => {
        const nomeNormalized = normalizeText(sala.nome);
        return salaNormalized.includes(nomeNormalized);
      });

      return salaFounded ? salaFounded.id : null;
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
      "HorariosNoturno",
      "AllDisciplinas",
      "AllCursos",
      "ListaDeTodosHorarios",
      "AllTurmas",
      "AllSalas",
    ]),
  },
};
</script>
