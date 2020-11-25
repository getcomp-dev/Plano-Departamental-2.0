<template>
  <div :class="typeClass">
    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasPeriodizadas"
      @change="debouncedEditPedido"
      @keypress="maskOnlyNumber"
      @paste.prevent
      v-focus-pedido
    />

    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasNaoPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasNaoPeriodizadas"
      @change="debouncedEditPedido"
      @keypress="maskOnlyNumber"
      @paste.prevent
      v-focus-pedido
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { vFocusPedido, maskOnlyNumber } from "@/common/mixins";

export default {
  name: "InputsPedidosDCC",
  mixins: [maskOnlyNumber, vFocusPedido],
  props: {
    type: { type: String, default: "main" },
    turma: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  data() {
    return {
      pedidoForm: null,
      debouncedEditPedido: this.$_.debounce(this.handleEditPedido, 1000),
    };
  },

  methods: {
    ...mapActions(["editPedido"]),

    resetPedidoForm() {
      this.pedidoForm = this.$_.cloneDeep(this.PedidosOfCurrentTurma);
    },
    async handleEditPedido() {
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
  background-color: #dbdbdb;
}
input.input-pedidos.empty {
  color: #dadada;
  background-color: #fff;
}
</style>
