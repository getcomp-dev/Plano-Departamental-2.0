<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Plano Departamental'">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="codigo"
            width="80"
            >Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="nome"
            width="350"
            align="start"
            >Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="80"
            align="start"
            >Perfil
          </v-th-ordination>
          <v-th width="30" title="Créditos">C.</v-th>
          <v-th width="30" title="Período letivo">P.</v-th>
          <v-th width="35" title="Turma">T.</v-th>
          <v-th width="150">Docentes</v-th>
          <v-th width="130">Horário</v-th>

          <template v-if="algumPeriodoAtivado">
            <v-th width="45" :title="theadTitle.creditos">
              SC
            </v-th>
            <v-th width="45" :title="theadTitle.vagas">
              SV
            </v-th>
          </template>
        </template>

        <template #tbody>
          <tr v-show="DisciplinasInTurmasOrdered.length" class="bg-total-vg">
            <v-td width="80" />
            <v-td width="350" align="start">TOTAIS</v-td>
            <v-td width="80" />
            <v-td width="30" />
            <v-td width="30" />
            <v-td width="35" />
            <v-td width="150" />
            <v-td width="130" />
            <v-td width="45">{{ somatoriosTotais.creditos }}</v-td>
            <v-td width="45">{{ somatoriosTotais.vagas }}</v-td>
          </tr>

          <template v-for="disciplina in DisciplinasInTurmasOrdered">
            <tr :key="disciplina.id + disciplina.codigo" class="bg-custom">
              <v-td width="80">{{ disciplina.codigo }}</v-td>
              <v-td width="350" align="start">{{ disciplina.nome }}</v-td>
              <v-td width="80">{{ disciplina.perfil.abreviacao }}</v-td>
              <v-td width="30">{{ disciplina.creditoTotal }}</v-td>
              <v-td width="30"></v-td>
              <v-td width="30"></v-td>
              <v-td width="150"></v-td>
              <v-td width="130"></v-td>
              <v-td width="45">
                {{ disciplina.somatorioCreditos }}
              </v-td>
              <v-td width="45">
                {{ disciplina.somatorioVagas }}
              </v-td>
            </tr>

            <tr v-for="turma in disciplina.turmas" :key="turma.id + turma.letra">
              <v-td width="80" />
              <v-td width="350" />
              <v-td width="80" />
              <v-td width="30" />
              <v-td width="30">{{ turma.periodo }}</v-td>
              <v-td width="35" paddingX="0">{{ turma.letra }}</v-td>
              <v-td width="150" paddingX="2">
                {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
              </v-td>
              <v-td width="130" paddingX="2">
                {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
              </v-td>
              <v-td width="45" />
              <v-td
                v-if="algumPeriodoAtivado"
                width="45"
                class="td-vagas clickable"
                @click.native="handleClickInTurmaVaga(turma)"
              >
                {{ turma.vagas }}
              </v-td>
              <v-td v-else width="45"></v-td>
            </tr>
          </template>

          <tr v-show="!DisciplinasInTurmasOrdered.length">
            <v-td width="885" colspan="7">
              <b>Nenhuma disciplina encontrada.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" /> para
              selecioná-las.
            </v-td>
            <template v-if="algumPeriodoAtivado">
              <v-td width="45" class="borderX-0"></v-td>
              <v-td width="45" class="borderX-0"></v-td>
            </template>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <div class="div-table">
        <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
          <template #thead>
            <v-th width="25" />
            <v-th-ordination
              :currentOrder="ordenacaoModal.perfis"
              orderToCheck="nome"
              width="425"
              align="start"
              >Nome
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="perfil in PerfisOptionsOrdered"
              :key="perfil.id + perfil.nome"
              @click.stop="selectPerfis(perfil)"
            >
              <v-td width="25">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="perfil"
                  v-model="filtroPerfis.selecionados"
                  :indeterminate.prop="perfil.halfChecked"
                  @click.stop="selectPerfis(perfil)"
                />
              </v-td>
              <v-td width="425" align="start">{{ perfil.nome }}</v-td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          type="modal"
          v-show="modalFiltrosTabs.current === 'Disciplinas'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchDisciplinas"
              placeholder="Pesquise nome ou codigo de uma disciplina..."
            />
          </template>

          <template #thead>
            <v-th width="25" />
            <v-th-ordination
              :currentOrder="ordenacaoModal.disciplinas"
              orderToCheck="codigo"
              width="70"
              align="start"
              >Código
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoModal.disciplinas"
              orderToCheck="nome"
              width="270"
              align="start"
              >Nome
            </v-th-ordination>

            <v-th-ordination
              :currentOrder="ordenacaoModal.disciplinas"
              orderToCheck="perfil.abreviacao"
              width="85"
              align="start"
              >Perfil
            </v-th-ordination>
          </template>

          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasOptionsOrdered"
              :key="disciplina.id + disciplina.nome"
              @click.stop="selectDisciplina(disciplina)"
            >
              <v-td width="25">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroDisciplinas.selecionados"
                  :value="disciplina"
                  @click.stop="selectDisciplina(disciplina)"
                />
              </v-td>
              <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
              <v-td align="start" width="270" :title="disciplina.nome">
                {{ disciplina.nome }}
              </v-td>
              <v-td width="85" align="start">{{
                disciplina.perfil.abreviacao
              }}</v-td>
            </tr>
            <tr v-if="!DisciplinasOptionsOrdered.length">
              <v-td colspan="3" width="450">
                NENHUMA DISCIPLINA ENCONTRADA.
              </v-td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
          <template #thead>
            <v-th width="25" />
            <v-th width="425" align="start">Periodos Letivo</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="periodo in PeriodosOptions"
              :key="periodo.id + periodo.nome"
              @click.stop="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
            >
              <v-td width="25">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="periodo"
                  v-model="filtroPeriodos.selecionados"
                  @click.stop="selecionaPeriodo(periodo)"
                />
              </v-td>
              <v-td width="425" align="start">{{ periodo.nome }}</v-td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Semestres'">
          <template #thead>
            <v-th width="25" />
            <v-th width="425" align="start">Semestre Letivo</v-th>
          </template>

          <template #tbody>
            <tr
              v-for="semestre in SemestresOptions"
              :key="semestre.id + semestre.nome"
              @click.stop="selecionaSemestre(semestre)"
            >
              <v-td width="25">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :indeterminate.prop="semestre.halfChecked"
                  :value="semestre"
                  v-model="filtroSemestres.selecionados"
                  @click.stop="selecionaSemestre(semestre)"
                />
              </v-td>
              <v-td width="425" align="start">{{ semestre.nome }} </v-td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalVagas ref="modalVagas" :turma="turmaClicked" />

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar plano:</b> Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />. Em
        seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório :</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />. Em
        seguida, indique se deseja gerar o relatório completo com todas as
        disciplinas ou o relatório parcial com as disciplinas exibidas na tela.
      </li>
      <li class="list-group-item">
        <b>Visualizar vagas por turma:</b>
        Clique no número de vagas desta turma, na última coluna da tabela, na linha
        correspondente.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  generateHorariosText,
  generateDocentesText,
  toggleAsideModal,
  conectaFiltroPerfisEDisciplinas,
  conectaFiltrosSemestresEPeriodos,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ModalVagas from "./ModalVagas";

export default {
  name: "PlanoDepartamental",
  mixins: [
    toggleItemInArray,
    generateHorariosText,
    generateDocentesText,
    toggleAsideModal,
    conectaFiltroPerfisEDisciplinas,
    conectaFiltrosSemestresEPeriodos,
  ],
  components: {
    ModalRelatorio,
    ModalFiltros,
    ModalAjuda,
    InputSearch,
    ModalVagas,
  },
  data() {
    return {
      turmaClicked: null,
      searchDisciplinas: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      ordenacaoModal: {
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
      },
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
            this.filtroPerfis.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.filtroSemestres.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [
            ...this.$_.orderBy(this.filtroPeriodos.selecionados, "id"),
          ];
          this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    handleClickInTurmaVaga(turma) {
      this.turmaClicked = turma;
      this.$refs.modalVagas.open();
    },
    getVagasByTurmaId(turmaId) {
      const pedidosInCurrentTurma = this.Pedidos[turmaId];

      return this.$_.reduce(
        pedidosInCurrentTurma,
        (sum, pedido) =>
          sum + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas,
        0
      );
    },
    pdf(completo) {
      let disciplinasSelecionadas = completo
        ? this.DisciplinasDCCInPerfis
        : this.DisciplinasInTurmasFiltered;

      pdfs.pdfRelatorioDisciplinas({
        disciplinasSelecionadas,
        plano: this.$_.find(this.AllPlanos, [
          "id",
          parseInt(localStorage.getItem("Plano")),
        ]),
      });
    },
  },

  computed: {
    ...mapGetters([
      "TurmasInDisciplinasPerfis",
      "DisciplinasDCCInPerfis",
      "PerfisDCC",
      "AllPlanos",
      "Pedidos",
    ]),

    DisciplinasInTurmasOrdered() {
      return this.$_.orderBy(
        this.DisciplinasInTurmasSomatorios,
        ["periodo", this.ordenacaoMain.disciplinas.order],
        ["asc", this.ordenacaoMain.disciplinas.type]
      );
    },
    DisciplinasInTurmasSomatorios() {
      return this.$_.map(this.DisciplinasInTurmasFiltered, (disciplina) => {
        const turmas = [];
        let somatorioVagas = 0;
        let somatorioCreditos = 0;

        this.$_.forEach(disciplina.turmas, (turma) => {
          if (turma.Disciplina === disciplina.id) {
            const vagasDaTurma = this.getVagasByTurmaId(turma.id);
            somatorioCreditos += turma.disciplina.creditoTotal;
            somatorioVagas += vagasDaTurma;

            turmas.push({
              ...turma,
              vagas: vagasDaTurma,
            });
          }
        });

        return {
          ...disciplina,
          turmas,
          somatorioCreditos,
          somatorioVagas,
        };
      });
    },
    DisciplinasInTurmasFiltered() {
      const filteredByDisciplinas = this.$_.filter(
        this.DisciplinasInTurmas,
        (disciplina) =>
          this.$_.some(this.filtroDisciplinas.ativados, ["id", disciplina.id])
      );

      const filteredByPeriodos = [];
      this.$_.forEach(filteredByDisciplinas, (disciplina) => {
        const turmasFiltred = this.$_.filter(disciplina.turmas, (turma) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
        );

        if (turmasFiltred.length) {
          filteredByPeriodos.push({
            ...disciplina,
            turmas: turmasFiltred,
          });
        }
      });

      return filteredByPeriodos;
    },
    DisciplinasInTurmas() {
      const turmasOrdered = this.$_.orderBy(
        this.TurmasInDisciplinasPerfis,
        "periodo"
      );

      return this.$_.map(this.DisciplinasDCCInPerfis, (disciplina) => {
        const turmasDaDisciplina = this.$_.filter(turmasOrdered, [
          "Disciplina",
          disciplina.id,
        ]);

        return {
          ...disciplina,
          turmas: turmasDaDisciplina,
        };
      });
    },
    somatoriosTotais() {
      let vagas = 0;
      let creditos = 0;

      this.$_.forEach(this.DisciplinasInTurmasSomatorios, (disciplina) => {
        vagas += disciplina.somatorioVagas;
        creditos += disciplina.somatorioCreditos;
      });

      return {
        creditos,
        vagas,
      };
    },
    // Modals Options
    PerfisOptionsOrdered() {
      return this.$_.orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.$_.map(this.PerfisDCC, (perfil) => {
        const todasDisciplinasDoPerfil = this.$_.filter(this.DisciplinasOptions, [
          "Perfil",
          perfil.id,
        ]);
        const disciplinasSelecionadas = this.$_.filter(
          this.filtroDisciplinas.selecionados,
          ["Perfil", perfil.id]
        );

        let halfChecked = false;
        if (todasDisciplinasDoPerfil.length === disciplinasSelecionadas.length) {
          halfChecked = false;
        } else if (disciplinasSelecionadas.length > 0) {
          halfChecked = true;
        }

        return {
          ...perfil,
          halfChecked,
        };
      });
    },
    DisciplinasOptionsOrdered() {
      return this.$_.orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinas === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return this.$_.filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptions() {
      return this.DisciplinasDCCInPerfis;
    },

    theadTitle() {
      const { ativados } = this.filtroPeriodos;

      if (!ativados.length) {
        return {
          creditos: "",
          vagas: "",
        };
      }

      let periodosAtivados = "";
      this.$_.forEach(ativados, (periodo, index) => {
        periodosAtivados += `${periodo.id}º`;
        if (index !== ativados.length - 1) periodosAtivados += ", ";
      });

      return {
        creditos: `Somatório dos créditos no ${periodosAtivados} período`,
        vagas: `Somatório das vagas no ${periodosAtivados} período`,
      };
    },
    algumPeriodoAtivado() {
      return this.filtroPeriodos.ativados.length !== 0;
    },
  },
};
</script>

<style scoped>
td.td-vagas:hover {
  padding: 0 !important;
  color: var(--light-blue);
  text-decoration: underline;
}
.bg-total-vg {
  background-color: #cecece;
}
.bg-total-vg:hover {
  background-color: #cecece !important;
}
</style>
