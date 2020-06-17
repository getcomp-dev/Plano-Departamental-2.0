<template>
  <div class="main-component row p-0">
    <PageTitle :title="'Horários - Laborátorios'">
      <template #aside>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>

        <b-button
                v-b-modal.modalRelatorio
                type="button"
                class="btn-custom btn-icon relatbtn"
                title="Relatório"
        >
          <i class="far fa-file-pdf"></i>
        </b-button>

        <b-button
          v-b-modal.modalAjuda
          title="Ajuda"
          class="btn-custom btn-icon relatbtn"
        >
          <i class="fas fa-question"></i>
        </b-button>
      </template>
    </PageTitle>

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

    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <NavTab
        :currentTab="tabAtivaModal"
        :allTabs="['Laborátorios', 'Semestre']"
        @change-tab="tabAtivaModal = $event"
      />

      <div
        class="col m-0 p-0"
        style="width: max-content; height: 450px !important;"
      >
        <table
          v-show="tabAtivaModal === 'Semestre'"
          class="modal-table table table-bordered table-sm"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important" class="max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable-header"
                    style="width: 435px; text-align: start;"
                  >
                    Semestre Letivo
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="filtroSemestres.primeiro"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">PRIMEIRO</p>
                </td>
              </div>
            </tr>
            <tr>
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="filtroSemestres.segundo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">SEGUNDO</p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <!-- TABLE LABS -->
        <table
          v-show="tabAtivaModal === 'Laborátorios'"
          class="modal-table table table-sm table-bordered"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important" class="max-content">
                <th>
                  <p style="width: 25px !important;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    @click="toggleOrder(ordenacaoLabs, 'nome')"
                    style="width: 435px; text-align: start;"
                  >
                    Nome
                    <i :class="setIconByOrder(ordenacaoLabs, 'nome')"></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="laboratorio in Laboratorios"
              :key="`laboratorio${laboratorio.id}`"
            >
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="filtroLaboratorios.selecionados"
                      :value="laboratorio"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p
                    class="center-row"
                    style="width: 435px; text-align: start;"
                  >
                    {{ laboratorio.nome }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <template v-if="tabAtivaModal == 'Semestre'">
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllSemestre()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneSemestre()"
              >Desmarcar Todos</b-button
            >
          </template>
          <template v-else>
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllLabs()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneLabs()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>
        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-custom btn-modal btn-ok-modal"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL DE AJUDA -->
    <b-modal
      id="modalAjuda"
      ref="ajudaModal"
      scrollable
      title="Ajuda"
      hide-footer
    >
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tela:</strong> Clique em
            Laboratórios
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e selecione o(s) laboratório(s) que deseja ver, em seguida confirme
            em OK. Caso queira ver todos basta clicar em Selecionar Todos.
          </li>
          <li class="list-group-item">
            <strong>Para gerar relatório:</strong> Clique no botão Relatório
            <i
              class="far fa-file-pdf relatbtn px-1"
              style="font-size: 12px;"
            ></i>
            e aguarde para fazer
            <font style="font-style: italic;">download</font> do mesmo.
          </li>
        </ul>
      </div>
    </b-modal>
    <!-- MODAL RELATORIO-->
    <b-modal
            id="modalRelatorio"
            ref="relatorioModal"
            size="sm"
            scrollable
            title="Relatório"
            hide-footer
    >
      <ul class="listas list-group">
        <li class="list-group-item clickable" v-on:click="pdf(1)">
          <strong>Parcial</strong>
        </li>
        <li class="list-group-item clickable" v-on:click="pdf(2)">
          <strong>Completo</strong>
        </li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import pdfs from "@/common/services/pdfs";
import TableHorariosLab from "./TableHorariosLab";
import toggleOrdinationMixin from "@/mixins/toggleOrdination.js";
import PageTitle from "@/components/PageTitle";
import NavTab from "@/components/NavTab";

export default {
  name: "DashboardLaboratoriosAlocacao",
  mixins: [toggleOrdinationMixin],
  components: {
    PageTitle,
    NavTab,
    TableHorariosLab,
  },
  data() {
    return {
      filtroLaboratorios: {
        ativados: [],
        selecionados: [],
      },
      filtroSemestres: {
        primeiro: true,
        segundo: true,
        ativo: 3,
      },
      tabAtivaModal: "Laborátorios",
      ordenacaoLabs: { order: "nome", type: "asc" },
    };
  },
  beforeMount() {
    this.selectAllLabs();
    this.filtroLaboratorios.ativados = [
      ..._.orderBy(this.filtroLaboratorios.selecionados, "nome"),
    ];
  },
  methods: {
    setSemestreAtivo() {
      if (this.filtroSemestres.primeiro && !this.filtroSemestres.segundo) {
        this.filtroSemestres.ativo = 1;
      } else if (
        this.filtroSemestres.segundo &&
        !this.filtroSemestres.primeiro
      ) {
        this.filtroSemestres.ativo = 2;
      } else if (
        this.filtroSemestres.primeiro &&
        this.filtroSemestres.primeiro
      ) {
        this.filtroSemestres.ativo = 3;
      } else {
        this.filtroSemestres.ativo = undefined;
      }
    },
    selectAllSemestre() {
      this.filtroSemestres.primeiro = true;
      this.filtroSemestres.segundo = true;
    },
    selectNoneSemestre() {
      this.filtroSemestres.primeiro = false;
      this.filtroSemestres.segundo = false;
    },
    btnOK() {
      this.setSemestreAtivo();
      this.filtroLaboratorios.ativados = [
        ..._.orderBy(this.filtroLaboratorios.selecionados, "nome"),
      ];
      this.tabAtivaModal = "Laborátorios";
      this.$refs.modalFiltros.hide();
    },
    selectAllLabs() {
      const allLaboratorios = _.filter(this.$store.state.sala.Salas, [
        "laboratorio",
        true,
      ]);
      this.filtroLaboratorios.selecionados = [...allLaboratorios];
    },
    selectNoneLabs() {
      this.filtroLaboratorios.selecionados = [];
    },
    pdf(opt) {
      if (opt === 1) {
        pdfs.pdfAlocacaoLabs({
          laboratorios: this.filtroLaboratorios.ativados
        });
      }
      if (opt === 2) {
        pdfs.pdfAlocacaoLabs({
          laboratorios: this.Laboratorios
        });
      }
    },
  },
  computed: {
    Laboratorios() {
      return _.orderBy(
        _.filter(this.$store.state.sala.Salas, ["laboratorio", true]),
        this.ordenacaoLabs.order,
        this.ordenacaoLabs.type
      );
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
  font-size: 18px !important;
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

/* ==== MODAL TABLE ==== */
.modal-table {
  display: block;
  overflow-y: scroll !important;
  overflow-x: hidden !important;
  font-size: 10px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
.modal-table tr thead {
  display: block;
}
.modal-table th {
  padding: 0 !important;
  text-align: center !important;
  height: 18px !important;
}

.modal-table .p-header {
  padding: 0px 5px 0px 5px !important;
  margin: 0 !important;
  text-align: start;
  height: 18px !important;
}
.modal-table tbody {
  max-height: 100%;
  width: 100%;
}
.modal-table td {
  border-top: 0;
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  margin: 0 !important;
  /* height: 22px !important; */
}
.modal-table p {
  margin: 0 !important;
  text-align: center;
  padding: 0 !important;
  padding-right: 5px !important;
  padding-left: 5px !important;
}
.modal-table input[type="checkbox"] {
  margin-left: 0 !important;
  margin-top: 4px !important;
  margin-bottom: auto !important;
  height: 13px !important;
}
/* FIM MODAL TABLE */
</style>
