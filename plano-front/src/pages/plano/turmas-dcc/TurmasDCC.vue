<template>
  <div v-if="Admin" class="main-component row">
    <PageTitle :title="'Graduação - DCC'">
      <template #aside>
        <template v-if="isAdding">
          <BaseButton
            title="Salvar"
            :type="'icon'"
            :color="'green'"
            @click="addTurma()"
          >
            <i class="fas fa-check"></i>
          </BaseButton>
          <BaseButton
            title="Cancelar"
            :type="'icon'"
            :color="'red'"
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
            @click="$refs.modalDelete.open()"
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
          @click="xlsx(Pedidos)"
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
      </template>
    </PageTitle>

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
                  setIconByOrder(ordenacaoMain.perfis, 'perfilAbreviacao')
                "
              ></i>
            </div>
          </th>
          <th
            class="clickable"
            @click="toggleOrder(ordenacaoMain.turmas, 'disciplinaCodigo')"
            style="width:80px"
            title="Código"
          >
            Cód.
            <i
              :class="setIconByOrder(ordenacaoMain.turmas, 'disciplinaCodigo')"
            ></i>
          </th>
          <th
            class="clickable t-start"
            style="width:330px"
            @click="toggleOrder(ordenacaoMain.turmas, 'disciplinaNome')"
          >
            Disciplina
            <i
              :class="setIconByOrder(ordenacaoMain.turmas, 'disciplinaNome')"
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
          <template v-for="curso in filtroCursos.ativados">
            <th
              class="p-0"
              style="width: 35px"
              :key="'1-' + curso.id"
              :id="'curso' + curso.id"
            >
              <span
                v-bind:class="{ cursoGrande: nameIsBig(curso.codigo) }"
                v-on.prevent:mouseover
              >
                {{ curso.codigo }}
              </span>
            </th>

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
                v-if="curso.semestreInicial == 1 || curso.semestreInicial == 3"
              >
                1º - {{ curso.alunosEntrada }}
              </p>
              <p
                class="p-0 m-0 text-center"
                style="font-size: 11px!important;"
                v-if="curso.semestreInicial == 2 || curso.semestreInicial == 3"
              >
                2º - {{ curso.alunosEntrada2 }}
              </p>
            </b-popover>
          </template>
        </template>
        <template #tbody>
          <NovaTurma
            v-show="isAdding"
            :cursosAtivadosLength="filtroCursos.ativados.length"
          />
          <template v-if="tableIsReady">
            <TurmaRow
              v-cloak
              v-for="turma in TurmasOrdered"
              :key="turma.id + turma.disciplinaCodigo + turma.letra"
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
          <BaseTable
            v-show="tabAtivaModal === 'Perfis'"
            :tableType="'modal-table'"
          >
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
            :tableType="'modal-table'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise nome ou codigo de uma disciplina..."
                v-model="searchDisciplinasModal"
              />
              <button
                @click="clearSearch('searchDisciplinasModal')"
                class="btn btn-search"
                style="font-weight: bold "
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
                  {{ disciplina.perfilAbreviacao }}
                </td>
              </tr>
              <tr v-if="DisciplinasOrderedModal.length === 0">
                <td colspan="3" style="width:450px">
                  NENHUMA DISCIPLINA ENCONTRADA.
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable
            v-show="tabAtivaModal === 'Cursos'"
            :tableType="'modal-table'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise nome ou codigo de um curso..."
                v-model="searchCursosModal"
              />
              <button
                @click="clearSearch('searchCursosModal')"
                class="btn btn-search"
              >
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template #thead
              ><th style="width:25px"></th>
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
                v-for="curso in ModalCursosOrdered"
                :key="'cursoMd' + curso.id"
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
              <tr v-show="ModalCursosOrdered.length === 0">
                <td colspan="3" style="width:450px">
                  NENHUM CURSO ENCONTRADO.
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable
            v-show="tabAtivaModal === 'Semestres'"
            :tableType="'modal-table'"
          >
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
        title: 'Confirmar seleção',
        position: 'center',
        hasBackground: true,
        hasFooter: true,
      }"
      :customStyles="'width:400px'"
    >
      <template #modal-body>
        <p class="w-100 mb-2" style="font-size:14px">
          {{
            Deletar.length
              ? "Tem certeza que deseja deletar as turmas selecionados?"
              : "Nenhuma turma selecionada!"
          }}
        </p>
        <template v-if="Deletar.length">
          <ul class="list-group list-deletar w-100">
            <template v-for="turma in Deletar">
              <li class="list-group-item" :key="'deletarTurma' + turma.id">
                <span class="mr-1">
                  <b> Semestre: </b>{{ turma.periodo }}
                </span>
                <span class="mr-1"
                  ><b> Disciplina: </b>{{ turma.disciplinaNome }} -
                  <b>{{ turma.letra }}</b>
                </span>
              </li>
            </template>
          </ul>
        </template>
      </template>
      <template #modal-footer>
        <div class="w-100">
          <button
            class="btn-custom btn-modal btn-cinza btn-ok-modal"
            @click="$refs.modalDelete.close()"
          >
            Cancelar
          </button>
        </div>
        <button
          v-if="Deletar.length"
          class="btn-custom btn-modal btn-vermelho btn-ok-modal"
          @click="deleteSelectedTurma()"
        >
          Deletar
        </button>
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
            que, disciplina, turno e letra da turma são campos obrigatórios.
            Após preencher os campos clique no ícone salvar
            <i class="fas fa-check addbtn"></i>
            ou em cancelar
            <i class="fas fa-times delbtn"></i>
            .
          </li>
          <li class="list-group-item">
            <b>Para editar turma da Tabela:</b> Existem duas formas de fazer
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
            <b>Para deletar turmas da tabela:</b> Marque a(s) turma(s) que
            deseja deletar através da caixa de seleção presente na primeira
            coluna à esquerda na tabela, em seguida clique no ícone deletar
            <i class="fas fa-trash delbtn"></i> no cabeçalho da página e na
            janela que será aberta confirme clicando botão OK.
          </li>
          <li class="list-group-item">
            <b>Para gerar relatório (.xlsx) das turmas:</b> Clique no ícone
            relatório
            <i class="fas fa-file-alt"></i>
            e aguarde o
            <i style="font-style: italic">download</i> iniciar.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import { saveAs } from "file-saver";
import ls from "local-storage";
import xlsx from "@/common/services/xlsx";
import turmaService from "@/common/services/turma";
import pedidoService from "@/common/services/pedido";
import {
  toggleOrdination,
  toggleItemInArray,
  redirectNotAdmin,
  notification,
} from "@/mixins/index.js";
import {
  PageTitle,
  BaseTable,
  BaseModal,
  NavTab,
  BodyModalEditTurma,
  LoadingPage,
  BaseButton,
} from "@/components/index.js";
import NovaTurma from "./NovaTurma.vue";
import TurmaRow from "./TurmaRow.vue";

export default {
  name: "DashboardPrototipo",
  mixins: [toggleOrdination, toggleItemInArray, redirectNotAdmin, notification],
  components: {
    TurmaRow,
    NovaTurma,
    PageTitle,
    BodyModalEditTurma,
    NavTab,
    BaseTable,
    BaseModal,
    LoadingPage,
    BaseButton,
  },
  data() {
    return {
      tableIsReady: true,
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
          this.filtroPerfis.selecionados = [...this.Perfis];
        },
        Disciplinas: () => {
          this.filtroDisciplinas.selecionados = [...this.DisciplinasId];
        },
        Cursos: () => {
          this.filtroCursos.selecionados = [...this.Cursos];
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
        turmas: { order: "disciplinaCodigo", type: "asc" },
        perfis: { order: "perfilAbreviacao", type: "asc" },
      },
    };
  },
  mounted() {
    ls.set("toggle", -1);
    ls.on("toggle", () => {
      var val = ls.get("toggle");
      if (val === true) {
        this.$store.dispatch("toggleAllCursosTrue");
      } else {
        this.$store.dispatch("toggleAllCursosFalse");
      }
      ls.set("toggle", -1);
    });
    for (var c = 0; c < this.Cursos.length; c++) {
      let id = this.Cursos[c].id;
      ls.on(`${id}`, () => {
        this.$store.dispatch("toggleCurso", id);
      });
    }
  },
  beforeDestroy() {
    ls.off("toggle");
    for (var c = 0; c < this.Cursos.length; c++) {
      let id = this.Cursos[c].id;
      ls.off(`${id}`);
    }
  },

  methods: {
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
      this.tableIsReady = false;
      this.setSemestreAtivo();
      this.filtroDisciplinas.ativadas = [
        ...this.filtroDisciplinas.selecionados,
      ];
      this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
      this.clearSearch("searchCursosModal");
      this.clearSearch("searchDisciplinasModal");

      this.$nextTick(() => {
        setTimeout(() => {
          this.tableIsReady = true;
        }, 500);
      });
    },
    selectCursosDCC() {
      this.filtroCursos.selecionados = [...this.CursosDCC];
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
    async xlsx(pedidos) {
      try {
        this.$root.onLoad = true;

        await xlsx.downloadTable({ pedidos: pedidos });
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
        this.$root.onLoad = false;
      } catch (error) {
        this.$notify({
          group: "general",
          title: `Erro!`,
          text: `Erro ao gerar a tabela!\n ${error}`,
          type: "error",
        });
      }
    },
    clearDelete() {
      this.$store.commit("emptyDelete");
    },
    deleteSelectedTurma() {
      for (let i = 0; i < this.Deletar.length; i++) {
        this.deleteTurma(this.Deletar[i]);
      }
      this.clearDelete();
    },
    deleteTurma(turma) {
      const turmaToDelete = _.clone(turma);
      turmaToDelete.periodo = null;
      turmaToDelete.letra = null;
      turmaToDelete.turno1 = null;
      turmaToDelete.turno2 = null;
      turmaToDelete.Disciplina = null;
      turmaToDelete.Docente1 = null;
      turmaToDelete.Docente2 = null;
      turmaToDelete.Horario1 = null;
      turmaToDelete.Horario2 = null;
      turmaToDelete.Sala1 = null;
      turmaToDelete.Sala2 = null;

      this.editTurma(turmaToDelete);

      let pedidos = _.clone(this.$store.state.pedido.Pedidos[turmaToDelete.id]);
      for (let i = 0; i < pedidos.length; i++) {
        if (
          !(
            pedidos[i].vagasPeriodizadas === 0 &&
            pedidos[i].vagasNaoPeriodizadas === 0
          )
        ) {
          pedidos[i].vagasPeriodizadas = 0;
          pedidos[i].vagasNaoPeriodizadas = 0;
          pedidoService
            .update(pedidos[i].Curso, pedidos[i].Turma, pedidos[i])
            .then(() => {})
            .catch((error) => {
              this.showNotification({
                type: "error",
                message: error,
              });
            });
        }
      }
    },
    addTurma() {
      EventBus.$emit("addTurma");
    },
    editTurma(turma) {
      turmaService
        .update(turma.id, turma)
        .then((response) => {
          this.showNotification({
            type: "success",
            message: response.message,
          });
        })
        .catch((error) => {
          this.showNotification({
            type: "error",
            message: error,
          });
        });
    },
    toggleIsAdding() {
      this.isAdding = !this.isAdding;
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
    nameIsBig(nome) {
      if (nome.length > 4) return true;
      else return false;
    },
  },
  computed: {
    CursosDCC() {
      const cursosResultantes = [];
      cursosResultantes.push(
        _.find(this.Cursos, ["nome", "CIÊNCIA DA COMPUTAÇÃO NOTURNO"]),
        _.find(this.Cursos, ["nome", "CIÊNCIA DA COMPUTAÇÃO DIURNO"]),
        _.find(this.Cursos, ["nome", "SISTEMAS DE INFORMAÇÃO"]),
        _.find(this.Cursos, ["nome", "ENGENHARIA COMPUTACIONAL"])
      );
      return cursosResultantes;
    },
    TurmasOrdered() {
      let turmasResult = _.orderBy(
        this.TurmasFiltredByDisciplinas,
        [this.ordenacaoMain.turmas.order, "letra"],
        [this.ordenacaoMain.turmas.type, "asc"]
      );

      if (this.ordenacaoMain.perfis.order !== null) {
        turmasResult = _.orderBy(
          turmasResult,
          this.ordenacaoMain.perfis.order,
          this.ordenacaoMain.perfis.type
        );
      }

      return _.orderBy(turmasResult, "periodo");
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
      return _.filter(this.TurmasInDisciplinas, (turma) => {
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
    TurmasInDisciplinas() {
      let turmasResultantes = [];

      _.forEach(this.Turmas, (turma) => {
        const disciplinaInPerfilFounded = _.find(
          this.DisciplinasInPerfis,
          (disciplina) => disciplina.id === turma.Disciplina
        );

        if (disciplinaInPerfilFounded) {
          turmasResultantes.push({
            ...turma,
            disciplinaNome: disciplinaInPerfilFounded.nome,
            disciplinaCodigo: disciplinaInPerfilFounded.codigo,
            disciplinaPerfil: disciplinaInPerfilFounded.Perfil,
            perfilCor: disciplinaInPerfilFounded.perfilCor,
            perfilNome: disciplinaInPerfilFounded.perfilNome,
            perfilAbreviacao: disciplinaInPerfilFounded.perfilAbreviacao,
          });
        }
      });
      return turmasResultantes;
    },

    DisciplinasOrderedModal() {
      return _.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasFiltredModal() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasInPerfis;

      const searchNormalized = this.normalizeText(this.searchDisciplinasModal);

      return _.filter(this.DisciplinasInPerfis, (disciplina) => {
        const disciplinaNome = this.normalizeText(disciplina.nome);
        const disciplinaCodigo = this.normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    Perfis() {
      return _.filter(
        this.$store.state.perfil.Perfis,
        (perfil) => perfil.id !== 13 && perfil.id !== 15
      );
    },
    Disciplinas() {
      return _.filter(
        this.$store.state.disciplina.Disciplinas,
        (disciplina) => disciplina.Perfil !== 13 && disciplina.Perfil !== 15
      );
    },
    DisciplinasInPerfis() {
      const disciplinasResultantes = [];

      this.Disciplinas.forEach((disciplina) => {
        const perfilFounded = _.find(
          this.Perfis,
          (perfil) => perfil.id === disciplina.Perfil
        );

        if (perfilFounded) {
          disciplinasResultantes.push({
            ...disciplina,
            perfilNome: perfilFounded.nome,
            perfilAbreviacao: perfilFounded.abreviacao,
            perfilCor: perfilFounded.cor,
          });
        }
      });
      return disciplinasResultantes;
    },
    ModalCursosOrdered() {
      return _.orderBy(
        this.ModalCursosFiltred,
        this.ordenacaoModal.cursos.order,
        this.ordenacaoModal.cursos.type
      );
    },
    ModalCursosFiltred() {
      let cursosResultantes = this.Cursos;

      if (this.searchCursosModal !== "") {
        const searchNormalized = this.normalizeText(this.searchCursosModal);

        cursosResultantes = _.filter(cursosResultantes, (curso) => {
          const cursoNome = this.normalizeText(curso.nome);
          const cursoCodigo = this.normalizeText(curso.codigo);

          return (
            cursoNome.match(searchNormalized) ||
            cursoCodigo.match(searchNormalized)
          );
        });
      }
      return cursosResultantes;
    },
    setFixedOrderPerfil() {
      if (this.ordenacaoMain.perfis.type === "desc") return null;
      else return "perfilAbreviacao";
    },
    PerfisOrderedModal() {
      return _.orderBy(
        this.Perfis,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    Cursos() {
      return this.$store.state.curso.Cursos;
    },
    DisciplinasId() {
      return _.map(this.Disciplinas, (disciplina) => disciplina.id);
    },
    Turmas() {
      return _.filter(
        this.$store.state.turma.Turmas,
        (turma) => !_.isNull(turma.Disciplina)
      );
    },
    Deletar() {
      return this.$store.state.turma.Deletar;
    },
    Pedidos() {
      return this.$store.state.pedido.Pedidos;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
    Admin() {
      return this.$store.state.auth.Usuario.admin === 1;
    },
  },
  watch: {
    tableIsReady(newValue) {
      this.$root.onLoad = !newValue;
    },
    filtroPerfis: {
      handler(perfis) {
        this.modalSelectNone.Disciplinas();
        const disciplinasResultantes = [];

        this.Disciplinas.forEach((disciplina) => {
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
.stickyAdd {
  background-color: #e9e9e9;
  display: block;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 19px !important;
  overflow: hidden !important;
  z-index: 5 !important;
}

.turma-header {
  font-size: 11px !important;
}
.turma-header th {
  margin: 0 !important;
  padding: 0 5px;
  height: 18px !important;
  vertical-align: middle !important;
  text-align: center;
  word-wrap: none;
  word-break: break-word;
  user-select: none;
}
.cursoGrande {
  font-size: 7px !important;
}
.turma-header p {
  margin: 0;
}
</style>
