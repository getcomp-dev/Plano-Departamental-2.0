<template>
  <BaseModal
    ref="baseModalImportPedidos"
    title="Importar pedidos"
    :hasOverlay="true"
    :hasFooter="true"
    :styles="{ width: '500px' }"
    @on-close="clearForm"
  >
    <template #modal-body>
      <p class="alert alert-secondary">
        Selecione arquivos
        <b>.csv</b>
        para importar os pedidos SIGA (oferecidos e ocupados) de cada período no plano
        <b>{{ planoForm.nome }} - {{ planoForm.ano }}.</b>
        <br />
        Note que o formato do arquivo requerido é o relatório de plano departamental gerado pelo
        <a href="https://siga.ufjf.br" target="_blank">SIGA</a>
        na página:
        <b>Acadêmico > Consultas > Plano Departamental.</b>
        E você pode cancelar o processo durante a importação apertando a tecla esc.
      </p>
      <p v-if="planoFormHasPedidosSIGA" class="alert alert-danger">
        O plano selecionado já possui pedidos SIGA, continuar este processor irá
        <b>sobreescreve-los.</b>
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
            close();
          "
        />
      </portal>
    </template>

    <template #modal-footer>
      <BaseButton
        text="Confirmar"
        color="blue"
        class="px-3 ml-auto"
        @click="handleImportPedidosSIGAS"
      />
    </template>
  </BaseModal>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { requiredIf } from "vuelidate/lib/validators";
import turmaService from "@/services/turma";
import { parseCSVFileToArray } from "@/common/utils";
import {
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";
import { VInputFile } from "@/components/ui";

export default {
  name: "ModalImportPedidos",
  components: { VInputFile },
  props: {
    planoForm: { type: Object, required: true },
  },
  data() {
    return {
      form: {
        file1Periodo: null,
        file3Periodo: null,
      },
      abortImport: false,
      turmasDoPlanoForm: [],
      planoFormHasPedidosSIGA: false,
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
    document.addEventListener("keydown", this.onEscAbortImport);
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.onEscAbortImport);
  },

  methods: {
    ...mapActions([
      "createPedidoSIGA",
      "updatePedidoSIGA",
      "initializeProgressBar",
      "updateProgressBar",
      "finishProgressBar",
    ]),

    open() {
      this.checkPedidosSIGA();
      this.$refs.baseModalImportPedidos.open();
    },
    close() {
      this.$refs.baseModalImportPedidos.close();
    },
    onEscAbortImport(event) {
      event.stopPropagation();
      if (event.code === "Escape") this.abortImport = true;
    },
    clearForm() {
      this.form.file1Periodo = null;
      this.form.file3Periodo = null;
      this.$nextTick(() => this.$v.$reset());
    },
    async checkPedidosSIGA() {
      this.turmasDoPlanoForm = [];
      this.planoFormHasPedidosSIGA = false;

      if (this.currentPlano.id !== this.planoForm.id) {
        const { Turmas = [] } = await turmaService.fetchAll(this.planoForm.id);
        this.turmasDoPlanoForm = [...Turmas];
      } else {
        this.turmasDoPlanoForm = this.AllTurmas;
      }

      this.planoFormHasPedidosSIGA = this.turmasDoPlanoForm.some(
        (turma) => this.AllPedidosSIGA[turma.id] && this.AllPedidosSIGA[turma.id].length > 0
      );
    },
    async handleImportPedidosSIGAS() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) return;

      if (!this.turmasDoPlanoForm.length) {
        this.pushNotification({
          type: "error",
          text: "Plano selecionado não possui turmas",
        });
        return;
      }

      try {
        this.abortImport = false;
        const turmasFile1Periodo = await parseCSVFileToArray(this.form.file1Periodo);
        const turmasFile3Periodo = await parseCSVFileToArray(this.form.file3Periodo);
        validateTurmasSIGA(turmasFile1Periodo);
        validateTurmasSIGA(turmasFile3Periodo);
        this.initializeProgressBar({
          finalValue: turmasFile1Periodo.length + turmasFile3Periodo.length,
        });

        const turmas1Periodo = this.turmasDoPlanoForm.filter((turma) => turma.periodo === 1);
        const turmas3Periodo = this.turmasDoPlanoForm.filter((turma) => turma.periodo === 3);
        await this.createPedidosFileSIGA(turmasFile1Periodo, turmas1Periodo, 1);
        await this.createPedidosFileSIGA(turmasFile3Periodo, turmas3Periodo, 3);

        if (!this.abortImport) {
          this.close();
          this.pushNotification({
            type: "success",
            text: `Pedidos importados para o plano ${this.currentPlano.nome}`,
          });
        } else {
          this.pushNotification({
            type: "warn",
            text: "Importação dos pedidos foi cancelada!",
          });
        }
      } catch (error) {
        console.log(error);
        this.pushNotification({
          type: "error",
          title: "Erro ao importar pedidos!",
        });
      } finally {
        await this.finishProgressBar();
      }
    },
    async createPedidosFileSIGA(turmasSIGA, turmasDoPlanoForm, periodo) {
      if (!turmasSIGA.length || !turmasDoPlanoForm.length) return;

      let currentPedido = {};
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);

      for (const turmaSIGA of turmasSIGA) {
        if (this.abortImport) break;
        this.updateProgressBar();

        const disciplinaFound = this.AllDisciplinas.find(
          (disciplina) => disciplina.codigo === turmaSIGA[keysTurmaSIGA.disciplinaCod]
        );
        if (!disciplinaFound) continue;

        const turmaDoPlanoFound = turmasDoPlanoForm.find((turma) => {
          return (
            turma.periodo === periodo &&
            turma.Disciplina === disciplinaFound.id &&
            turma.letra === turmaSIGA[keysTurmaSIGA.letra]
          );
        });
        if (!turmaDoPlanoFound) continue;

        const pedidoSIGA = parseTurmaSIGAToPedido(turmaSIGA, keysTurmaSIGA, turmaDoPlanoFound.id);
        // Se for igual ao currentPedido, não cria pois ja foi criado antes
        if (pedidoSIGA && !this.pedidosAreEqual(pedidoSIGA, currentPedido)) {
          const pedidoCreated = await this.handleCreatePedidoSIGA(pedidoSIGA);
          currentPedido = { ...pedidoCreated };
        }
      }
    },
    async handleCreatePedidoSIGA(pedidoSIGA) {
      try {
        return await this.createPedidoSIGA({ data: pedidoSIGA });
      } catch (error) {
        return await this.updatePedidoSIGA({ data: pedidoSIGA });
      }
    },
    pedidosAreEqual(pedido1, pedido2) {
      return pedido1.Curso === pedido2.Curso && pedido1.Turma === pedido2.Turma;
    },
  },

  computed: {
    ...mapGetters(["AllTurmas", "AllDisciplinas", "AllPedidosSIGA"]),
  },
};
</script>
