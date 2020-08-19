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
          <th style="width: 55px" title="Semestre">S.</th>
          <th
            style="width: 70px"
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
          <th style="width: 25px;" title="Créditos">C.</th>
          <th style="width: 45px" title="Turma">T.</th>
          <th style="width: 80px" title="Total de vagas">Turno</th>
          <th style="width: 85px">Horário</th>
          <th style="width: 95px">Sala</th>
          <th style="width: 40px">Total</th>
          <template v-for="curso in CursosDCC">
            <th
              style="width: 35px"
              :id="'curso' + curso.id"
              :key="'1-curso' + curso.id"
            >
              {{ curso.codigo }}
              <b-popover
                :key="'popover' + curso.id"
                :target="'curso' + curso.id"
                placement="bottom"
                triggers="hover focus"
              >
                <span
                  class="w-100 text-center"
                  style="font-size: 11px!important;"
                >
                  <b>{{ curso.nome }}</b>
                </span>
                <p
                  class="p-0 m-0 text-center"
                  style="font-size: 11px!important;"
                >
                  {{
                    curso.semestreInicial == 1 || curso.semestreInicial == 3
                      ? "1º - " + curso.alunosEntrada
                      : ""
                  }}
                  <br />
                  {{
                    curso.semestreInicial == 2 || curso.semestreInicial == 3
                      ? "2º - " + curso.alunosEntrada2
                      : ""
                  }}
                </p>
              </b-popover>
            </th>
          </template>
        </template>

        <template #add-row>
          <NovaTurmaExternaRow ref="novaTurmaExternaRow" v-show="isAdding" />
        </template>

        <template #tbody>
          <TurmaExternaRow
            v-for="turma in TurmasExternasOrdered"
            :key="'turma' + turma.id"
            :turma="turma"
            :CursosAtivados="CursosDCC"
          />

          <tr v-if="!TurmasExternasOrdered.length">
            <td style="width:990px">
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
      <div class="div-table">
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
              style="width: 60px"
            >
              Cód.
              <i
                :class="setIconByOrder(ordenacaoDisciplinasModal, 'codigo')"
              ></i>
            </th>
            <th
              @click="toggleOrder(ordenacaoDisciplinasModal, 'nome')"
              class="clickable t-start"
              style="width: 305px"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoDisciplinasModal, 'nome')"></i>
            </th>
            <th class="t-start" style="width: 60px">Perfis</th>
          </template>
          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasExternasOrderedModal"
              :key="'disciplina' + disciplina.id"
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
              <td style="width: 60px" class="t-start">
                {{ disciplina.codigo }}
              </td>
              <td style="width: 305px" class="t-start">
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

        <BaseTable
          v-show="modalFiltrosTabs.current === 'Semestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start" style="width: 425px">Semestre Letivo</th>
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
              <td style="width: 425px" class="t-start">PRIMEIRO</td>
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
      </div>
    </ModalFiltros>

    <ModalDelete
      ref="modalDelete"
      :isDeleting="!!Deletar.length"
      @btn-deletar="handleDeleteTurmas"
    >
      <li v-if="!Deletar.length" class="list-group-item">
        Nenhuma turma selecionada.
      </li>
      <li
        v-for="turma in Deletar"
        class="list-group-item"
        :key="'deletarTurma' + turma.id"
      >
        <span>
          <b>Semestre:</b>
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
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalDelete, ModalAjuda, ModalFiltros } from "@/components/modals";
import TurmaExternaRow from "./TurmaExternaRow.vue";
import NovaTurmaExternaRow from "./NovaTurmaExternaRow.vue";

export default {
  name: "DashboardTurmasExternas",
  mixins: [toggleOrdination, toggleItemInArray, toggleAsideModal],
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
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      filtroDisciplinas: {
        ativadas: [],
        selecionadas: [],
      },
      searchDisciplinasModal: "",
      tabAtivaModal: "Disciplinas",
      modalFiltrosTabs: {
        current: "Disciplinas",
        array: ["Disciplinas", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Disciplinas: () => {
            this.filtroDisciplinas.selecionadas = [
              ...this.DisciplinasExternasInPerfis,
            ];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
          },
        },
        selectNone: {
          Disciplinas: () => {
            this.filtroDisciplinas.selecionadas = [];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.filtroDisciplinas.ativadas = [
            ...this.filtroDisciplinas.selecionadas,
          ];
          this.setSemestreAtivo();
        },
      },
    };
  },

  methods: {
    ...mapActions(["deleteTurmasExternas"]),

    toggleAddRow() {
      this.isAdding = !this.isAdding;
    },
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
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
    ]),

    TurmasExternasOrdered() {
      return this.$_.orderBy(
        this.TurmasExternarFiltredByDisciplinas,
        ["periodo", this.ordenacaoTurmasMain.order],
        ["asc", this.ordenacaoTurmasMain.type]
      );
    },
    TurmasExternarFiltredByDisciplinas() {
      return this.$_.filter(this.TurmasExternarFiltredBySemestres, (turma) =>
        this.$_.some(this.filtroDisciplinas.ativadas, ["id", turma.Disciplina])
      );
    },
    TurmasExternarFiltredBySemestres() {
      return this.$_.filter(this.TurmasExternasInDisciplinas, (turma) => {
        switch (this.filtroSemestres.ativo) {
          case 1:
            return turma.periodo === 1;
          case 2:
            return turma.periodo === 3;
          case 3:
            return true;
          default:
            return false;
        }
      });
    },
    //modal tables
    CursosDCC() {
      return this.$_.slice(this.$store.state.curso.Cursos, 0, 4);
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
    Deletar() {
      return this.$store.state.turmaExterna.Deletar;
    },
  },
};
</script>
