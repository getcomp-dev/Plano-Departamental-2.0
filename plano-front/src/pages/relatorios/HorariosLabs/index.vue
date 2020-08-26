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

    <div class="w-100" v-show="!onLoading.table">
      <div v-show="hasLaboratorioAtivos && semestre1IsActived" class="w-100">
        <h2 class="semestre-title">1º SEMESTRE</h2>
        <div class="container-horarios px-1">
          <template v-for="lab in filtroLaboratorios.ativados">
            <div class="div-table" :key="'1-lab-id' + lab.id">
              <h3 class="lab-title">{{ lab.nome }}</h3>
              <TableHorariosLab
                :laboratorio="lab"
                :Turmas="Turmas1"
              ></TableHorariosLab>
            </div>
          </template>
        </div>
      </div>

      <div v-show="hasLaboratorioAtivos && semestre2IsActived" class="w-100">
        <h2 class="semestre-title">2º SEMESTRE</h2>
        <div class="container-horarios px-1">
          <template v-for="lab in filtroLaboratorios.ativados">
            <div class="div-table" :key="'2-lab-id' + lab.id">
              <h3 class="lab-title">{{ lab.nome }}</h3>

              <TableHorariosLab
                :laboratorio="lab"
                :Turmas="Turmas2"
              ></TableHorariosLab>
            </div>
          </template>
        </div>
      </div>
    </div>
    <p
      v-if="
        (!semestre1IsActived && !semestre2IsActived) ||
          !filtroLaboratorios.ativados.length
      "
      class="text-empty"
    >
      <b>Nenhum horário encontrado.</b> Clique no botão de filtros
      <font-awesome-icon :icon="['fas', 'list-ul']" class="mx-1" />para
      selecioná-los.
    </p>

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
          v-show="modalFiltrosTabs.current === 'Semestres'"
          :type="'modal'"
        >
          <template #thead>
            <th style="width: 25px"></th>
            <th class="t-start clickable" style="width: 425px">
              Semestre Letivo
            </th>
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
import TableHorariosLab from "./TableHorariosLab";

export default {
  name: "DashboardLaboratoriosAlocacao",
  mixins: [toggleItemInArray, toggleAsideModal],
  components: {
    ModalRelatorio,
    ModalAjuda,
    ModalFiltros,
    TableHorariosLab,
  },
  data() {
    return {
      asideModalsRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      filtroLaboratorios: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalFiltrosTabs: {
        current: "Laboratorios",
        array: ["Laboratorios", "Semestres"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Laboratorios: () => {
            this.filtroLaboratorios.selecionados = [
              ...this.LaboratoriosOrdered,
            ];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = true;
            this.filtroSemestres.segundo = true;
          },
        },
        selectNone: {
          Laboratorios: () => {
            this.filtroLaboratorios.selecionados = [];
          },
          Semestres: () => {
            this.filtroSemestres.primeiro = false;
            this.filtroSemestres.segundo = false;
          },
        },
        btnOk: () => {
          this.setSemestreAtivo();
          this.filtroLaboratorios.ativados = [
            ...this.filtroLaboratorios.selecionados,
          ];
        },
      },
    };
  },

  beforeMount() {
    this.modalFiltrosCallbacks.selectAll.Laboratorios();
    this.filtroLaboratorios.ativados = [
      ...this.filtroLaboratorios.selecionados,
    ];
  },

  methods: {
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    pdf(completo) {
      if (completo)
        pdfs.pdfAlocacaoLabs({
          laboratorios: this.LaboratoriosOrdered,
        });
      else
        pdfs.pdfAlocacaoLabs({
          laboratorios: this.filtroLaboratorios.ativados,
        });
    },
  },

  computed: {
    ...mapGetters(["onLoading"]),

    LaboratoriosOrdered() {
      const laboratoriosResultantes = [];

      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "L107"])
      );
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "L205"])
      );
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "LAB4"])
      );
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "LAB3"])
      );
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "LABENG1"])
      );
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "LABENG2"])
      );
      laboratoriosResultantes.push(
        this.$_.find(this.Laboratorios, ["nome", "LAB EST 2"])
      );
      return laboratoriosResultantes;
    },
    Laboratorios() {
      return this.$_.filter(this.$store.state.sala.Salas, [
        "laboratorio",
        true,
      ]);
    },
    Turmas1() {
      return this.$_.concat(
        this.$_.filter(this.$store.state.turma.Turmas, ["periodo", 1]),
        this.$_.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 1])
      );
    },
    Turmas2() {
      return this.$_.concat(
        this.$_.filter(this.$store.state.turma.Turmas, ["periodo", 3]),
        this.$_.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 3])
      );
    },

    hasLaboratorioAtivos() {
      return this.filtroLaboratorios.ativados.length !== 0;
    },
    semestre1IsActived() {
      return (
        this.filtroSemestres.ativo === 1 || this.filtroSemestres.ativo === 3
      );
    },
    semestre2IsActived() {
      return (
        this.filtroSemestres.ativo === 2 || this.filtroSemestres.ativo === 3
      );
    },
  },
};
</script>

<style scoped>
.semestre-title {
  width: 100%;
  font-size: 16px;
  padding: 5px;
  background-color: var(--light-gray);
  font-weight: bold;
  text-align: start;
}
.lab-title {
  width: 100%;
  text-align: start;
  font-size: 12px;
  font-weight: bold;
}
.text-empty {
  width: 100%;
  font-size: 12px;
  padding: 5px;
  background-color: var(--light-gray);
}
.container-horarios {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 381px);
  justify-content: space-between;
  grid-column-gap: 5px;
  grid-row-gap: 16px;
  margin-bottom: 20px;
}
</style>
