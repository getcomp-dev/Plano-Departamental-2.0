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
          <font-awesome-icon :icon="['fas', 'check']" />
        </BaseButton>

        <BaseButton
          title="Cancelar"
          :type="'icon'"
          :color="'gray'"
          @click="toggleIsAdding"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </BaseButton>
      </template>

      <template v-else>
        <BaseButton
          title="Adicionar"
          :type="'icon'"
          :color="'green'"
          @click="toggleIsAdding"
        >
          <font-awesome-icon :icon="['fas', 'plus']" />
        </BaseButton>

        <BaseButton
          title="Deletar selecionados"
          :type="'icon'"
          :color="'red'"
          @click="$refs.modalDelete.open()"
        >
          <font-awesome-icon :icon="['fas', 'trash']" />
        </BaseButton>
      </template>

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
        @click="generateXlsx"
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
              <span>Perfil</span>

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
          <th style="width:25px" title="Créditos">C.</th>
          <th style="width:45px" class="p-0" title="Turma">T.</th>
          <th style="width:130px">Docente</th>
          <th style="width:80px">Turno</th>
          <th style="width:85px">Horário</th>
          <th style="width:95px">Sala</th>
          <th style="width:45px" title="Total de vagas">Total</th>
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
              >{{ curso.codigo }}</span
            >
          </th>
        </template>

        <template #add-row>
          <NovaTurmaRow
            ref="novaTurma"
            v-show="isAdding"
            :cursosAtivadosLength="filtroCursos.ativados.length"
          />
        </template>

        <template #tbody>
          <TurmaRow
            v-for="turma in TurmasOrdered"
            :key="turma.id + turma.disciplina.codigo + turma.letra"
            :turma="turma"
            :cursosAtivados="filtroCursos.ativados"
            @handle-click-in-edit="openModalEditTurma($event)"
          />

          <tr v-show="TurmasOrdered.length === 0">
            <td style="width:1115px">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </td>
            <td
              v-if="filtroCursos.ativados.length"
              :style="`width: ${35 * filtroCursos.ativados.length}px`"
            ></td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
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
            <td style="width: 425px" class="t-start">{{ perfil.nome }}</td>
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
            v-model="searchDisciplinasModal"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <th style="width:25px"></th>
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
            <i :class="setIconByOrder(ordenacaoModal.disciplinas, 'nome')"></i>
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
            <td style="width: 70px" class="t-start">{{ disciplina.codigo }}</td>
            <td style="width: 270px" class="t-start">{{ disciplina.nome }}</td>
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
        type="modal"
        v-show="modalFiltrosTabs.current === 'Cursos'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <InputSearch
            v-model="searchCursosModal"
            placeholder="Pesquise nome ou codigo de um curso..."
          />
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
            <td style="width: 50px;" class="t-start">{{ curso.codigo }}</td>
            <td style="width: 375px" class="t-start">{{ curso.nome }}</td>
          </tr>
          <tr v-show="CursosOrderedModal.length === 0">
            <td colspan="3" style="width:450px">NENHUM CURSO ENCONTRADO.</td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Semestres'">
        <template #thead>
          <th style="width: 25px"></th>
          <th style="width: 425px" class="t-start">Semestre Letivo</th>
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

      <template #modal-footer-btn>
        <BaseButton
          v-if="modalFiltrosTabs.current === 'Cursos'"
          type="text"
          color="lightblue"
          @click="selectCursosDCC()"
          >Cursos DCC</BaseButton
        >
      </template>
    </ModalFiltros>

    <ModalEditTurma
      ref="modalEditTurma"
      :turma="turmaClicked"
      :hasEditDisciplina="true"
    />

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
        :key="'delete' + turma.id"
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
        <b>Adicionar turma:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" /> no
        cabeçalho da página. Em seguida, preencha a nova linha que irá aparecer
        no início da tabela. Note que os campos disciplina, turno e turma são
        obrigatórios. Após preencher os campos, clique no ícone de salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" /> ou de
        cancelar
        <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />.
      </li>
      <li class="list-group-item">
        <b>Deletar turma(s):</b> Marque a(s) turma(s) que deseja deletar através
        da caixa de seleção na coluna mais à esquerda da tabela. Em seguida,
        clique no ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" /> no
        cabeçalho da página. Confirme a exclusão clicando no botão OK na janela
        que se abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar turma:</b>
        Existem duas formas de se fazer alterações em uma turma. A primeira
        forma envolve modificar diretamente os campos na tabela. Neste caso, o
        sistema salvará automaticamente cada alteração. Na segunda forma,
        deve-se clicar no ícone
        <font-awesome-icon :icon="['fas', 'edit']" class="icon-darkgray" />
        presente na couna "Editar". Uma janela de edição irá se abrir. Neste
        caso, as alterações realizadas nos campos da metade superior da janela
        somente serão enviadas ao clicar no botão "Salvar". Já para o
        quantitativo de vagas na parte inferior, as alterações serão salvas
        automaticamente.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b> Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" /> e
        aguarde o download do arquivo (.xlsx) iniciar.
      </li>
      <li class="list-group-item">
        <b>Observações:</b> Em cada coluna de um curso, para cada disciplina,
        existem dois campos de vagas. O campo superior é destinado às vagas de
        grade, e o inferior é referente às vagas para alunos não periodizados.
        Para que uma turma apareça na grade horária de um determinado curso, na
        página "Horários", é preciso que pelo menos uma vaga de grade seja
        destinada a este curso.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { saveAs } from "file-saver";
import ls from "local-storage";
import xlsx from "@/common/services/xlsx";
import turmaService from "@/common/services/turma";
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import {
  toggleOrdination,
  toggleItemInArray,
  toggleAsideModal,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import {
  ModalDelete,
  ModalFiltros,
  ModalEditTurma,
  ModalAjuda,
} from "@/components/modals";

import NovaTurmaRow from "./NovaTurmaRow.vue";
import TurmaRow from "./TurmaRow.vue";

export default {
  name: "TurmasDCC",
  mixins: [toggleOrdination, toggleItemInArray, toggleAsideModal],
  components: {
    ModalAjuda,
    ModalFiltros,
    ModalDelete,
    TurmaRow,
    NovaTurmaRow,
    ModalEditTurma,
    InputSearch,
  },
  data() {
    return {
      isAdding: false,
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
      turmaClicked: generateEmptyTurma(),
      searchCursosModal: "",
      searchDisciplinasModal: "",
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Cursos", "Semestres"],
      },
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
          Cursos: () => {
            this.filtroCursos.selecionados = [...this.AllCursos];
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
          Cursos: () => {
            this.filtroCursos.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.setSemestreAtivo();
          this.filtroDisciplinas.ativadas = [
            ...this.filtroDisciplinas.selecionados,
          ];

          this.filtroCursos.ativados = [
            ...this.$_.orderBy(this.filtroCursos.selecionados, ["posicao"]),
          ];
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
    ...mapActions(["clearDelete"]),

    openModalEditTurma(turma) {
      this.turmaClicked = turma;
      this.$refs.modalEditTurma.open();
    },
    selectCursosDCC() {
      this.filtroCursos.selecionados = [...this.CursosDCC];
    },
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    popoverCursoContent(curso) {
      const { semestreInicial, alunosEntrada, alunosEntrada2 } = curso;

      if (semestreInicial == 1) return `<b>1º</b> - ${alunosEntrada}`;
      else if (semestreInicial == 2) return `<b>2º</b> - ${alunosEntrada2}`;
      else
        return `<b>1º</b> - ${alunosEntrada} <br/> <b>2º</b> - ${alunosEntrada2}`;
    },
    toggleIsAdding() {
      this.isAdding = !this.isAdding;
    },
    nameIsBig(nome) {
      if (nome.length > 4) return true;
      else return false;
    },

    async generateXlsx() {
      try {
        this.setPartialLoading(true);
        await xlsx.downloadTable({
          pedidos: this.$store.state.pedido.Pedidos,
          Plano: localStorage.getItem("Plano"),
        });
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
        this.pushNotification({
          type: "error",
          title: "Erro ao gerar a tabela!",
          text: "Tente novamente",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
    async deleteSelectedTurmas() {
      if (!this.Deletar.length) return;

      try {
        this.setPartialLoading(true);

        for (let i = 0; i < this.Deletar.length; i++) {
          await turmaService.delete(this.Deletar[i].id);
        }

        this.clearDelete();
        this.pushNotification({
          type: "success",
          text: "Turma(s) selecionadas foram excluída(s)",
        });
      } catch (error) {
        this.pushNotification({
          type: "error",
          text: "Erro ao excluir turma(s).",
        });
      } finally {
        this.setPartialLoading(false);
      }
    },
  },

  computed: {
    ...mapGetters([
      "AllCursos",
      "CursosDCC",
      "PerfisDCC",
      "DisciplinasDCCInPerfis",
      "TurmasInDisciplinasPerfis",
    ]),

    TurmasOrdered() {
      const { turmas, perfis } = this.ordenacaoMain;

      //Se não possui ordenação de perfil fixada
      if (this.ordenacaoMain.perfis.order === null) {
        return this.$_.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", turmas.order],
          ["asc", turmas.type]
        );
      } else
        return this.$_.orderBy(
          this.TurmasFiltredByDisciplinas,
          ["periodo", perfis.order, turmas.order],
          ["asc", perfis.type, turmas.type]
        );
    },
    TurmasFiltredByDisciplinas() {
      return this.$_.filter(this.TurmasFiltredBySemestres, (turma) =>
        this.$_.find(
          this.filtroDisciplinas.ativadas,
          (disciplinaId) => disciplinaId === turma.Disciplina
        )
      );
    },
    TurmasFiltredBySemestres() {
      return this.$_.filter(this.TurmasInDisciplinasPerfis, (turma) => {
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
    // tables modal
    PerfisOrderedModal() {
      return this.$_.orderBy(
        this.PerfisDCC,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    DisciplinasDCCOrderedModal() {
      return this.$_.orderBy(
        this.DisciplinasDCCFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasDCCFiltredModal() {
      if (this.searchDisciplinasModal === "")
        return this.DisciplinasDCCInPerfis;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasDCCInPerfis, (disciplina) => {
        const disciplinaNome = normalizeText(disciplina.nome);
        const disciplinaCodigo = normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    CursosOrderedModal() {
      return this.$_.orderBy(
        this.CursosFiltredModal,
        this.ordenacaoModal.cursos.order,
        this.ordenacaoModal.cursos.type
      );
    },
    CursosFiltredModal() {
      let cursosResultantes = this.AllCursos;

      if (this.searchCursosModal !== "") {
        const searchNormalized = normalizeText(this.searchCursosModal);

        cursosResultantes = this.$_.filter(cursosResultantes, (curso) => {
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
      handler(filtroPerfis) {
        const disciplinasResultantes = [];

        this.DisciplinasDCCInPerfis.forEach((disciplina) => {
          const perfilFounded = this.$_.find(
            filtroPerfis.selecionados,
            (perfil) => perfil.id === disciplina.Perfil
          );

          if (perfilFounded) disciplinasResultantes.push(disciplina.id);
        });

        //Quando selecionar todos add disciplinas MAC exeções
        if (filtroPerfis.selecionados.length === this.PerfisDCC.length)
          disciplinasResultantes.push(77, 88);

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
