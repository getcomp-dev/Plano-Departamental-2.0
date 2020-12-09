<template>
  <div class="main-component row" v-if="currentPlano.isEditable">
    <portal to="page-header">
      <template v-if="isAdding">
        <BaseButton
          template="salvar"
          @click="$refs.novaTurmaRow.handleCreateTurmaExterna()"
        />
        <BaseButton template="cancelar" @click="toggleAddRow" />
      </template>
      <template v-else>
        <BaseButton template="adicionar" @click="toggleAddRow" />
        <BaseButton
          template="deletar"
          title="Deletar selecionados"
          @click="openModalDelete"
        />
      </template>
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="25" />
          <v-th width="55" title="Período letivo">P.</v-th>
          <v-th-ordination
            :currentOrder="ordenacaoTurmasMain"
            orderToCheck="disciplina.codigo"
            width="80"
            text="Código"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoTurmasMain"
            orderToCheck="disciplina.nome"
            width="330"
            align="start"
          >
            Disciplina
          </v-th-ordination>
          <v-th width="25" title="Créditos">C.</v-th>
          <v-th width="45" title="Turma">T.</v-th>
          <v-th width="80">Turno</v-th>
          <v-th width="85">Horário</v-th>
          <v-th width="95">Sala</v-th>
          <v-th width="45" title="Total de vagas">Total</v-th>
          <v-th
            v-for="curso in PrincipaisCursosDCC"
            :key="curso.id + curso.nome"
            width="35"
            v-b-popover.html.hover.bottom="{
              title: curso.nome,
              content: cursoPopoverContent(curso),
            }"
          >
            {{ curso.codigo }}
          </v-th>
        </template>
        <template #add-row>
          <NovaTurmaExternaRow ref="novaTurmaRow" v-if="isAdding" />
        </template>

        <template #tbody>
          <TurmaExternaRow
            v-for="turma in TurmasExternasOrdered"
            :key="turma.id + turma.letra + turma.Disciplina"
            :turma="turma"
          />

          <tr v-if="!TurmasExternasOrdered.length">
            <v-td width="1005">
              <b>Nenhuma turma encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
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
        type="modal"
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchDisciplinasModal"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoDisciplinasModal"
            orderToCheck="codigo"
            width="70"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplinasModal"
            orderToCheck="nome"
            width="295"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoDisciplinasModal"
            orderToCheck="perfil.abreviacao"
            width="60"
            align="start"
          >
            Perfis
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="toggleItemInArray(disciplina, filtroDisciplinas.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td width="295" align="start">{{ disciplina.nome }}</v-td>
            <v-td width="60" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
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
            @click="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPeriodos.selecionados"
                :value="periodo"
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
            @click="selecionaSemestre(semestre)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroSemestres.selecionados"
                :value="semestre"
                :indeterminate.prop="semestre.halfChecked"
                @click.stop="selecionaSemestre(semestre)"
              />
            </v-td>
            <v-td width="425" align="start">{{ semestre.nome }}</v-td>
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
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        no cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar
        entre os tipos de filtro disponíveis. Marque quais informações deseja visualizar,
        e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Adicionar turma:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" />
        no cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer no
        início da tabela. Note que os campos disciplina e turma são obrigatórios. Após
        preencher os campos, clique no ícone de salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" />
        ou de cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />
        .
      </li>
      <li class="list-group-item">
        <b>Deletar turma:</b>
        Marque a(s) turma(s) que deseja deletar através da caixa de seleção na coluna mais
        à esquerda da tabela. Em seguida, clique no ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" />
        no cabeçalho da página. Confirme a exclusão clicando no botão OK na janela que se
        abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar turma:</b>
        Basta fazer as alterações necessárias diretamente nos campos da tabela. O sistema
        salvará as modificações automaticamente.
      </li>
      <li class="list-group-item">
        <b>Observações:</b>
        Em cada coluna de um curso, para cada disciplina, existem dois campos de vagas. O
        campo superior é destinado às vagas de grade, e o inferior é referente às vagas
        para alunos não periodizados. Para que uma turma externa apareça na grade horária
        de um determinado curso, na página "Horários", é preciso que pelo menos uma vaga
        de grade seja destinada a este curso.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { union, difference, orderBy, some, filter } from "lodash-es";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  cursoPopoverContent,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalDelete, ModalAjuda, ModalFiltros } from "@/components/modals";
import TurmaExternaRow from "./TurmaExternaRow.vue";
import NovaTurmaExternaRow from "./NovaTurmaExternaRow.vue";

export default {
  name: "DashboardTurmasExternas",
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    cursoPopoverContent,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
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
        selecionados: [],
      },
      filtroDisciplinas: {
        ativadas: [],
        selecionados: [],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = union(
              this.DisciplinasOptionsFiltered,
              this.filtroDisciplinas.selecionados
            );
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
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = difference(
              this.filtroDisciplinas.selecionados,
              this.DisciplinasOptionsFiltered
            );
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroDisciplinas.ativadas = [...this.filtroDisciplinas.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();
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
      "PrincipaisCursosDCC",
    ]),

    TurmasExternasOrdered() {
      return orderBy(
        this.TurmasExternarFiltredByDisciplinas,
        ["periodo", this.ordenacaoTurmasMain.order],
        ["asc", this.ordenacaoTurmasMain.type]
      );
    },
    TurmasExternarFiltredByDisciplinas() {
      return filter(this.TurmasExternarFiltredByPeriodos, (turma) =>
        some(this.filtroDisciplinas.ativadas, ["id", turma.Disciplina])
      );
    },
    TurmasExternarFiltredByPeriodos() {
      return filter(this.TurmasExternasInDisciplinas, (turma) =>
        some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );
    },

    DisciplinasOptionsOrdered() {
      return orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoDisciplinasModal.order,
        this.ordenacaoDisciplinasModal.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchCursosModal === "") return this.DisciplinasExternasInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return filter(this.DisciplinasExternasInPerfis, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
  },
};
</script>
