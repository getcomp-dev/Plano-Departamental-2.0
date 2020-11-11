<template>
  <BaseModal ref="baseModalVagas" :type="'editVagas'" :classes="'modal-vagas'">
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
            :key="turma.id + turma.letra"
            :value="turma.letra"
          >
            {{ turma.letra }}
          </option>
        </select>
      </div>

      <div class="div-table">
        <BaseTable :styles="'height:auto'">
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoVagas"
              orderToCheck="curso.codigo"
              width="65"
              align="start"
            >
              Código
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoVagas"
              orderToCheck="curso.nome"
              width="300"
              align="start"
            >
              Nome
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoVagas"
              orderToCheck="vagasPeriodizadas"
              orderType="desc"
              width="55"
              title="Vagas periodizadas"
            >
              Grade
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoVagas"
              orderToCheck="vagasNaoPeriodizadas"
              orderType="desc"
              width="55"
              title="Vagas não periodizadas"
            >
              Extra
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoVagas"
              orderToCheck="vagasTotais"
              orderType="desc"
              width="55"
              title="Total de vagas"
            >
              Total
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="pedido in PedidosOrdered"
              :key="pedido.Turma + pedido.curso.codigo"
            >
              <v-td width="65" align="start">{{ pedido.curso.codigo }}</v-td>
              <v-td width="300" align="start">{{ pedido.curso.nome }}</v-td>
              <v-td width="55">{{ pedido.vagasPeriodizadas }}</v-td>
              <v-td width="55">{{ pedido.vagasNaoPeriodizadas }}</v-td>
              <v-td width="55">{{ pedido.vagasTotais }}</v-td>
            </tr>

            <tr v-show="!PedidosOrdered.length">
              <v-td colspan="5" width="530">
                <b>Turma atual não possui nenhuma vaga cadastrada</b>
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </template>
  </BaseModal>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModalVagas",
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
        (pedido) => pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0
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
  width: 60px;
  height: 25px;
  font-size: 12px;
  padding: 2px 5px;
  text-align: start;
}
</style>
