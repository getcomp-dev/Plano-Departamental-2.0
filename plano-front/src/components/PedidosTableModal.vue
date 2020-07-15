<template>
  <div class="modal-pedidos-container">
    <input
      type="text"
      :class="['input-pedidos', { empty: pedidoForm.vagasPeriodizadas == 0 }]"
      v-model.number="pedidoForm.vagasPeriodizadas"
      @change="editPedido(pedido)"
      @focus="focusPedido"
      @blur="blurPedido"
    />

    <input
      type="text"
      :class="[
        'input-pedidos',
        { empty: pedidoForm.vagasNaoPeriodizadas == 0 },
      ]"
      v-model="pedidoForm.vagasNaoPeriodizadas"
      @change="editPedido(pedido)"
      @focus="focusPedido"
      @blur="blurPedido"
    />
  </div>
</template>
<script>
import pedidoService from "@/common/services/pedido";
import _ from "lodash";
const emptyPedido = {
  vagasPeriodizadas: 0,
  vagasNaoPeriodizadas: 0,
  Curso: undefined,
  Turma: undefined,
};

export default {
  name: "TableModalPedidos",
  props: {
    turma: Object,
    index: Number,
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
    editPedido() {
      console.log(this.$store.state.pedido.Pedidos[this.turma.id][this.index]);
      if (this.pedidoForm.vagasPeriodizadas == "")
        this.pedidoForm.vagasPeriodizadas = 0;
      if (this.pedidoForm.vagasNaoPeriodizadas == "")
        this.pedidoForm.vagasNaoPeriodizadas = 0;
      pedidoService
        .update(this.pedidoForm.Curso, this.pedidoForm.Turma, this.pedidoForm)
        .then((response) => {
          this.$notify({
            group: "general",
            title: `Sucesso!`,
            text: `O pedido foi atualizado!`,
            type: "success",
          });
          console.log(
            this.$store.state.pedido.Pedidos[this.turma.id][this.index]
          );
        })
        .catch((error) => {
          this.error = "<b>Erro ao atualizar Pedido</b>";
          if (error.response.data.fullMessage) {
            this.error +=
              "<br/>" + error.response.data.fullMessage.replace("\n", "<br/>");
          }
        });
    },

    focusPedido() {
      if (this.pedidoForm.vagasPeriodizadas == 0)
        this.pedidoForm.vagasPeriodizadas = "";

      if (this.pedidoForm.vagasNaoPeriodizadas == 0)
        this.pedidoForm.vagasNaoPeriodizadas = "";
    },

    blurPedido() {
      if (this.pedidoForm.vagasPeriodizadas == "")
        this.pedidoForm.vagasPeriodizadas = 0;

      if (this.pedidoForm.vagasNaoPeriodizadas == "")
        this.pedidoForm.vagasNaoPeriodizadas = 0;
    },
  },
  computed: {
    pedido() {
      return this.$store.state.pedido.Pedidos[this.turma.id][this.index];
    },

    Admin() {
      if (this.$store.state.auth.Usuario.admin === 1) {
        return true;
      } else {
        return false;
      }
    },
  },
  watch: {
    pedido: function() {
      this.pedidoForm = _.clone(
        this.$store.state.pedido.Pedidos[this.turma.id][this.index]
      );
    },
  },
};
</script>

<style scoped>
@import "../assets/css/input-pedidos.css";

.modal-pedidos-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  padding: 2.5px 0 !important;
}
.modal-pedidos-container > input {
  width: 30px !important;
  height: 18px !important;
  text-align: center;
  font-size: 11px;
  border: 1px solid #414141 !important;
}
</style>
