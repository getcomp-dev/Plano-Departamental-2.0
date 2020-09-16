<template>
  <div class="main-component row">
    <PageHeader :title="'Graduação - DCC'">
      <template v-if="isAdding">
        <BaseButton
          title="Salvar"
          :type="'icon'"
          :color="'green'"
          @click="$refs.novaTurma.handleAddNovaTurma()"
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
          <th style="width:55px" title="Período letivo, ordenação fixa">
            <font-awesome-icon :icon="['fas', 'thumbtack']" />
            P.
          </th>

          <ThOrdination
            :type="'fixed'"
            :text="'Perfil'"
            :currentOrder="ordenacaoMain.perfis"
            :orderToCheck="'disciplina.perfil.abreviacao'"
            style="width: 80px"
            class="t-start"
          />

          <ThOrdination
            :text="'Código'"
            :currentOrder="ordenacaoMain.turmas"
            :orderToCheck="'disciplina.codigo'"
            style="width:80px"
          />

          <ThOrdination
            :text="'Disciplina'"
            :currentOrder="ordenacaoMain.turmas"
            :orderToCheck="'disciplina.nome'"
            style="width:330px"
            class="t-start"
          />

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
            v-b-popover.hover.bottom="{
              title: curso.nome,
              content: cursoPopoverContent(curso),
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
            :key="turma.id + turma.letra"
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
          <ThOrdination
            :text="'Nome'"
            :currentOrder="ordenacaoModal.perfis"
            :orderToCheck="'nome'"
            class="t-start"
            style="width: 425px"
          />
        </template>
        <template #tbody>
          <tr
            v-for="perfil in PerfisOrderedModal"
            :key="perfil.id + perfil.nome"
            @click.stop="toggleItemInArray(perfil, filtroPerfis.selecionados)"
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
          <ThOrdination
            :text="'Código'"
            :currentOrder="ordenacaoModal.disciplinas"
            :orderToCheck="'codigo'"
            class="t-start"
            style="width: 70px"
          />

          <ThOrdination
            :text="'Nome'"
            :currentOrder="ordenacaoModal.disciplinas"
            :orderToCheck="'nome'"
            class="t-start"
            style="width: 270px"
          />

          <ThOrdination
            :text="'Perfil'"
            :currentOrder="ordenacaoModal.disciplinas"
            :orderToCheck="'perfil.abreviacao'"
            class="t-start"
            style="width: 85px"
          />
        </template>
        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasDCCOrderedModal"
            :key="disciplina.id + disciplina.nome"
            @click.stop="
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
          <ThOrdination
            :text="'Código'"
            :currentOrder="ordenacaoModal.cursos"
            :orderToCheck="'codigo'"
            class="t-start"
            style="width: 70px"
          />
          <ThOrdination
            :text="'Nome'"
            :currentOrder="ordenacaoModal.cursos"
            :orderToCheck="'nome'"
            class="t-start"
            style="width: 355px"
          />
        </template>
        <template #tbody>
          <tr
            v-for="curso in CursosOrderedModal"
            :key="curso.id + curso.nome"
            @click.stop="toggleItemInArray(curso, filtroCursos.selecionados)"
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                v-model="filtroCursos.selecionados"
                :value="curso"
                class="form-check-input position-static m-0"
              />
            </td>
            <td style="width: 70px;" class="t-start">{{ curso.codigo }}</td>
            <td style="width: 355px" class="t-start">{{ curso.nome }}</td>
          </tr>
          <tr v-show="CursosOrderedModal.length === 0">
            <td colspan="3" style="width:450px">NENHUM CURSO ENCONTRADO.</td>
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
import { normalizeText, generateEmptyTurma } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  cursoPopoverContent,
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
        ativados: [],
        selecionados: [],
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
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = [];
          },
          Cursos: () => {
            this.filtroCursos.selecionados = [];
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
    this.filtroPeriodos.selecionados = this.$_.filter(
      this.PeriodosLetivos,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );

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
      "PeriodosLetivos",
      "SemestresLetivos",
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
      return this.$_.filter(this.TurmasFiltredByPeriodos, (turma) =>
        this.$_.some(
          this.filtroDisciplinas.ativadas,
          (disciplinaId) => disciplinaId === turma.Disciplina
        )
      );
    },
    TurmasFiltredByPeriodos() {
      return this.$_.filter(this.TurmasInDisciplinasPerfis, (turma) =>
        this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );
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
  },

  watch: {
    filtroPerfis: {
      handler(filtroPerfis) {
        const disciplinasResultantes = [];

        this.DisciplinasDCCInPerfis.forEach((disciplina) => {
          const perfilFounded = this.$_.some(
            filtroPerfis.selecionados,
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
