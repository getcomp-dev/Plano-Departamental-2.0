<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Horários - Laborátorios'">
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

    <div class="w-100">
      <ListHorariosLab
        v-show="!onLoading.table && filtroLaboratorios.ativados.length"
        :periodos="filtroPeriodos.ativados"
        :laboratorios="filtroLaboratorios.ativados"
        :turmasInPeriodos="TurmasInPeriodos"
      />

      <p v-if="horariosIsEmpty" class="text-empty">
        <b>Nenhum horário encontrado.</b> Clique no botão de filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="mx-1" />para
        selecioná-los.
      </p>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <div class="div-table">
        <BaseTable
          v-show="modalFiltrosTabs.current === 'Laboratorios'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px" class="t-start"></th>
            <th style="width: 425px" class="t-start">Nome</th>
          </template>
          <template #tbody>
            <tr
              v-for="laboratorio in LaboratoriosOrdered"
              :key="`MdLabs${laboratorio.id}`"
              @click="
                toggleItemInArray(laboratorio, filtroLaboratorios.selecionados)
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  v-model="filtroLaboratorios.selecionados"
                  :value="laboratorio"
                  class="form-check-input position-static m-0"
                />
              </td>
              <td style="width: 425px" class="t-start">
                {{ laboratorio.nome }}
              </td>
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
import { toggleItemInArray, toggleAsideModal } from "@/common/mixins";
import { ModalRelatorio, ModalAjuda, ModalFiltros } from "@/components/modals";
import ListHorariosLab from "./ListHorariosLab";

export default {
  name: "DashboardLaboratoriosAlocacao",
  mixins: [toggleItemInArray, toggleAsideModal],
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
      modalFiltrosTabs: {
        current: "Laboratorios",
        array: ["Laboratorios", "Períodos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Laboratorios: () => {
            this.filtroLaboratorios.selecionados = [
              ...this.LaboratoriosOrdered,
            ];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [...this.PeriodosLetivos];
          },
        },
        selectNone: {
          Laboratorios: () => {
            this.filtroLaboratorios.selecionados = [];
          },
          Periodos: () => {
            this.filtroPeriodos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroPeriodos.ativados = [...this.filtroPeriodos.selecionados];
          this.filtroLaboratorios.ativados = [
            ...this.filtroLaboratorios.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.filtroPeriodos.selecionados = this.$_.filter(
      this.PeriodosLetivos,
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
        plano: this.$_.find(this.allPlanos, ["id", this.currentPlanoId]),
      });
    },
  },

  computed: {
    ...mapGetters([
      "onLoading",
      "Laboratorios",
      "TurmasInDisciplinasPerfis",
      "TurmasExternasInDisciplinas",
      "allPlanos",
      "currentPlanoId",
      "PeriodosLetivos",
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
      const turmas = {
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
      const turmasExternasOrdered = this.$_.orderBy(
        this.TurmasExternasInDisciplinas,
        ["periodo", "disciplina.nome", "letra"]
      );

      this.$_.forEach(turmasOredered, (turma) =>
        turmas[`periodo${turma.periodo}`].push({ ...turma })
      );
      this.$_.forEach(turmasExternasOrdered, (turma) =>
        turmas[`periodo${turma.periodo}`].push({ ...turma })
      );

      return turmas;
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
