<template>
  <div class="main-component row">
    <PageHeader :title="'Graduação - DCC'">
      <template v-if="isAdding">
        <BaseButton
          title="Salvar"
          :type="'icon'"
          :color="'green'"
          @click="$refs.novaTurma.addTurma()"
        >
          <i class="fas fa-check"></i>
        </BaseButton>
        <BaseButton
          title="Cancelar"
          :type="'icon'"
          :color="'gray'"
          @click="toggleIsAdding()"
        >
          <i class="fas fa-times"></i>
        </BaseButton>
      </template>
      <template v-else>
        <BaseButton
          title="Adicionar"
          :type="'icon'"
          :color="'green'"
          @click="toggleIsAdding()"
        >
          <i class="fas fa-plus"></i>
        </BaseButton>
        <BaseButton
          title="Deletar selecionados"
          :type="'icon'"
          :color="'red'"
          @click="openModalDelete()"
        >
          <i class="fas fa-trash"></i>
        </BaseButton>
      </template>

      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('filtros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>

      <BaseButton
        title="Relátorio"
        :type="'icon'"
        :color="'gray'"
        @click="xlsx()"
      >
        <i class="fas fa-file-alt"></i>
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
          <th style="width:25px"></th>
          <th style="width:40px" class="p-0">Editar</th>
          <th style="width:55px" title="Semestre">S.</th>
          <th
            @click="toggleOrder(ordenacaoMain.perfis, setFixedOrderPerfil)"
            style="width: 80px"
            class="clickable t-center"
          >
            <div class="d-flex justify-content-between align-items-center">
              <i
                class="fas fa-thumbtack"
                :class="
                  ordenacaoMain.perfis.order === null ? 'low-opacity' : ''
                "
              ></i>
              <span>
                Perfil
              </span>

              <i
                :class="
                  setIconByOrder(
                    ordenacaoMain.perfis,
                    'disciplina.perfil.abreviacao'
                  )
                "
              ></i>
            </div>
          </th>
          <th
            class="clickable"
            @click="toggleOrder(ordenacaoMain.turmas, 'disciplina.codigo')"
            style="width:80px"
            title="Código"
          >
            Cód.
            <i
              :class="setIconByOrder(ordenacaoMain.turmas, 'disciplina.codigo')"
            ></i>
          </th>
          <th
            class="clickable t-start"
            style="width:330px"
            @click="toggleOrder(ordenacaoMain.turmas, 'disciplina.nome')"
          >
            Disciplina
            <i
              :class="setIconByOrder(ordenacaoMain.turmas, 'disciplina.nome')"
            ></i>
          </th>
          <th style="width:25px" title="Créditos">
            C.
          </th>
          <th style="width:45px" class="p-0" title="Turma">T.</th>
          <th style="width:130px">Docente</th>
          <th style="width:80px">Turno</th>
          <th style="width:85px">Horário</th>
          <th style="width:95px">Sala</th>
          <th style="width:45px" title="Total de vagas">
            Total
          </th>
          <th
            v-for="curso in filtroCursos.ativados"
            :key="curso.id + curso.codigo"
            class="p-0"
            style="width: 35px"
            v-b-popover.hover.html.bottom="{
              title: curso.nome,
              content: popoverCursoContent(curso),
            }"
          >
            <span
              class="w-100"
              :class="{ 'curso-codigo-big': nameIsBig(curso.codigo) }"
            >
              {{ curso.codigo }}
            </span>
          </th>
        </template>
        <template #tbody>
          <NovaTurmaRow
            ref="novaTurma"
            v-show="isAdding"
            :cursosAtivadosLength="filtroCursos.ativados.length"
          />
          <template v-if="!tableIsLoading">
            <TurmaRow
              v-for="turma in TurmasOrdered"
              :key="turma.id + turma.disciplina.codigo + turma.letra"
              :turma="turma"
              :cursosAtivados="filtroCursos.ativados"
              @handle-click-in-edit="handleClickInEdit($event)"
            />
          </template>

          <tr v-show="TurmasOrdered.length === 0">
            <td style="width:1115px">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
            <td
              v-if="filtroCursos.ativados.length"
              :style="`width: ${35 * filtroCursos.ativados.length}px`"
            ></td>
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
    >
      <template #modal-body>
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Perfis', 'Disciplinas', 'Cursos', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable v-show="tabAtivaModal === 'Perfis'" :type="'modal'">
            <template #thead>
              <th style="width:25px"></th>
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
          <!-- Disciplinas -->
          <BaseTable
            v-show="tabAtivaModal === 'Disciplinas'"
            :type="'modal'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise nome ou codigo de uma disciplina..."
                @input="debounceInput($event, 'searchDisciplinasModal')"
              />
              <button
                @click="searchDisciplinasModal = ''"
                class="btn btn-search"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template #thead
              ><th style="width:25px"></th>
              <th
                title="Código"
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
                  toggleOrder(
                    ordenacaoModal.disciplinas,
                    'disciplina.perfil.abreviacao'
                  )
                "
              >
                Perfil
                <i
                  :class="
                    setIconByOrder(
                      ordenacaoModal.disciplinas,
                      'disciplina.perfil.abreviacao'
                    )
                  "
                ></i>
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="disciplina in DisciplinasDCCOrderedModal"
                :key="'MdDisciplina' + disciplina.id"
                @click="
                  toggleItemInArray(
                    disciplina.id,
                    filtroDisciplinas.selecionados
                  )
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
              <tr v-if="DisciplinasDCCOrderedModal.length === 0">
                <td colspan="3" style="width:450px">
                  NENHUMA DISCIPLINA ENCONTRADA.
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable
            v-show="tabAtivaModal === 'Cursos'"
            :type="'modal'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise nome ou codigo de um curso..."
                @input="debounceInput($event, 'searchCursosModal')"
              />
              <button @click="searchCursosModal = ''" class="btn btn-search">
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template #thead>
              <th style="width:25px"></th>
              <th
                @click="toggleOrder(ordenacaoModal.cursos, 'codigo')"
                class="clickable t-start"
                style="width: 50px;"
              >
                Cód.
                <i :class="setIconByOrder(ordenacaoModal.cursos, 'codigo')"></i>
              </th>
              <th
                @click="toggleOrder(ordenacaoModal.cursos, 'nome')"
                class="clickable t-start"
                style="width: 375px"
              >
                Nome
                <i :class="setIconByOrder(ordenacaoModal.cursos, 'nome')"></i>
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="curso in CursosOrderedModal"
                :key="curso.id + curso.nome"
                @click="toggleItemInArray(curso, filtroCursos.selecionados)"
              >
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    v-model="filtroCursos.selecionados"
                    :value="curso"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 50px;" class="t-start">
                  {{ curso.codigo }}
                </td>
                <td style="width: 375px" class="t-start">
                  {{ curso.nome }}
                </td>
              </tr>
              <tr v-show="CursosOrderedModal.length === 0">
                <td colspan="3" style="width:450px">
                  NENHUM CURSO ENCONTRADO.
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th style="width: 425px" class="t-start">
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
                <td style="width: 425px" class="t-start">
                  SEGUNDO
                </td>
              </tr>
            </template>
          </BaseTable>
        </div>
      </template>

      <template #modal-footer>
        <div class="w-100">
          <BaseButton
            type="text"
            color="lightblue"
            @click="modalSelectAll[tabAtivaModal]()"
          >
            Selecionar Todos
          </BaseButton>
          <BaseButton
            v-if="tabAtivaModal === 'Cursos'"
            type="text"
            color="lightblue"
            @click="selectCursosDCC()"
          >
            Cursos DCC
          </BaseButton>
          <BaseButton
            type="text"
            color="gray"
            @click="modalSelectNone[tabAtivaModal]()"
          >
            Desmarcar Todos
          </BaseButton>
        </div>
        <BaseButton
          class="px-4"
          type="text"
          color="green"
          @click="btnOkFiltros()"
        >
          OK
        </BaseButton>
      </template>
    </BaseModal>

    <!-- MODAL TURMA -->
    <BaseModal
      ref="modalEditTurma"
      :modalOptions="{
        type: 'editTurma',
        title: 'Edição de Turma',
      }"
    >
      <template #modal-body>
        <template v-if="turmaClickada !== null">
          <BodyModalEditTurma
            :key="turmaClickada.id + 'modalTurma'"
            :turma="turmaClickada"
          />
        </template>
      </template>
    </BaseModal>

    <!-- MODAL DELETAR -->
    <BaseModal
      ref="modalDelete"
      :modalOptions="{
        title: 'Deletar turma',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:450px; font-size:14px'"
    >
      <template #modal-body>
        <p class="w-100 m-0">
          Tem certeza que deseja deletar a(s) turma(s) selecionadas?
        </p>
        <ul class="list-group list-deletar w-100 mt-2">
          <li
            v-for="turma in Deletar"
            class="list-group-item"
            :key="'delete' + turma.id"
          >
            <span class="mr-1"> <b> Semestre: </b>{{ turma.periodo }} </span>
            <span class="mr-1">
              <b> Disciplina: </b>{{ turma.disciplina.nome }}
            </span>
            <span class="mr-1"><b> Turma: </b> {{ turma.letra }} </span>
          </li>
        </ul>
      </template>
      <template #modal-footer>
        <BaseButton
          class="paddingX-20"
          :type="'text'"
          :color="'gray'"
          @click="closeModalDelete()"
        >
          Cancelar
        </BaseButton>
        <BaseButton
          class="paddingX-20 ml-auto"
          :type="'text'"
          :color="'red'"
          @click="deleteSelectedTurma()"
        >
          Deletar
        </BaseButton>
      </template>
    </BaseModal>

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
            que, os campos disciplina, turno e letra da turma são obrigatórios.
            Após preencher os campos clique no ícone salvar
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
            <b>Para editar turma da tabela:</b> Existem duas formas de fazer
            alterações numa turma, a <b>primeira</b> é modificando diretamente
            os campos tabela e o sistema irá salvar automaticamente. <br />
            A <b>segunda</b> forma é clicando no ícone
            <i class="fas fa-edit"></i> presente na coluna editar da tabela, e
            na janela que será aberta no formulário presente na parte superior
            poderá ser feito alterações que somente serão enviadas ao clicar no
            botão salvar. E na tabela de vagas na parte inferior da janela as
            alterações serão salvas automaticamente.
          </li>
          <li class="list-group-item">
            <b>Para gerar relatório das turmas:</b> Clique no ícone relatório
            <i class="fas fa-file-alt cancelbtn"></i>
            e aguarde o
            <i style="font-style: italic">download</i> do arquivo (.xlsx)
            iniciar.
          </li>
          <li class="list-group-item">
            <b>Observações:</b> Em cada coluna de um curso existem dois campos
            de vagas, sendo o decima destinado para alunos na grade e debaixo
            para alunos repetentes. Para que uma turma apareça na tela
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
import { mapGetters, mapActions } from "vuex";
import { saveAs } from "file-saver";
import ls from "local-storage";
import xlsx from "@/common/services/xlsx";
import turmaService from "@/common/services/turma";
import {
  toggleOrdination,
  toggleItemInArray,
  notification,
  debounceInput,
  tableLoading,
} from "@/common/mixins";
import {
  PageHeader,
  BaseTable,
  BaseModal,
  NavTab,
  BodyModalEditTurma,
  BaseButton,
} from "@/components/ui";
import { normalizeText } from "@/common/utils";
import NovaTurmaRow from "./NovaTurmaRow.vue";
import TurmaRow from "./TurmaRow.vue";

export default {
  name: "TurmasDCC",
  mixins: [
    toggleOrdination,
    toggleItemInArray,
    notification,
    debounceInput,
    tableLoading,
  ],
  components: {
    TurmaRow,
    NovaTurmaRow,
    PageHeader,
    BodyModalEditTurma,
    NavTab,
    BaseTable,
    BaseModal,
    BaseButton,
  },
  data() {
    return {
      turmaClickada: null,
      isAdding: false,
      tabAtivaModal: "Perfis",
      searchCursosModal: "",
      searchDisciplinasModal: "",
      filtroPerfis: {
        selecionados: [],
      },
      filtroDisciplinas: {
        selecionados: [],
        ativadas: [],
      },
      filtroCursos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalSelectAll: {
        Perfis: () => {
          this.filtroPerfis.selecionados = [...this.PerfisDCC];
        },
        Disciplinas: () => {
          this.filtroDisciplinas.selecionados = [
            ..._.map(
              this.DisciplinasDCCInPerfis,
              (disciplina) => disciplina.id
            ),
          ];
        },
        Cursos: () => {
          this.filtroCursos.selecionados = [...this.AllCursos];
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
        Cursos: () => {
          this.filtroCursos.selecionados = [];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
        },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: "nome", type: "asc" },
      },
      ordenacaoMain: {
        turmas: { order: "disciplina.codigo", type: "asc" },
        perfis: { order: "disciplina.perfil.abreviacao", type: "asc" },
      },
    };
  },
  mounted() {
    ls.set("toggle", -1);
    ls.on("toggle", () => {
      const val = ls.get("toggle");
      if (val === true) this.$store.dispatch("toggleAllCursosTrue");
      else this.$store.dispatch("toggleAllCursosFalse");

      ls.set("toggle", -1);
    });
    for (let c = 0; c < this.AllCursos.length; c++) {
      const id = this.AllCursos[c].id;
      ls.on(`${id}`, () => {
        this.$store.dispatch("toggleCurso", id);
      });
    }
  },
  beforeDestroy() {
    ls.off("toggle");
    for (var c = 0; c < this.AllCursos.length; c++) {
      let id = this.AllCursos[c].id;
      ls.off(`${id}`);
    }
  },
  methods: {
    ...mapActions(["setLoadingState"]),
    popoverCursoContent(curso) {
      const { semestreInicial, alunosEntrada, alunosEntrada2 } = curso;

      if (semestreInicial == 1) return `<b>1º</b> - ${alunosEntrada}`;
      else if (semestreInicial == 2) return `<b>2º</b> - ${alunosEntrada2}`;
      else
        return `<b>1º</b> - ${alunosEntrada} <br/> <b>2º</b> - ${alunosEntrada2}`;
    },
    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    handleClickInEdit(turmaClicked) {
      this.turmaClickada = turmaClicked;
      this.$refs.modalEditTurma.open();
    },
    btnOkFiltros() {
      this.setTableLoadingState(true);
      this.setSemestreAtivo();
      this.filtroDisciplinas.ativadas = [
        ...this.filtroDisciplinas.selecionados,
      ];
      this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
      this.setTableLoadingState(false);
    },
    selectCursosDCC() {
      this.filtroCursos.selecionados = [...this.CursosDCC];
    },
    closeModalDelete() {
      this.$refs.modalDelete.close();
    },
    openModalDelete() {
      if (this.Deletar.length) this.$refs.modalDelete.open();
      else
        this.showNotification({
          type: "error",
          message: "Nenhuma turma selecionada",
        });
    },
    clearSearch(searchName) {
      this[searchName] = "";
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
    async xlsx() {
      try {
        this.setLoadingState("partial");

        await xlsx.downloadTable({ pedidos: this.$store.state.pedido.Pedidos });
        const tableData = await fetch(
          "http://200.131.219.57:3000/api/xlsx/download",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${this.$store.state.auth.token}`,
            },
          }
        );
        const tableDataBlobed = await tableData.blob();
        await saveAs(tableDataBlobed, "tabela.xlsx");
      } catch (error) {
        this.showNotification({
          type: "error",
          message: `Erro ao gerar a tabela!\n ${error}`,
        });
      } finally {
        this.setLoadingState("completed");
      }
    },
    async deleteSelectedTurma() {
      try {
        this.setLoadingState("partial");

        for (let i = 0; i < this.Deletar.length; i++) {
          await turmaService.delete(this.Deletar[i].id);
        }
        this.$store.commit("emptyDelete");
        this.showNotification({
          type: "success",
          message: "Turma(s) excluída(s).",
        });
      } catch (error) {
        this.showNotification({
          type: "error",
          message: error,
        });
      } finally {
        this.setLoadingState("completed");
        this.closeModalDelete();
      }
    },
    toggleIsAdding() {
      this.isAdding = !this.isAdding;
    },
    nameIsBig(nome) {
      if (nome.length > 4) return true;
      else return false;
    },
  },
  computed: {
    ...mapGetters([
      "AllCursos",
      "CursosDCC",
      "PerfisDCC",
      "DisciplinasDCCInPerfis",
      "TurmasInDisciplinasPerfis",
      "Admin",
    ]),
    // Turmas Main Table
    TurmasOrdered() {
      //Se não possui ordenação de perfil
      if (this.ordenacaoMain.perfis.order === null)
        return _.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", this.ordenacaoMain.turmas.order, "letra"],
          ["asc", this.ordenacaoMain.turmas.type, "asc"]
        );
      else
        return _.orderBy(
          this.TurmasFiltredByDisciplinas,
          [
            "periodo",
            this.ordenacaoMain.perfis.order,
            this.ordenacaoMain.turmas.order,
            "letra",
          ],
          [
            "asc",
            this.ordenacaoMain.perfis.type,
            this.ordenacaoMain.turmas.type,
            "asc",
          ]
        );
    },
    TurmasFiltredByDisciplinas() {
      return _.filter(this.TurmasFiltredBySemestres, (turma) =>
        _.find(
          this.filtroDisciplinas.ativadas,
          (disciplinaId) => disciplinaId === turma.Disciplina
        )
      );
    },
    TurmasFiltredBySemestres() {
      return _.filter(this.TurmasInDisciplinasPerfis, (turma) => {
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
    // Modal
    PerfisOrderedModal() {
      return _.orderBy(
        this.PerfisDCC,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    DisciplinasDCCOrderedModal() {
      return _.orderBy(
        this.DisciplinasDCCFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasDCCFiltredModal() {
      if (this.searchDisciplinasModal === "")
        return this.DisciplinasDCCInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return _.filter(this.DisciplinasDCCInPerfis, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    CursosOrderedModal() {
      return _.orderBy(
        this.CursosFiltredModal,
        this.ordenacaoModal.cursos.order,
        this.ordenacaoModal.cursos.type
      );
    },
    CursosFiltredModal() {
      let cursosResultantes = this.AllCursos;

      if (this.searchCursosModal !== "") {
        const searchNormalized = normalizeText(this.searchCursosModal);

        cursosResultantes = _.filter(cursosResultantes, (curso) => {
          const cursoNome = normalizeText(curso.nome);
          const cursoCodigo = normalizeText(curso.codigo);

          return (
            cursoNome.match(searchNormalized) ||
            cursoCodigo.match(searchNormalized)
          );
        });
      }
      return cursosResultantes;
    },
    //Outros
    setFixedOrderPerfil() {
      if (this.ordenacaoMain.perfis.type === "desc") return null;
      else return "disciplina.perfil.abreviacao";
    },
    Deletar() {
      return this.$store.state.turma.Deletar;
    },
  },
  watch: {
    filtroPerfis: {
      handler(perfis) {
        const disciplinasResultantes = [];

        this.DisciplinasDCCInPerfis.forEach((disciplina) => {
          const perfilFounded = _.find(
            perfis.selecionados,
            (perfil) => perfil.id === disciplina.Perfil
          );

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
.curso-codigo-big {
  font-size: 7px !important;
}
</style>
