<template>
  <div class="main-component row p-0">
    <PageTitle :title="'Plano Departamental'">
      <template #aside>
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
      </template>
    </PageTitle>

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
            @click="toggleOrder(ordenacaoMain.disciplinas, 'perfilAbreviacao')"
          >
            Perfil
            <i
              :class="
                setIconByOrder(ordenacaoMain.disciplinas, 'perfilAbreviacao')
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
        <template #tbody>
          <template v-for="disciplina in DisciplinasOrderedMain">
            <template
              v-for="(turma, index) in getTurmasByDisciplina(
                disciplina,
                filtroSemestres.ativo
              )"
            >
              <tr
                v-if="index === 0"
                class="bg-custom"
                :key="'disciplina' + turma.id + disciplina.id"
              >
                <td style="width: 80px" class="t-start">
                  {{ disciplina.codigo }}
                </td>
                <td style="width: 350px">
                  {{ disciplina.nome }}
                </td>
                <td style="width: 80px" class="less-padding">
                  {{ disciplina.perfilAbreviacao }}
                </td>
                <td style="width: 25px"></td>
                <td style="width: 35px"></td>
                <td style="width: 200px"></td>
                <td style="width: 180px"></td>
                <td style="width: 50px">
                  {{ getDisciplinaVagasInCurrentSemestres(disciplina) }}
                </td>
              </tr>
              <tr :key="'turmasTr' + turma.id">
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
                  {{ docentes(turma) }}
                </td>

                <td style="width: 180px">
                  {{ getHorarioById(turma.Horario1) }}

                  {{
                    getHorarioById(turma.Horario2)
                      ? ` / ${getHorarioById(turma.Horario2)}`
                      : ""
                  }}
                </td>

                <td
                  v-if="
                    filtroSemestres.ativo == 1 &&
                      (turma.periodo == 1 || turma.periodo == 2)
                  "
                  @click="selecionaTurma(turma)"
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
                  @click="selecionaTurma(turma)"
                  class="clickable p-vagas"
                  style="width: 50px"
                >
                  {{ vagasTurma(turma, 2) }}
                </td>
                <td
                  v-if="filtroSemestres.ativo == 3"
                  @click="selecionaTurma(turma)"
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
          </template>

          <tr v-show="!DisciplinasOrderedMain.length">
            <td colspan="8" style="width: 1000px">
              <b>Nenhuma disciplina encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <!-- MODAL DE AJUDA -->
    <BaseModal
      ref="modalAjuda"
      :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
    >
      <template #modal-body>
        <ul class="list-ajuda list-group">
          <li class="list-group-item">
            <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
            <i class="fas fa-list-ul cancelbtn"></i> no cabeçalho da página e na
            janela que será aberta utilize as abas para navegar entre os tipos
            de filtros. Marque em suas respectivas tabelas quais informações
            deseja visualizar, e para finalizar clique no botão OK.
          </li>
          <li class="list-group-item">
            <b>Para gerar relatório de turmas das disciplinas:</b> Clique no
            ícone relatório <i class="fas fa-file-alt cancelbtn"></i> selecione
            se deseja gerar o relatório completo com todos as disciplinas, ou
            apenas o relatório parcial com as disciplinas que estão selecionados
            no momento.
          </li>
          <li class="list-group-item">
            <b>Para visualizar vagas das turma:</b>
            Clique no número de vagas da turma, presente na ultima coluna da
            tabela, para visualizar a alocação das vagas por cursos.
          </li>
        </ul>
      </template>
    </BaseModal>

    <!-- Modals FILTROS -->
    <BaseModal
      ref="modalFiltros"
      :modalOptions="{
        type: 'filtros',
        title: 'Filtros',
        hasFooter: true,
      }"
      :hasFooter="true"
      @btn-ok="btnOkFiltros()"
      @select-all="modalSelectAll[tabAtivaModal]"
      @select-none="modalSelectNone[tabAtivaModal]"
    >
      <template #modal-body>
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Perfis', 'Disciplinas', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable
            v-show="tabAtivaModal === 'Disciplinas'"
            :type="'modal'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise o nome ou código de uma disciplina..."
                v-model="searchDisciplinas"
              />
              <button @click="searchDisciplinas = ''" class="btn btn-search">
                <i class="fas fa-times"></i>
              </button>
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
                  toggleOrder(ordenacaoModal.disciplinas, 'perfilAbreviacao')
                "
              >
                Perfil
                <i
                  :class="
                    setIconByOrder(
                      ordenacaoModal.disciplinas,
                      'perfilAbreviacao'
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
                  {{ disciplina.perfilAbreviacao }}
                </td>
              </tr>
              <tr v-show="!DisciplinasOrderedModal.length">
                <td style="width:450px">
                  NENHUMA DISCIPLINA ENCONTRADA.
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
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

          <BaseTable :type="'modal'" v-show="tabAtivaModal === 'Perfis'">
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
      </template>
    </BaseModal>

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
                disciplina(turmaSelecionada).codigo +
                  " - " +
                  disciplina(turmaSelecionada).nome
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
                  v-for="turma in getTurmasByDisciplina(
                    disciplina(turmaSelecionada),
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
                    {{ curso(p).codigo }}
                  </td>
                  <td style="width: 300px" class="t-start">
                    {{ curso(p).nome }}
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
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
import { toggleItemInArray, toggleOrdination } from "@/mixins/index.js";
import {
  BaseButton,
  BaseModal,
  BaseTable,
  PageTitle,
  NavTab,
  ModalRelatorio,
} from "@/components/index.js";

export default {
  name: "DashboardRelatorioDisciplinas",
  mixins: [toggleItemInArray, toggleOrdination],
  components: {
    BaseModal,
    BaseTable,
    PageTitle,
    NavTab,
    BaseButton,
    ModalRelatorio,
  },
  data() {
    return {
      turmaSelecionada: undefined,
      tabAtivaModal: "Perfis",
      searchDisciplinas: "",
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
      modalSelectAll: {
        Perfis: () => {
          this.filtroPerfis.selecionados = [...this.Perfis];
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
      modalSelectNone: {
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
      ordenacaoModal: {
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        vagas: { order: "vagasTotais", type: "desc" },
      },
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      // ordenacaoModal.vagas: { order: "codigo", type: "asc" },
      asideModaisRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
    };
  },
  mounted() {
    this.modalSelectAll.Disciplinas();
    this.modalSelectAll.Perfis();
    this.btnOkFiltros();
  },
  methods: {
    openAsideModal(modalRef) {
      this.asideModaisRefs.forEach((ref) => {
        if (modalRef === ref) this.$refs[ref].toggle();
        else this.$refs[ref].close();
      });
    },
    btnOkFiltros() {
      this.setSemestreAtivo();
      this.filtroDisciplinas.ativados = [
        ...this.filtroDisciplinas.selecionados,
      ];
    },
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    pdf(completo) {
      if (completo) {
        pdfs.pdfRelatorioDisciplinas({
          disciplinasSelecionadas: this.DisciplinasDCC,
        });
      } else {
        pdfs.pdfRelatorioDisciplinas({
          disciplinasSelecionadas: this.filtroDisciplinas.ativados,
        });
      }
    },
    vagasTurma(turma, semestre) {
      if (
        (semestre === 1 && (turma.periodo == 3 || turma.periodo == 4)) ||
        (semestre === 2 && (turma.periodo == 1 || turma.periodo == 2))
      )
        return 0;
      let pedidos = this.$store.state.pedido.Pedidos[turma.id];
      let vagasP = 0;
      let vagasNP = 0;
      pedidos.forEach((p) => {
        vagasP += p.vagasPeriodizadas;
        vagasNP += p.vagasNaoPeriodizadas;
      });
      return vagasP + vagasNP;
    },
    getDisciplinaVagasInCurrentSemestres(disciplina) {
      const turmasFounded = _.filter(this.$store.state.turma.Turmas, {
        Disciplina: disciplina.id,
      });

      return _.reduce(
        turmasFounded,
        (acc, turma) => {
          return acc + this.vagasTurma(turma, this.filtroSemestres.ativo);
        },
        0
      );
    },
    getHorarioById(horarioId) {
      const horariosFounded = _.find(
        this.Horarios,
        (horario) => horario.id === horarioId
      );

      if (horariosFounded) return horariosFounded.horario;
      else return "";
    },
    getTurmasByDisciplina(disciplina, semestre) {
      return _.orderBy(
        _.filter(this.$store.state.turma.Turmas, (turma) => {
          return (
            turma.Disciplina === disciplina.id &&
            (semestre === 1
              ? turma.periodo === 1 || turma.periodo === 2
              : semestre === 2
              ? turma.periodo === 3 || turma.periodo === 4
              : true)
          );
        }),
        ["periodo", "letra"]
      );
    },
    docentes(turma) {
      let d1 = _.find(this.$store.state.docente.Docentes, {
        id: turma.Docente1,
      });
      let d2 = _.find(this.$store.state.docente.Docentes, {
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
    selecionaTurma(turma) {
      this.turmaSelecionada = turma;
      this.$refs.modalVagas.open();
      // this.$refs.VagasModal.show();
    },
    curso(pedido) {
      return _.find(this.$store.state.curso.Cursos, { id: pedido.Curso });
    },
    disciplina(turma) {
      return _.find(this.$store.state.disciplina.Disciplinas, {
        id: turma.Disciplina,
      });
    },
    closeModalVagas() {
      this.$refs.VagasModal.hide();
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
  },

  computed: {
    currentThTitle() {
      const { ativo } = this.filtroSemestres;

      if (ativo === 1) return "Vagas do 1º semestre";
      else if (ativo === 2) return "Vagas do 2º semestre";
      else return "Vagas do 1º e 2º semestres";
    },
    //Disciplinas da Main Table ordenadas
    DisciplinasOrderedMain() {
      return _.orderBy(
        this.filtroDisciplinas.ativados,
        this.ordenacaoMain.disciplinas.order,
        this.ordenacaoMain.disciplinas.type
      );
    },

    DisciplinasFiltredModal() {
      if (this.searchDisciplinas === "") return this.DisciplinasDCCInPerfis;

      const searchNormalized = this.normalizeText(this.searchDisciplinas);

      return _.filter(this.DisciplinasDCCInPerfis, (disciplina) => {
        const disciplinaNome = this.normalizeText(disciplina.nome);
        const disciplinaCodigo = this.normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    DisciplinasOrderedModal() {
      return _.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    //Todas disciplinas do DCC
    DisciplinasDCC() {
      return _.filter(
        this.$store.state.disciplina.Disciplinas,
        (d) => d.Perfil !== 13 && d.Perfil !== 15
      );
    },
    DisciplinasDCCInPerfis() {
      let disciplinasResultantes = [];
      // this.DisciplinasDCC
      this.DisciplinasDCC.forEach((disciplina) => {
        const perfilFounded = _.find(
          this.Perfis,
          (perfil) => perfil.id === disciplina.Perfil
        );

        if (perfilFounded) {
          disciplinasResultantes.push({
            ...disciplina,
            perfilAbreviacao: perfilFounded.abreviacao,
            perfilCor: perfilFounded.cor,
          });
        }
      });
      return disciplinasResultantes;
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    PerfisOrderedModal() {
      return _.orderBy(
        this.Perfis,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    VagasTurmaSelecionada() {
      if (this.turmaSelecionada === undefined) return [];

      return _.orderBy(
        _.filter(
          this.$store.state.pedido.Pedidos[this.turmaSelecionada.id],
          function(p) {
            return p.vagasPeriodizadas > 0 || p.vagasNaoPeriodizadas > 0;
          }
        ),
        (p) => {
          switch (this.ordenacaoModal.vagas.order) {
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
        this.ordenacaoModal.vagas.type
      );
    },
    Horarios() {
      return this.$store.state.horario.Horarios;
    },
  },
  watch: {
    filtroPerfis: {
      handler(perfis) {
        this.modalSelectNone.Disciplinas();
        const disciplinasResultantes = [];

        this.DisciplinasDCCInPerfis.forEach((disciplina) => {
          const perfilFounded = _.find(
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
