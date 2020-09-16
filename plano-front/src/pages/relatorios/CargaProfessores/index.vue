<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Carga Professores'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('filtros')"
      >
        <font-awesome-icon :icon="['fas', 'list-ul']" />
      </BaseButton>

      <BaseButton
        title="Relatório"
        :type="'icon'"
        :color="'gray'"
        @click="toggleAsideModal('relatorio')"
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
          <th
            @click="toggleOrder(orednacaoDocentesMain, 'apelido')"
            style="width: 130px"
            class="clickable t-start"
          >
            Docente
            <i :class="setIconByOrder(orednacaoDocentesMain, 'apelido')"></i>
          </th>
          <th style="width: 30px" class="p-0" title="Período ou Trimestre">
            P./T.
          </th>
          <th style="width: 80px">Código</th>
          <th style="width: 300px" class="t-start">Disciplina</th>
          <th style="width: 35px" class="less-padding" title="Turma">T.</th>
          <th style="width: 130px">Horários</th>
          <th
            v-if="semestresAtivados.primeiro"
            style="width: 35px"
            class="p-0"
            title="Somatório dos créditos no 1º semestre"
          >
            CS1
          </th>
          <th
            v-if="semestresAtivados.segundo"
            style="width: 35px"
            class="p-0"
            title="Somatório dos créditos no 2º semestre"
          >
            CS2
          </th>
          <th
            v-if="semestresAtivados.primeiro && semestresAtivados.segundo"
            style="width: 50px"
            class="p-0"
            title="Somatório total de créditos"
          >
            CTotal
          </th>
        </template>
        <template #tbody>
          <template v-if="hasAnyDocenteActived">
            <template v-for="docente in DocentesInTurmasOrdered">
              <DocenteRow
                :key="docente.id + docente.nome"
                :docente="docente"
                :semestresAtivados="semestresAtivados"
              />
              <DocenteTurmaRow
                v-for="turma in docente.turmas"
                :key="turma.id + turma.letra + docente.id"
                :turma="turma"
                :semestresAtivados="semestresAtivados"
              />
              <DocenteCargaPosRow
                v-for="carga in docente.cargasPos"
                :key="carga.id + carga.programa + docente.id"
                :carga="carga"
                :semestresAtivados="semestresAtivados"
              />
            </template>

            <template v-if="turmasSemAlocacaoIsActived">
              <DocenteRow
                :docente="DocenteSemAlocacaoOrdered"
                :semestresAtivados="semestresAtivados"
              />
              <DocenteTurmaRow
                v-for="turma in DocenteSemAlocacaoOrdered.turmas"
                :key="turma.id + turma.letra + turma.periodo"
                :turma="turma"
                :semestresAtivados="semestresAtivados"
              />
            </template>
          </template>

          <tr v-show="!hasAnyDocenteActived">
            <td :style="`width:${emptyRowWidth}px`">
              <b>Nenhum docente encontrado.</b> Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-los.
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
          v-show="modalFiltrosTabs.current === 'Docentes'"
          :type="'modal'"
          :hasSearchBar="true"
        >
          <template #thead-search>
            <InputSearch
              v-model="searchDocentes"
              placeholder="Pesquise pelo apelido de um docente..."
            />
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              class="clickable t-start"
              style="width: 425px"
              @click="toggleOrder(ordenacaoDocentesModal, 'apelido')"
            >
              Nome
              <i :class="setIconByOrder(ordenacaoDocentesModal, 'apelido')"></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="docente in DocentesOrderedModal"
              :key="'docenteModal' + docente.id"
              @click="toggleItemInArray(docente, filtroDocentes.selecionados)"
            >
              <td style="width: 25px;">
                <input
                  type="checkbox"
                  v-model="filtroDocentes.selecionados"
                  :value="docente"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px;" class="t-start">
                {{ docente.apelido }}
              </td>
            </tr>
            <tr
              @click="
                filtroDocenteSemAlocacao.selecionado = !filtroDocenteSemAlocacao.selecionado
              "
            >
              <td style="width: 25px;">
                <input
                  type="checkbox"
                  v-model="filtroDocenteSemAlocacao.selecionado"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px;" class="t-start">SEM ALOCAÇÃO</td>
            </tr>
          </template>
        </BaseTable>

        <BaseTable
          v-show="modalFiltrosTabs.current === 'Semestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">Semestre Letivo</th>
          </template>
          <template #tbody>
            <tr
              v-for="semestre in SemestresLetivos"
              :key="semestre.id + semestre.nome"
              @click="toggleItemInArray(semestre, filtroSemestres.selecionados)"
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="semestre"
                  v-model="filtroSemestres.selecionados"
                />
              </td>
              <td style="width: 425px" class="t-start upper-case">
                {{ semestre.nome }}
              </td>
            </tr>
          </template>
        </BaseTable>
      </div>
    </ModalFiltros>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar carga por professor:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />. Em
        seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />. Em
        seguida, indique se deseja gerar o relatório completo com a distribuição
        das disciplinas para todos os professores ou o relatório parcial com as
        informações exibidas na tela.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import pdfs from "@/common/services/pdfs";
import { normalizeText } from "@/common/utils";
import {
  toggleOrdination,
  toggleItemInArray,
  toggleAsideModal,
} from "@/common/mixins";
import { InputSearch } from "@/components/ui";
import { ModalAjuda, ModalRelatorio, ModalFiltros } from "@/components/modals";
import DocenteRow from "./DocenteRow";
import DocenteTurmaRow from "./DocenteTurmaRow";
import DocenteCargaPosRow from "./DocenteCargaPosRow";

export default {
  name: "DashboardCargaProfessores",
  mixins: [toggleOrdination, toggleItemInArray, toggleAsideModal],
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
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Docentes",
        array: ["Docentes", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Docentes: () => {
            this.filtroDocentes.selecionados = [...this.DocentesAtivos];
            this.filtroDocenteSemAlocacao.selecionado = true;
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [...this.SemestresLetivos];
          },
        },
        selectNone: {
          Docentes: () => {
            this.filtroDocentes.selecionados.length = 0;
            this.filtroDocenteSemAlocacao.selecionado = false;
          },
          Semestres: () => {
            this.filtroSemestres.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroSemestres.ativados = [
            ...this.filtroSemestres.selecionados,
          ];
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
          this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Docentes();
    this.modalFiltrosCallbacks.selectAll.Semestres();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    pdf(completo) {
      let SemAlocacao;
      let Docentes;

      if (completo) {
        SemAlocacao = true;
        Docentes = this.DocentesAtivos;
      } else {
        SemAlocacao = this.filtroDocenteSemAlocacao.ativado;
        Docentes = this.filtroDocentes.ativados;
      }

      pdfs.pdfCargaProfessores({
        Docentes,
        SemAlocacao,
        plano: this.$_.find(this.allPlanos, ["id", this.currentPlanoId]),
      });
    },
    calculaTurmasDoDocente(docenteId) {
      const calculaCreditosDaTurma = (creditos, docente1Id, docente2Id) => {
        if (docente1Id > 0 && docente2Id > 0 && docente1Id !== docente2Id) {
          return creditos / 2;
        }
        return creditos;
      };

      const turmasResultante = [];
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;
      const turmasOredered = this.$_.orderBy(this.TurmasInDisciplinasPerfis, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);

      this.$_.forEach(turmasOredered, (turma) => {
        if (turma.Docente1 === docenteId || turma.Docente2 === docenteId) {
          const creditosDaTurma = calculaCreditosDaTurma(
            turma.disciplina.creditoTotal,
            turma.Docente1,
            turma.Docente2
          );
          turmasResultante.push({ ...turma, creditosDaTurma });

          if (turma.periodo === 1 || turma.periodo === 2) {
            creditos1Semestre += creditosDaTurma;
          } else {
            creditos2Semestre += creditosDaTurma;
          }
        }
      });

      return {
        turmas: turmasResultante,
        creditos1Semestre,
        creditos2Semestre,
      };
    },
    calculaCargasPosDoDocentes(docenteId) {
      const cargasPosResultantes = [];
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      this.$_.forEach(this.AllCargasPos, (carga) => {
        if (carga.Docente === docenteId) {
          cargasPosResultantes.push({ ...carga });
          const creditosDaCarga = parseFloat(carga.creditos) || 0;

          if (carga.trimestre === 1 || carga.trimestre === 2) {
            creditos1Semestre += creditosDaCarga;
          } else {
            creditos2Semestre += creditosDaCarga;
          }
        }
      });

      return {
        cargasPos: cargasPosResultantes,
        creditos1Semestre,
        creditos2Semestre,
      };
    },
    filterBySemestresAtivados(value) {
      return this.$_.some(this.filtroSemestres.ativados, (semestre) => {
        if (value === 1 || value === 2) return semestre.id === 1;
        else return semestre.id === 2;
      });
    },
  },

  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "TurmasInDisciplinasPerfis",
      "PeriodosLetivos",
      "AllCargasPos",
      "allPlanos",
      "currentPlanoId",
      "SemestresLetivos",
    ]),

    DocentesInTurmasOrdered() {
      return this.$_.orderBy(
        this.DocentesInTurmasFilteredByDocente,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesInTurmasFilteredByDocente() {
      return this.$_.filter(
        this.DocentesInTurmasFilteredBySemestre,
        (docente) =>
          this.$_.some(this.filtroDocentes.ativados, ["id", docente.id])
      );
    },
    DocentesInTurmasFilteredBySemestre() {
      return this.$_.map(this.DocentesInTurmas, (docente) => {
        const turmasFiltered = this.$_.filter(docente.turmas, (turma) =>
          this.filterBySemestresAtivados(turma.periodo)
        );

        const cargasPosFiltered = this.$_.filter(docente.cargasPos, (carga) =>
          this.filterBySemestresAtivados(carga.trimestre)
        );

        return {
          ...docente,
          turmas: turmasFiltered,
          cargasPos: cargasPosFiltered,
        };
      });
    },
    DocentesInTurmas() {
      return this.DocentesAtivos.map((docente) => {
        const turmasDoDocente = this.calculaTurmasDoDocente(docente.id);
        const cargasPosDoDocente = this.calculaCargasPosDoDocentes(docente.id);

        const creditos1Semestre =
          turmasDoDocente.creditos1Semestre +
          cargasPosDoDocente.creditos1Semestre;

        const creditos2Semestre =
          turmasDoDocente.creditos2Semestre +
          cargasPosDoDocente.creditos2Semestre;

        return {
          ...docente,
          creditos1Semestre,
          creditos2Semestre,
          turmas: turmasDoDocente.turmas,
          cargasPos: cargasPosDoDocente.cargasPos,
        };
      });
    },

    DocenteSemAlocacaoOrdered() {
      const turmasOrdered = this.$_.orderBy(
        this.DocenteSemAlocacaoFiltered.turmas,
        ["periodo", "Disciplina", "letra"]
      );

      return {
        ...this.DocenteSemAlocacaoFiltered,
        turmas: turmasOrdered,
      };
    },
    DocenteSemAlocacaoFiltered() {
      const turmasFiltered = this.$_.filter(
        this.DocenteSemAlocacao.turmas,
        (turma) => this.filterBySemestresAtivados(turma.periodo)
      );

      return {
        ...this.DocenteSemAlocacao,
        turmas: turmasFiltered,
      };
    },
    DocenteSemAlocacao() {
      const turmasResultante = [];
      let creditos1Semestre = 0;
      let creditos2Semestre = 0;

      this.$_.forEach(this.TurmasInDisciplinasPerfis, (turma) => {
        if (
          turma.Docente1 == null &&
          turma.Docente2 == null &&
          turma.Disciplina != null
        ) {
          turmasResultante.push({
            ...turma,
            creditosDaTurma: turma.disciplina.creditoTotal,
          });

          if (turma.periodo === 1 || turma.periodo === 2) {
            creditos1Semestre += turma.disciplina.creditoTotal;
          } else {
            creditos2Semestre += turma.disciplina.creditoTotal;
          }
        }
      });

      return {
        apelido: "SEM ALOCAÇÃO",
        turmas: turmasResultante,
        creditos1Semestre,
        creditos2Semestre,
      };
    },

    DocentesOrderedModal() {
      return this.$_.orderBy(
        this.DocentesFiltredModal,
        this.ordenacaoDocentesModal.order,
        this.ordenacaoDocentesModal.type
      );
    },
    DocentesFiltredModal() {
      if (this.searchDocentes === "") return this.DocentesAtivos;

      const searchNormalized = normalizeText(this.searchDocentes);

      return this.DocentesAtivos.filter((docente) => {
        const docenteApelido = normalizeText(docente.apelido);

        return docenteApelido.match(searchNormalized);
      });
    },

    turmasSemAlocacaoIsActived() {
      return (
        this.DocenteSemAlocacaoOrdered.turmas.length &&
        this.filtroDocenteSemAlocacao.ativado
      );
    },
    semestresAtivados() {
      return {
        primeiro: this.$_.some(this.filtroSemestres.ativados, ["id", 1]),
        segundo: this.$_.some(this.filtroSemestres.ativados, ["id", 2]),
      };
    },
    hasAnyDocenteActived() {
      return (
        (this.filtroDocentes.ativados.length &&
          this.filtroSemestres.ativados.length) ||
        (this.filtroDocenteSemAlocacao.ativado &&
          this.filtroSemestres.ativados.length)
      );
    },
    emptyRowWidth() {
      const { primeiro, segundo } = this.semestresAtivados;
      let tdsWidth = 0;

      if (primeiro && segundo) tdsWidth = 120;
      else if (primeiro || segundo) tdsWidth = 35;

      return 705 + tdsWidth;
    },
  },
};
</script>
