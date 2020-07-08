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
import pedidoExternoService from "@/common/services/pedidoExterno";
import _ from "lodash";

const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
};
export default {
  name: "TurmaExternaPedido",
  props: {
    turma: Object,
    index: Number,
  },
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
  mounted: function() {
    this.pedidoForm = _.clone(
      this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index]
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
        await pedidoExternoService.update(pedido.Curso, pedido.Turma, pedido);
        this.$notify({
          group: "general",
          title: `Sucesso!`,
          text: `O pedido foi atualizado!`,
          type: "success",
        });
      } catch (error) {
        this.$notify({
          group: "general",
          title: `Erro!`,
          text: error,
          type: "error",
        });
        this.error = "<b>Erro ao atualizar Pedido</b>";
      }
    },
  },

  computed: {
    pedido() {
      return this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index];
    },
  },

  watch: {
    pedido: function() {
      this.pedidoForm = _.clone(
        this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index]
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
