<template>
  <BaseModal ref="baseModalVagas" :type="'editVagas'">
    <template #modal-body v-if="turma !== null">
      <div class="modal-vagas-header">
        <h2 class="title">
          {{ turma.disciplina.codigo + " - " + turma.disciplina.nome }}
        </h2>

        <label for="selectTurma" class="m-0 mr-2">Turma:</label>
        <select id="selectTurma" class="form-control select-letra" v-model="turmaLetraForm">
          <option v-for="turma in TurmasOptions" :key="turma.id + turma.letra" :value="turma.letra">
            {{ turma.letra }}
          </option>
        </select>
      </div>

      <div class="div-table">
        <BaseTable styles="height:auto;max-height:400px">
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
            <v-th colspan="3" width="190" paddinX="0">
              SIPlanWeb
              <v-th-ordination
                :currentOrder="ordenacaoVagas"
                orderToCheck="vagasPeriodizadas"
                orderType="desc"
                width="70"
                title="Vagas periodizadas"
              >
                Grade
              </v-th-ordination>
              <v-th-ordination
                :currentOrder="ordenacaoVagas"
                orderToCheck="vagasNaoPeriodizadas"
                orderType="desc"
                width="70"
                title="Vagas não periodizadas"
              >
                Extra
              </v-th-ordination>
              <v-th-ordination
                :currentOrder="ordenacaoVagas"
                orderToCheck="totalVagas"
                orderType="desc"
                width="50"
                title="Total de vagas"
              >
                Total
              </v-th-ordination>
            </v-th>

            <v-th colspan="2" width="160" paddinX="0">
              SIGA
              <v-th-ordination
                :currentOrder="ordenacaoVagas"
                orderToCheck="vagasOferecidas"
                orderType="desc"
                width="80"
                paddingX="0"
                title="Vagas oferecidas"
              >
                Oferecidas
              </v-th-ordination>
              <v-th-ordination
                :currentOrder="ordenacaoVagas"
                orderToCheck="vagasOcupadas"
                orderType="desc"
                width="80"
                paddingX="0"
                title="Vagas ocupadas"
              >
                Ocupadas
              </v-th-ordination>
            </v-th>
          </template>

          <template #tbody>
            <tr v-for="pedido in PedidosDataOrdered" :key="pedido.curso.codigo + pedido.Turma">
              <v-td width="65" align="start">{{ pedido.curso.codigo }}</v-td>
              <v-td width="300" align="start" :title="pedido.curso.nome">
                {{ pedido.curso.nome }}
              </v-td>
              <v-td width="70">{{ pedido.vagasPeriodizadas }}</v-td>
              <v-td width="70">{{ pedido.vagasNaoPeriodizadas }}</v-td>
              <v-td width="50">{{ pedido.totalVagas }}</v-td>
              <v-td width="80">{{ pedido.vagasOferecidas }}</v-td>
              <v-td width="80">{{ pedido.vagasOcupadas }}</v-td>
            </tr>

            <tr v-if="!PedidosDataOrdered.length">
              <v-td colspan="5" width="715">
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
import { orderBy, find } from "lodash-es";

export default {
  name: "ModalVagas",
  props: {
    turma: { type: Object, default: null },
  },
  data() {
    return {
      turmaLetraForm: null,
      ordenacaoVagas: { order: "totalVagas", type: "desc" },
    };
  },

  methods: {
    open() {
      this.$refs.baseModalVagas.open();
    },
    close() {
      this.$refs.baseModalVagas.close();
    },
    getPedidosSIGADaTurma(turmaId) {
      if (!this.AllPedidosSIGA[turmaId]) return [];

      return this.AllPedidosSIGA[turmaId].filter(
        (pedido) => pedido.vagasOferecidas > 0 || pedido.vagasOcupadas > 0
      );
    },
    getPedidosDaTurma(turmaId) {
      if (!this.Pedidos[turmaId]) return [];

      return this.Pedidos[turmaId].filter(
        (pedido) => pedido.vagasPeriodizadas > 0 || pedido.vagasNaoPeriodizadas > 0
      );
    },
  },

  computed: {
    ...mapGetters(["AllTurmas", "AllCursos", "Pedidos", "AllPedidosSIGA"]),

    PedidosDataOrdered() {
      return orderBy(this.PedidosData, this.ordenacaoVagas.order, this.ordenacaoVagas.type);
    },
    PedidosData() {
      if (this.turmaLetraForm === null) return [];

      const currentTurma = find(this.TurmasOptions, ["letra", this.turmaLetraForm]);
      const pedidosDaTurma = this.getPedidosDaTurma(currentTurma.id);
      const pedidosSIGADaTurma = this.getPedidosSIGADaTurma(currentTurma.id);
      const pedidosResultData = [];

      this.AllCursos.forEach((curso) => {
        const pedidoFound = find(pedidosDaTurma, ["Curso", curso.id]);
        const pedidoSIGAFound = find(pedidosSIGADaTurma, ["Curso", curso.id]);

        if (pedidoFound || pedidoSIGAFound) {
          const pedidoResult = {
            vagasPeriodizadas: 0,
            vagasNaoPeriodizadas: 0,
            totalVagas: 0,
            vagasOferecidas: 0,
            vagasOcupadas: 0,
            curso: { ...curso },
          };
          if (pedidoFound) {
            const { vagasPeriodizadas, vagasNaoPeriodizadas } = pedidoFound;
            pedidoResult.vagasPeriodizadas = vagasPeriodizadas;
            pedidoResult.vagasNaoPeriodizadas = vagasNaoPeriodizadas;
            pedidoResult.totalVagas += vagasPeriodizadas + vagasNaoPeriodizadas;
          }
          if (pedidoSIGAFound) {
            const { vagasOferecidas, vagasOcupadas } = pedidoSIGAFound;
            pedidoResult.vagasOferecidas = vagasOferecidas;
            pedidoResult.vagasOcupadas = vagasOcupadas;
          }

          pedidosResultData.push(pedidoResult);
        }
      });

      return pedidosResultData;
    },
    TurmasOptions() {
      if (this.turma === null) return [];

      const turmas = this.AllTurmas.filter(
        (turma) =>
          turma.Disciplina === this.turma.Disciplina && turma.periodo === this.turma.periodo
      );
      return orderBy(turmas, ["periodo"]);
    },
  },

  watch: {
    turma(turma) {
      this.turmaLetraForm = turma.letra;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal-vagas-header {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  > .title {
    margin: 0;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
  }

  > .select-letra {
    width: 60px;
    height: 25px;
    font-size: 12px;
    padding: 2px 5px;
    text-align: start;
  }
}
</style>
