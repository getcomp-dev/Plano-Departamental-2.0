<template>
  <div class="dashboard">
    <TheNavbar
      v-show="!isLoading"
      :sidebarVisibility="sidebarVisibility"
      @toggle-sidebar="toggleSidebar"
      @show-modal="showModal[$event]()"
    />

    <div class="container-fluid" @click="closeSideBar()">
      <transition
        name="custom-transition"
        enter-active-class="animated animate__slideInLeft sidebar-animation"
        leave-active-class="animated animate__slideOutLeft sidebar-animation"
        mode="out-in"
      >
        <TheSidebar v-show="sidebarVisibility" :year="year" />
      </transition>
      <main v-if="!isLoading" role="main" class="col-12 p-0 px-2">
        <transition
          enter-active-class="animated animate__fadeIn routerview-animation"
          leave-active-class="animated animate__fadeOut routerview-animation"
          mode="out-in"
        >
          <router-view></router-view>
        </transition>
      </main>
    </div>

    <LoadingPage v-if="isLoading || $root.onLoad" />

    <div
      v-if="hasModalOpen"
      class="bg-base-modal"
      @click.stop="closeModal()"
    ></div>
    <!-- Modal Novo Plano -->
    <b-modal
      id="modal-novo-plano"
      ref="modalNovoPlano"
      title="Informe o ano do novo plano"
    >
      <b-form-group
        label="Ano"
        label-for="NovoAno"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-input
          id="NovoAno"
          type="text"
          v-model="planoForm.ano"
          style="margin-right: 10px; width: 60px; height:30px"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        label="Observações"
        label-for="ObsNovoPlano"
        label-cols-sm="4"
        label-cols-lg="3"
      >
        <b-form-textarea
          id="ObsNovoPlano"
          type="text"
          v-model="planoForm.obs"
          style="margin-right: 10px; margin-bottom:15px"
        ></b-form-textarea>

        <!-- TABLE DISCIPLINAS -->
        <BaseTable :tableType="'modal-table'" :hasSearchBar="true">
          <template #thead-search>
            <input
              type="text"
              class="form-control input-search"
              placeholder="Pesquise nome ou codigo de uma disciplina..."
              v-model="searchDisciplinasModal"
            />
            <button
              @click="searchDisciplinasModal = ''"
              class="btn btn-search"
              style="font-weight: bold "
            >
              <i class="fas fa-times"></i>
            </button>
          </template>
          <template #thead>
            <th style="width: 25px"></th>
            <th
              title="Código"
              class="t-start clickable"
              style="width: 70px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'codigo')"
            >
              Cód.
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'codigo')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 270px"
              @click="toggleOrder(ordenacaoModal.disciplinas, 'nome')"
            >
              Nome
              <i
                :class="setIconByOrder(ordenacaoModal.disciplinas, 'nome')"
              ></i>
            </th>
            <th
              class="t-start clickable"
              style="width: 85px"
              @click="
                toggleOrder(ordenacaoModal.disciplinas, 'perfilAbreviacao')
              "
            >
              Perfil
              <i
                :class="
                  setIconByOrder(ordenacaoModal.disciplinas, 'perfilAbreviacao')
                "
              ></i>
            </th>
          </template>
          <template #tbody>
            <tr
              v-for="disciplina in DisciplinasOrderedModal"
              :key="'MdDisciplina' + disciplina.id"
              @click="
                toggleItemInArray(
                  disciplina.id,
                  disciplinasNovoPlanoSelecionadas
                )
              "
            >
              <td style="width: 25px">
                <input
                  type="checkbox"
                  class="form-check-input position-static m-0"
                  v-model="disciplinasNovoPlanoSelecionadas"
                  :value="disciplina.id"
                />
              </td>
              <td style="width: 70px" class="t-start">
                {{ disciplina.codigo }}
              </td>
              <td style="width: 270px" class="t-start">
                {{ disciplina.nome }}
              </td>
              <td style="width: 85px" class="t-start">
                {{ disciplina.perfilAbreviacao }}
              </td>
            </tr>
            <tr v-if="DisciplinasOrderedModal.length === 0">
              <td colspan="3" style="width:450px">
                NENHUMA DISCIPLINA ENCONTRADA.
              </td>
            </tr>
          </template>
        </BaseTable>
      </b-form-group>
      <div slot="modal-footer">
        <b-button v-on:click="novoPlano()">Criar Plano</b-button>
        <!-- variant "success"-->
      </div>
    </b-modal>

    <ModalUser ref="modalUser" />
    <ModalDownload ref="modalDownload" />
  </div>
</template>

<script>
import _ from "lodash";
import { EventBus } from "@/event-bus.js";
import { COMPONENT_LOADING, COMPONENT_LOADED } from "@/vuex/mutation-types";
import bddumpService from "@/common/services/bddump";
import TheNavbar from "./TheNavbar.vue";
import TheSidebar from "./sidebar/TheSidebar.vue";
import ModalUser from "./modais/ModalUser.vue";
import ModalDownload from "./modais/ModalDownload.vue";
import { BaseModal, BaseTable, LoadingPage } from "@/components/index.js";
import {
  toggleOrdination,
  toggleItemInArray,
  notification,
} from "@/mixins/index.js";
import planoService from "@/common/services/plano";
import turmaService from "@/common/services/turma";
import pedidoService from "@/common/services/pedido";
import turmaExternaService from "@/common/services/turmaExterna";
import pedidoExternoService from "@/common/services/pedidoExterno";

const emptyPlano = {
  ano: undefined,
  obs: undefined,
};

export default {
  name: "TheDashboard",
  components: {
    TheSidebar,
    TheNavbar,
    LoadingPage,
    BaseModal,
    BaseTable,
    ModalUser,
    ModalDownload,
    BaseTable,
  },
  mixins: [toggleOrdination, toggleItemInArray, notification],
  data() {
    return {
      hasModalOpen: false,
      sidebarVisibility: false,
      plano: undefined,
      planoForm: _.clone(emptyPlano),
      searchDisciplinasModal: "",
      disciplinasNovoPlanoSelecionadas: [],
      grades1semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      grades2semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      ordenacaoModal: {
        disciplinas: { order: "codigo", type: "asc" },
      },
      showModal: {
        download: () => {
          this.$refs.modalDownload.openModal();
        },
        user: () => {
          this.$refs.modalUser.openModal();
        },
        novoPlano: () => {
          this.$refs.modalNovoPlano.show();
        },
      },
    };
  },
  created() {
    this.$store.commit(COMPONENT_LOADING);
    if (!localStorage.getItem("Plano")) {
      localStorage.setItem("Plano", "1");
    }
    this.$store
      .dispatch("fetchAll")
      .then(() => {
        this.$socket.open();
        this.$store.commit(COMPONENT_LOADED);
      })
      .catch((response) => {
        console.log("ERRORRR");
        console.log(response);
      });

    this.$store.commit("setYear", 2019);
    this.plano = localStorage.getItem("Plano");
  },
  mounted() {
    EventBus.$on("close-sidebar", this.closeSideBar);
    EventBus.$on("toggle-bg-modal", (newVisibility) => {
      this.hasModalOpen = newVisibility;
    });
  },
  beforeDestroy() {
    EventBus.$off("close-sidebar");
    EventBus.$off("toggle-bg-modal");
    this.$socket.close();
  },
  methods: {
    closeModal() {
      EventBus.$emit("close-modal");
    },
    toggleSidebar() {
      this.sidebarVisibility = !this.sidebarVisibility;
    },
    closeSideBar() {
      this.sidebarVisibility = false;
    },

    gradesAtivas(ano) {
      //define grades ativas por periodo
      let g;
      let periodoInicial, periodoFinal;
      //CCD
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      g = _.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.CCD.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.CCD.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      //CCN
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      g = _.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.CCN.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.CCN.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      //SI
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      g = _.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.SI.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.SI.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      //EC
      g = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      g = _.orderBy(g, "periodoInicio", "desc");
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (1 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades1semestre.EC.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
      periodoFinal = 0;
      for (let i = 0; i < g.length; i++) {
        periodoInicial = periodoFinal + 1;
        periodoFinal =
          1 +
          2 *
            (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
          (3 - parseInt(g[i].periodoInicio.slice(5, 6), 10)) / 2;
        this.grades2semestre.EC.push({
          id: g[i].id,
          inicio: periodoInicial,
          fim: periodoFinal,
        });
        if (periodoFinal > 9) {
          break;
        }
      }
    },

    novoPlano: function() {
      this.gradesAtivas(this.planoForm.ano);
      let disciplinasNovoPlano1Semestre = [];
      let disciplinasNovoPlano2Semestre = [];
      for (let i = 0; i < this.grades1semestre.CCD.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.CCD[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades1semestre.CCD[i].inicio &&
              disciplina.periodo <= this.grades1semestre.CCD[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: true,
                  EC: false,
                  CCN: false,
                  SI: false,
                  periodo: 1,
                });
              } else {
                t.CCD = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades1semestre.EC.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.EC[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades1semestre.EC[i].inicio &&
              disciplina.periodo <= this.grades1semestre.EC[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: true,
                  CCN: false,
                  SI: false,
                  periodo: 1,
                });
              } else {
                t.EC = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades1semestre.CCN.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.CCN[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades1semestre.CCN[i].inicio &&
              disciplina.periodo <= this.grades1semestre.CCN[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: true,
                  SI: false,
                  periodo: 1,
                });
              } else {
                t.CCN = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades1semestre.SI.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades1semestre.SI[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades1semestre.SI[i].inicio &&
              disciplina.periodo <= this.grades1semestre.SI[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano1Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano1Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: false,
                  SI: true,
                  periodo: 1,
                });
              } else {
                t.SI = true;
              }
            }
          }
        });
      }

      for (let i = 0; i < this.grades2semestre.CCD.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.CCD[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades2semestre.CCD[i].inicio &&
              disciplina.periodo <= this.grades2semestre.CCD[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: true,
                  EC: false,
                  CCN: false,
                  SI: false,
                  periodo: 3,
                });
              } else {
                t.CCD = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.EC.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.EC[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 0) {
            if (
              disciplina.periodo >= this.grades2semestre.EC[i].inicio &&
              disciplina.periodo <= this.grades2semestre.EC[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: true,
                  CCN: false,
                  SI: false,
                  periodo: 3,
                });
              } else {
                t.EC = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.CCN.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.CCN[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades2semestre.CCN[i].inicio &&
              disciplina.periodo <= this.grades2semestre.CCN[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: true,
                  SI: false,
                  periodo: 3,
                });
              } else {
                t.CCN = true;
              }
            }
          }
        });
      }
      for (let i = 0; i < this.grades2semestre.SI.length; i++) {
        let disciplinasGrade = _.filter(
          this.$store.state.disciplinaGrade.DisciplinaGrades,
          { Grade: this.grades2semestre.SI[i].id }
        );
        disciplinasGrade.forEach((disciplina) => {
          if (disciplina.periodo % 2 === 1) {
            if (
              disciplina.periodo >= this.grades2semestre.SI[i].inicio &&
              disciplina.periodo <= this.grades2semestre.SI[i].fim
            ) {
              let t = _.find(disciplinasNovoPlano2Semestre, {
                Disciplina: disciplina.Disciplina,
              });
              if (t === undefined) {
                disciplinasNovoPlano2Semestre.push({
                  Disciplina: disciplina.Disciplina,
                  CCD: false,
                  EC: false,
                  CCN: false,
                  SI: true,
                  periodo: 3,
                });
              } else {
                t.SI = true;
              }
            }
          }
        });
      }
      disciplinasNovoPlano1Semestre = _.filter(
        disciplinasNovoPlano1Semestre,
        (d) => {
          let perfil = _.find(this.$store.state.disciplina.Disciplinas, {
            id: d.Disciplina,
          }).Perfil;
          return perfil !== 13 && perfil !== 15;
        }
      );

      disciplinasNovoPlano2Semestre = _.filter(
        disciplinasNovoPlano2Semestre,
        (d) => {
          let perfil = _.find(this.$store.state.disciplina.Disciplinas, {
            id: d.Disciplina,
          }).Perfil;
          return perfil !== 13 && perfil !== 15;
        }
      );

      let turmasNovoPlano = [];
      disciplinasNovoPlano1Semestre.forEach((d) => {
        if (
          !_.find(this.disciplinasNovoPlanoSelecionadas, { id: d.Disciplina })
        ) {
          if ((d.CCD || d.EC) && (d.CCN || d.SI)) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "B",
              CCN: d.CCN,
              SI: d.SI,
            });
          } else if (d.CCD || d.EC) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
          } else if (d.CCN || d.SI) {
            turmasNovoPlano.push({
              semestre: 1,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "A",
              CCN: d.CCN,
              SI: d.SI,
            });
          }
        }
      });

      disciplinasNovoPlano2Semestre.forEach((d) => {
        if (
          !_.find(this.disciplinasNovoPlanoSelecionadas, { id: d.Disciplina })
        ) {
          if ((d.CCD || d.EC) && (d.CCN || d.SI)) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "B",
              CCN: d.CCN,
              SI: d.SI,
            });
          } else if (d.CCD || d.EC) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Diurno",
              letra: "A",
              CCD: d.CCD,
              EC: d.EC,
            });
          } else if (d.CCN || d.SI) {
            turmasNovoPlano.push({
              semestre: 3,
              Disciplina: d.Disciplina,
              turno: "Noturno",
              letra: "A",
              CCN: d.CCN,
              SI: d.SI,
            });
          }
        }
      });

      //{Disciplina:id, CCD:true/false, EC:true/false, CCN:true/false, SI:true/false, periodo:1/3}

      console.log(turmasNovoPlano);

      planoService.create(this.planoForm).then((plano) => {
        localStorage.setItem("Plano", plano.Plano.id);
        turmasNovoPlano.forEach((t) => {
          turmaService
            .create({
              id: undefined,
              periodo: t.semestre,
              letra: t.letra,
              turno1: t.turno,
              turno2: undefined,
              Disciplina: t.Disciplina,
              Docente1: undefined,
              Docente2: undefined,
              Horario1: undefined,
              Horario2: undefined,
              Sala1: undefined,
              Sala2: undefined,
              Plano: plano.Plano.id,
            })
            .then((turma) => {
              if (t.CCN) {
                pedidoService
                  .update(1, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 1,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
              if (t.EC) {
                pedidoService
                  .update(2, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 2,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
              if (t.SI) {
                pedidoService
                  .update(3, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 3,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
              if (t.CCD) {
                pedidoService
                  .update(4, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: 4,
                    vagasPeriodizadas: 1,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              }
            })
            .catch((error) => {
              console.log("erro ao criar turma: " + error);
            });
        });
        let turmasCopiar = _.filter(this.$store.state.turma.Turmas, (t) => {
          let disciplina = _.includes(
            this.disciplinasNovoPlanoSelecionadas,
            t.Disciplina
          );
          if (disciplina) return true;
          else return false;
        });
        turmasCopiar.forEach((t) => {
          turmaService
            .create({
              id: undefined,
              periodo: t.periodo,
              letra: t.letra,
              turno1: t.turno1,
              turno2: undefined,
              Disciplina: t.Disciplina,
              Horario1: t.Horario1,
              Horario2: t.Horario2,
              Sala1: undefined,
              Sala2: undefined,
              Plano: plano.Plano.id,
            })
            .then((turma) => {
              let pedidos = this.$store.state.pedido.Pedidos[t.id];
              pedidos.forEach((p) => {
                pedidoService
                  .update(p.Curso, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: p.Curso,
                    vagasPeriodizadas: p.vagasPeriodizadas,
                    vagasNaoPeriodizadas: 0,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido: " + error);
                  });
              });
            })
            .catch((error) => {
              console.log("erro ao criar turma externa: " + error);
            });
        });
        this.$store.state.turmaExterna.Turmas.forEach((t) => {
          turmaExternaService
            .create({
              id: undefined,
              periodo: t.periodo,
              letra: t.letra,
              turno1: t.turno1,
              turno2: undefined,
              Disciplina: t.Disciplina,
              Horario1: t.Horario1,
              Horario2: t.Horario2,
              Sala1: undefined,
              Sala2: undefined,
              Plano: plano.Plano.id,
            })
            .then((turma) => {
              let pedidos = this.$store.state.pedidoExterno.Pedidos[t.id];
              pedidos.forEach((p) => {
                pedidoExternoService
                  .update(p.Curso, turma.Turma.id, {
                    Turma: turma.Turma.id,
                    Curso: p.Curso,
                    vagasPeriodizadas: p.vagasPeriodizadas,
                    vagasNaoPeriodizadas: p.vagasNaoPeriodizadas,
                  })
                  .then((response) => {})
                  .catch((error) => {
                    console.log("erro ao atualizar pedido externo: " + error);
                  });
              });
            })
            .catch((error) => {
              console.log("erro ao criar turma externa: " + error);
            });
        });
        this.$store.dispatch("fetchAll");
        this.$refs.modalNovoPlano.hide();
      });
    },

    returnFiles() {
      bddumpService.returnFiles().then((response) => {
        this.files = response.Files.filter(function(elm) {
          return elm.match(/.*\.(sql)/gi);
        });
        _.pull(this.files, "drop_all.sql");
        _.forEach(this.files, function(value, index, array) {
          array[index] = value.slice(0, -4);
        });
        //console.log(this.files.filter( function( elm ) {return elm.match(/.*\.(sql)/ig)}))
      });
    },
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
  },
  computed: {
    year() {
      let p = _.find(this.$store.state.plano.Plano, {
        id: parseInt(this.plano, 10),
      });
      return p ? parseInt(p.ano, 10) : 0;
    },
    httpRequestCount() {
      return this.$store.state.httpRequestCount;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas, "nome");
    },
    DisciplinasInPerfis() {
      const disciplinasResultantes = [];

      this.Disciplinas.forEach((disciplina) => {
        const perfilFounded = _.find(
          this.Perfis,
          (perfil) => perfil.id === disciplina.Perfil
        );

        if (perfilFounded) {
          disciplinasResultantes.push({
            ...disciplina,
            perfilNome: perfilFounded.nome,
            perfilAbreviacao: perfilFounded.abreviacao,
          });
        }
      });
      return disciplinasResultantes;
    },
    Perfis() {
      return this.$store.state.perfil.Perfis;
    },
    DisciplinasFiltredModal() {
      if (this.searchDisciplinasModal === "") return this.DisciplinasInPerfis;

      const searchNormalized = this.normalizeText(this.searchDisciplinasModal);

      return _.filter(this.DisciplinasInPerfis, (disciplina) => {
        const disciplinaNome = this.normalizeText(disciplina.nome);
        const disciplinaCodigo = this.normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    DisciplinasOrderedModal() {
      return _.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
  },
};
</script>

<style scoped>
.dashboard {
  width: 100% !important;
  height: 100%;
  overflow: hidden !important;
  margin: 0 !important;
  padding: 0 !important;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.dashboard .container-fluid {
  max-width: 100%;
  margin: 0;
  padding: 0;
  margin-top: var(--navbar-height);
  height: 100%;
  transition: all 200ms ease;
}
.dashboard main {
  position: unset !important;
  overflow-y: auto !important;
  height: -webkit-calc(100vh - var(--navbar-height));
  height: -moz-calc(100vh - var(--navbar-height));
  height: calc(100vh - var(--navbar-height));
  transition: all 200ms ease;
}
.dashboard .bg-base-modal {
  position: absolute;
  z-index: 950;
  height: 100vh !important;
  width: 100% !important;
  background-color: rgba(0, 0, 0, 0.3);
}

.sidebar-animation {
  animation-duration: 0.25s;
  animation-fill-mode: both;
}
.routerview-animation {
  animation-duration: 0.3s;
  animation-fill-mode: both;
}
</style>
