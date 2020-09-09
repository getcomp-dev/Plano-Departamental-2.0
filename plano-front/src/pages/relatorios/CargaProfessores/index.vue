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
            Apelido
            <i :class="setIconByOrder(orednacaoDocentesMain, 'apelido')"></i>
          </th>
          <th style="width: 25px" title="Período">P.</th>
          <th style="width: 80px">Código</th>
          <th style="width: 300px" class="t-start">Disciplina</th>
          <th style="width: 35px" class="less-padding" title="Turma">T.</th>
          <th style="width: 130px">Horários</th>
          <th
            v-for="periodo in filtroPeriodos.ativados"
            :key="'th' + periodo.id + periodo.nome"
            style="width: 35px"
            class="less-padding"
            :title="`Somatório dos créditos no ${periodo.id}º periodo`"
          >
            CP{{ periodo.id }}
          </th>
          <th
            v-if="filtroPeriodos.ativados.length > 1"
            style="width: 50px"
            class="less-padding"
            title="Somatório total de créditos"
          >
            CTotal
          </th>
        </template>
        <template #tbody>
          <template v-for="docente in DocentesInTurmasOrdered">
            <DocenteRow
              :key="docente.id + docente.nome"
              :docente="docente"
              :periodosAtivados="filtroPeriodos.ativados"
            />
            <DocenteTurmaRow
              v-for="turma in docente.turmas"
              :key="turma.id + turma.letra + docente.id"
              :turma="turma"
              :periodosAtivados="filtroPeriodos.ativados"
            />
            <DocenteCargaPosRow
              v-for="carga in docente.cargasPos"
              :key="carga.id + carga.programa + docente.id"
              :carga="carga"
              :periodosAtivados="filtroPeriodos.ativados"
            />
          </template>

          <template v-if="turmasSemAlocacaoIsActived">
            <DocenteRow
              :docente="DocenteSemAlocacaoOrdered"
              :periodosAtivados="filtroPeriodos.ativados"
            />
            <DocenteTurmaRow
              v-for="turma in DocenteSemAlocacaoOrdered.turmas"
              :key="turma.id + turma.letra + turma.periodo"
              :turma="turma"
              :periodosAtivados="filtroPeriodos.ativados"
            />
          </template>

          <tr
            v-show="
              !filtroDocenteSemAlocacao.ativado &&
                !DocentesInTurmasOrdered.length
            "
          >
            <td colspan="6" :style="`width:${emptyRowWidth}px`">
              <b>Nenhum docente encontrado.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-los.
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
          type="modal"
          v-show="modalFiltrosTabs.current === 'Períodos'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th style="width: 425px" class="t-start">Periodos Letivo</th>
          </template>
          <template #tbody>
            <tr
              v-for="periodoLetivo in PeriodosLetivos"
              :key="'md' + periodoLetivo.id + periodoLetivo.nome"
              @click.stop="
                toggleItemInArray(periodoLetivo, filtroPeriodos.selecionados)
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  :value="periodoLetivo"
                  v-model="filtroPeriodos.selecionados"
                />
              </td>
              <td style="width: 425px" class="t-start upper-case">
                {{ periodoLetivo.nome }}
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
import DocenteTurmaRow from "./DocenteTurmaRow";
import DocenteCargaPosRow from "./DocenteCargaPosRow";
import DocenteRow from "./DocenteRow";

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
      filtroPeriodos: {
        ativados: [],
        selecionados: [],
      },
      modalFiltrosTabs: {
        current: "Docentes",
        array: ["Docentes", "Períodos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Docentes: () => {
            this.filtroDocentes.selecionados = [...this.DocentesAtivos];
            this.filtroDocenteSemAlocacao.selecionado = true;
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosLetivos];
          },
        },
        selectNone: {
          Docentes: () => {
            this.filtroDocentes.selecionados.length = 0;
            this.filtroDocenteSemAlocacao.selecionado = false;
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [
            ...this.$_.orderBy(this.filtroPeriodos.selecionados, "id"),
          ];
          this.filtroDocentes.ativados = [...this.filtroDocentes.selecionados];
          this.filtroDocenteSemAlocacao.ativado = this.filtroDocenteSemAlocacao.selecionado;
        },
      },
    };
  },

  beforeMount() {
    this.filtroPeriodos.selecionados = this.$_.filter(
      this.PeriodosLetivos,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );
    this.modalFiltrosCallbacks.selectAll.Docentes();
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
    turmaInDocentes(docenteId) {
      const turmas = [];
      const totalCreditos = {
        periodo1: 0,
        periodo2: 0,
        periodo3: 0,
        periodo4: 0,
      };

      const turmasOredered = this.$_.orderBy(this.TurmasInDisciplinasPerfis, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);

      this.$_.forEach(turmasOredered, (turma) => {
        if (turma.Docente1 === docenteId || turma.Docente2 === docenteId) {
          let creditosDaTurma = 0;

          if (
            turma.Docente1 > 0 &&
            turma.Docente2 > 0 &&
            turma.Docente1 != turma.Docente2
          ) {
            creditosDaTurma += turma.disciplina.creditoTotal / 2;
          } else {
            creditosDaTurma += turma.disciplina.creditoTotal;
          }

          turmas.push({ ...turma, creditosDaTurma });
          totalCreditos[`periodo${turma.periodo}`] += creditosDaTurma;
        }
      });

      return {
        turmas,
        totalCreditos,
      };
    },
    cargasPosInDocentes(docenteId) {
      const cargasPos = [];
      const totalCreditos = {
        periodo1: 0,
        periodo2: 0,
        periodo3: 0,
        periodo4: 0,
      };

      this.$_.forEach(this.AllCargasPos, (carga) => {
        if (carga.Docente === docenteId) {
          const creditosDaCarga = parseFloat(carga.creditos) || 0;

          cargasPos.push({ ...carga });
          totalCreditos[`periodo${carga.trimestre}`] += creditosDaCarga;
        }
      });

      return {
        cargasPos,
        totalCreditos,
      };
    },
  },

  computed: {
    ...mapGetters([
      "DocentesAtivos",
      "AllHorarios",
      "TurmasInDisciplinasPerfis",
      "PeriodosLetivos",
      "AllCargasPos",
      "allPlanos",
      "currentPlanoId",
    ]),

    DocentesInTurmasOrdered() {
      return this.$_.orderBy(
        this.DocentesInTurmasFiltredByDocenteMain,
        this.orednacaoDocentesMain.order,
        this.orednacaoDocentesMain.type
      );
    },
    DocentesInTurmasFiltredByDocenteMain() {
      return this.$_.filter(
        this.DocentesInTurmasFiltredBySemestreMain,
        (docente) =>
          this.$_.some(this.filtroDocentes.ativados, ["id", docente.id])
      );
    },
    DocentesInTurmasFiltredBySemestreMain() {
      return this.$_.map(this.DocentesInTurmas, (docente) => {
        const docenteFiltred = { ...docente };

        docenteFiltred.turmas = this.$_.filter(docenteFiltred.turmas, (turma) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
        );

        docenteFiltred.cargasPos = this.$_.filter(
          docenteFiltred.cargasPos,
          (carga) =>
            this.$_.some(this.filtroPeriodos.ativados, ["id", carga.trimestre])
        );

        return docenteFiltred;
      });
    },
    DocentesInTurmas() {
      return this.DocentesAtivos.map((docente) => {
        const turmaInDocentesResult = this.turmaInDocentes(docente.id);
        const cargasPosInDocentesResult = this.cargasPosInDocentes(docente.id);

        const creditos = {
          periodo1: 0,
          periodo2: 0,
          periodo3: 0,
          periodo4: 0,
        };
        this.$_.forEach(this.PeriodosLetivos, (periodo) => {
          const periodoKey = `periodo${periodo.id}`;

          creditos[periodoKey] =
            cargasPosInDocentesResult.totalCreditos[periodoKey] +
            turmaInDocentesResult.totalCreditos[periodoKey];
        });

        const { turmas } = turmaInDocentesResult;
        const { cargasPos } = cargasPosInDocentesResult;

        return {
          ...docente,
          creditos,
          turmas,
          cargasPos,
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
        (turma) =>
          this.$_.some(this.filtroPeriodos.ativados, ["id", turma.periodo])
      );

      return {
        ...this.DocenteSemAlocacao,
        turmas: turmasFiltered,
      };
    },
    DocenteSemAlocacao() {
      const turmas = [];
      const creditos = {
        periodo1: 0,
        periodo2: 0,
        periodo3: 0,
        periodo4: 0,
      };

      this.$_.forEach(this.TurmasInDisciplinasPerfis, (turma) => {
        if (
          turma.Docente1 == null &&
          turma.Docente2 == null &&
          turma.Disciplina != null
        ) {
          turmas.push({
            ...turma,
            creditosDaTurma: turma.disciplina.creditoTotal,
          });
          creditos[`periodo${turma.periodo}`] += turma.disciplina.creditoTotal;
        }
      });

      return {
        apelido: "SEM ALOCAÇÃO",
        turmas,
        creditos,
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

    periodosActived() {
      return {
        periodo1: this.$_.some(this.filtroPeriodos.ativados, ["id", 1]),
        periodo2: this.$_.some(this.filtroPeriodos.ativados, ["id", 2]),
        periodo3: this.$_.some(this.filtroPeriodos.ativados, ["id", 3]),
        periodo4: this.$_.some(this.filtroPeriodos.ativados, ["id", 4]),
      };
    },
    turmasSemAlocacaoIsActived() {
      return (
        this.DocenteSemAlocacaoOrdered.turmas.length &&
        this.filtroDocenteSemAlocacao.ativado
      );
    },
    emptyRowWidth() {
      const tdPeriodoWidth = this.filtroPeriodos.ativados.length * 35;
      const tdTotalWidth = this.filtroPeriodos.ativados.length > 1 ? 50 : 0;

      return 700 + tdPeriodoWidth + tdTotalWidth;
    },
  },
};
</script>

<style scoped>
::v-deep .tr-header {
  background: rgb(243, 243, 243);
  text-transform: uppercase;
  pointer-events: none;
}
.bg-custom {
  pointer-events: none;
}
</style>
