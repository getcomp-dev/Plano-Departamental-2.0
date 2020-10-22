<template>
  <div class="main-component row" v-if="isEditable">
    <PageHeader :title="'Graduação - DCC'">
      <BaseButton
        v-show="isAdding"
        template="salvar"
        @click="$refs.novaTurma.handleCreateTurma()"
      />
      <BaseButton v-show="isAdding" template="cancelar" @click="toggleIsAdding" />
      <BaseButton v-show="!isAdding" template="adicionar" @click="toggleIsAdding" />
      <BaseButton
        v-show="!isAdding"
        template="deletar"
        title="Deletar selecionados"
        @click="$refs.modalDelete.open()"
      />
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="generateXlsx" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th width="25" />
          <v-th width="40" paddingX="0">Editar</v-th>
          <v-th width="55" paddingX="0" title="Período letivo, ordenação fixa">
            <font-awesome-icon :icon="['fas', 'thumbtack']" />
            P.
          </v-th>
          <v-th-ordination
            :orderFixed="true"
            :currentOrder="ordenacaoMain.perfis"
            orderToCheck="disciplina.perfil.abreviacao"
            width="80"
            align="start"
            >Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.turmas"
            orderToCheck="disciplina.codigo"
            width="80"
            >Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.turmas"
            orderToCheck="disciplina.nome"
            width="330"
            align="start"
            text=""
            >Disciplina
          </v-th-ordination>
          <v-th width="25" paddingX="0" title="Créditos">C.</v-th>
          <v-th width="45" paddingX="0" title="Turma">T.</v-th>
          <v-th width="160" align="start">Docente </v-th>
          <v-th width="80">Turno</v-th>
          <v-th width="85">Horário</v-th>
          <v-th width="95">Sala</v-th>
          <v-th width="45" title="Total de vagas">Total</v-th>
          <v-th
            width="35"
            paddingX="0"
            v-for="curso in filtroCursos.ativados"
            :key="curso.id + curso.codigo"
            v-b-popover.hover.bottom="{
              title: curso.nome,
              content: cursoPopoverContent(curso),
            }"
          >
            <span :class="['w-100', { 'curso-codigo-big': nameIsBig(curso.codigo) }]"
              >{{ curso.codigo }}
            </span>
          </v-th>
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
            :key="turma.id + turma.letra"
            :turma="turma"
            :cursosAtivados="filtroCursos.ativados"
            @click-edit="openModalEditTurma($event)"
          />

          <tr v-show="!TurmasOrdered.length">
            <v-td :width="1145 + 35 * filtroCursos.ativados.length">
              <b>Nenhuma turma encontrada.</b> Clique no botão de filtros
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
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.perfis"
            orderToCheck="nome"
            width="425"
            align="start"
            text="Nome"
          />
        </template>
        <template #tbody>
          <tr
            v-for="perfil in PerfisOptionsOrdered"
            :key="perfil.id + perfil.nome"
            @click.stop="selectPerfis(perfil)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="perfil"
                v-model="filtroPerfis.selecionados"
                :indeterminate.prop="perfil.halfChecked"
                @click.stop="selectPerfis(perfil)"
              />
            </v-td>
            <v-td width="425" align="start">{{ perfil.nome }}</v-td>
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
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="codigo"
            width="70"
            align="start"
            text="Código"
          />

          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="270"
            align="start"
            text="Nome"
          />

          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
            text="Perfil"
          />
        </template>
        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click.stop="selectDisciplina(disciplina)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
                @click.stop="selectDisciplina(disciplina)"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td align="start" width="270" :title="disciplina.nome">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>
          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">
              NENHUMA DISCIPLINA ENCONTRADA.
            </v-td>
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
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="codigo"
            width="70"
            align="start"
            text="Código"
          />
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="nome"
            width="355"
            align="start"
            text="Nome"
          />
        </template>
        <template #tbody>
          <tr
            v-for="curso in CursosOptionsOrdered"
            :key="curso.id + curso.nome"
            @click.stop="toggleItemInArray(curso, filtroCursos.selecionados)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                v-model="filtroCursos.selecionados"
                :value="curso"
                class="form-check-input position-static m-0"
              />
            </v-td>
            <v-td width="70" align="start">{{ curso.codigo }}</v-td>
            <v-td width="355" align="start">{{ curso.nome }}</v-td>
          </tr>
          <tr v-show="!CursosOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUM CURSO ENCONTRADO.</v-td>
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
            @click.stop="selecionaPeriodo(periodo, filtroPeriodos.selecionados)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :value="periodo"
                v-model="filtroPeriodos.selecionados"
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
            @click.stop="selecionaSemestre(semestre)"
          >
            <v-td width="25">
              <input
                type="checkbox"
                class="form-check-input position-static m-0"
                :indeterminate.prop="semestre.halfChecked"
                :value="semestre"
                v-model="filtroSemestres.selecionados"
                @click.stop="selecionaSemestre(semestre)"
              />
            </v-td>
            <v-td width="425" align="start">{{ semestre.nome }} </v-td>
          </tr>
        </template>
      </BaseTable>

      <template #modal-footer-btn>
        <BaseButton
          v-if="modalFiltrosTabs.current === 'Cursos'"
          text="Cursos DCC"
          color="lightblue"
          @click="selectCursosDCC"
        />
      </template>
    </ModalFiltros>

    <ModalEditTurma
      ref="modalEditTurma"
      :turma="turmaClicked"
      :hasEditDisciplina="true"
    />

    <ModalDelete
      ref="modalDelete"
      :isDeleting="!!TurmasToDelete.length"
      :hasClearDelete="true"
      @btn-deletar="handleDeleteTurmas"
      @btn-clear="clearTurmasToDelete"
    >
      <li v-if="!TurmasToDelete.length" class="list-group-item">
        Nenhuma turma selecionada.
      </li>
      <li
        v-for="turma in TurmasToDelete"
        class="list-group-item"
        :key="turma.id + turma.letra + turma.periodo"
      >
        <span>
          <b>Período:</b>
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
        cabeçalho da página e, na janela que se abrirá, utilize as abas para navegar
        entre os tipos de filtro disponíveis. Marque quais informações deseja
        visualizar, e para finalizar clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Adicionar turma:</b>
        Clique no ícone de adicionar
        <font-awesome-icon :icon="['fas', 'plus']" class="icon-green" /> no cabeçalho
        da página. Em seguida, preencha a nova linha que irá aparecer no início da
        tabela. Note que os campos disciplina, turno e turma são obrigatórios. Após
        preencher os campos, clique no ícone de salvar
        <font-awesome-icon :icon="['fas', 'check']" class="icon-green" /> ou de
        cancelar <font-awesome-icon :icon="['fas', 'times']" class="icon-gray" />.
      </li>
      <li class="list-group-item">
        <b>Deletar turma(s):</b> Marque a(s) turma(s) que deseja deletar através da
        caixa de seleção na coluna mais à esquerda da tabela. Em seguida, clique no
        ícone de deletar
        <font-awesome-icon :icon="['fas', 'trash']" class="icon-red" /> no cabeçalho
        da página. Confirme a exclusão clicando no botão OK na janela que se abrirá.
      </li>
      <li class="list-group-item">
        <b>Editar turma:</b>
        Existem duas formas de se fazer alterações em uma turma. A primeira forma
        envolve modificar diretamente os campos na tabela. Neste caso, o sistema
        salvará automaticamente cada alteração. Na segunda forma, deve-se clicar no
        ícone
        <font-awesome-icon :icon="['fas', 'edit']" class="icon-darkgray" />
        presente na couna "Editar". Uma janela de edição irá se abrir. Neste caso, as
        alterações realizadas nos campos da metade superior da janela somente serão
        enviadas ao clicar no botão "Salvar". Já para o quantitativo de vagas na
        parte inferior, as alterações serão salvas automaticamente.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b> Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" /> e aguarde
        o download do arquivo (.xlsx) iniciar.
      </li>
      <li class="list-group-item">
        <b>Observações:</b> Em cada coluna de um curso, para cada disciplina, existem
        dois campos de vagas. O campo superior é destinado às vagas de grade, e o
        inferior é referente às vagas para alunos não periodizados. Para que uma
        turma apareça na grade horária de um determinado curso, na página "Horários",
        é preciso que pelo menos uma vaga de grade seja destinada a este curso.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { saveAs } from "file-saver";
import ls from "local-storage";
import xlsx from "@/common/services/xlsx";
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  cursoPopoverContent,
  conectaFiltroPerfisEDisciplinas,
  conectaFiltrosSemestresEPeriodos,
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
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    cursoPopoverContent,
    conectaFiltrosSemestresEPeriodos,
    conectaFiltroPerfisEDisciplinas,
  ],
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
        array: ["Perfis", "Disciplinas", "Cursos", "Períodos", "Semestres"],
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
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Cursos: () => {
            this.filtroCursos.selecionados = [...this.AllCursos];
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
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
            this.filtroPerfis.selecionados = [];
          },
          Cursos: () => {
            this.filtroCursos.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
            this.filtroSemestres.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroDisciplinas.ativadas = [...this.filtroDisciplinas.selecionados];
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

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();

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
    this.clearTurmasToDelete();

    ls.off("toggle");
    for (var c = 0; c < this.AllCursos.length; c++) {
      let id = this.AllCursos[c].id;
      ls.off(`${id}`);
    }
  },

  methods: {
    ...mapActions(["deleteTurmas", "clearTurmasToDelete"]),

    openModalEditTurma(turma) {
      this.turmaClicked = turma;
      this.$refs.modalEditTurma.open();
    },
    selectCursosDCC() {
      this.filtroCursos.selecionados = [...this.CursosDCC];
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
    async handleDeleteTurmas() {
      try {
        this.setPartialLoading(true);
        await this.deleteTurmas();
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
      "AllCursos",
      "CursosDCC",
      "PerfisDCC",
      "DisciplinasDCCInPerfis",
      "TurmasInDisciplinasPerfis",
      "TurmasToDelete",
      "currentPlano"
    ]),

    isEditable() {
      return this.currentPlano.isEditable
    },

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
      return this.$_.filter(this.TurmasFiltredByPeriodos, (turma) =>
        this.$_.some(
          this.filtroDisciplinas.ativadas,
          (disciplina) => disciplina.id === turma.Disciplina
        )
      );
    },
    TurmasFiltredByPeriodos() {
      return this.$_.filter(this.TurmasInDisciplinasPerfis, (turma) =>
        this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );
    },
    // Modals Options
    PerfisOptionsOrdered() {
      return this.$_.orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.$_.map(this.PerfisDCC, (perfil) => {
        const todasDisciplinasDoPerfil = this.$_.filter(this.DisciplinasOptions, [
          "Perfil",
          perfil.id,
        ]);
        const disciplinasSelecionadas = this.$_.filter(
          this.filtroDisciplinas.selecionados,
          ["Perfil", perfil.id]
        );

        let halfChecked = false;
        if (todasDisciplinasDoPerfil.length === disciplinasSelecionadas.length) {
          halfChecked = false;
        } else if (disciplinasSelecionadas.length > 0) {
          halfChecked = true;
        }

        return {
          ...perfil,
          halfChecked,
        };
      });
    },

    DisciplinasOptionsOrdered() {
      return this.$_.orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinasModal);

      return this.$_.filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptions() {
      return this.DisciplinasDCCInPerfis;
    },

    CursosOptionsOrdered() {
      return this.$_.orderBy(
        this.CursosOptionsFiltered,
        this.ordenacaoModal.cursos.order,
        this.ordenacaoModal.cursos.type
      );
    },
    CursosOptionsFiltered() {
      if (this.searchCursosModal === "") return this.AllCursos;

      const searchNormalized = normalizeText(this.searchCursosModal);

      return this.$_.filter(this.AllCursos, (curso) => {
        const nome = normalizeText(curso.nome);
        const codigo = normalizeText(curso.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
  },
};
</script>

<style scoped>
.curso-codigo-big {
  font-size: 7px !important;
}
</style>
