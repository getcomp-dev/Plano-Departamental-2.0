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
                style="margin-right: 10px; width: 60px;"
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
                style="margin-right: 10px;"
        ></b-form-textarea>
        <!-- TABLE DISCIPLINAS -->
        <table
                class="table table-sm modal-table table-bordered table-hover"
                style="max-height: 450px !important; overflow-y: auto !important;"
        >
          <thead class="thead-light ">
          <tr class="sticky">
            <div style="font-size: 11px !important;" class="max-content">
              <th>
                <div
                        class="m-0 input-group"
                        style="
                      width: 462px;
                      height: 35px;
                      padding-left: 4px;
                      padding-right: 20px;
                      padding-top: 4px;
                    "
                >
                  <input
                          type="text"
                          class="form-control search-form-control"
                          style="border-right: none;"
                          placeholder="Pesquise nome ou codigo de uma disciplina..."
                          v-model="search_disciplinas"
                  />
                  <div
                          class="input-group-append"
                          @click="search_disciplinas = null"
                  >
                      <span
                              class="input-group-text search-text"
                              style="height: 25px; font-size: 18px; cursor: pointer;"
                      >&times;</span
                      >
                  </div>
                </div>
              </th>
            </div>
          </tr>

          <tr>
            <div style="font-size: 11px !important;" class="max-content">
              <th>
                <p
                        style="width: 25px; text-align: center;"
                        class="p-header"
                ></p>
              </th>
              <th>
                <p
                        class="p-header clickable"
                        style="width: 70px; text-align: start;"
                        @click="toggleOrdDiscip('codigo')"
                        title="Clique para ordenar por código"
                >
                  Cód.
                  <i
                          style="font-size: 0.6rem; text-align: right;"
                          :class="
                        modal_ordem_discip.order == 'codigo'
                          ? modal_ordem_discip.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                  ></i>
                </p>
              </th>
              <th>
                <p
                        class="p-header clickable"
                        style="width: 280px; text-align: start;"
                        @click="toggleOrdDiscip('nome')"
                        title="Clique para ordenar por nome"
                >
                  Nome
                  <i
                          style="font-size: 0.6rem; text-align: right;"
                          :class="
                        modal_ordem_discip.order == 'nome'
                          ? modal_ordem_discip.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                  ></i>
                </p>
              </th>
              <th>
                <p
                        class="p-header clickable"
                        style="width: 85px; text-align: start;"
                        @click="toggleOrdDiscip('perfil_nome')"
                        title="Clique para ordenar por nome"
                >
                  Perfil
                  <i
                          style="font-size: 0.6rem; text-align: right;"
                          :class="
                        modal_ordem_discip.order == 'perfil_nome'
                          ? modal_ordem_discip.type == 'asc'
                            ? 'fas fa-arrow-down fa-sm'
                            : 'fas fa-arrow-up fa-sm'
                          : 'fas fa-arrow-down fa-sm low-opacity'
                      "
                  ></i>
                </p>
              </th>
            </div>
          </tr>
          </thead>
          <tbody>
          <tr
                  v-for="disciplina in Disciplinas_Modal_Ordered"
                  :key="'disciplina' + disciplina.id"
                  value="disciplina.id"
          >
            <div class="max-content">
              <td>
                <div style="width: 25px; height: inherit;" class="px-1">
                  <input
                          type="checkbox"
                          class="form-check-input position-static m-0"
                          v-model="disciplinasNovoPlanoSelecionadas"
                          :value="disciplina"
                  />
                </div>
              </td>
              <td>
                <p style="width: 70px; text-align: start;">
                  {{ disciplina.codigo }}
                </p>
              </td>
              <td>
                <p style="width: 280px; text-align: start;">
                  {{ disciplina.nome }}
                </p>
              </td>
              <td>
                <p style="width: 85px; text-align: start;">
                  {{ disciplina.perfil_nome }}
                </p>
              </td>
            </div>
          </tr>
          </tbody>
        </table>
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
import { BaseModal, LoadingPage } from "@/components/index.js";
import { notification } from "@/mixins/index.js";
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
    ModalUser,
    ModalDownload,
  },
  mixins: [notification],
  data() {
    return {
      hasModalOpen: false,
      sidebarVisibility: false,
      plano: undefined,
      planoForm: _.clone(emptyPlano),
      disciplinasNovoPlanoSelecionadas: [],
      grades1semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      grades2semestre: { CCD: [], CCN: [], EC: [], SI: [] },
      search_disciplinas: null,
      modal_ordem_discip: { order: "codigo", type: "asc" },
      showModal: {
        download: () => {
          this.$refs.modalDownload.openModal();
        },
        user: () => {
          this.$refs.modalUser.openModal();
        },
        novoPlano: () => {
          this.$refs.modalNovoPlano.show();
        }
      },
    };
  },
  created() {
    this.$store.commit(COMPONENT_LOADING);
    if(!localStorage.getItem('Plano')){
      localStorage.setItem('Plano', '1')
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
    this.plano = localStorage.getItem('Plano')
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

    toggleOrdDiscip(ord) {
      if (this.modal_ordem_discip.order != ord) {
        this.modal_ordem_discip.order = ord;
        this.modal_ordem_discip.type = "asc";
      } else {
        this.modal_ordem_discip.type =
                this.modal_ordem_discip.type == "asc" ? "desc" : "asc";
      }
    },

    gradesAtivas(ano){
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
                2 * (parseInt(ano, 10) - parseInt(g[i].periodoInicio.slice(0, 4), 10)) +
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
      this.gradesAtivas(this.planoForm.ano)
      let disciplinasNovoPlano1Semestre = []
      let disciplinasNovoPlano2Semestre = []
      for(let i = 0; i < this.grades1semestre.CCD.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades1semestre.CCD[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===1){
            if((disciplina.periodo >= this.grades1semestre.CCD[i].inicio) && (disciplina.periodo <= this.grades1semestre.CCD[i].fim)){
              let t = _.find(disciplinasNovoPlano1Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano1Semestre.push({Disciplina:disciplina.Disciplina, CCD:true, EC:false, CCN:false, SI:false, periodo:1})
              }else{
                t.CCD = true
              }
            }
          }
        })
      }
      for(let i = 0; i < this.grades1semestre.EC.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades1semestre.EC[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===1){
            if((disciplina.periodo >= this.grades1semestre.EC[i].inicio) && (disciplina.periodo <= this.grades1semestre.EC[i].fim)){
              let t = _.find(disciplinasNovoPlano1Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano1Semestre.push({Disciplina:disciplina.Disciplina, CCD:false, EC:true, CCN:false, SI:false, periodo:1})
              }else{
                t.EC = true
              }
            }
          }
        })
      }
      for(let i = 0; i < this.grades1semestre.CCN.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades1semestre.CCN[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===0){
            if((disciplina.periodo >= this.grades1semestre.CCN[i].inicio) && (disciplina.periodo <= this.grades1semestre.CCN[i].fim)){
              let t = _.find(disciplinasNovoPlano1Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano1Semestre.push({Disciplina:disciplina.Disciplina, CCD:false, EC:false, CCN:true, SI:false, periodo:1})
              }else{
                t.CCN = true
              }
            }
          }
        })
      }
      for(let i = 0; i < this.grades1semestre.SI.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades1semestre.SI[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===0){
            if((disciplina.periodo >= this.grades1semestre.SI[i].inicio) && (disciplina.periodo <= this.grades1semestre.SI[i].fim)){
              let t = _.find(disciplinasNovoPlano1Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano1Semestre.push({Disciplina:disciplina.Disciplina, CCD:false, EC:false, CCN:false, SI:true, periodo:1})
              }else{
                t.SI = true
              }
            }
          }
        })
      }

      for(let i = 0; i < this.grades2semestre.CCD.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades2semestre.CCD[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===0){
            if((disciplina.periodo >= this.grades2semestre.CCD[i].inicio) && (disciplina.periodo <= this.grades2semestre.CCD[i].fim)){
              let t = _.find(disciplinasNovoPlano2Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano2Semestre.push({Disciplina:disciplina.Disciplina, CCD:true, EC:false, CCN:false, SI:false, periodo:3})
              }else{
                t.CCD = true
              }
            }
          }
        })
      }
      for(let i = 0; i < this.grades2semestre.EC.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades2semestre.EC[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===0){
            if((disciplina.periodo >= this.grades2semestre.EC[i].inicio) && (disciplina.periodo <= this.grades2semestre.EC[i].fim)){
              let t = _.find(disciplinasNovoPlano2Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano2Semestre.push({Disciplina:disciplina.Disciplina, CCD:false, EC:true, CCN:false, SI:false, periodo:3})
              }else{
                t.EC = true
              }
            }
          }
        })
      }
      for(let i = 0; i < this.grades2semestre.CCN.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades2semestre.CCN[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===1){
            if((disciplina.periodo >= this.grades2semestre.CCN[i].inicio) && (disciplina.periodo <= this.grades2semestre.CCN[i].fim)){
              let t = _.find(disciplinasNovoPlano2Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano2Semestre.push({Disciplina:disciplina.Disciplina, CCD:false, EC:false, CCN:true, SI:false, periodo:3})
              }else{
                t.CCN = true
              }
            }
          }
        })
      }
      for(let i = 0; i < this.grades2semestre.SI.length; i++){
        let disciplinasGrade = _.filter(this.$store.state.disciplinaGrade.DisciplinaGrades, {Grade: this.grades2semestre.SI[i].id})
        disciplinasGrade.forEach((disciplina) => {
          if(disciplina.periodo%2===1){
            if((disciplina.periodo >= this.grades2semestre.SI[i].inicio) && (disciplina.periodo <= this.grades2semestre.SI[i].fim)){
              let t = _.find(disciplinasNovoPlano2Semestre, {Disciplina:disciplina.Disciplina})
              if(t === undefined){
                disciplinasNovoPlano2Semestre.push({Disciplina:disciplina.Disciplina, CCD:false, EC:false, CCN:false, SI:true, periodo:3})
              }else{
                t.SI = true
              }
            }
          }
        })
      }
      disciplinasNovoPlano1Semestre = _.filter(disciplinasNovoPlano1Semestre, (d) => {
        let perfil = _.find(this.$store.state.disciplina.Disciplinas, {id:d.Disciplina}).Perfil
        return (perfil !== 13) && (perfil !== 15)
      })

      disciplinasNovoPlano2Semestre = _.filter(disciplinasNovoPlano2Semestre, (d) => {
        let perfil = _.find(this.$store.state.disciplina.Disciplinas, {id:d.Disciplina}).Perfil
        return (perfil !== 13) && (perfil !== 15)
      })

      let turmasNovoPlano = []
      disciplinasNovoPlano1Semestre.forEach((d) => {
        if(!(_.find(this.disciplinasNovoPlanoSelecionadas, {id:d.Disciplina}))){
          if((d.CCD || d.EC) && (d.CCN || d.SI)){
            turmasNovoPlano.push({semestre:1, Disciplina:d.Disciplina, turno:"Diurno", letra:"A", CCD:d.CCD, EC:d.EC})
            turmasNovoPlano.push({semestre:1, Disciplina:d.Disciplina, turno:"Noturno", letra:"B", CCN:d.CCN, SI:d.SI})
          }else if(d.CCD || d.EC){
            turmasNovoPlano.push({semestre:1, Disciplina:d.Disciplina, turno:"Diurno", letra:"A", CCD:d.CCD, EC:d.EC})
          }else if(d.CCN || d.SI){
            turmasNovoPlano.push({semestre:1, Disciplina:d.Disciplina, turno:"Noturno", letra:"A", CCN:d.CCN, SI:d.SI})
          }
        }
      })

      disciplinasNovoPlano2Semestre.forEach((d) => {
        if(!(_.find(this.disciplinasNovoPlanoSelecionadas, {id:d.Disciplina}))){
          if((d.CCD || d.EC) && (d.CCN || d.SI)){
            turmasNovoPlano.push({semestre:3, Disciplina:d.Disciplina, turno:"Diurno", letra:"A", CCD:d.CCD, EC:d.EC})
            turmasNovoPlano.push({semestre:3, Disciplina:d.Disciplina, turno:"Noturno", letra:"B", CCN:d.CCN, SI:d.SI})
          }else if(d.CCD || d.EC){
            turmasNovoPlano.push({semestre:3, Disciplina:d.Disciplina, turno:"Diurno", letra:"A", CCD:d.CCD, EC:d.EC})
          }else if(d.CCN || d.SI){
            turmasNovoPlano.push({semestre:3, Disciplina:d.Disciplina, turno:"Noturno", letra:"A", CCN:d.CCN, SI:d.SI})
          }
        }
      })

      //{Disciplina:id, CCD:true/false, EC:true/false, CCN:true/false, SI:true/false, periodo:1/3}

      console.log(turmasNovoPlano)

      planoService.create(this.planoForm).then((plano) => {
        localStorage.setItem('Plano', plano.Plano.id)
        turmasNovoPlano.forEach((t) => {
          turmaService.create({id:undefined, periodo:t.semestre, letra:t.letra, turno1:t.turno, turno2:undefined, Disciplina:t.Disciplina, Docente1:undefined, Docente2:undefined, Horario1:undefined, Horario2:undefined, Sala1:undefined, Sala2:undefined, Plano:plano.Plano.id})
                  .then((turma) => {
                    if(t.CCN){
                      pedidoService.update(1, turma.Turma.id, {Turma:turma.Turma.id, Curso:1, vagasPeriodizadas: 1, vagasNaoPeriodizadas: 0})
                              .then((response) => {})
                              .catch((error) => {console.log("erro ao atualizar pedido: " + error);})
                    }
                    if(t.EC){
                      pedidoService.update(2, turma.Turma.id, {Turma:turma.Turma.id, Curso:2, vagasPeriodizadas: 1, vagasNaoPeriodizadas: 0})
                              .then((response) => {})
                              .catch((error) => {console.log("erro ao atualizar pedido: " + error);})
                    }
                    if(t.SI){
                      pedidoService.update(3, turma.Turma.id, {Turma:turma.Turma.id, Curso:3, vagasPeriodizadas: 1, vagasNaoPeriodizadas: 0})
                              .then((response) => {})
                              .catch((error) => {console.log("erro ao atualizar pedido: " + error);})
                    }
                    if(t.CCD){
                      pedidoService.update(4, turma.Turma.id, {Turma:turma.Turma.id, Curso:4, vagasPeriodizadas: 1, vagasNaoPeriodizadas: 0})
                              .then((response) => {})
                              .catch((error) => {console.log("erro ao atualizar pedido: " + error);})
                    }
                  })
                  .catch((error) => {console.log("erro ao criar turma: " + error);})
        })
        let turmasCopiar = _.filter(this.$store.state.turma.Turmas, (t) => {
          let disciplina = _.find(this.disciplinasNovoPlanoSelecionadas, {id:t.Disciplina})
          if(disciplina) return true
          else return false
        })
        turmasCopiar.forEach((t) => {
          turmaService.create({id:undefined, periodo:t.periodo, letra:t.letra, turno1:t.turno1, turno2:undefined, Disciplina:t.Disciplina, Horario1:t.Horario1, Horario2:t.Horario2, Sala1:undefined, Sala2:undefined, Plano:plano.Plano.id})
                  .then((turma) => {
                    let pedidos = this.$store.state.pedido.Pedidos[t.id]
                    pedidos.forEach((p) => {
                      pedidoService.update(p.Curso, turma.Turma.id, {Turma:turma.Turma.id, Curso:p.Curso, vagasPeriodizadas: p.vagasPeriodizadas, vagasNaoPeriodizadas: 0})
                              .then((response) => {})
                              .catch((error) => {console.log("erro ao atualizar pedido: " + error);})
                    })
                  })
                  .catch((error) => {console.log("erro ao criar turma externa: " + error);})
        })
        this.$store.state.turmaExterna.Turmas.forEach((t) => {
          turmaExternaService.create({id:undefined, periodo:t.periodo, letra:t.letra, turno1:t.turno1, turno2:undefined, Disciplina:t.Disciplina, Horario1:t.Horario1, Horario2:t.Horario2, Sala1:undefined, Sala2:undefined, Plano:plano.Plano.id})
                  .then((turma) => {
                    let pedidos = this.$store.state.pedidoExterno.Pedidos[t.id]
                    pedidos.forEach((p) => {
                      pedidoExternoService.update(p.Curso, turma.Turma.id, {Turma:turma.Turma.id, Curso:p.Curso, vagasPeriodizadas: p.vagasPeriodizadas, vagasNaoPeriodizadas: p.vagasNaoPeriodizadas})
                              .then((response) => {})
                              .catch((error) => {console.log("erro ao atualizar pedido externo: " + error);})
                    })
                  })
                  .catch((error) => {console.log("erro ao criar turma externa: " + error);})
        })
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

  },
  computed: {
    year() {
      let p = _.find(this.$store.state.plano.Plano, {id:parseInt(this.plano, 10)})
      return (p ? parseInt(p.ano, 10) : 0)
    },
    httpRequestCount() {
      return this.$store.state.httpRequestCount;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },

    Disciplinas() {
      return _.orderBy(this.$store.state.disciplina.Disciplinas,'nome')
    },

    Disciplinas_Modal_Search() {
      let result = this.Disciplinas;
      if (this.search_disciplinas != null) {
        let searchUpperCase = this.search_disciplinas
                .toUpperCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        return result.filter((disci) => {
          return (
                  disci.nome
                          .normalize("NFD")
                          .replace(/[\u0300-\u036f]/g, "")
                          .match(searchUpperCase) ||
                  disci.nome.match(searchUpperCase) ||
                  disci.codigo.match(searchUpperCase)
          );
        });
      } else return result;
    },

    Disciplinas_Modal_Ordered() {
      return _.orderBy(
              this.Disciplinas_Modal_Search,
              this.modal_ordem_discip.order,
              this.modal_ordem_discip.type
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
