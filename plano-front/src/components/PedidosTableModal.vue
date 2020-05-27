<template>
  <div id="InputPedidos" style="width:70px;">
    <input
      :disabled="Admin ? false : true"
      v-if="pedidoForm.vagasPeriodizadas == 0"
      type="text"
      v-model="pedidoForm.vagasPeriodizadas"
      style="margin:1.5px 2px; color:#DADADA;"
      v-on:change="editPedido(pedido)"
      v-on:focus="focusPedido"
      v-on:blur="blurPedido"
    />
    <input
      :disabled="Admin ? false : true"
      v-else
      type="text"
      v-model="pedidoForm.vagasPeriodizadas"
      style="margin:1.5px 2px; background-color: #e7e7e7;"
      v-on:change="editPedido(pedido)"
      v-on:focus="focusPedido"
      v-on:blur="blurPedido"
    />
    <input
      :disabled="Admin ? false : true"
      v-if="pedidoForm.vagasNaoPeriodizadas == 0"
      type="text"
      v-model="pedidoForm.vagasNaoPeriodizadas"
      style="margin:1.5px 2px; color:#DADADA;"
      v-on:change="editPedido(pedido)"
      v-on:focus="focusPedido"
      v-on:blur="blurPedido"
    />
    <input
      :disabled="Admin ? false : true"
      v-else
      type="text"
      v-model="pedidoForm.vagasNaoPeriodizadas"
      style="margin:1.5px 2px; background-color: #e7e7e7;"
      v-on:change="editPedido(pedido)"
      v-on:focus="focusPedido"
      v-on:blur="blurPedido"
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
input {
  width: 28px !important;
  height: 20px !important;
  text-align: center !important;
  border: 1px rgb(51, 51, 51) solid;
}
</style>
