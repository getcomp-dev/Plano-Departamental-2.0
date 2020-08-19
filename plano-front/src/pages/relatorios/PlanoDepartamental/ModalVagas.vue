<template>
  <BaseModal2 ref="baseModalVagas" :type="'editVagas'" :classes="'modal-vagas'">
    <template #modal-body v-if="turma !== null">
      <div class="modal-vagas-header">
        <h2 class="title">
          {{ turma.disciplina.codigo + " - " + turma.disciplina.nome }}
        </h2>

        <label for="selectTurma" class="m-0 mr-2">Turma:</label>
        <select
          id="selectTurma"
          class="form-control select-letra"
          v-model="turmaLetraForm"
        >
          <option
            v-for="turma in TurmasOptionsModalVagas"
            :key="'mdVagas' + turma.id + turma.periodo"
            :value="turma.letra"
            >{{ turma.letra }}</option
          >
        </select>
      </div>

      <div class="div-table">
        <BaseTable :type="'modal'">
          <template #thead>
            <th
              class="clickable"
              style="width: 55px"
              title="Código"
              @click="toggleOrder(ordenacaoVagas, 'curso.codigo')"
            >
              Cód.
              <i :class="setIconByOrder(ordenacaoVagas, 'curso.codigo')"></i>
            </th>
            <th
              class="clickable t-start"
              style="width: 300px"
              @click="toggleOrder(ordenacaoVagas, 'curso.nome')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoVagas, 'curso.nome')"></i>
            </th>

            <th
              title="Vagas periodizadas"
              class="clickable less-padding"
              style="width: 55px"
              @click="toggleOrder(ordenacaoVagas, 'vagasPeriodizadas', 'desc')"
            >
              Grade
              <i
                :class="setIconByOrder(ordenacaoVagas, 'vagasPeriodizadas')"
              ></i>
            </th>
            <th
              title="Vagas não periodizadas"
              class="clickable less-padding"
              style="width: 55px"
              @click="
                toggleOrder(ordenacaoVagas, 'vagasNaoPeriodizadas', 'desc')
              "
            >
              Extra
              <i
                :class="setIconByOrder(ordenacaoVagas, 'vagasNaoPeriodizadas')"
              ></i>
            </th>
            <th
              title="Total de vagas"
              class="clickable less-padding"
              style="width: 55px"
              @click="toggleOrder(ordenacaoVagas, 'vagasTotais', 'desc')"
            >
              Total
              <i :class="setIconByOrder(ordenacaoVagas, 'vagasTotais')"></i>
            </th>
          </template>

          <template #tbody>
            <tr
              v-for="pedido in PedidosOrdered"
              :key="'trPedido' + pedido.Curso + pedido.Turma"
            >
              <td style="width: 55px">{{ pedido.curso.codigo }}</td>
              <td style="width: 300px" class="t-start">
                {{ pedido.curso.nome }}
              </td>
              <td style="width: 55px">{{ pedido.vagasPeriodizadas }}</td>
              <td style="width: 55px">{{ pedido.vagasNaoPeriodizadas }}</td>
              <td style="width: 55px">
                {{ pedido.vagasTotais }}
              </td>
            </tr>

            <tr v-show="!PedidosOrdered.length">
              <td colspan="5" style="width:520px">
                <b>Turma atual não possui nenhuma vaga cadastrada.</b>
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </template>
  </BaseModal2>
</template>

<script>
import { mapGetters } from "vuex";
import { toggleItemInArray, toggleOrdination } from "@/common/mixins";

export default {
  name: "ModalVagas",
  mixins: [toggleItemInArray, toggleOrdination],
  props: {
    turma: { type: Object | null, required: true },
  },
  data() {
    return {
      turmaLetraForm: null,
      ordenacaoVagas: { order: "vagasTotais", type: "desc" },
    };
  },

  methods: {
    open() {
      this.$refs.baseModalVagas.open();
    },
    close() {
      this.$refs.baseModalVagas.close();
    },
  },

  computed: {
    ...mapGetters(["TurmasInDisciplinasPerfis", "AllCursos"]),

    PedidosOrdered() {
      return this.$_.orderBy(
        this.PedidosFiltredByTurma,
        this.ordenacaoVagas.order,
        this.ordenacaoVagas.type
      );
    },
    PedidosFiltredByTurma() {
      if (this.turmaLetraForm === null) return [];

      const currentTurmaSelected = this.$_.find(this.TurmasOptionsModalVagas, [
        "letra",
        this.turmaLetraForm,
      ]);

      const pedidosDaTurma = this.$_.filter(
        this.Pedidos[currentTurmaSelected.id],
        (pedido) =>
          pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0
      );

      return this.$_.map(pedidosDaTurma, (pedido) => {
        const cursoFounded = this.$_.find(this.AllCursos, ["id", pedido.Curso]);

        return {
          ...pedido,
          vagasTotais: pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas,
          curso: cursoFounded,
        };
      });
    },

    TurmasOptionsModalVagas() {
      if (this.turma === null) return [];

      const turmasResultantes = this.$_.filter(
        this.TurmasInDisciplinasPerfis,
        (turma) =>
          turma.Disciplina === this.turma.Disciplina &&
          turma.periodo === this.turma.periodo
      );

      return this.$_.orderBy(turmasResultantes, ["periodo"]);
    },

    Pedidos() {
      return this.$store.state.pedido.Pedidos;
    },
  },

  watch: {
    turma(turma) {
      this.turmaLetraForm = turma.letra;
    },
  },
};
</script>

<style scoped>
.modal-vagas-header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}
.modal-vagas-header > .title {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
}
.modal-vagas-header > .select-letra {
  width: 60px !important;
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px !important;
  text-align: start;
}
.modal-vagas .modal-table tbody tr > td {
  height: 20px !important;
}
</style>
