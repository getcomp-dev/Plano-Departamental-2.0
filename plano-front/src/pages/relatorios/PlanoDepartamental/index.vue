<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Plano Departamental'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('modalFiltros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>

      <BaseButton
        title="Relátorio"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('modalRelatorio')"
      >
        <i class="fas fa-file-alt"></i>
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('modalAjuda')"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th
            class="clickable t-start"
            style="width: 80px"
            @click="toggleOrder(ordenacaoMain.disciplinas, 'codigo')"
          >
            Cód.
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
          <th style="width: 25px" title="Semestre">
            S.
          </th>
          <th style="width: 35px" title="Turma">
            T.
          </th>
          <th style="width: 200px">
            Docentes
          </th>
          <th style="width: 180px">
            Horário
          </th>

          <th :title="currentThTitle" style="width: 50px">
            Vagas
          </th>
        </template>
        <template #tbody v-if="!tableIsLoading">
          <template v-for="disciplina in DisciplinasInTurmasOrdered">
            <tr class="bg-custom" :key="'trDisc' + disciplina.id">
              <td style="width: 80px" class="t-start">
                {{ disciplina.codigo }}
              </td>
              <td style="width: 350px">
                {{ disciplina.nome }}
              </td>
              <td style="width: 80px" class="less-padding">
                {{ disciplina.perfil.abreviacao }}
              </td>
              <td style="width: 25px"></td>
              <td style="width: 35px"></td>
              <td style="width: 200px"></td>
              <td style="width: 180px"></td>
              <td style="width: 50px">
                {{ getDisciplinaVagasInCurrentSemestres(disciplina) }}
              </td>
            </tr>

            <tr
              v-for="turma in disciplina.turmas"
              :key="'trTurma' + turma.id + disciplina.id"
            >
              <td style="width: 80px" class="t-start"></td>
              <td style="width: 350px"></td>
              <td style="width: 80px"></td>
              <td style="width: 25px">
                {{ turma.periodo }}
              </td>
              <td style="width: 35px" class="less-padding">
                {{ turma.letra }}
              </td>
              <td style="width: 200px">
                {{ getDocentesApelidoByTurma(turma) }}
              </td>

              <td style="width: 180px">
                {{ generateHorarioText(turma.Horario1, turma.Horario2) }}
              </td>

              <td
                v-if="
                  filtroSemestres.ativo == 1 &&
                    (turma.periodo == 1 || turma.periodo == 2)
                "
                @click="handleClickInTurmaVaga(turma)"
                class="clickable p-vagas"
                style="width: 50px"
              >
                {{ vagasTurma(turma, 1) }}
              </td>

              <td
                v-if="
                  filtroSemestres.ativo == 2 &&
                    (turma.periodo == 3 || turma.periodo == 4)
                "
                @click="handleClickInTurmaVaga(turma)"
                class="clickable p-vagas"
                style="width: 50px"
              >
                {{ vagasTurma(turma, 2) }}
              </td>

              <td
                v-if="filtroSemestres.ativo == 3"
                @click="handleClickInTurmaVaga(turma)"
                class="clickable p-vagas"
                style="width: 50px"
              >
                <template v-if="turma.periodo == 1 || turma.periodo == 2">
                  {{ vagasTurma(turma, 1) }}
                </template>
                <template v-else>
                  {{ vagasTurma(turma, 2) }}
                </template>
              </td>
            </tr>
          </template>

          <tr v-show="!DisciplinasInTurmasOrdered.length">
            <td colspan="8" style="width: 1000px">
              <b>Nenhuma disciplina encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
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
              title="Clique para ordenar por código"
              class="t-start clickable"
              style="width: 70px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'codigo')"
            >
              Cód.
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              title="Clique para ordenar por nome"
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
              title="Clique para ordenar por nome"
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
                toggleItemInArray(disciplina, filtroDisciplinas.selecionados)
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroDisciplinas.selecionados"
                  :value="disciplina"
                />
              </td>
              <td style="width: 70px" class="t-start">
                {{ disciplina.codigo }}
              </td>
              <td style="width: 270px" class="t-start">
                {{ disciplina.nome }}
              </td>
              <td style="width: 85px" class="t-start">
                {{ disciplina.perfil.abreviacao }}
              </td>
            </tr>
            <tr v-show="!DisciplinasOrderedModal.length">
              <td style="width:450px">
                NENHUMA DISCIPLINA ENCONTRADA.
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
            <th class="t-start clickable" style="width: 425px">
              Semestre Letivo
            </th>
          </template>
          <template #tbody>
            <tr @click="filtroSemestres.primeiro = !filtroSemestres.primeiro">
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.primeiro"
                />
              </td>
              <td style="width: 425px" class="t-start">
                PRIMEIRO
              </td>
            </tr>
            <tr @click="filtroSemestres.segundo = !filtroSemestres.segundo">
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="filtroSemestres.segundo"
                />
              </td>
              <td style="width: 425px" class="t-start">SEGUNDO</td>
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
              <td style="width: 425px" class="t-start">
                {{ perfil.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <BaseModal
      ref="modalVagas"
      :classes="'modal-vagas'"
      :modalOptions="{
        type: 'editVagas',
        title: 'Vagas',
      }"
    >
      <template #modal-body>
        <template v-if="turmaSelecionada">
          <div class="vagas-header">
            <h6 class="vagas-title">
              {{
                getDisciplinaByTurma(turmaSelecionada).codigo +
                  " - " +
                  getDisciplinaByTurma(turmaSelecionada).nome
              }}
            </h6>
            <div class="input-form">
              <label for="selectTurma" class="mr-2">Turma: </label>
              <select
                id="selectTurma"
                class="form-control"
                style="width: 50px !important;"
                v-model="turmaSelecionada"
              >
                <option
                  v-for="turma in getTurmasByDisciplinaInSemestre(
                    getDisciplinaByTurma(turmaSelecionada),
                    turmaSelecionada.periodo === 1 ||
                      turmaSelecionada.periodo === 2
                      ? 1
                      : 2
                  )"
                  :key="'selectModalVagas' + turma.id"
                  :value="turma"
                  >{{ turma.letra }}</option
                >
              </select>
            </div>
          </div>
          <div class="div-table">
            <BaseTable :type="'modal'">
              <template #thead>
                <th
                  class="clickable t-start"
                  style="width: 55px"
                  title="Código"
                  @click="toggleOrder(ordenacaoModal.vagas, 'codigo')"
                >
                  Cód.
                  <i
                    :class="setIconByOrder(ordenacaoModal.vagas, 'codigo')"
                  ></i>
                </th>
                <th
                  class="clickable t-start"
                  style="width: 300px"
                  @click="toggleOrder(ordenacaoModal.vagas, 'nome')"
                >
                  Nome
                  <i :class="setIconByOrder(ordenacaoModal.vagas, 'nome')"></i>
                </th>

                <th
                  class="clickable t-start less-padding"
                  style="width: 55px"
                  @click="
                    toggleOrder(
                      ordenacaoModal.vagas,
                      'vagasPeriodizadas',
                      'desc'
                    )
                  "
                  title="Clique para ordenar por vagas da grade"
                >
                  Grade
                  <i
                    :class="
                      setIconByOrder(ordenacaoModal.vagas, 'vagasPeriodizadas')
                    "
                  ></i>
                </th>
                <th
                  class="clickable less-padding"
                  style="width: 55px"
                  @click="
                    toggleOrder(
                      ordenacaoModal.vagas,
                      'vagasNaoPeriodizadas',
                      'desc'
                    )
                  "
                  title="Clique para ordenar por vagas extras"
                >
                  Extra
                  <i
                    :class="
                      setIconByOrder(
                        ordenacaoModal.vagas,
                        'vagasNaoPeriodizadas'
                      )
                    "
                  ></i>
                </th>
                <th
                  class="clickable t-start less-padding"
                  style="width: 55px"
                  @click="
                    toggleOrder(ordenacaoModal.vagas, 'vagasTotais', 'desc')
                  "
                  title="Clique para ordenar por vagas extras"
                >
                  Total
                  <i
                    :class="setIconByOrder(ordenacaoModal.vagas, 'vagasTotais')"
                  ></i>
                </th>
              </template>
              <template #tbody>
                <tr
                  v-for="p in VagasTurmaSelecionada"
                  :key="'vaga' + p.Curso + '-' + p.Turma"
                >
                  <td style="width: 55px" class="t-start">
                    {{ getCursoByPedido(p).codigo }}
                  </td>
                  <td style="width: 300px" class="t-start">
                    {{ getCursoByPedido(p).nome }}
                  </td>
                  <td style="width: 55px">
                    {{ p.vagasPeriodizadas }}
                  </td>
                  <td style="width: 55px">
                    {{ p.vagasNaoPeriodizadas }}
                  </td>
                  <td style="width: 55px">
                    {{ p.vagasPeriodizadas + p.vagasNaoPeriodizadas }}
                  </td>
                </tr>
              </template>
            </BaseTable>
          </div>
        </template>
      </template>
    </BaseModal>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
        <i class="fas fa-list-ul icon-gray"></i> no cabeçalho da página e na
        janela que será aberta utilize as abas para navegar entre os tipos de
        filtros. Marque em suas respectivas tabelas quais informações deseja
        visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Para gerar relatório de turmas das disciplinas:</b> Clique no ícone
        relatório <i class="fas fa-file-alt icon-gray"></i> selecione se deseja
        gerar o relatório completo com todos as disciplinas, ou apenas o
        relatório parcial com as disciplinas que estão selecionados no momento.
      </li>
      <li class="list-group-item">
        <b>Para visualizar vagas das turma:</b>
        Clique no número de vagas da turma, presente na ultima coluna da tabela,
        para visualizar a alocação das vagas por cursos.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleOrdination,
  tableLoading,
} from "@/common/mixins";
import { InputSearch, PageHeader } from "@/components/ui";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import { mapGetters } from "vuex";

export default {
  name: "PlanoDepartamental",
  mixins: [toggleItemInArray, toggleOrdination, tableLoading],
  components: {
    ModalRelatorio,
    ModalFiltros,
    ModalAjuda,
    PageHeader,
    InputSearch,
  },
  data() {
    return {
      turmaSelecionada: null,
      searchDisciplinas: "",
      asideModaisRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      ordenacaoModal: {
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        vagas: { order: "vagasTotais", type: "desc" },
      },
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [
              ...this.$store.state.perfil.Perfis,
            ];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [
              ...this.DisciplinasDCCInPerfis,
            ];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.setTableLoadingState(true);
          this.setSemestreAtivo();
          this.filtroDisciplinas.ativados = [
            ...this.filtroDisciplinas.selecionados,
          ];
          this.setTableLoadingState(false);
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
  },

  methods: {
    openAsideModal(modalRef) {
      this.$_.forEach(this.asideModaisRefs, (ref) => {
        if (modalRef === ref) this.$refs[ref].toggle();
        else this.$refs[ref].close();
      });
    },
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    handleClickInTurmaVaga(turma) {
      this.turmaSelecionada = turma;
      this.$refs.modalVagas.open();
    },

    pdf(completo) {
      const disciplinasSelecionadas = completo
        ? this.DisciplinasDCCInPerfis
        : this.filtroDisciplinas.ativados;

      pdfs.pdfRelatorioDisciplinas({
        disciplinasSelecionadas,
      });
    },
    vagasTurma(turma, semestre) {
      if (
        (semestre === 1 && (turma.periodo == 3 || turma.periodo == 4)) ||
        (semestre === 2 && (turma.periodo == 1 || turma.periodo == 2))
      )
        return 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma.id];

      return this.$_.reduce(
        pedidos,
        (sum, pedido) =>
          sum + pedido.vagasPeriodizadas + pedido.vagasNaoPeriodizadas,
        0
      );
    },
    getDisciplinaVagasInCurrentSemestres(disciplina) {
      const turmasFounded = this.$_.filter(this.AllTurmas, {
        Disciplina: disciplina.id,
      });

      return this.$_.reduce(
        turmasFounded,
        (acc, turma) => {
          return acc + this.vagasTurma(turma, this.filtroSemestres.ativo);
        },
        0
      );
    },
    generateHorarioText(horario1Id, horario2Id) {
      const horarios1 = this.$_.find(
        this.AllHorarios,
        (horario) => horario.id === horario1Id
      );
      const horarios2 = this.$_.find(
        this.AllHorarios,
        (horario) => horario.id === horario2Id
      );

      if (horarios1 && !horarios2) return horarios1.horario;
      else if (!horarios1 && horarios2) return horarios2.horario;
      else if (horarios1 && horarios2)
        return `${horarios1.horario} / ${horarios2.horario}`;
      else return "";
    },
    getHorarioById(horarioId) {
      const horariosFounded = this.$_.find(
        this.AllHorarios,
        (horario) => horario.id === horarioId
      );

      if (horariosFounded) return horariosFounded.horario;
      else return "";
    },
    getTurmasByDisciplinaInSemestre(disciplina, semestre) {
      let turmasResultantes = [];

      turmasResultantes = this.$_.filter(this.AllTurmas, (turma) => {
        if (turma.Disciplina === disciplina.id) {
          switch (semestre) {
            case 1:
              return turma.periodo === 1;
            case 2:
              return turma.periodo === 3;
            case 3:
              return true;
            default:
              return false;
          }
        }
        return false;
      });

      return this.$_.orderBy(turmasResultantes, ["periodo", "letra"]);
    },
    getDocentesApelidoByTurma(turma) {
      let d1 = this.$_.find(this.$store.state.docente.Docentes, {
        id: turma.Docente1,
      });
      let d2 = this.$_.find(this.$store.state.docente.Docentes, {
        id: turma.Docente2,
      });
      if (d1 === undefined && d2 === undefined) {
        return "";
      } else if (d2 === undefined) {
        return `${d1.apelido}`;
      } else if (d1 === undefined) {
        return `${d2.apelido}`;
      } else {
        return `${d1.apelido} / ${d2.apelido}`;
      }
    },
    getCursoByPedido(pedido) {
      return this.$_.find(this.$store.state.curso.Cursos, { id: pedido.Curso });
    },
    getDisciplinaByTurma(turma) {
      return this.$_.find(this.$store.state.disciplina.Disciplinas, {
        id: turma.Disciplina,
      });
    },
  },

  computed: {
    ...mapGetters(["AllTurmas", "DisciplinasDCCInPerfis", "AllHorarios"]),

    DisciplinasInTurmasOrdered() {
      return this.$_.orderBy(
        this.DisciplinasInTurmas,
        this.ordenacaoMain.disciplinas.order,
        this.ordenacaoMain.disciplinas.type
      );
    },
    DisciplinasInTurmas() {
      const turmasResultantes = [];

      this.$_.forEach(this.filtroDisciplinas.ativados, (disciplina) => {
        const turmas = this.getTurmasByDisciplinaInSemestre(
          disciplina,
          this.filtroSemestres.ativo
        );
        //Para apenas mostrar disciplinas que possuem turmas
        if (turmas.length)
          turmasResultantes.push({
            ...disciplina,
            turmas,
          });
      });

      return turmasResultantes;
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
    DisciplinasOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    PerfisOrderedModal() {
      return this.$_.orderBy(
        this.$store.state.perfil.Perfis,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    VagasTurmaSelecionada() {
      if (this.turmaSelecionada === null) return [];

      return this.$_.orderBy(
        this.$_.filter(
          this.$store.state.pedido.Pedidos[this.turmaSelecionada.id],
          function(p) {
            return p.vagasPeriodizadas > 0 || p.vagasNaoPeriodizadas > 0;
          }
        ),
        (p) => {
          switch (this.ordenacaoModal.vagas.order) {
            case "codigo":
              return this.getCursoByPedido(p).codigo;
            case "nome":
              return this.getCursoByPedido(p).nome;
            case "vagasPeriodizadas":
              return p.vagasPeriodizadas;
            case "vagasNaoPeriodizadas":
              return p.vagasNaoPeriodizadas;
            case "vagasTotais":
              return p.vagasPeriodizadas + p.vagasNaoPeriodizadas;
            default:
              return this.getCursoByPedido(p).codigo;
          }
        },
        this.ordenacaoModal.vagas.type
      );
    },
    currentThTitle() {
      const { ativo } = this.filtroSemestres;

      if (ativo === 1) return "Vagas do 1º semestre";
      else if (ativo === 2) return "Vagas do 2º semestre";
      else return "Vagas do 1º e 2º semestres";
    },
  },
  watch: {
    filtroPerfis: {
      handler(perfis) {
        this.modalFiltrosCallbacks.selectNone.Disciplinas();
        const disciplinasResultantes = [];

        this.$_.forEach(this.DisciplinasDCCInPerfis, (disciplina) => {
          const perfilFounded = this.$_.find(
            perfis.selecionados,
            (perfil) => perfil.id === disciplina.Perfil
          );

          if (perfilFounded) disciplinasResultantes.push(disciplina);
        });
        this.filtroDisciplinas.selecionados = [...disciplinasResultantes];
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.vagas-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.vagas-header .vagas-title {
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  width: 100%;
}
.modal-vagas .modal-table tbody tr td {
  height: 20px !important;
}
.vagas-header .input-form {
  display: flex;
  align-items: center;
}
.input-form label {
  margin: 0;
}

.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 2px 5px !important;
  text-align: start;
}

.p-vagas:hover {
  color: var(--light-blue);
  text-decoration: underline;
}

.modal-content .modal-header {
  padding: 0 !important;
}
</style>
