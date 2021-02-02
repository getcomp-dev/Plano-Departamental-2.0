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
import { mapActions } from "vuex";
import { parseCSVFileToArray } from "@/common/utils";
import {
  parseTurmaSIGAToTurma,
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";

export default {
  name: "ModalImportPlano",
  props: {
    plano: { type: Object, required: true },
    closeModal: { type: Function, required: true },
  },

  methods: {
    ...mapActions([
      "createPlano",
      "createTurma",
      "createPedidoOferecido",
      "initializeProgressBar",
      "updateProgressBar",
      "finishProgressBar",
    ]),

    async handleImportPlano() {
      const [file1Periodo] = this.$refs.input1periodo.files;
      const [file3Periodo] = this.$refs.input3periodo.files;
      if (!file1Periodo && !file3Periodo) {
        this.pushNotification({
          type: "error",
          text: "Nenhum arquivo selecionado",
        });
        return;
      }

      try {
        const turmasFile1Periodo = await parseCSVFileToArray(file1Periodo);
        const turmasFile3Periodo = await parseCSVFileToArray(file3Periodo);
        validateTurmasSIGA(turmasFile1Periodo);
        validateTurmasSIGA(turmasFile3Periodo);

        this.initializeProgressBar({
          finalValue: turmasFile1Periodo.length + turmasFile3Periodo.length,
        });
        const planoCreated = await this.createPlano({ data: this.plano });
        await this.createTurmasFileSIGA(turmasFile1Periodo, planoCreated.id, 1);
        await this.createTurmasFileSIGA(turmasFile3Periodo, planoCreated.id, 3);

        this.closeModal();
        this.pushNotification({
          type: "success",
          text: "Plano criado e turmas importadas",
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao criar plano!",
          text: error.message,
        });
      } finally {
        await this.finishProgressBar();
      }
    },

    async createTurmasFileSIGA(turmasSIGA, planoId, periodo) {
      if (!turmasSIGA.length) return;

      let currentTurma = {};
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);

      for (const turmaSIGA of turmasSIGA) {
        this.updateProgressBar();

        const newTurma = parseTurmaSIGAToTurma(turmaSIGA, keysTurmaSIGA, planoId, periodo);
        if (!newTurma) continue;

        //Se a nova newTurma é igual a currentTurma, não cria a turma e apenas cria o pedido
        if (this.turmasIsEqual(currentTurma, newTurma)) {
          await this.handleCreatePedidoOferecido(turmaSIGA, keysTurmaSIGA, currentTurma.id);
        } else {
          //Se é uma turma nova então cria a turma, atualiza currentTurma e cria o pedido
          const turmaCreated = await this.createTurma({ data: newTurma });
          await this.handleCreatePedidoOferecido(turmaSIGA, keysTurmaSIGA, turmaCreated.id);
          currentTurma = { ...turmaCreated };
        }
      }
    },

    async handleCreatePedidoOferecido(turmaSIGA, keysTurmaSIGA, turmaId) {
      const pedidoOferecido = parseTurmaSIGAToPedido(turmaSIGA, keysTurmaSIGA, turmaId);
      if (pedidoOferecido) {
        await this.createPedidoOferecido({ data: pedidoOferecido }).catch(() => {});
      }
    },

    turmasIsEqual(turma1, turma2) {
      return turma1.letra === turma2.letra && turma1.Disciplina === turma2.Disciplina;
    },
  },
};
</script>
