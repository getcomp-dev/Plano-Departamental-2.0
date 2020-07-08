<template>
  <div class="turma-pedidos">
    <input
      type="text"
      :class="{ 'pedido-empty': pedidoForm.vagasPeriodizadas == 0 }"
      v-model.number="pedidoForm.vagasPeriodizadas"
      v-focus-pedido
      @keypress="onlyNumber"
      @change="editPedido(pedido)"
    />

    <input
      type="text"
      :class="{ 'pedido-empty': pedidoForm.vagasNaoPeriodizadas == 0 }"
      v-model.number="pedidoForm.vagasNaoPeriodizadas"
      v-focus-pedido
      @keypress="onlyNumber"
      @change="editPedido(pedido)"
    />
  </div>
</template>

<script>
import _ from "lodash";
import pedidoService from "@/common/services/pedido";
import { notification } from "@/mixins/index.js";
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
};

export default {
  name: "TurmaPedidos",
  props: {
    turma: Object,
    index: Number,
  },
  mixins: [notification],
  directives: {
    focusPedido: {
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
      ativo: false,
      valorAtual: undefined,
      pedidoForm: _.clone(emptyPedido),
    };
  },
  mounted() {
    this.pedidoForm = _.clone(
      this.$store.state.pedido.Pedidos[this.turma.id][this.index]
    );
  },

  methods: {
    onlyNumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    },
    validatePedido(pedido) {
      if (pedido.vagasPeriodizadas == "") pedido.vagasPeriodizadas = 0;
      if (pedido.vagasNaoPeriodizadas == "") pedido.vagasNaoPeriodizadas = 0;
    },
    async editPedido() {
      const pedido = _.clone(this.pedidoForm);
      this.validatePedido(pedido);

      try {
        const responde = await pedidoService.update(
          pedido.Curso,
          pedido.Turma,
          pedido
        );
        this.showNotification({
          type: "success",
          message: responde.message,
        });
      } catch (error) {
        this.showNotification({
          type: "error",
          title: "Erro ao atualizar Pedido!",
          message: error,
        });
      }
    },
  },
  computed: {
    pedido() {
      return this.$store.state.pedido.Pedidos[this.turma.id][this.index];
    },
  },
  watch: {
    pedido() {
      this.pedidoForm = _.clone(
        this.$store.state.pedido.Pedidos[this.turma.id][this.index]
      );
    },
  },
};
</script>
<style scoped>
.turma-pedidos {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 44px;
  padding: 2.5px 2px;
}
.turma-pedidos input {
  width: 100%;
  height: 18px;
  font-size: 11px;
  text-align: center;
  color: #414141 !important;
  border: 1px solid #414141 !important;
  background-color: #e7e7e7;
}
.turma-pedidos .pedido-empty {
  color: #dadada;
  background-color: #fff;
}
</style>
