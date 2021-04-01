<template>
  <div>
    <p class="alert alert-secondary">
      Selecione arquivos
      <b>.csv</b>
      para importar as turmas de cada periodo do novo plano. Note que o formato do arquivo requerido
      é o relatorio de plano departamental gerado pelo
      <a href="https://siga.ufjf.br" target="_blank">SIGA</a>
      na página:
      <b>Acadêmico > Consultas > Plano Departamental</b>
      . E você pode cancelar o processo durante a importação apertando a tecla esc.
    </p>

    <div class="row">
      <div class="col">
        <VInputFile
          label="Primeiro período"
          v-model="form.file1Periodo"
          :validation="$v.form.file1Periodo"
          accept=".csv"
        />
      </div>
      <div class="col">
        <VInputFile
          label="Terceiro período"
          v-model="form.file3Periodo"
          :validation="$v.form.file3Periodo"
          accept=".csv"
        />
      </div>
    </div>

    <portal to="loading-content">
      <BaseButton
        color="gray"
        text="Cancelar"
        class="paddingX-20"
        :disable="abortImport"
        @click="
          abortImport = true;
          closeModal();
        "
      />
    </portal>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { requiredIf } from "vuelidate/lib/validators";
import { parseCSVFileToArray } from "@/common/utils";
import {
  parseTurmaSIGAToTurma,
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";
import { VInputFile } from "@/components/ui";

export default {
  name: "ModalImportPlano",
  components: { VInputFile },
  props: {
    plano: { type: Object, required: true },
    closeModal: { type: Function, required: true },
  },
  data() {
    return {
      abortImport: false,
      form: {
        file1Periodo: null,
        file3Periodo: null,
      },
    };
  },
  validations: {
    form: {
      file1Periodo: {
        requiredIf: requiredIf(function() {
          return !this.form.file3Periodo;
        }),
      },
      file3Periodo: {
        requiredIf: requiredIf(function() {
          return !this.form.file1Periodo;
        }),
      },
    },
  },
  mounted() {
    document.addEventListener("keydown", (event) => {
      event.stopPropagation();
      if (event.code === "Escape") {
        this.abortImport = true;
      }
    });
  },

  methods: {
    ...mapActions([
      "createPlano",
      "deletePlano",
      "createTurma",
      "createPedidoSIGA",
      "initializeProgressBar",
      "updateProgressBar",
      "finishProgressBar",
    ]),

    async handleImportPlano() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      try {
        this.abortImport = false;
        const turmasFile1Periodo = await parseCSVFileToArray(this.form.file1Periodo);
        const turmasFile3Periodo = await parseCSVFileToArray(this.form.file3Periodo);
        validateTurmasSIGA(turmasFile1Periodo);
        validateTurmasSIGA(turmasFile3Periodo);

        this.initializeProgressBar({
          finalValue: turmasFile1Periodo.length + turmasFile3Periodo.length,
        });
        const newPlano = await this.createPlano({ data: this.plano });
        await this.createTurmasFileSIGA(turmasFile1Periodo, newPlano, 1);
        await this.createTurmasFileSIGA(turmasFile3Periodo, newPlano, 3);

        if (!this.abortImport) {
          this.closeModal(); // O modal fecha de qualquer jeito por causa do esc
          this.pushNotification({
            type: "success",
            text: "Plano criado e turmas importadas",
          });
        } else {
          this.pushNotification({
            type: "warn",
            text: "Importação do plano foi cancelada",
          });
        }
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
    async createTurmasFileSIGA(turmasSIGA, newPlano, periodo) {
      if (!turmasSIGA.length) return;

      let currentTurma = {};
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);

      for (const turmaSIGA of turmasSIGA) {
        if (this.abortImport) {
          this.deletePlano({ data: { ...newPlano } });
          break;
        }

        this.updateProgressBar();
        const newTurma = parseTurmaSIGAToTurma(turmaSIGA, keysTurmaSIGA, newPlano.id, periodo);
        if (!newTurma) continue;

        //Se a nova newTurma é igual a currentTurma, não cria a turma e apenas cria o pedido
        if (this.turmasIsEqual(currentTurma, newTurma)) {
          await this.handleCreatePedidoSIGA(turmaSIGA, keysTurmaSIGA, currentTurma.id);
        } else {
          //Se é uma turma nova então cria a turma, atualiza currentTurma e cria o pedido
          const turmaCreated = await this.createTurma({ data: newTurma });
          await this.handleCreatePedidoSIGA(turmaSIGA, keysTurmaSIGA, turmaCreated.id);
          currentTurma = { ...turmaCreated };
        }
      }
    },
    async handleCreatePedidoSIGA(turmaSIGA, keysTurmaSIGA, turmaId) {
      const pedidoSIGA = parseTurmaSIGAToPedido(turmaSIGA, keysTurmaSIGA, turmaId);
      if (pedidoSIGA) {
        await this.createPedidoSIGA({ data: pedidoSIGA }).catch(() => {});
      }
    },
    turmasIsEqual(turma1, turma2) {
      return turma1.letra === turma2.letra && turma1.Disciplina === turma2.Disciplina;
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-abort {
  position: fixed;
  bottom: 20%;
  background-color: #000;
  color: #fff;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
