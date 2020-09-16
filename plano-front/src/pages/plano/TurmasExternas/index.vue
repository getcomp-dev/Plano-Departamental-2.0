<template>
  <div class="main-component row">
    <PageHeader :title="'Graduação - Outros'">
      <BaseButton
        v-show="isAdding"
        title="Salvar"
        :type="'icon'"
        :color="'green'"
        @click="addNovaTurma"
      >
        <font-awesome-icon :icon="['fas', 'check']" />
      </BaseButton>
      <BaseButton
        v-show="!isAdding"
        title="Adicionar"
        :type="'icon'"
        :color="'green'"
        @click="toggleAddRow"
      >
        <font-awesome-icon :icon="['fas', 'plus']" />
      </BaseButton>

      <BaseButton
        v-show="isAdding"
        title="Cancelar"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAddRow"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </BaseButton>

      <BaseButton
        v-show="!isAdding"
        title="Deletar selecionados"
        :type="'icon'"
        :color="'red'"
        @click="openModalDelete"
      >
        <font-awesome-icon :icon="['fas', 'trash']" />
      </BaseButton>

      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
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
          <th style="width: 25px"></th>
          <th style="width: 55px" title="Período letivo">P.</th>
          <th
            style="width: 80px"
            class="clickable"
            @click="toggleOrder(ordenacaoTurmasMain, 'disciplina.codigo')"
            title="Código"
          >
            Cód.
            <i
              :class="setIconByOrder(ordenacaoTurmasMain, 'disciplina.codigo')"
            ></i>
          </th>
          <th
            style="width: 330px"
            class="clickable"
            @click="toggleOrder(ordenacaoTurmasMain, 'disciplina.nome')"
          >
            Disciplina
            <i
              :class="setIconByOrder(ordenacaoTurmasMain, 'disciplina.nome')"
            ></i>
          </th>
          <th style="width: 25px" title="Créditos">C.</th>
          <th style="width: 45px" title="Turma">T.</th>
          <th style="width: 80px">Turno</th>
          <th style="width: 85px">Horário</th>
          <th style="width: 95px">Sala</th>
          <th style="width: 45px" title="Total de vagas">Total</th>
          <th
            style="width:35px"
            v-for="curso in PrincipaisCursosDCC"
            :key="curso.id + curso.nome"
            v-b-popover.hover.bottom="{
              title: curso.nome,
              content: cursoPopoverContent(curso),
            }"
          >
            {{ curso.codigo }}
          </th>
        </template>

        <template #add-row>
          <NovaTurmaExternaRow ref="novaTurmaExternaRow" v-show="isAdding" />
        </template>

        <template #tbody>
          <TurmaExternaRow
            v-for="turma in TurmasExternasOrdered"
            :key="turma.id + turma.letra + turma.Disciplina"
            :turma="turma"
          />

          <tr v-show="!TurmasExternasOrdered.length">
            <td style="width:1005px">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
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
      <BaseTable
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :type="'modal'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDisciplinasModal"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <th style="width: 25px"></th>
          <th
            @click="toggleOrder(ordenacaoDisciplinasModal, 'codigo')"
            class="clickable t-start"
            style="width: 70px"
          >
            Código
            <i :class="setIconByOrder(ordenacaoDisciplinasModal, 'codigo')"></i>
          </th>
          <th
            @click="toggleOrder(ordenacaoDisciplinasModal, 'nome')"
            class="clickable t-start"
            style="width: 295px"
          >
            Nome
            <i :class="setIconByOrder(ordenacaoDisciplinasModal, 'nome')"></i>
          </th>
          <th class="t-start" style="width: 60px">Perfis</th>
        </template>
        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasExternasOrderedModal"
            :key="disciplina.id + disciplina.nome"
            @click="
              toggleItemInArray(disciplina, filtroDisciplinas.selecionadas)
            "
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="filtroDisciplinas.selecionadas"
                :value="disciplina"
              />
            </td>
            <td style="width: 70px" class="t-start">
              {{ disciplina.codigo }}
            </td>
            <td style="width: 295px" class="t-start">
              {{ disciplina.nome }}
            </td>
            <td class="t-start" style="width: 60px">
              {{ disciplina.perfil.nome }}
            </td>
          </tr>
          <tr v-show="DisciplinasExternasOrderedModal.length === 0">
            <td colspan="3" style="width:450px">
              NENHUMA DISCIPLINA ENCONTRADA.
            </td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Períodos'">
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
    </ModalFiltros>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="!!TurmasExternasToDelete.length"
      :hasClearDelete="true"
      @btn-deletar="handleDeleteTurmas"
      @btn-clear="clearTurmasExternasToDelete"
    >
      <li v-if="!TurmasExternasToDelete.length" class="list-group-item">
        Nenhuma turma selecionada.
      </li>
      <li
        v-for="turma in TurmasExternasToDelete"
        class="list-group-item"
        :key="turma.id + turma.letra + turma.periodo"
      >
        <span>
          <b>Periodo:</b>
          {{ turma.periodo }} -
          <b>Turma:</b>
          {{ turma.letra }}
        </span>
        <span>
          <b>Disciplina:</b>
          {{ turma.disciplina.nome }}
        </span>
      </li>
    </ModalDelete>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" /> no
        cabeçalho da página e, na janela que se abrirá, utilize as abas para
        navegar entre os tipos de filtro disponíveis. Marque quais informações
        deseja visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Adicionar turma:</b> Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" /> no
        cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer
        no início da tabela. Note que os campos disciplina e turma são
        obrigatórios. Após preencher os campos, clique no ícone de salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" /> ou de
        cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />.
      </li>
      <li class="list-group-item">
        <b>Deletar turma:</b> Marque a(s) turma(s) que deseja deletar através da
        caixa de seleção na coluna mais à esquerda da tabela. Em seguida, clique
        no ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" /> no
        cabeçalho da página. Confirme a exclusão clicando no botão OK na janela
        que se abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar turma:</b> Basta fazer as alterações necessárias diretamente
        nos campos da tabela. O sistema salvará as modificações automaticamente.
      </li>
      <li class="list-group-item">
        <b>Observações:</b> Em cada coluna de um curso, para cada disciplina,
        existem dois campos de vagas. O campo superior é destinado às vagas de
        grade, e o inferior é referente às vagas para alunos não periodizados.
        Para que uma turma externa apareça na grade horária de um determinado
        curso, na página "Horários", é preciso que pelo menos uma vaga de grade
        seja destinada a este curso.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { normalizeText } from "@/common/utils";
import {
  toggleOrdination,
  toggleItemInArray,
  toggleAsideModal,
  cursoPopoverContent,
  conectaFiltrosSemestresEPeriodos,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalDelete, ModalAjuda, ModalFiltros } from "@/components/modals";
import TurmaExternaRow from "./TurmaExternaRow.vue";
import NovaTurmaExternaRow from "./NovaTurmaExternaRow.vue";

export default {
  name: "DashboardTurmasExternas",
  mixins: [
    toggleOrdination,
    toggleItemInArray,
    toggleAsideModal,
    cursoPopoverContent,
    conectaFiltrosSemestresEPeriodos,
  ],
  components: {
    ModalFiltros,
    ModalAjuda,
    ModalDelete,
    InputSearch,
    TurmaExternaRow,
    NovaTurmaExternaRow,
  },
  data() {
    return {
      isAdding: false,
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      ordenacaoTurmasMain: { order: "disciplina.codigo", type: "asc" },
      ordenacaoDisciplinasModal: { order: "codigo", type: "asc" },
      searchDisciplinasModal: "",
      tabAtivaModal: "Disciplinas",
      modalFiltrosTabs: {
        current: "Disciplinas",
        array: ["Disciplinas", "Períodos", "Semestres"],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        ativados: [],
        selecionados: [],
      },
      filtroDisciplinas: {
        ativadas: [],
        selecionadas: [],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Disciplinas: () => {
            this.filtroDisciplinas.selecionadas = [
              ...this.DisciplinasExternasInPerfis,
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
          Disciplinas: () => {
            this.filtroDisciplinas.selecionadas = [];
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
          this.filtroDisciplinas.ativadas = [
            ...this.filtroDisciplinas.selecionadas,
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
  },
  beforeDestroy() {
    this.clearTurmasExternasToDelete();
  },

  methods: {
    ...mapActions(["deleteTurmasExternas", "clearTurmasExternasToDelete"]),

    toggleAddRow() {
      this.isAdding = !this.isAdding;
    },
    openModalDelete() {
      this.$refs.modalDelete.open();
    },
    addNovaTurma() {
      this.$refs.novaTurmaExternaRow.handleAddNovaTurma();
    },

    async handleDeleteTurmas() {
      try {
        this.setPartialLoading(true);

        await this.deleteTurmasExternas();
      } catch (error) {
        this.pushNotification({
          type: "error",
          title: "Erro ao excluir turma(s)!",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters([
      "TurmasExternasInDisciplinas",
      "DisciplinasExternasInPerfis",
      "TurmasExternasToDelete",
      "PeriodosLetivos",
      "SemestresLetivos",
      "PrincipaisCursosDCC",
    ]),

    TurmasExternasOrdered() {
      return this.$_.orderBy(
        this.TurmasExternarFiltredByDisciplinas,
        ["periodo", this.ordenacaoTurmasMain.order],
        ["asc", this.ordenacaoTurmasMain.type]
      );
    },
    TurmasExternarFiltredByDisciplinas() {
      return this.$_.filter(this.TurmasExternarFiltredByPeriodos, (turma) =>
        this.$_.some(this.filtroDisciplinas.ativadas, ["id", turma.Disciplina])
      );
    },
    TurmasExternarFiltredByPeriodos() {
      return this.$_.filter(this.TurmasExternasInDisciplinas, (turma) =>
        this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );
    },

    DisciplinasExternasOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasExternasFiltredModal,
        this.ordenacaoDisciplinasModal.order,
        this.ordenacaoDisciplinasModal.type
      );
    },
    DisciplinasExternasFiltredModal() {
      if (this.searchCursosModal === "")
        return this.DisciplinasExternasInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasExternasInPerfis, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
  },
};
</script>
