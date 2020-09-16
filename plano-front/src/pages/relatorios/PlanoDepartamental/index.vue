<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Plano Departamental'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>

      <BaseButton
        title="Relátorio"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('relatorio')"
      >
        <font-awesome-icon :icon="['fas', 'file-alt']" />
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="toggleAsideModal('ajuda')"
      >
        <font-awesome-icon :icon="['fas', 'question']" />
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th
            class="clickable"
            style="width: 80px"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'codigo')"
          >
            Código
            <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'codigo')"></i>
          </th>
          <th
            class="t-start clickable"
            style="width: 350px;"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'nome')"
          >
            Nome
            <i :class="setIconByOrder(ordenacaoMain.disciplinas, 'nome')"></i>
          </th>
          <th
            class="clickable"
            style="width: 80px"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'perfil.abreviacao')"
          >
            Perfil
            <i
              :class="
                setIconByOrder(ordenacaoMain.disciplinas, 'perfil.abreviacao')
              "
            ></i>
          </th>
          <th style="width: 35px" title="Créditos">C.</th>
          <th style="width: 25px" title="Período letivo">P.</th>
          <th style="width: 35px" title="Turma">T.</th>
          <th style="width: 150px">Docentes</th>
          <th style="width: 130px" class="less-padding">Horário</th>

          <template v-if="anyPeriodoIsActived">
            <th
              :title="currentTheadTitle.creditos"
              style="width: 45px"
              class="less-padding"
            >
              SC
            </th>
            <th
              :title="currentTheadTitle.vagas"
              style="width: 45px"
              class="less-padding"
            >
              SV
            </th>
          </template>
        </template>

        <template #tbody>
          <tr v-show="DisciplinasInTurmasOrdered.length" class="bg-total-vg">
            <td style="width: 80px"></td>
            <td style="width: 350px" class="upper-case">Totais</td>
            <td style="width: 80px"></td>
            <td style="width: 35px"></td>
            <td style="width: 25px"></td>
            <td style="width: 35px"></td>
            <td style="width: 150px"></td>
            <td style="width: 130px" class="less-padding"></td>
            <td style="width: 45px">
              {{ somatoriosTotais.creditos }}
            </td>
            <td style="width: 45px">
              {{ somatoriosTotais.vagas }}
            </td>
          </tr>

          <template v-for="disciplina in DisciplinasInTurmasOrdered">
            <tr class="bg-custom" :key="'trDisc' + disciplina.id">
              <td style="width: 80px">{{ disciplina.codigo }}</td>
              <td style="width: 350px">{{ disciplina.nome }}</td>
              <td style="width: 80px" class="less-padding">
                {{ disciplina.perfil.abreviacao }}
              </td>
              <td style="width: 35px">{{ disciplina.creditoTotal }}</td>
              <td style="width: 25px"></td>
              <td style="width: 35px"></td>
              <td style="width: 150px"></td>
              <td style="width: 130px" class="less-padding"></td>
              <td style="width: 45px">
                {{ disciplina.somatorioCreditos }}
              </td>
              <td style="width: 45px">
                {{ disciplina.somatorioVagas }}
              </td>
            </tr>

            <tr
              v-for="turma in disciplina.Turmas"
              :key="'trTurma' + turma.id + disciplina.id"
            >
              <td style="width: 80px"></td>
              <td style="width: 350px"></td>
              <td style="width: 80px"></td>
              <td style="width: 35px"></td>
              <td style="width: 25px">{{ turma.periodo }}</td>
              <td style="width: 35px" class="less-padding">
                {{ turma.letra }}
              </td>
              <td style="width: 150px">
                {{ generateDocentesText(turma.Docente1, turma.Docente2) }}
              </td>
              <td style="width: 130px" class="less-padding">
                {{ generateHorariosText(turma.Horario1, turma.Horario2) }}
              </td>
              <td style="width: 45px"></td>

              <td
                v-if="anyPeriodoIsActived"
                @click="handleClickInTurmaVaga(turma)"
                class="td-vagas clickable"
                style="width: 45px"
              >
                {{ turma.vagas }}
              </td>
              <td v-else style="width: 45px"></td>
            </tr>
          </template>

          <tr v-show="!DisciplinasInTurmasOrdered.length">
            <td colspan="7" style="width: 885px">
              <b>Nenhuma disciplina encontrada.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" /> para selecioná-las.
            </td>
            <template v-if="anyPeriodoIsActived">
              <td style="width: 45px" class="borderX-0"></td>
              <td style="width: 45px" class="borderX-0"></td>
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
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Disciplinas'"
          :type="'modal'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchDisciplinas"
              placeholder="Pesquise o nome ou código de uma disciplina..."
            />
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              title="Código"
              class="clickable"
              style="width: 70px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'codigo')"
            >
              Cód.
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 270px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'nome')"
            >
              Nome
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'nome')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 85px"
              @click="
                toggleOrder(ordenacaoModal.disciplinas, 'perfil.abreviacao')
              "
            >
              Perfil
              <i
                :class="
                  setIconByOrder(
                    ordenacaoModal.disciplinas,
                    'perfil.abreviacao'
                  )
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasOrderedModal"
              :key="'MdDisciplinas' + disciplina.id"
              @click="
                toggleItemInArray(disciplina.id, filtroDisciplinas.selecionados)
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroDisciplinas.selecionados"
                  :value="disciplina.id"
                />
              </td>
              <td style="width: 70px">{{ disciplina.codigo }}</td>
              <td style="width: 270px" class="t-start">
                {{ disciplina.nome }}
              </td>
              <td style="width: 85px" class="t-start">
                {{ disciplina.perfil.abreviacao }}
              </td>
            </tr>
            <tr v-show="!DisciplinasOrderedModal.length">
              <td style="width:450px">NENHUMA DISCIPLINA ENCONTRADA.</td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          :type="'modal'"
          v-show="modalFiltrosTabs.current === 'Perfis'"
        >
          <template #thead>
            <th style="width: 25px;"></th>
            <th
              @click="toggleOrder(ordenacaoModal.perfis, 'nome')"
              class="clickable t-start"
              style="width: 425px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoModal.perfis, 'nome')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="perfil in PerfisOrderedModal"
              :key="'perfilId' + perfil.id"
              @click="toggleItemInArray(perfil, filtroPerfis.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  v-model="filtroPerfis.selecionados"
                  :value="perfil"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px" class="t-start">{{ perfil.nome }}</td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          type="modal"
          v-show="modalFiltrosTabs.current === 'Períodos'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">Periodos Letivo</th>
          </template>
          <template #tbody>
            <tr
              v-for="periodo in PeriodosLetivos"
              :key="periodo.id + periodo.nome"
              @click="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="periodo"
                  v-model="filtroPeriodos.selecionados"
                  @click.stop="selecionaPeriodo(periodo)"
                />
              </td>
              <td style="width: 425px" class="t-start upper-case">
                {{ periodo.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          v-show="modalFiltrosTabs.current === 'Semestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start" style="width: 425px">
              Semestre Letivo
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="semestre in SemestresLetivos"
              :key="semestre.id + semestre.nome"
              @click="selecionaSemestre(semestre)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="semestre"
                  v-model="filtroSemestres.selecionados"
                  @click.stop="selecionaSemestre(semestre)"
                />
              </td>
              <td style="width: 425px" class="t-start upper-case">
                {{ semestre.nome }}
              </td>
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
        Clique no número de vagas desta turma, na última coluna da tabela, na
        linha correspondente.
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
  toggleOrdination,
  generateHorariosText,
  generateDocentesText,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ModalVagas from "./ModalVagas";

export default {
  name: "PlanoDepartamental",
  mixins: [
    toggleItemInArray,
    toggleOrdination,
    generateHorariosText,
    generateDocentesText,
    toggleAsideModal,
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
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [...this.PerfisDCC];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [
              ...this.$_.map(
                this.DisciplinasDCCInPerfis,
                (disciplina) => disciplina.id
              ),
            ];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosLetivos];
            this.conectaPeriodoEmSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresLetivos];
            this.conectaSemestreEmPeriodo();
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.conectaPeriodoEmSemestre();
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.conectaSemestreEmPeriodo();
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroDisciplinas.ativados = [
            ...this.filtroDisciplinas.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.filtroPeriodos.selecionados = this.$_.filter(
      this.PeriodosLetivos,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    handleClickInTurmaVaga(turma) {
      this.turmaClicked = turma;
      this.$refs.modalVagas.open();
    },
    pdf(completo) {
      pdfs.pdfRelatorioDisciplinas({
        disciplinasSelecionadas: completo
          ? this.DisciplinasDCCInPerfis
          : this.DisciplinasInTurmasFiltredByDisciplina,
        plano: this.$_.find(this.$store.state.plano.Plano, {
          id: parseInt(localStorage.getItem("Plano")),
        }),
      });
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
  },

  computed: {
    ...mapGetters([
      "TurmasInDisciplinasPerfis",
      "DisciplinasDCCInPerfis",
      "PerfisDCC",
      "Pedidos",
      "PeriodosLetivos",
      "SemestresLetivos",
    ]),

    DisciplinasInTurmasOrdered() {
      return this.$_.orderBy(
        this.DisciplinasInTurmasSomatorios,
        ["periodo", this.ordenacaoMain.disciplinas.order],
        ["asc", this.ordenacaoMain.disciplinas.type]
      );
    },
    DisciplinasInTurmasSomatorios() {
      return this.$_.map(
        this.DisciplinasInTurmasFiltredByDisciplina,
        (disciplina) => {
          const Turmas = [];
          let somatorioCreditos = 0;
          let somatorioVagas = 0;

          this.$_.forEach(disciplina.Turmas, (turma) => {
            if (turma.Disciplina === disciplina.id) {
              const turmaVagas = this.getVagasByTurmaId(turma.id);
              somatorioCreditos += turma.disciplina.creditoTotal;
              somatorioVagas += turmaVagas;

              Turmas.push({
                ...turma,
                vagas: turmaVagas,
              });
            }
          });

          return {
            ...disciplina,
            Turmas,
            somatorioCreditos,
            somatorioVagas,
          };
        }
      );
    },
    DisciplinasInTurmasFiltredByDisciplina() {
      return this.$_.filter(
        this.DisciplinasInTurmasFiltredByPeriodo,
        (disciplina) =>
          this.$_.some(
            this.filtroDisciplinas.ativados,
            (disciplinaId) => disciplinaId === disciplina.id
          )
      );
    },
    DisciplinasInTurmasFiltredByPeriodo() {
      const disciplinasResultantes = [];

      this.$_.forEach(this.DisciplinasInTurmas, (disciplina) => {
        const TurmasFiltred = this.$_.filter(disciplina.Turmas, (turma) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
        );

        if (TurmasFiltred.length) {
          disciplinasResultantes.push({
            ...disciplina,
            Turmas: TurmasFiltred,
          });
        }
      });
      return disciplinasResultantes;
    },
    DisciplinasInTurmas() {
      const turmasOrdered = this.$_.orderBy(
        this.TurmasInDisciplinasPerfis,
        "periodo"
      );
      return this.$_.map(this.DisciplinasDCCInPerfis, (disciplina) => {
        const Turmas = this.$_.filter(turmasOrdered, [
          "Disciplina",
          disciplina.id,
        ]);

        return {
          ...disciplina,
          Turmas,
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

    DisciplinasOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasFiltredModal() {
      if (this.searchDisciplinas === "") return this.DisciplinasDCCInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return this.$_.filter(this.DisciplinasDCCInPerfis, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    PerfisOrderedModal() {
      return this.$_.orderBy(
        this.PerfisDCC,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },

    currentTheadTitle() {
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
    allPeriodoIsActived() {
      return this.filtroPeriodos.ativados.length === 4;
    },
    anyPeriodoIsActived() {
      return this.filtroPeriodos.ativados.length !== 0;
    },
  },

  watch: {
    filtroPerfis: {
      handler(filtroPerfis) {
        this.modalFiltrosCallbacks.selectNone.Disciplinas();
        const disciplinasResultantes = [];

        this.$_.forEach(this.DisciplinasDCCInPerfis, (disciplina) => {
          const perfilFounded = this.$_.some(filtroPerfis.selecionados, [
            "id",
            disciplina.Perfil,
          ]);

          if (perfilFounded) disciplinasResultantes.push(disciplina.id);
        });

        this.filtroDisciplinas.selecionados = [...disciplinasResultantes];
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.main-table td {
  padding: 0 2px !important;
}
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
