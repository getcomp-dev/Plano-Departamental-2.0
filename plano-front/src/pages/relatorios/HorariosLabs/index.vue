<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Horários - Laborátorios'">
      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="relatorio" @click="toggleAsideModal('relatorio')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </PageHeader>

    <div class="w-100">
      <ListHorariosLab
        v-show="!onLoading.table && filtroLaboratorios.ativados.length"
        :periodos="filtroPeriodos.ativados"
        :laboratorios="filtroLaboratorios.ativados"
        :turmasInPeriodos="TurmasInPeriodos"
      />
    </div>
    <p v-show="horariosIsEmpty" class="text-empty">
      <b>Nenhum horário encontrado.</b> Clique no botão de filtros
      <font-awesome-icon :icon="['fas', 'list-ul']" class="mx-1" />para
      selecioná-los.
    </p>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Laborátorios'">
        <template #thead>
          <th style="width: 25px" class="t-start"></th>
          <th style="width: 425px" class="t-start">Nome</th>
        </template>

        <template #tbody>
          <tr
            v-for="laboratorio in LaboratoriosOrdered"
            :key="laboratorio.id + laboratorio.nome"
            @click="toggleItemInArray(laboratorio, filtroLaboratorios.selecionados)"
            v-prevent-click-selection
          >
            <td style="width: 25px">
              <input
                type="checkbox"
                v-model="filtroLaboratorios.selecionados"
                :value="laboratorio"
                class="form-check-input position-static m-0"
              />
            </td>
            <td style="width: 425px" class="t-start">{{ laboratorio.nome }}</td>
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
            @click="selecionaSemestre(semestre)"
            v-prevent-click-selection
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
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar alocação:</b> Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />. Em
        seguida, utilize as abas para navegar entre os filtros. Selecione as
        informações que deseja visualizar e clique no botão OK.
      </li>
      <li class="list-group-item">
        <b>Relatório:</b>
        Clique no ícone relatório
        <font-awesome-icon :icon="['fas', 'file-alt']" class="icon-gray" />. Em
        seguida, indique se deseja gerar o relatório completo com todos os
        laboratórios ou o relatório parcial com as informações exibidas na tela.
      </li>
    </ModalAjuda>

    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />
  </div>
</template>

<script>
import pdfs from "@/common/services/pdfs";
import { mapGetters } from "vuex";
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
          this.filtroPeriodos.ativados = [
            ...this.$_.orderBy(this.filtroPeriodos.selecionados, "id"),
          ];
          this.filtroLaboratorios.ativados = [
            ...this.filtroLaboratorios.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.filtroPeriodos.selecionados = this.$_.filter(
      this.PeriodosOptions,
      (periodo) => periodo.id === 1 || periodo.id === 3
    );
    this.modalFiltrosCallbacks.selectAll.Laboratorios();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
    pdf(completo) {
      let laboratorios;
      if (completo) laboratorios = this.LaboratoriosOrdered;
      else laboratorios = this.filtroLaboratorios.ativados;

      pdfs.pdfAlocacaoLabs({
        laboratorios,
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
      "currentPlano",
    ]),

    LaboratoriosOrdered() {
      const laboratoriosResultantes = [];
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "L107"]),
        this.$_.find(this.Laboratorios, ["nome", "L205"]),
        this.$_.find(this.Laboratorios, ["nome", "LAB4"]),
        this.$_.find(this.Laboratorios, ["nome", "LAB3"]),
        this.$_.find(this.Laboratorios, ["nome", "LABENG1"]),
        this.$_.find(this.Laboratorios, ["nome", "LABENG2"]),
        this.$_.find(this.Laboratorios, ["nome", "LAB EST 2"])
      );

      return laboratoriosResultantes;
    },
    TurmasInPeriodos() {
      const turmasResultantes = {
        periodo1: [],
        periodo2: [],
        periodo3: [],
        periodo4: [],
      };

      const turmasOredered = this.$_.orderBy(this.TurmasInDisciplinasPerfis, [
        "periodo",
        "disciplina.nome",
        "letra",
      ]);
      this.$_.forEach(turmasOredered, (turma) =>
        turmasResultantes[`periodo${turma.periodo}`].push({ ...turma })
      );

      const turmasExternasOrdered = this.$_.orderBy(
        this.TurmasExternasInDisciplinas,
        ["periodo", "disciplina.nome", "letra"]
      );
      this.$_.forEach(turmasExternasOrdered, (turma) =>
        turmasResultantes[`periodo${turma.periodo}`].push({ ...turma })
      );

      return turmasResultantes;
    },
    horariosIsEmpty() {
      return (
        !this.filtroPeriodos.ativados.length ||
        !this.filtroLaboratorios.ativados.length
      );
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
