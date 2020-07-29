<template>
  <div class="main-component row">
    <PageHeader :title="'Graduação - Outros'">
      <BaseButton
        v-show="isAdding"
        title="Salvar"
        :type="'icon'"
        :color="'green'"
        @click="$refs.novaTurmaExternaRow.addNovaTurma()"
      >
        <i class="fas fa-check"></i>
      </BaseButton>
      <BaseButton
        v-show="!isAdding"
        title="Adicionar"
        :type="'icon'"
        :color="'green'"
        @click="toggleAdd()"
      >
        <i class="fas fa-plus"></i>
      </BaseButton>

      <BaseButton
        v-show="isAdding"
        title="Cancelar"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAdd()"
      >
        <i class="fas fa-times"></i>
      </BaseButton>

      <BaseButton
        v-show="!isAdding"
        title="Deletar selecionados"
        :type="'icon'"
        :color="'red'"
        @click="$refs.modalDelete.open()"
      >
        <i class="fas fa-trash"></i>
      </BaseButton>

      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('filtros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('ajuda')"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th style="width: 25px"></th>
          <th style="width: 55px" title="Semestre">
            S.
          </th>
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
          <th style="width: 25px;" title="Créditos">
            C.
          </th>
          <th style="width: 45px" title="Turma">
            T.
          </th>
          <th style="width: 80px" title="Total de vagas">
            Turno
          </th>
          <th style="width: 85px">
            Horário
          </th>
          <th style="width: 95px">Sala</th>
          <th style="width: 40px">
            Total
          </th>
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
        <template #tbody>
          <NovaTurmaExternaRow ref="novaTurmaExternaRow" v-show="isAdding" />

          <template v-if="!tableIsLoading">
            <TurmaExternaRow
              v-for="turma in TurmasExternasOrdered"
              :key="'turma' + turma.id"
              :turma="turma"
              :CursosAtivados="CursosDCC"
            />
          </template>
          <tr v-if="TurmasExternasOrdered.length === 0">
            <td style="width:990px">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>
    <!-- MODAL FILTROS -->
    <BaseModal
      ref="modalFiltros"
      :modalOptions="{
        type: 'filtros',
        title: 'Filtros',
        hasFooter: true,
      }"
      @btn-ok="btnOkFiltros()"
      @select-all="modalSelectAll[tabAtivaModal]"
      @select-none="modalSelectNone[tabAtivaModal]"
    >
      <template #modal-body>
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Disciplinas', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable
            v-show="tabAtivaModal === 'Disciplinas'"
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
                style="width: 310px"
              >
                Nome
                <i
                  :class="setIconByOrder(ordenacaoDisciplinasModal, 'nome')"
                ></i>
              </th>
              <th class="t-start" style="width: 60px">
                Perfis
              </th>
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
                <td style="width: 310px" class="t-start">
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
          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th class="t-start" style="width: 425px">
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
      </template>
    </BaseModal>

    <!-- MODAL DELETAR -->
    <ModalDelete
      ref="modalDelete"
      :isDeleting="!!Deletar.length"
      @btn-deletar="deleteSelectedTurmas"
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
          <b>Semestre:</b> {{ turma.periodo }} - <b>Turma:</b>
          {{ turma.letra }}
        </span>
        <span><b> Disciplina: </b>{{ turma.disciplina.nome }} </span>
      </li>
    </ModalDelete>

    <!-- MODAL AJUDA -->
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
            <b>Para adicionar uma turma à tabela:</b> Clique no ícone adicionar
            <i class="fas fa-plus addbtn"></i> no cabeçalho da página em seguida
            preencha a nova linha que irá aparecer no início da tabela. E note
            que, os campos disciplina e letra da turma são obrigatórios. Após
            preencher os campos clique no ícone salvar
            <i class="fas fa-check addbtn"></i>
            ou em cancelar
            <i class="fas fa-times cancelbtn"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para deletar turmas da tabela:</b> Marque a(s) turma(s) que
            deseja deletar através da caixa de seleção presente na primeira
            coluna à esquerda na tabela, em seguida clique no ícone deletar
            <i class="fas fa-trash delbtn"></i> no cabeçalho da página e na
            janela que será aberta confirme clicando botão OK.
          </li>
          <li class="list-group-item">
            <b>Para editar turma da tabela:</b> Basta fazer as alterações
            necessárias diretamente nos campos da tabela e o sistema irá salvar
            automaticamente.
          </li>
          <li class="list-group-item">
            <b>Observações:</b> Em cada coluna de cursos possui dois campos de
            vagas, sendo acima destinado para alunos na grade, e abaixo para
            alunos repetentes. Para que uma turma externa apareça em na tela
            <b>Horários</b> de um determinado curso é preciso que pelo menos uma
            vaga para alunos na grade seja destinada ao mesmo.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import turmaExternaService from "@/common/services/turmaExterna";
import {
  setEmptyValuesToNull,
  validateObjectKeys,
  normalizeText,
} from "@/common/utils";
import {
  notification,
  maskTurmaLetra,
  toggleOrdination,
  toggleItemInArray,
  tableLoading,
} from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseModal,
  ModalDelete,
  NavTab,
  BaseButton,
  InputSearch,
} from "@/components/ui";
import TurmaExternaRow from "./TurmaExternaRow.vue";
import NovaTurmaExternaRow from "./NovaTurmaExternaRow.vue";
import { mapActions, mapGetters } from "vuex";

const emptyTurma = {
  id: null,
  periodo: 1,
  letra: "A",
  turno1: null,
  turno2: null,
  Disciplina: null,
  Horario1: null,
  Horario2: null,
  Sala1: null,
  Sala2: null,
};

export default {
  name: "DashboardTurmasExternas",
  mixins: [
    notification,
    maskTurmaLetra,
    toggleOrdination,
    toggleItemInArray,
    tableLoading,
  ],
  components: {
    TurmaExternaRow,
    PageHeader,
    BaseTable,
    BaseModal,
    NavTab,
    ModalDelete,
    BaseButton,
    InputSearch,
    NovaTurmaExternaRow,
  },
  data() {
    return {
      ordenacaoTurmasMain: { order: "disciplina.codigo", type: "asc" },
      turmaForm: _.clone(emptyTurma),
      isAdding: false,
      semestre: 1,
      searchDisciplinasModal: "",
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      filtroDisciplinas: {
        ativadas: [],
        selecionadas: [],
      },
      tabAtivaModal: "Disciplinas",
      ordenacaoDisciplinasModal: { order: "codigo", type: "asc" },
      modalSelectAll: {
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
      modalSelectNone: {
        Disciplinas: () => {
          this.filtroDisciplinas.selecionadas = [];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
        },
      },
    };
  },
  methods: {
    ...mapActions(["clearDeleteExternas", "setLoadingState"]),

    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    btnOkFiltros() {
      this.setTableLoadingState(true);
      this.filtroDisciplinas.ativadas = [
        ...this.filtroDisciplinas.selecionadas,
      ];
      this.setSemestreAtivo();
      this.setTableLoadingState(false);
    },
    toggleAdd() {
      this.isAdding = !this.isAdding;
    },
    setSemestreAtivo() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo)
        this.filtroSemestres.ativo = 1;
      else if (this.filtroSemestres.segundo && !this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 2;
      else if (this.filtroSemestres.primeiro && this.filtroSemestres.primeiro)
        this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    async deleteSelectedTurmas() {
      if (!this.Deletar.length) return;

      try {
        this.setLoadingState("partial");

        for (let i = 0; i < this.Deletar.length; i++) {
          await turmaExternaService.delete(this.Deletar[i].id, this.Deletar[i]);
        }
        this.$refs.modalDelete.close();
        this.clearDeleteExternas();
        this.showNotification({
          type: "success",
          message: "Turma(s) excluída(s).",
        });
      } catch (error) {
        this.showNotification({
          type: "error",
          message: "Erro ao excluir turma(s).",
        });
      } finally {
        this.setLoadingState("completed");
      }
    },
  },
  computed: {
    ...mapGetters([
      "TurmasExternasInDisciplinas",
      "DisciplinasExternasInPerfis",
    ]),

    TurmasExternasOrdered() {
      return _.orderBy(
        this.TurmasExternarFiltredByDisciplinas,
        ["periodo", this.ordenacaoTurmasMain.order],
        ["asc", this.ordenacaoTurmasMain.type]
      );
    },
    TurmasExternarFiltredByDisciplinas() {
      return _.filter(this.TurmasExternarFiltredBySemestres, (turma) =>
        _.some(this.filtroDisciplinas.ativadas, ["id", turma.Disciplina])
      );
    },
    TurmasExternarFiltredBySemestres() {
      return _.filter(this.TurmasExternasInDisciplinas, (turma) => {
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
    CursosDCC() {
      return _.slice(this.$store.state.curso.Cursos, 0, 4);
    },
    DisciplinasExternasOrderedModal() {
      return _.orderBy(
        this.DisciplinasExternasFiltredModal,
        this.ordenacaoDisciplinasModal.order,
        this.ordenacaoDisciplinasModal.type
      );
    },
    DisciplinasExternasFiltredModal() {
      if (this.searchCursosModal === "")
        return this.DisciplinasExternasInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return _.filter(this.DisciplinasExternasInPerfis, (disciplina) => {
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
