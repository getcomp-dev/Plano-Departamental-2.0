<template>
  <div :class="pedidoTypeClass">
    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasPeriodizadas"
      @change="handleEditPedido"
      @keypress="maskOnlyNumber"
      v-focus-pedido
    />

    <input
      type="text"
      :class="[
        'input-pedidos',
        { empty: pedidoForm.vagasNaoPeriodizadas == 0 },
      ]"
      v-model.number="pedidoForm.vagasNaoPeriodizadas"
      @change="handleEditPedido"
      @keypress="maskOnlyNumber"
      v-focus-pedido
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { maskOnlyNumber } from "@/common/mixins";

export default {
  name: "InputsPedidosDCC",
  mixins: [maskOnlyNumber],
  props: {
    type: { type: String, default: "main" },
    turma: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  directives: {
    "focus-pedido": {
      bind(el) {
        el.addEventListener("focus", () => {
          if (el.value == 0) el.value = "";
        });
        el.addEventListener("blur", () => {
          if (el.value == "") el.value = 0;
        });
      },
    },
  },
  data() {
    return {
      pedidoForm: null,
    };
  },

  methods: {
    ...mapActions(["editPedido"]),

    resetPedidoForm() {
      this.pedidoForm = this.$_.clone(
        this.$store.state.pedido.Pedidos[this.turma.id][this.index]
      );
    },
    async handleEditPedido() {
      try {
        this.setPartialLoading(true);

        this.editPedido(this.pedidoForm);
      } catch (error) {
        let erroMsg = "";
        if (error.response.data.fullMessage)
          erroMsg +=
            "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");

        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar Pedido",
          text: erroMsg,
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    currentTurmaPedidos() {
      return this.$store.state.pedido.Pedidos[this.turma.id][this.index];
    },

    pedidoTypeClass() {
      return `${this.type}-pedidos-container`;
    },
  },

  watch: {
    currentTurmaPedidos: {
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
  justify-content: space-evenly;
  width: 100%;
  height: 44px;
  padding: 0 2px !important;
}
.modal-pedidos-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 2.5px 0 !important;
}

input.input-pedidos {
  height: 18px;
  text-align: center;
  font-size: 11px;
  color: #202020;
  border: 1px solid #414141 !important;
  background-color: #dbdbdb;
}
.main-pedidos-container > input.input-pedidos {
  width: 100%;
}
.modal-pedidos-container > input.input-pedidos {
  width: 30px !important;
}

input.input-pedidos.empty {
  color: #dadada;
  background-color: #fff;
}
</style>