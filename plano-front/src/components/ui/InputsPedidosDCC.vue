<template>
  <div :class="typeClass">
    <input
      type="text"
      :title="titlePedido.periodizado"
      :class="[
        'input-pedidos',
        {
          empty: pedidoForm.vagasPeriodizadas == 0,
          notEdited: pedidoForm.editado1 == false && pedidoForm.vagasPeriodizadas !== 0,
          altera_1: pedidoForm.vagasPeriodizadas !== 0 && curso.semestreInicial !== turma.periodo,
          altera_2: pedidoForm.vagasPeriodizadas === 0 && curso.semestreInicial === turma.periodo,
        },
      ]"
      v-model.number="pedidoForm.vagasPeriodizadas"
      @blur="debouncedEditPedido(1)"
      @keypress="maskOnlyNumber"
      @paste.prevent
      v-focus-pedido
    />

    <input
      type="text"
      :disabled="disabled"
      :title="titlePedido.naoPeriodizado"
      :class="[
        'input-pedidos',
        {
          empty: pedidoForm.vagasNaoPeriodizadas == 0,
          notEdited: pedidoForm.editado2 == false && pedidoForm.vagasNaoPeriodizadas !== 0,
        },
      ]"
      v-model.number="pedidoForm.vagasNaoPeriodizadas"
      @blur="debouncedEditPedido(2)"
      @keypress="maskOnlyNumber"
      @paste.prevent
      v-focus-pedido
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { debounce, clone } from "lodash-es";
import { vFocusPedido, maskOnlyNumber } from "@/common/mixins";

export default {
  name: "InputsPedidosDCC",
  mixins: [maskOnlyNumber, vFocusPedido],
  props: {
    type: { type: String, default: "main" },
    turma: { type: Object, required: true },
    index: { type: Number, required: true },
    curso: { type: Object, required: true },
  },
  data() {
    return {
      pedidoForm: null,
      debouncedEditPedido: debounce(this.handleEditPedido, 3000),
    };
  },

  methods: {
    ...mapActions(["editPedido"]),

    resetPedidoForm() {
      this.pedidoForm = clone(this.PedidosOfCurrentTurma);
    },
    async handleEditPedido(pedido) {
      if (pedido === 1) this.pedidoForm.editado1 = true;
      else this.pedidoForm.editado2 = true;
      if (
        this.PedidosOfCurrentTurma.vagasPeriodizadas != this.pedidoForm.vagasPeriodizadas ||
        this.PedidosOfCurrentTurma.vagasNaoPeriodizadas != this.pedidoForm.vagasNaoPeriodizadas ||
        this.PedidosOfCurrentTurma.editado1 != this.pedidoForm.editado1 ||
        this.PedidosOfCurrentTurma.editado2 != this.pedidoForm.editado2
      ) {
        try {
          await this.editPedido(this.pedidoForm);
        } catch (error) {
          let erroMsg = "";
          if (error.response.data.fullMessage)
            erroMsg += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");

          this.pushNotification({
            type: "error",
            title: "Erro ao atualizar Pedido",
            text: erroMsg,
          });
        }
      }
    },
  },

  computed: {
    ...mapGetters(["Pedidos"]),

    PedidosOfCurrentTurma() {
      return this.Pedidos[this.turma.id][this.index];
    },
    typeClass() {
      return `${this.type}-pedidos-container`;
    },
    titlePedido() {
      const { editado1, editado2, vagasPeriodizadas, vagasNaoPeriodizadas } = this.pedidoForm;
      let periodizado = "Vagas grade (periodizados)";
      let naoPeriodizado = "Vagas extra (não periodizados)";

      if (!editado1 && vagasPeriodizadas !== 0) periodizado += "\nValor do plano copiado";
      if (!editado2 && vagasNaoPeriodizadas !== 0) naoPeriodizado += "\nValor do plano copiado";
      return { periodizado, naoPeriodizado };
    },
  },

  watch: {
    PedidosOfCurrentTurma: {
      handler: "resetPedidoForm",
      immediate: true,
    },
  },
};
</script>

<style scoped>
.main-pedidos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0 3px;
}
.modal-pedidos-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 2.5px 0;
}

.modal-pedidos-container > input.input-pedidos {
  width: 30px;
  margin: 0 3px;
}

input.input-pedidos {
  display: inline-block !important;
  background-color: #dbdbdb;
}
input.input-pedidos.empty {
  color: #dadada;
  background-color: #fff;
}
input.input-pedidos.notEdited {
  color: #0080ff;
  background-color: #e0efef;
}

input.input-pedidos.altera_1 {
  color: white;
  background-color: #ec6b6f;
}

input.input-pedidos.altera_2 {
  color: black;
  background-color: #f4f4c2;
}
</style>
