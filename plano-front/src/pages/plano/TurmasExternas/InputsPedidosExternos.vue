<template>
  <div class="pedidos-container">
    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasPeriodizadas"
      v-focus-pedido
      @keypress="onlyNumber"
      @change="editPedido(pedido)"
    />
    <input
      type="text"
      :class="[
        'input-pedidos',
        { empty: pedidoForm.vagasNaoPeriodizadas == 0 },
      ]"
      v-model.number="pedidoForm.vagasNaoPeriodizadas"
      v-focus-pedido
      @keypress="onlyNumber"
      @change="editPedido(pedido)"
    />
  </div>
</template>

<script>
import pedidoExternoService from "@/common/services/pedidoExterno";
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
};
export default {
  name: "InputsPedidosExternos",
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
      pedidoForm: this.$_.clone(emptyPedido),
    };
  },
  mounted: function() {
    this.pedidoForm = this.$_.clone(
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
      const pedido = this.$_.clone(this.pedidoForm);
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
      this.pedidoForm = this.$_.clone(
        this.$store.state.pedidoExterno.Pedidos[this.turma.id][this.index]
      );
    },
  },
};
</script>
<style scoped>
@import "../../../assets/css/input-pedidos.css";
</style>
