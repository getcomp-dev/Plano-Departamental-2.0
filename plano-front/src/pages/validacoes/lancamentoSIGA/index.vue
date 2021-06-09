<template>
  <div class="main-component row">
    <portal to="page-header">
      <BaseButton template="ajuda" @click="$refs.modalAjuda.toggle()" />
    </portal>

    <div class="page-content">
      <div class="table-div">
        <BaseTable>
          <template #thead>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="turma.disciplina.codigo"
              width="100"
              paddingX="0"
              title="Código da Disciplina"
            >
              Cód. Disciplina
            </v-th-ordination>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="turma.disciplina.nome"
              width="300"
              align="start"
            >
              Disciplina
            </v-th-ordination>
            <v-th width="30" title="Turma">T.</v-th>
            <v-th-ordination
              :currentOrder="ordenacaoConflitos"
              orderToCheck="curso.codigo"
              width="90"
              title="Código do Curso"
            >
              Cód. Curso
            </v-th-ordination>
            <v-th width="180" align="start" title="Valor do pedido no SIGA">Conflito</v-th>
            <v-th width="85" paddingX="0" title="Valor do pedido no SIGA">Valor SIGA</v-th>
            <v-th width="85" paddingX="0" title="Valor do pedido no Sistema">Valor Sistema</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="conflito in conflitosOrdered"
              :key="conflito.label + conflito.turma.id + conflito.curso.id"
            >
              <v-td width="100">{{ conflito.turma.disciplina.codigo }}</v-td>
              <v-td width="300" align="start">{{ conflito.turma.disciplina.nome }}</v-td>
              <v-td width="30">{{ conflito.turma.letra }}</v-td>
              <v-td width="90">{{ conflito.curso.codigo }}</v-td>
              <v-td width="180" align="start">{{ conflito.label }}</v-td>
              <v-td width="85">{{ conflito.siga }}</v-td>
              <v-td width="85">{{ conflito.sistema }}</v-td>
            </tr>

            <tr v-if="!conflitosOrdered.length">
              <v-td width="870">
                <b>Nenhum conflito encontrado.</b>
                Certifiqui-se de selecionar um arquivo correspondente com o plano atual e o periodo
                selecionado.
              </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>

      <Card :title="'Validar pedidos'">
        <template #form-group>
          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="nome" class="col-form-label">Período</label>
              <select
                id="periodoPlano"
                v-model.number="periodoDasTurmas"
                class="input-lg form-control form-control-sm"
              >
                <option
                  v-for="periodo in PeriodosLetivos"
                  :key="periodo.id + periodo.nome"
                  :value="periodo.id"
                >
                  {{ periodo.nome }}
                </option>
              </select>
            </div>
          </div>

          <div class="row mb-2 mx-0">
            <div class="form-group col m-0 px-0">
              <label required for="turmaFile" class="col-form-label">
                Arquivo .csv do plano SIGA
              </label>
              <input
                type="file"
                id="turmaFile"
                ref="inputFilePlano"
                class="form-control-file mt-1"
                accept=".csv"
              />
            </div>
          </div>
        </template>

        <template #footer>
          <BaseButton template="Salvar" :title="'Iniciar'" @click="handleCompareTurmas" />
          <BaseButton template="cancelar" @click="clearCardForm" />
        </template>
      </Card>
    </div>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Limpar:</b>
        No cartão à direita, clique em Cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        , para limpar as informações.
      </li>
      <li class="list-group-item">
        <b>Ordenar:</b>
        Clique no cabeçalho da tabela, na coluna desejada, para alterar a ordenação das informações.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { find, some, isEqual, orderBy } from "lodash-es";
import { parseCSVFileToArray } from "@/common/utils";
import { Card } from "@/components/ui";
import { ModalAjuda } from "@/components/modals";
import {
  parseTurmaSIGAToTurma,
  parseTurmaSIGAToPedido,
  getKeysTurmaSIGA,
  validateTurmasSIGA,
} from "@/common/utils/turmasSIGA";

export default {
  name: "ValidaçãoLançamentoSIGA",
  components: { Card, ModalAjuda },
  data() {
    return {
      periodoDasTurmas: 1,
      conflitos: [],
      ordenacaoConflitos: {
        order: "turma.disciplina.codigo",
        type: "asc",
      },
    };
  },

  methods: {
    clearCardForm() {
      this.periodoDasTurmas = 1;
      this.$refs.inputFilePlano.value = "";
    },

    async handleCompareTurmas() {
      if (!this.periodoDasTurmas) {
        this.pushNotification({
          type: "error",
          text: "Nenhum período selecionado",
        });
        return;
      }
      const [fileTurmas] = this.$refs.inputFilePlano.files;
      if (!fileTurmas) {
        this.pushNotification({
          type: "error",
          text: "Nenhum arquivo selecionado",
        });
        return;
      }

      try {
        this.setLoading({ type: "partial", value: true });
        const turmasFile = await parseCSVFileToArray(fileTurmas);
        validateTurmasSIGA(turmasFile);

        const turmasSIGANormalized = this.normalizeTurmasEPedidosSIGA(
          turmasFile,
          this.periodoDasTurmas
        );
        this.searchConflictsTurmas(turmasSIGANormalized);
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: error.message || "",
        });
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },

    normalizeTurmasEPedidosSIGA(turmasSIGA, periodo) {
      const keysTurmaSIGA = getKeysTurmaSIGA(turmasSIGA[0]);
      const turmasNormalized = [];
      let currentTurma = {};

      for (const turmaSIGA of turmasSIGA) {
        const newTurma = parseTurmaSIGAToTurma(turmaSIGA, keysTurmaSIGA, null, periodo);
        if (!newTurma) continue;
        newTurma.pedidosOferecidos = []; //Array com todos pedidos da turmas

        const pedidoOferecido = parseTurmaSIGAToPedido(turmaSIGA, keysTurmaSIGA, null);
        if (pedidoOferecido) {
          const { vagasOferecidas, vagasOcupadas } = pedidoOferecido;
          pedidoOferecido.totalVagas = vagasOferecidas + vagasOcupadas;
        }

        // Se turma igual ao currentTurma apenas adiciona o pedido na turma anterior
        if (this.turmasIsEqual(currentTurma, newTurma)) {
          if (pedidoOferecido)
            turmasNormalized[turmasNormalized.length - 1].pedidosOferecidos.push(pedidoOferecido);
        } else {
          // Se é uma turma nova então adiciona a turma e o pedido
          if (pedidoOferecido) newTurma.pedidosOferecidos.push(pedidoOferecido);
          turmasNormalized.push(newTurma);
          currentTurma = { ...newTurma };
        }
      }

      return turmasNormalized;
    },

    searchConflictsTurmas(turmasSIGA) {
      this.conflitos = [];
      //Turmas do periodo selecionado, exclui perfil MAC que não esta plano DCC do SIGA, e exclui as
      //disciplinas que são do primeiro periodo de algum gradeDCC
      const turmasDoSistemaFiltered = this.AllTurmas.filter(
        (turma) =>
          turma.periodo === this.periodoDasTurmas &&
          turma.disciplina.Perfil != 15 &&
          !some(this.disciplinasGradeDCC1Periodo, ["Disciplina", turma.Disciplina])
      );

      for (const turmaSistema of turmasDoSistemaFiltered) {
        const turmaSIGAFound = turmasSIGA.find(
          (turmaFile) =>
            turmaSistema.Disciplina == turmaFile.Disciplina && turmaSistema.letra == turmaFile.letra
        );

        if (!turmaSIGAFound) {
          this.conflitos.push({
            label: "Turma existe apenas no sistema",
            siga: "-",
            sistema: "-",
            turma: { ...turmaSistema },
            curso: {
              codigo: "-",
            },
          });
          continue;
        }

        const pedidosDaTurmaSistema = this.Pedidos[turmaSistema.id];

        turmaSIGAFound.pedidosOferecidos.forEach((pedidoSIGA) => {
          const pedidoSistemaFound = pedidosDaTurmaSistema.find(
            (pedidoSis) => pedidoSis.Curso == pedidoSIGA.Curso
          );

          if (!pedidoSistemaFound) {
            this.conflitos.push({
              label: "Pedido não existe no sistema",
              siga: pedidoSIGA.totalVagas,
              sistema: "-",
              turma: { ...turmaSistema },
              curso: find(this.AllCursos, ["id", pedidoSistemaFound.Curso]),
            });
            return;
          }

          const totalVagasSistema =
            pedidoSistemaFound.vagasPeriodizadas + pedidoSistemaFound.vagasNaoPeriodizadas;

          if (totalVagasSistema != pedidoSIGA.totalVagas) {
            this.conflitos.push({
              label: "Pedido com valores diferentes",
              siga: pedidoSIGA.totalVagas,
              sistema: totalVagasSistema == 0 ? "-" : totalVagasSistema,
              turma: { ...turmaSistema },
              curso: find(this.AllCursos, ["id", pedidoSistemaFound.Curso]),
            });
            return;
          }
        });

        pedidosDaTurmaSistema
          .filter((pedido) => pedido.vagasPeriodizadas != 0 || pedido.vagasNaoPeriodizadas != 0)
          .forEach((pedidoSistema) => {
            const pedidoSIGA = turmaSIGAFound.pedidosOferecidos.find(
              (pedidoArq) => pedidoSistema.Curso == pedidoArq.Curso
            );

            if (!pedidoSIGA) {
              this.conflitos.push({
                label: "Pedido não existe no SIGA",
                siga: "-",
                sistema: pedidoSistema.vagasPeriodizadas + pedidoSistema.vagasNaoPeriodizadas,
                turma: { ...turmaSistema },
                curso: find(this.AllCursos, ["id", pedidoSistema.Curso]),
              });
              return;
            }
          });
      }

      //Remove turmas duplicados que existe no arquivo
      const uniqueTurmasOnly = [];
      this.conflitos.forEach((turma1) => {
        const alredyHas = uniqueTurmasOnly.find((turma2) => isEqual(turma1, turma2));

        if (!alredyHas) uniqueTurmasOnly.push(turma1);
      });
      this.conflitos = [...uniqueTurmasOnly];
    },

    turmasIsEqual(turma1, turma2) {
      return (
        turma1.letra === turma2.letra &&
        turma1.Disciplina === turma2.Disciplina &&
        turma1.Horario1 === turma2.Horario1 &&
        turma1.Horario2 === turma2.Horario2
      );
    },
  },

  computed: {
    ...mapGetters(["AllCursos", "AllTurmas", "PeriodosLetivos", "Pedidos", "DisciplinasGrades"]),

    conflitosOrdered() {
      const { order, type } = this.ordenacaoConflitos;
      return orderBy(this.conflitos, order, type);
    },

    disciplinasGradeDCC1Periodo() {
      const disciplinasGradeFiltered = this.DisciplinasGrades.filter(
        (disciplinaGrade) => disciplinaGrade.periodo === 1
      );

      const disciplinasGradeFilteredUnique = [];
      disciplinasGradeFiltered.forEach((disciplinaGrade) => {
        const alredyExist = disciplinasGradeFilteredUnique.find(
          (uniqueDisciplinaGrade) => uniqueDisciplinaGrade.Disciplina === disciplinaGrade.Disciplina
        );

        if (!alredyExist) disciplinasGradeFilteredUnique.push({ ...disciplinaGrade });
      });

      return disciplinasGradeFilteredUnique;
    },
  },
};
</script>
