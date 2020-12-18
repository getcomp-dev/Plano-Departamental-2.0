<template>
  <div class="main-component row p-0">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th-ordination
            :currentOrder="orednacaoDocentesMain"
            orderToCheck="apelido"
            width="130"
            align="start"
          >
            Docente
          </v-th-ordination>
          <v-th width="30" title="Período" paddingX="0">P.</v-th>
          <v-th width="80">Código</v-th>
          <v-th width="300" align="start">Disciplina</v-th>
          <v-th width="35" title="Turma">T.</v-th>
          <v-th width="130">Horários</v-th>
          <v-th width="35" paddingX="0" title="Somatório dos créditos no 1º semestre">
            CS1
          </v-th>
          <v-th width="35" paddingX="0" title="Somatório dos créditos no 2º semestre">
            CS2
          </v-th>
          <v-th width="40" paddingX="0" title="Somatório total de créditos">
            CTotal
          </v-th>
        </template>

        <template #tbody>
          <template v-if="algumFiltroEstaAtivo">
            <template v-for="docente in DocentesCargaOrdered">
              <DocenteRow :key="docente.id + docente.nome" :docente="docente" />

              <template v-for="semestre in SemestresOptions">
                <DocenteTurmaRow
                  v-for="turma in docente.turmas[`semestre${semestre.id}`]"
                  :key="semestre.id + turma.letra + turma.id + docente.nome"
                  :turma="turma"
                />
                <DocenteCargaPosRow
                  v-for="carga in docente.cargasPos[`semestre${semestre.id}`]"
                  :key="semestre.id + carga.id + carga.programa + docente.id"
                  :carga="carga"
                />
              </template>
            </template>

            <template v-if="filtroDocenteSemAlocacao.ativado">
              <DocenteRow :docente="DocenteSemAlocacaoCarga" />
              <DocenteTurmaRow
                v-for="turma in DocenteSemAlocacaoCarga.turmas"
                :key="turma.id + turma.letra + turma.periodo"
                :turma="turma"
              />
            </template>
          </template>

          <tr v-else>
            <v-td width="815">
              <b>Nenhum docente encontrado.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-los.
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
      <BaseTable v-show="modalFiltrosTabs.current === 'Docentes'" type="modal" :hasSearchBar="true">
        <template #thead-search>
          <InputSearch
            v-model="searchDocentes"
            placeholder="Pesquise pelo apelido de um docente..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoDocentesModal"
            orderToCheck="apelido"
            width="425"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="docente in DocentesOptionsOrdered"
            :key="docente.id + docente.apelido"
            @click="toggleItemInArray(docente, filtroDocentes.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroDocentes.selecionados" :value="docente" />
            </v-td>
            <v-td width="425" align="start">{{ docente.apelido }}</v-td>
          </tr>

          <tr
            @click="filtroDocenteSemAlocacao.selecionado = !filtroDocenteSemAlocacao.selecionado"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroDocenteSemAlocacao.selecionado" />
            </v-td>
            <v-td width="425" align="start">
              {{ DocenteSemAlocacaoCarga.apelido }}
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
            <v-td width="425" align="start">{{ periodo.nome.split("(")[0] }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable v-show="modalFiltrosTabs.current === 'Semestres'" type="modal">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">
            Semestre Letivo
          </v-th>
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

    <ModalRelatorio ref="modalRelatorio" @selection-option="generatePdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar carga por professor:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as informações que
        deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com a distribuição das
        disciplinas para todos os professores ou o relatório parcial com as informações exibidas na
        tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { union, difference, some, filter, orderBy } from "lodash-es";
import { pdfCargaProfessores } from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalAjuda, ModalRelatorio, ModalFiltros } from "@/components/modals";
import DocenteRow from "./DocenteRow";
import DocenteTurmaRow from "./DocenteTurmaRow";
import DocenteCargaPosRow from "./DocenteCargaPosRow";

export default {
  name: "DashboardCargaProfessores",
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltrosSemestresEPeriodos,
    preventClickSelection,
  ],
  components: {
    ModalRelatorio,
    ModalAjuda,
    ModalFiltros,
    InputSearch,
    DocenteTurmaRow,
    DocenteCargaPosRow,
    DocenteRow,
  },
  data() {
    return {
      searchDocentes: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      orednacaoDocentesMain: { order: "apelido", type: "asc" },
      ordenacaoDocentesModal: { order: "apelido", type: "asc" },
      filtroDocentes: {
        ativados: [],
        selecionados: [],
      },
      filtroDocenteSemAlocacao: {
        ativado: true,
        selecionado: true,
      },
      filtroSemestres: {
        selecionados: [],
      },
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Docentes",
        array: ["Docentes", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Docentes: () => {
            this.filtroDocentes.selecionados = union(
              this.filtroDocentes.selecionados,
              this.DocentesOptionsFiltered
            );
            this.filtroDocenteSemAlocacao.selecionado = true;
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
          Docentes: () => {
            this.filtroDocentes.selecionados = difference(
              this.filtroDocentes.selecionados,
              this.DocentesOptionsFiltered
            );
            this.filtroDocenteSemAlocacao.selecionado = false;
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
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
          this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Periodos();
    this.modalFiltrosCallbacks.selectAll.Docentes();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    calculaTurmasDoDocente(docenteId) {
      const turmasFilteredByDocente = { semestre1: [], semestre2: [] };
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      const turmasDoDocente = this.getTurmasDoDocente(docenteId);
      const turmasDoDocenteFiltered = turmasDoDocente.filter((turma) =>
        some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );

      turmasDoDocenteFiltered.forEach((turma) => {
        const creditosDaTurma = this.calculaCreditosDaTurma(turma, turma.disciplina.creditoTotal);

        if (turma.periodo === 1 || turma.periodo === 2) {
          creditos1Semestre += creditosDaTurma;
          turmasFilteredByDocente.semestre1.push({ ...turma, creditosDaTurma });
        } else {
          turmasFilteredByDocente.semestre2.push({ ...turma, creditosDaTurma });
          creditos2Semestre += creditosDaTurma;
        }
      });

      return {
        turmas: turmasFilteredByDocente,
        creditos1Semestre,
        creditos2Semestre,
      };
    },
    calculaCargasPosDoDocente(docenteId) {
      const cargasPosFilteredByDocente = { semestre1: [], semestre2: [] };
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      const cargasPosDoDocente = this.getCargasPosDoDocente(docenteId);
      const cargasPosDoDocenteFiltered = cargasPosDoDocente.filter((carga) =>
        some(this.filtroPeriodos.ativados, ["id", carga.trimestre])
      );

      cargasPosDoDocenteFiltered.forEach((carga) => {
        const creditosDaCarga = parseFloat(carga.creditos) || 0;

        if (carga.trimestre === 1 || carga.trimestre === 2) {
          cargasPosFilteredByDocente.semestre1.push({ ...carga });
          creditos1Semestre += creditosDaCarga;
        } else {
          cargasPosFilteredByDocente.semestre2.push({ ...carga });
          creditos2Semestre += creditosDaCarga;
        }
      });

      return {
        cargasPos: cargasPosFilteredByDocente,
        creditos1Semestre,
        creditos2Semestre,
      };
    },
    getTurmasDoDocente(docenteId) {
      const turmasDoDocente = this.TurmasInDisciplinasPerfis.filter(
        (turma) => turma.Docente1 === docenteId || turma.Docente2 === docenteId
      );

      return orderBy(turmasDoDocente, ["periodo", "disciplina.nome", "letra"]);
    },
    getCargasPosDoDocente(docenteId) {
      const cargasPosDoDocente = this.AllCargasPos.filter((carga) => carga.Docente === docenteId);

      return orderBy(cargasPosDoDocente, "programa");
    },
    getTurmasSemDocente() {
      const turmasSemDocente = filter(
        this.TurmasInDisciplinasPerfis,
        (turma) => turma.Docente1 == null && turma.Docente2 == null && turma.Disciplina != null
      );

      return orderBy(turmasSemDocente, ["periodo", "disciplina.nome", "letra"]);
    },
    calculaCreditosDaTurma(turma, creditosDaDisciplina) {
      if (turma.Docente1 > 0 && turma.Docente2 > 0 && turma.Docente1 !== turma.Docente2) {
        return creditosDaDisciplina / 2;
      }
      return creditosDaDisciplina;
    },
    generatePdf(completo) {
      let semAlocacaoAtivo, docentes, periodosAtivos;
      if (completo) {
        docentes = this.DocentesAtivos;
        semAlocacaoAtivo = true;
        periodosAtivos = this.PeriodosOptions;
      } else {
        docentes = this.filtroDocentes.ativados;
        semAlocacaoAtivo = this.filtroDocenteSemAlocacao.ativado;
        periodosAtivos = this.filtroPeriodos.ativados;
      }

      pdfCargaProfessores({
        docentes,
        semAlocacaoAtivo,
        periodosAtivos,
        plano: this.currentPlano,
      });
    },
  },

  computed: {
    ...mapGetters(["DocentesAtivos", "TurmasInDisciplinasPerfis", "AllCargasPos"]),

    DocentesCargaOrdered() {
      return orderBy(
        this.DocentesCargaFiltered,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesCargaFiltered() {
      return filter(this.DocentesCarga, (docente) =>
        some(this.filtroDocentes.ativados, ["id", docente.id])
      );
    },
    DocentesCarga() {
      return this.DocentesAtivos.map((docente) => {
        const turmasDoDocente = this.calculaTurmasDoDocente(docente.id);
        const cargasPosDoDocente = this.calculaCargasPosDoDocente(docente.id);

        const creditos1Semestre =
          turmasDoDocente.creditos1Semestre + cargasPosDoDocente.creditos1Semestre;

        const creditos2Semestre =
          turmasDoDocente.creditos2Semestre + cargasPosDoDocente.creditos2Semestre;

        return {
          ...docente,
          creditos1Semestre,
          creditos2Semestre,
          turmas: turmasDoDocente.turmas,
          cargasPos: cargasPosDoDocente.cargasPos,
        };
      });
    },
    DocenteSemAlocacaoCarga() {
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      const turmasSemDocente = this.getTurmasSemDocente();
      const turmasSemDocenteFiltered = filter(turmasSemDocente, (turma) =>
        some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );

      const turmasSemDocenteResult = turmasSemDocenteFiltered.map((turma) => {
        if (turma.periodo === 1 || turma.periodo === 2) {
          creditos1Semestre += turma.disciplina.creditoTotal;
        } else {
          creditos2Semestre += turma.disciplina.creditoTotal;
        }
        return {
          ...turma,
          creditosDaTurma: turma.disciplina.creditoTotal,
        };
      });

      return {
        apelido: "SEM ALOCAÇÃO",
        turmas: turmasSemDocenteResult,
        creditos1Semestre,
        creditos2Semestre,
      };
    },

    //Modal options
    DocentesOptionsOrdered() {
      return orderBy(
        this.DocentesOptionsFiltered,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesOptionsFiltered() {
      if (this.searchDocentes === "") return this.DocentesAtivos;

      const searchNormalized = normalizeText(this.searchDocentes);

      return this.DocentesAtivos.filter((docente) => {
        const docenteApelido = normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },
    algumFiltroEstaAtivo() {
      return (
        (this.filtroDocentes.ativados.length && this.filtroPeriodos.ativados.length) ||
        (this.filtroDocenteSemAlocacao.ativado && this.filtroPeriodos.ativados.length)
      );
    },
  },
};
</script>
