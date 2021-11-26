<template>
  <div class="main-component row p-0">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="download" @click="toggleAsideModal('DownloadTurmasCursos')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th-ordination
            :currentOrder="ordenacaoTable.cursos"
            orderToCheck="codigo"
            width="85"
            paddingX="0"
            title="Código do curso"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoTable.cursos"
            orderToCheck="nome"
            width="300"
            align="start"
            title="Nome do Curso"
          >
            Curso
          </v-th-ordination>
          <v-th width="65" title="Período letivo, ordenação fixa">Periodo</v-th>
          <v-th width="95" title="Código da Disciplina">Cód. Disciplina</v-th>
          <v-th width="45" title="Turma">Turma</v-th>
          <v-th width="120" title="Horário">Horário</v-th>
          <v-th width="45" paddingX="0" title="Vagas do Plano Grade+Extra">Vagas</v-th>
        </template>

        <template #tbody>
          <template v-if="CursosOrderedTable.length && TurmasFiltered.length">
            <template v-for="curso in CursosOrderedTable">
              <tr :key="curso.id" class="bg-custom">
                <v-td width="85">{{ curso.codigo }}</v-td>
                <v-td width="300" align="start" :title="curso.nome">{{ curso.nome }}</v-td>
                <v-td width="65"></v-td>
                <v-td width="95"></v-td>
                <v-td width="40"></v-td>
                <v-td width="120"></v-td>
                <v-td width="45"></v-td>
              </tr>

              <tr
                v-for="turma in getTurmasDoCurso(curso.id)"
                :key="curso.id + turma.letra + turma.id"
              >
                <v-td width="85"></v-td>
                <v-td width="300"></v-td>
                <v-td width="65">{{ turma.periodo }}</v-td>
                <v-td width="95" :title="turma.disciplina.nome">{{ turma.disciplina.codigo }}</v-td>
                <v-td width="45">{{ turma.letra }}</v-td>
                <v-td width="120">{{ generateHorariosText(turma.Horario1, turma.Horario2) }}</v-td>
                <v-td width="45">
                  {{
                    turma.pedidoDoCurso.vagasPeriodizadas + turma.pedidoDoCurso.vagasNaoPeriodizadas
                  }}
                </v-td>
              </tr>
            </template>
          </template>
          <tr v-else-if="!CursosOrderedTable.length">
            <v-td colspan="7" width="755">
              <b>Nenhum curso encontrado.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-los.
            </v-td>
          </tr>

          <tr v-else-if="!TurmasFiltered.length">
            <v-td colspan="7" width="755">
              <b>Nenhuma disciplina encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalRelatorio ref="modalRelatorio" @selection-option="generatePdf($event)" />

    <ModalDownloadTurmasCursos
      ref="modalDownloadTurmasCursos"
      @selection-option="downloadFiles($event)"
    />

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Cursos'" :hasSearchBar="true">
        <template #thead-search>
          <VInputSearch
            v-model="searchCursos"
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
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="nome"
            width="270"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="turno"
            width="85"
            align="start"
          >
            Turno
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="curso in CursosOptionsOrdered"
            :key="curso.id + curso.nome"
            @click="toggleItemInArray(curso, filtroCursos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroCursos.selecionados" :value="curso" />
            </v-td>
            <v-td width="70" align="start">{{ curso.codigo }}</v-td>
            <v-td align="start" width="270" :title="curso.nome">
              {{ curso.nome }}
            </v-td>
            <v-td width="85" align="start">{{ curso.turno }}</v-td>
          </tr>

          <tr v-if="!CursosOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUM CURSO ENCONTRADO</v-td>
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

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.perfis"
            orderToCheck="nome"
            width="425"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="perfil in PerfisOptionsOrdered"
            :key="perfil.id + perfil.nome"
            @click.stop="selectPerfis(perfil)"
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPerfis.selecionados"
                :value="perfil"
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
          <VInputSearch
            v-model="searchDisciplinas"
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
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="270"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
          >
            Perfil
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="selectDisciplina(disciplina)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
                @click.stop="selectDisciplina(disciplina)"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td align="start" width="270">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>

          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as informações que
        deseja visualizar e clique em OK.
      </li>

      <li class="list-group-item">
        <b>Relatório :</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com todas as disciplinas ou o
        relatório parcial com as disciplinas exibidas na tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { orderBy, union, difference, filter } from "lodash-es";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
  generateHorariosText,
  conectaFiltroPerfisEDisciplinas,
} from "@/common/mixins";
import {
  ModalRelatorio,
  ModalAjuda,
  ModalFiltros,
  ModalDownloadTurmasCursos,
} from "@/components/modals";
import { VInputSearch } from "@/components/ui";
import downloadService from "@/services/download";
import { saveAs } from "file-saver";

export default {
  name: "TurmasCursos",
  components: {
    ModalRelatorio,
    ModalFiltros,
    ModalAjuda,
    VInputSearch,
    ModalDownloadTurmasCursos,
  },
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
    generateHorariosText,
    conectaFiltroPerfisEDisciplinas,
  ],
  data() {
    return {
      searchCursos: "",
      searchDisciplinas: "",
      asideModalsRefs: [
        "modalAjuda",
        "modalRelatorio",
        "modalFiltros",
        "modalDownloadTurmasCursos",
      ],
      ordenacaoTable: {
        cursos: { order: "codigo", type: "asc" },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
      },
      filtroCursos: {
        selecionados: [],
        ativados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Cursos",
        array: ["Cursos", "Períodos", "Semestres", "Perfis", "Disciplinas"],
      },
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Cursos: () => {
            this.filtroCursos.selecionados = [...this.CursosOptionsFiltered];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresOptions];
            this.filtroPeriodos.selecionados = [...this.PeriodosOptions];
          },
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = union(
              this.DisciplinasOptionsFiltered,
              this.filtroDisciplinas.selecionados
            );
            this.conectaDisciplinasEmPerfis();
          },
        },
        selectNone: {
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
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = difference(
              this.filtroDisciplinas.selecionados,
              this.DisciplinasOptionsFiltered
            );
            this.conectaDisciplinasEmPerfis();
          },
        },
        btnOk: () => {
          this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();
    this.modalFiltrosCallbacks.selectAll.Cursos();
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    getTurmasDoCurso(cursoId) {
      const turmas = [];
      this.TurmasFiltered.forEach((turma) => {
        const pedidoDoCurso = this.Pedidos[turma.id].find((pedido) => pedido.Curso === cursoId);

        if (pedidoDoCurso.vagasPeriodizadas > 0 || pedidoDoCurso.vagasNaoPeriodizadas > 0)
          turmas.push({ ...turma, pedidoDoCurso });
      });
      return orderBy(turmas, ["periodo", "disciplina.codigo", "letra"]);
    },
    async downloadFiles(periodo) {
      try {
        this.setLoading({ type: "partial", value: true });
        await downloadService.generatePdfTurmasCurso({ Plano: this.currentPlano.id, periodo });
        await downloadService.createZipTurmasCursos();
        const downloadData = await fetch(
          "http://200.131.219.57:3000/api/download/downloadTurmasCursosZip",
          {
            method: "GET",
            headers: { Authorization: `Bearer ${this.$store.state.auth.token}` },
          }
        );
        const downloadDataBlob = await downloadData.blob();
        saveAs(downloadDataBlob, "TurmasCursos.zip");
      } catch (error) {
        console.log("Erro ao gerar download", error);
      } finally {
        this.setLoading({ type: "partial", value: false });
      }
    },
    async generatePdf(completo) {
      const { pdfTurmasCursos } = await import("@/services/pdfs/turmasCursos");

      let cursos, periodos;
      if (completo) {
        cursos = this.AllCursos;
        periodos = this.PeriodosOptions;
      } else {
        cursos = this.filtroCursos.ativados;
        periodos = this.filtroPeriodos.ativados;
      }

      pdfTurmasCursos({ cursos, periodos, plano: this.currentPlano });
    },
  },

  computed: {
    ...mapGetters(["AllTurmas", "Pedidos", "AllCursos", "DisciplinasDCC", "PerfisDCC"]),

    CursosOrderedTable() {
      const { order, type } = this.ordenacaoTable.cursos;
      return orderBy(this.CursosWithFilteredDisciplinas, order, type);
    },
    CursosWithFilteredDisciplinas() {
      // Chamada na funcao CursosOrderedTable
      if (!this.filtroCursos.ativados.length) return [];

      const cursosComDisciplinas = [];

      for (const curso of this.filtroCursos.ativados) {
        if (this.getTurmasDoCurso(curso.id).length) cursosComDisciplinas.push(curso);
      }

      return cursosComDisciplinas;
    },
    TurmasFiltered() {
      // Chamada na getTurmasDoCurso
      if (!this.filtroDisciplinas.ativados.length) return [];

      const turmasFiltradas = [];

      // A funcao abaixo nao funcinou da seguinte forma:
      // for(let turma of this.AllTurmas) {
      //   if(this.filtroDisciplinas.ativados.includes(turma.disciplina))
      //     turmasFiltradas.push(turma);
      // }

      for (const turma of this.AllTurmas)
        for (const disciplinaAtivada of this.filtroDisciplinas.ativados)
          if (turma.disciplina.codigo === disciplinaAtivada.codigo) turmasFiltradas.push(turma);

      return turmasFiltradas;
    },
    //Modal Options
    PerfisOptionsOrdered() {
      return orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.PerfisDCC.map((perfil) => {
        const todasDisciplinasDoPerfil = filter(this.DisciplinasOptions, ["Perfil", perfil.id]);
        const disciplinasSelecionadas = filter(this.filtroDisciplinas.selecionados, [
          "Perfil",
          perfil.id,
        ]);

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
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinas === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptionsOrdered() {
      return orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptions() {
      return this.DisciplinasDCC;
    },
    CursosOptionsOrdered() {
      const { order, type } = this.ordenacaoModal.cursos;
      return orderBy(this.CursosOptionsFiltered, order, type);
    },
    CursosOptionsFiltered() {
      if (this.searchCursos === "") return this.AllCursos;
      const searchNormalized = normalizeText(this.searchCursos);

      return this.AllCursos.filter((curso) => {
        const nome = normalizeText(curso.nome);
        const codigo = normalizeText(curso.codigo);
        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
  },
};
</script>
