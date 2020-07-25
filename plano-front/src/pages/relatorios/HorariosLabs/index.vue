<template>
  <div class="main-component row p-0">
    <PageHeader :title="'Horários - Laborátorios'">
      <BaseButton
        title="Filtros"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('modalFiltros')"
      >
        <i class="fas fa-list-ul"></i>
      </BaseButton>

      <BaseButton
        title="Relátorio"
        :type="'icon'"
        :color="'gray'"
        @click="openAsideModal('modalRelatorio')"
      >
        <i class="fas fa-file-alt"></i>
      </BaseButton>

      <BaseButton
        title="Ajuda"
        :type="'icon'"
        :color="'lightblue'"
        @click="openAsideModal('modalAjuda')"
      >
        <i class="fas fa-question"></i>
      </BaseButton>
    </PageHeader>

    <div class="row w-100 m-0">
      <div v-show="hasLaboratorioAtivos && semestre1IsActived" class="w-100">
        <h2 class="semestre-title pl-1 bg-custom">
          1º SEMESTRE
        </h2>
        <div class="container-horarios pl-1">
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
        <h2 class="semestre-title pl-1 bg-custom">
          2º SEMESTRE
        </h2>
        <div class="container-horarios pl-1">
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

    <BaseModal
      ref="modalFiltros"
      :modalOptions="{
        type: 'filtros',
        title: 'Filtros',
        hasFooter: true,
      }"
      :hasFooter="true"
      @btn-ok="btnOkFiltros()"
      @select-all="modalSelectAll[tabAtivaModal]"
      @select-none="modalSelectNone[tabAtivaModal]"
    >
      <template #modal-body>
        <NavTab
          :currentTab="tabAtivaModal"
          :allTabs="['Laboratorios', 'Semestres']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable v-show="tabAtivaModal === 'Laboratorios'" :type="'modal'">
            <template #thead>
              <th style="width: 25px" class="t-start"></th>
              <th style="width: 425px" class="t-start">
                Nome
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="laboratorio in LaboratoriosOrdered"
                :key="`MdLabs${laboratorio.id}`"
                @click="
                  toggleItemInArray(
                    laboratorio,
                    filtroLaboratorios.selecionados
                  )
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

          <BaseTable v-show="tabAtivaModal === 'Semestres'" :type="'modal'">
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
                <td style="width: 425px" class="t-start">
                  PRIMEIRO
                </td>
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
      </template>
    </BaseModal>

    <!-- MODAL DE AJUDA -->
    <BaseModal
      ref="modalAjuda"
      :modalOptions="{
        type: 'ajuda',
        title: 'Ajuda',
      }"
    >
      <template #modal-body>
        <ul class="list-ajuda list-group">
          <li class="list-group-item">
            <b>Para exibir as tabelas de horários:</b> Clique no ícone filtros
            <i class="fas fa-list-ul cancelbtn"></i> no cabeçalho da página e na
            janela que será aberta utilize as abas para navegar entre os tipos
            de filtros. Marque em suas respectivas tabelas quais informações
            deseja visualizar, e para finalizar clique no botão OK.
          </li>
          <li class="list-group-item">
            <b>Para gerar relatório dos horários:</b> Clique no ícone relatório
            <i class="fas fa-file-alt cancelbtn"></i>, selecione se deseja gerar
            o relatório completo com todos os horários, ou apenas o relatório
            parcial com os horários que estão selecionados no momento.
          </li>
        </ul>
      </template>
    </BaseModal>

    <!-- MODAL RELATORIO-->
    <ModalRelatorio ref="modalRelatorio" @selection-option="pdf($event)" />
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
import { toggleItemInArray } from "@/common/mixins";
import {
  BaseButton,
  BaseModal,
  BaseTable,
  PageHeader,
  NavTab,
  ModalRelatorio,
} from "@/components/ui";
import TableHorariosLab from "./TableHorariosLab";

export default {
  name: "DashboardLaboratoriosAlocacao",
  mixins: [toggleItemInArray],
  components: {
    BaseTable,
    PageHeader,
    NavTab,
    TableHorariosLab,
    BaseButton,
    BaseModal,
    ModalRelatorio,
  },
  data() {
    return {
      tabAtivaModal: "Laboratorios",
      asideModaisRefs: ["modalFiltros", "modalAjuda", "modalRelatorio"],
      filtroLaboratorios: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      modalSelectAll: {
        Laboratorios: () => {
          this.filtroLaboratorios.selecionados = [...this.LaboratoriosOrdered];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = true;
          this.filtroSemestres.segundo = true;
        },
      },
      modalSelectNone: {
        Laboratorios: () => {
          this.filtroLaboratorios.selecionados = [];
        },
        Semestres: () => {
          this.filtroSemestres.primeiro = false;
          this.filtroSemestres.segundo = false;
        },
      },
    };
  },
  mounted() {
    this.modalSelectAll.Laboratorios();
    this.btnOkFiltros();
  },
  methods: {
    openAsideModal(modalRef) {
      this.asideModaisRefs.forEach((ref) => {
        if (modalRef === ref) this.$refs[ref].toggle();
        else this.$refs[ref].close();
      });
    },
    btnOkFiltros() {
      this.setSemestreAtivo();
      this.filtroLaboratorios.ativados = [
        ...this.filtroLaboratorios.selecionados,
      ];
    },
    setSemestreAtivo() {
      const { primeiro, segundo } = this.filtroSemestres;

      if (primeiro && !segundo) this.filtroSemestres.ativo = 1;
      else if (!primeiro && segundo) this.filtroSemestres.ativo = 2;
      else if (primeiro && segundo) this.filtroSemestres.ativo = 3;
      else this.filtroSemestres.ativo = undefined;
    },
    pdf(opt) {
      if (opt) {
        pdfs.pdfAlocacaoLabs({
          laboratorios: this.LaboratoriosOrdered,
        });
      } else {
        pdfs.pdfAlocacaoLabs({
          laboratorios: this.filtroLaboratorios.ativados,
        });
      }
    },
  },
  computed: {
    LaboratoriosOrdered() {
      const laboratoriosResultantes = [];
      laboratoriosResultantes.push(_.find(this.Laboratorios, ["nome", "L107"]));
      laboratoriosResultantes.push(_.find(this.Laboratorios, ["nome", "L205"]));
      laboratoriosResultantes.push(_.find(this.Laboratorios, ["nome", "LAB4"]));
      laboratoriosResultantes.push(_.find(this.Laboratorios, ["nome", "LAB3"]));
      laboratoriosResultantes.push(
        _.find(this.Laboratorios, ["nome", "LABENG1"])
      );
      laboratoriosResultantes.push(
        _.find(this.Laboratorios, ["nome", "LABENG2"])
      );
      laboratoriosResultantes.push(
        _.find(this.Laboratorios, ["nome", "LAB EST 2"])
      );
      return laboratoriosResultantes;
    },
    Laboratorios() {
      return _.filter(this.$store.state.sala.Salas, ["laboratorio", true]);
    },
    Turmas1() {
      return _.concat(
        _.filter(this.$store.state.turma.Turmas, ["periodo", 1]),
        _.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 1])
      );
    },
    Turmas2() {
      return _.concat(
        _.filter(this.$store.state.turma.Turmas, ["periodo", 3]),
        _.filter(this.$store.state.turmaExterna.Turmas, ["periodo", 3])
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
  font-size: 16px !important;
  font-weight: bold;
  text-align: start;
}
.lab-title {
  width: 100%;
  text-align: start;
  font-size: 12px !important;
  font-weight: bold;
}
.container-horarios {
  width: 100% !important;
  display: grid;
  grid-template-columns: repeat(auto-fit, 381px);
  justify-content: space-between;
  grid-gap: 5px;
  grid-row-gap: 20px;
  margin-bottom: 20px;
}
</style>
