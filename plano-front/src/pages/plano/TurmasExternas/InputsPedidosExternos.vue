<template>
  <div class="pedidos-container">
    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasPeriodizadas"
      @change="handleEditPedido"
      @keypress="maskOnlyNumber"
      @paste.prevent
      v-focus-pedido
    />
    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasNaoPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasNaoPeriodizadas"
      @change="handleEditPedido"
      @keypress="maskOnlyNumber"
      @paste.prevent
      v-focus-pedido
    />
  </div>
</template>

<script>
import { clone } from "lodash-es";
import { vFocusPedido, maskOnlyNumber } from "@/common/mixins";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "InputsPedidosExternos",
  mixins: [vFocusPedido, maskOnlyNumber],
  props: {
    turma: { type: Object, required: true },
    index: { type: Number, required: true },
  },
  data() {
    return {
      pedidoForm: null,
    };
  },

  methods: {
    ...mapActions(["editPedidoExterno"]),

    resetPedidoForm() {
      this.pedidoForm = clone(this.PedidosOfCurrentTurma);
    },
    async handleEditPedido() {
      try {
        this.setPartialLoading(true);
        await this.editPedidoExterno(this.pedidoForm);
      } catch (error) {
        let erroMsg = "";
        if (error.response.data.fullMessage)
          erroMsg += "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");

        this.pushNotification({
          type: "error",
          title: "Erro ao atualizar pedido",
          text: erroMsg,
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters(["PedidosExternos"]),

    PedidosOfCurrentTurma() {
      return this.PedidosExternos[this.turma.id][this.index];
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
.pedidos-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding: 0 3px;
}

input.input-pedidos {
  background-color: #dbdbdb;
}
input.input-pedidos.empty {
  color: #dadada;
  background-color: #fff;
}
</style>
