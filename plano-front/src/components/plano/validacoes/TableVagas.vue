<template>
  <table
    id="TableVagas"
    class="table table-sm modal-table table-bordered max-content"
    style="max-height: 350px !important;"
  >
    <thead class="thead-light ">
      <tr class="sticky">
        <div style="font-size: 11px !important;" class=" max-content">
          <th>
            <p
              class="p-header clickable"
              style="width: 50px; text-align: start;"
              @click="toggleOrdVagas('codigo')"
              title="Clique para ordenar por código"
            >
              Cód.
              <i
                :class="
                  ordemVagas.order === 'codigo'
                    ? ordemVagas.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
                style="font-size: 0.6rem; text-align: right;"
              ></i>
            </p>
          </th>
          <th>
            <p
              class="p-header clickable"
              style="width: 320px; text-align: start;"
              v-on:click="toggleOrdVagas('nome')"
              title="Clique para ordenar por nome"
            >
              Nome
              <i
                :class="
                  ordemVagas.order === 'nome'
                    ? ordemVagas.type == 'asc'
                      ? 'fas fa-arrow-down fa-sm'
                      : 'fas fa-arrow-up fa-sm'
                    : 'fas fa-arrow-down fa-sm low-opacity'
                "
                style="font-size: 0.6rem; text-align: right;"
              ></i>
            </p>
          </th>

          <th>
            <p
              class="p-header"
              style="width: 70px; text-align: center;"
              title="Vagas periodizadas / Não periodizadas"
            >
              Vagas
            </p>
          </th>
        </div>
      </tr>
    </thead>

    <tbody>
      <tr v-for="curso in Cursos" :key="'vaga' + curso.id + '-CursosVagas'">
        <div style="width: max-content !important;">
          <td>
            <p style="width: 50px; text-align: start;">
              {{ curso.codigo }}
            </p>
          </td>
          <td>
            <p style="width: 320px; text-align: start;">
              {{ curso.nome }}
            </p>
          </td>

          <td>
            <template
              v-for="(pedido, index) in Pedidos"
              v-if="pedido.Curso === curso.id"
            >
              <InputPedidos
                :key="'index' + index"
                v-bind:index="index"
                v-bind:turma="turma"
              ></InputPedidos>
            </template>
          </td>
        </div>
      </tr>
    </tbody>
  </table>
</template>

<script>
import _ from "lodash";
import InputPedidos from "./InputPedidos.vue";
const emptyTurma = {
  id: undefined,
  periodo: undefined,
  letra: undefined,
  turno1: undefined,
  turno2: undefined,
  Disciplina: undefined,
  Docente1: undefined,
  Docente2: undefined,
  Horario1: undefined,
  Horario2: undefined,
  Sala1: undefined,
  Sala2: undefined,
};

export default {
  name: "TableVagas",
  components: {
    InputPedidos,
  },
  props: {
    turma: Object,
  },
  data() {
    return {
      turmaForm: _.clone(emptyTurma),
      ordemVagas: { order: "codigo", type: "asc" },
    };
  },
  mounted: function() {
    this.turmaForm = _.clone(this.turma);
  },
  methods: {
    toggleOrdVagas(ord) {
      if (this.ordemVagas.order != ord) {
        this.ordemVagas.order = ord;
        this.ordemVagas.type = "asc";
      } else {
        this.ordemVagas.type = this.ordemVagas.type == "asc" ? "desc" : "asc";
      }
    },
    curso(pedido) {
      return _.find(this.$store.state.curso.Cursos, { id: pedido.Curso });
    },
  },
  computed: {
    VagasTurmaAtual() {
      if (this.turmaForm === undefined) return [];

      return _.orderBy(
        this.$store.state.pedido.Pedidos[this.turmaForm.id],
        (p) => {
          switch (this.ordemVagas.order) {
            case "codigo":
              return this.curso(p).codigo;
            case "nome":
              return this.curso(p).nome;
            case "vagasPeriodizadas":
              return p.vagasPeriodizadas;
            case "vagasNaoPeriodizadas":
              return p.vagasNaoPeriodizadas;
            case "vagasTotais":
              return p.vagasPeriodizadas + p.vagasNaoPeriodizadas;
            default:
              return this.curso(p).codigo;
          }
        },
        this.ordemVagas.type
      );
    },
    Pedidos() {
      return this.$store.state.pedido.Pedidos[this.turma.id];
    },
    Cursos() {
      return _.orderBy(
        this.$store.state.curso.Cursos,
        this.ordemVagas.order,
        this.ordemVagas.type
      );
    },
  },
};
</script>

<style scoped>
.modal-table {
  display: block !important;
  overflow: auto !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0.5rem 0 !important;
}
.modal-table tr thead {
  display: block;
}
.modal-table th {
  padding: 0 !important;
  text-align: center !important;
  height: 18px !important;
}

.modal-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: start;
  height: 18px !important;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table td {
  border-top: 0;
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  /* height: 22px !important; */
}
.modal-table p {
  margin: 0 !important;
  text-align: center;
  padding: 0 !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.modal-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
</style>
