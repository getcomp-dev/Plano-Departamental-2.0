<template>
  <div class="main-component row p-0">
    <portal to="page-header">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="w-100">
      <ListHorariosLab
        v-show="!onLoading.table && filtroLaboratorios.ativados.length"
        :periodos="filtroPeriodos.ativados"
        :laboratorios="filtroLaboratorios.ativados"
        :turmas="TurmasETurmasExternasOrdered"
      />
    </div>

    <p v-show="horariosIsEmpty" class="text-empty">
      <b>Nenhum horário encontrado.</b>
      Clique no botão de filtros
      <font-awesome-icon :icon="['fas', 'list-ul']" class="mx-1" />
      para selecioná-los.
    </p>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Laborátorios'">
        <template #thead>
          <v-th width="25" />
          <v-th width="425" align="start">Nome</v-th>
        </template>

        <template #tbody>
          <tr
            v-for="laboratorio in LaboratoriosOrdered"
            :key="laboratorio.id + laboratorio.nome"
            @click="toggleItemInArray(laboratorio, filtroLaboratorios.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroLaboratorios.selecionados"
                :value="laboratorio"
              />
            </v-td>
            <v-td width="425" align="start">{{ laboratorio.nome }}</v-td>
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
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar alocação:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as informações que
        deseja visualizar e clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />
        . Em seguida, indique se deseja gerar o relatório completo com todos os laboratórios ou o
        relatório parcial com as informações exibidas na tela.
      </li>
    </ModalAjuda>

    <ModalRelatorio ref="modalRelatorio" @selection-option="generatePdf($event)" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { filter, find, orderBy } from "lodash-es";
import { pdfHorariosLabs } from "@/common/services/pdfs";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltrosSemestresEPeriodos,
  preventClickSelection,
} from "@/common/mixins";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ListHorariosLab from "./ListHorariosLab";

export default {
  name: "DashboardLaboratoriosAlocacao",
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
    ListHorariosLab,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      filtroLaboratorios: {
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
      modalFiltrosTabs: {
        current: "Laborátorios",
        array: ["Laborátorios", "Períodos", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Laboratorios: () => {
            this.filtroLaboratorios.selecionados = [...this.LaboratoriosOrdered];
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
          Laboratorios: () => {
            this.filtroLaboratorios.selecionados = [];
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
          this.filtroPeriodos.ativados = [...orderBy(this.filtroPeriodos.selecionados, "id")];
          this.filtroLaboratorios.ativados = [...this.filtroLaboratorios.selecionados];
        },
      },
    };
  },

  beforeMount() {
    this.filtroPeriodos.selecionados = filter(
      this.PeriodosOptions,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );
    this.modalFiltrosCallbacks.selectAll.Laboratorios();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    generatePdf(completo) {
      let laboratorios, periodosAtivos;
      if (completo) {
        laboratorios = this.LaboratoriosOrdered;
        periodosAtivos = this.PeriodosOptions;
      } else {
        laboratorios = this.filtroLaboratorios.ativados;
        periodosAtivos = this.filtroPeriodos.ativados;
      }

      pdfHorariosLabs({
        laboratorios,
        periodosAtivos,
        turmas: this.TurmasETurmasExternasOrdered,
        plano: this.currentPlano,
      });
    },
  },

  computed: {
    ...mapGetters([
      "onLoading",
      "Laboratorios",
      "TurmasInDisciplinasPerfis",
      "TurmasExternasInDisciplinas",
      "AllPlanos",
    ]),

    LaboratoriosOrdered() {
      const laboratoriosResultantes = [];
      laboratoriosResultantes.push(
        find(this.Laboratorios, ["nome", "L107"]),
        find(this.Laboratorios, ["nome", "L205"]),
        find(this.Laboratorios, ["nome", "LAB4"]),
        find(this.Laboratorios, ["nome", "LAB3"]),
        find(this.Laboratorios, ["nome", "LABENG1"]),
        find(this.Laboratorios, ["nome", "LABENG2"]),
        find(this.Laboratorios, ["nome", "LAB EST 2"])
      );

      return laboratoriosResultantes;
    },
    TurmasETurmasExternasOrdered() {
      const turmasOredered = orderBy(this.TurmasInDisciplinasPerfis, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);
      const turmasExternasOrdered = orderBy(this.TurmasExternasInDisciplinas, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);

      const turmasResultantes = [...turmasOredered, ...turmasExternasOrdered];
      return turmasResultantes;
    },
    horariosIsEmpty() {
      return !this.filtroPeriodos.ativados.length || !this.filtroLaboratorios.ativados.length;
    },
  },
};
</script>

<style scoped>
.text-empty {
  width: 100%;
  font-size: 12px;
  padding: 5px;
  background-color: var(--light-gray);
}
</style>
