<template>
  <div class="main-component row">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-3 col-lg-3 col-md-4 col-sm-5 col-5 px-0 pr-1">
          Horários - Cursos
        </h1>
        <div
          class="form-group col-xl-9 col-lg-9 col-md-8 col-sm-7 col-7 mb-0 p-0"
          style="justify-content: flex-end !important;"
        >
          <b-button v-b-modal.modalFiltros title="Filtros" class="cancelbtn">
            <i class="fas fa-list-ul"></i>
          </b-button>
          <div class="d-flex p-0 m-0">
            <button
              type="button"
              class="relatbtn"
              v-on:click.prevent="pdf"
              title="Relatório"
            >
              <i class="far fa-file-alt"></i>
            </button>

            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="p-0 w-100 col-12">
      <!-- -------------------------------------------- 1º periodo ----------------------------------------- -->
      <template
        v-if="
          this.cursos.length != 0 && (semestreAtual == 1 || semestreAtual == 3)
        "
      >
        <h3 class="title px-2" style="background-color: rgba(0, 0, 0, 0.089);">
          1º SEMESTRE
        </h3>
        <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->

        <template v-if="activeCCD">
          <!-- passar o nome do curso pra dentro da tabela -->
          <!-- Para centralizar a tabela: -->
          <div class="flex-container">
            <h4 class="pl-1">Ciência da Computação Diurno</h4>
            <curso-diurno :Curso="ativos1.CCD"></curso-diurno>
          </div>
        </template>
        <!-- -------------------------------------------- EC ----------------------------------------- -->
        <template v-if="activeEC">
          <div class="flex-container">
            <h4 class="pl-1">Engenharia Computacional</h4>
            <curso-diurno :Curso="ativos1.EC"></curso-diurno>
          </div>
        </template>
        <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
        <template v-if="activeCCN">
          <div class="flex-container">
            <h4 class="pl-1">Ciência da Computação Noturno</h4>
            <curso-noturno :Curso="ativos1.CCN"></curso-noturno>
          </div>
        </template>
        <!-- -------------------------------------------- SI ----------------------------------------- -->
        <template v-if="activeSI">
          <div class="flex-container">
            <h4 class="pl-1">Sistemas de Informação</h4>
            <curso-noturno :Curso="ativos1.SI"></curso-noturno>
          </div>
        </template>
        <!-- -------------------------------------------- Eletivas ----------------------------------------- -->
        <template v-if="activeEletivas">
          <div class="flex-container">
            <h4 class="pl-1">Eletivas</h4>
            <horario-eletivas :Eletivas="ativos1.Eletivas"></horario-eletivas>
          </div>
        </template>
      </template>

      <!-- -------------------------------------------- 2º periodo ----------------------------------------- -->
      <template
        v-if="
          this.cursos.length != 0 && (semestreAtual == 2 || semestreAtual == 3)
        "
      >
        <h3 class="title px-2" style="background-color: rgba(0, 0, 0, 0.089);">
          2º SEMESTRE
        </h3>
        <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
        <template v-if="activeCCD">
          <div class="flex-container">
            <h4 class="pl-1">Ciência da Computação Diurno</h4>
            <curso-diurno :Curso="ativos2.CCD"></curso-diurno>
          </div>
        </template>
        <!-- -------------------------------------------- EC ----------------------------------------- -->
        <template v-if="activeEC">
          <div class="flex-container">
            <h4 class="pl-1">Engenharia Computacional</h4>
            <curso-diurno :Curso="ativos2.EC"></curso-diurno>
          </div>
        </template>
        <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
        <template v-if="activeCCN">
          <div class="flex-container">
            <h4 class="pl-1">Ciência da Computação Noturno</h4>
            <curso-noturno :Curso="ativos2.CCN"></curso-noturno>
          </div>
        </template>
        <!-- -------------------------------------------- SI ----------------------------------------- -->
        <template v-if="activeSI">
          <div class="flex-container">
            <h4 class="pl-1">Sistemas de Informação</h4>
            <curso-noturno :Curso="ativos2.SI"></curso-noturno>
          </div>
        </template>
        <!-- -------------------------------------------- Eletivas ----------------------------------------- -->
        <template v-if="activeEletivas">
          <div class="flex-container">
            <h4 class="pl-1">Eletivas</h4>
            <horario-eletivas :Eletivas="ativos2.Eletivas"></horario-eletivas>
          </div>
        </template>
      </template>
      <!-- ----------------------------------------------------------------------------------------------- -->
    </div>

    <!-- MODAL SEMESTRE -->
    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item" @click="nav_ativo = 'cursos'">
            <a
              class="nav-link border border-right-0"
              :class="[
                {
                  active: nav_ativo == 'cursos',
                },
                'clickable',
              ]"
              >Cursos</a
            >
          </li>
          <li class="nav-item" @click="nav_ativo = 'semestre'">
            <a
              class="nav-link border"
              :class="[
                {
                  active: nav_ativo == 'semestre',
                },
                'clickable',
              ]"
              >Semestre</a
            >
          </li>
        </ul>
      </div>
      <div
        class="col m-0 p-0"
        style="width: max-content; height: 450px !important;"
      >
        <table
          v-if="nav_ativo == 'semestre'"
          class="table table-bordered table-sm modal-table"
          style="max-height: 392px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p class="p-header" style="width: 435px; text-align: start;">
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
                      v-model="semestre_1Ativo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">
                    PRIMEIRO
                  </p>
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
                      v-model="semestre_2Ativo"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">
                    SEGUNDO
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
        <!-- TABLE CURSOS -->
        <table
          v-else
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p style="width: 25px;" class="p-header clickable"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 50px; text-align: center;"
                    @click="toggleOrdCursos('codigo')"
                  >
                    Cód.
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemCursos.order == 'codigo'
                          ? ordemCursos.type == 'asc'
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
                    style="width: 385px;"
                    @click="toggleOrdCursos('nome')"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemCursos.order == 'nome'
                          ? ordemCursos.type == 'asc'
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
            <!-- v-for em tr -->
            <tr
              v-for="curso in Cursos_Modal_Filtred"
              :key="'curso-id-' + curso.value"
            >
              <div style="width: max-content; height: 22px !important;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      :value="curso.value"
                      v-model="cursosSelecionados"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 50px;">
                    {{ curso.codigo }}
                  </p>
                </td>
                <td>
                  <p style="width: 385px; text-align: start;">
                    {{ curso.nome }}
                  </p>
                </td>
              </div>
            </tr>
          </tbody>
        </table>
      </div>

      <div slot="modal-footer" class="w-100 m-0" style="display: flex;">
        <div class="w-100">
          <template v-if="nav_ativo == 'semestre'">
            <b-button
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="selectAllSemestre()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="selectNoneSemestre()"
              >Desmarcar Todos</b-button
            >
          </template>
          <template v-else>
            <b-button
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="toggleAll()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="distoggleAll()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>

        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-df mr-2"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>

    <!-- MODAL AJUDA -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na tela:</strong> Clique em Cursos
            <i
              class="fas fa-graduation-cap cancelbtn"
              style="font-size: 12px;"
            ></i>
            e selecione quais deseja visualizar, em seguida confirme em OK.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none;"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import cursoDiurno from "./HorarioCursoDiurno.vue";
import cursoNoturno from "./HorarioCursoNoturno.vue";
import horarioEletivas from "./HorarioEletivas.vue";

export default {
  name: "DashboardHorarios",

  data() {
    return {
      cursos: [],
      cursosSelecionados: [],
      error: undefined,
      options_Cursos: [
        {
          nome: "SISTEMAS DE INFORMAÇÃO",
          value: 3,
          codigo: "76A",
        },
        {
          nome: "CIÊNCIA DA COMPUTAÇÃO NOTURNO",
          value: 2,
          codigo: "35A",
        },
        {
          nome: "CIÊNCIA DA COMPUTAÇÃO DIURNO",
          value: 1,
          codigo: "65C",
        },
        {
          nome: "ENGENHARIA DA COMPUTAÇÃO",
          value: 4,
          codigo: "65B",
        },
        {
          nome: "ELETIVAS",
          value: 5,
          codigo: "-",
        },
      ],
      evenCCN: "false",
      evenCCD: "false",
      evenEC: "false",
      evenSI: "false",

      ativos1: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },

      ativos2: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },
      selectAll: false,
      semestre_1Ativo: true,
      semestre_2Ativo: true,
      semestreAtual: 3,
      nav_ativo: "cursos",
      ordemCursos: { order: "codigo", type: "asc" },
    };
  },
  components: {
    cursoDiurno,
    cursoNoturno,
    horarioEletivas,
  },
  beforeMount: function() {
    this.createHorarios1();
    this.createHorarios2();
  },

  methods: {
    btnOK() {
      this.btnOKSemestre();
      this.cursos = [...this.cursosSelecionados];
      this.nav_ativo = "cursos";
      this.$refs.modalFiltros.hide();
    },
    btnOKSemestre() {
      if (this.semestre_1Ativo && !this.semestre_2Ativo) {
        this.semestreAtual = 1;
      } else if (this.semestre_2Ativo && !this.semestre_1Ativo) {
        this.semestreAtual = 2;
      } else if (this.semestre_1Ativo && this.semestre_1Ativo) {
        this.semestreAtual = 3;
      } else {
        this.semestreAtual = undefined;
      }
    },

    toggleOrdCursos(ord) {
      if (this.ordemCursos.order != ord) {
        this.ordemCursos.order = ord;
        this.ordemCursos.type = "asc";
      } else {
        this.ordemCursos.type = this.ordemCursos.type == "asc" ? "desc" : "asc";
      }
    },

    selectAllSemestre() {
      this.semestre_1Ativo = true;
      this.semestre_2Ativo = true;
    },
    selectNoneSemestre() {
      this.semestre_1Ativo = false;
      this.semestre_2Ativo = false;
    },

    defineSelectAll() {
      if (this.cursosSelecionados.length === 5) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
    distoggleAll() {
      if (this.cursosSelecionados.length !== 0) {
        this.cursosSelecionados = [];
      }
    },

    toggleAll() {
      if (this.cursosSelecionados.length !== 5)
        this.cursosSelecionados = [1, 2, 3, 4, 5];
    },
    isEven(number) {
      if (number % 2 === 0) return "true";
      else return "false";
    },

    emptyTurmas() {
      this.ativos1 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      };

      this.ativos2 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      };
    },

    filterTurmas: function(t) {
      var check = false;
      for (var turma in this.ativos1.CCN) {
        if (turma.id === t.id) check = true;
      }
      return check;
    },

    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
    },

    createHorarios1: function() {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = _.filter(this.$store.state.turma.Turmas, ["periodo", 1]);
      var turmasExternas = this.$store.state.turmaExterna.Turmas;
      var anoAtual = this.$store.state.plano.Plano[0].ano;
      var semestreAtual = 1;

      if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
        this.evenCCN = "false";
      } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
        this.evenCCN = "true";
      }

      if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
        this.evenEC = "false";
      } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
        this.evenEC = "true";
      }

      if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
        this.evenSI = "false";
      } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
        this.evenSI = "true";
      }

      if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
        this.evenCCD = "false";
      } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
        this.evenCCD = "true";
      }

      //CCD
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 4) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }

      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //CCN
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 1) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //SI
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 3) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.SI[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 2) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos1.EC[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Eletivas
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (let d = 0; d < disciplinaGrades.length; d++) {
          if (turmas[t].Disciplina === disciplinaGrades[d].Disciplina) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos1.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas: this.ativos1,
      });
    },

    createHorarios2: function() {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = _.filter(this.$store.state.turma.Turmas, ["periodo", 3]);
      var turmasExternas = this.$store.state.turmaExterna.Turmas;
      var anoAtual = this.$store.state.plano.Plano[0].ano;
      var semestreAtual = 1;

      if (this.$store.state.curso.Cursos[0].semestreInicial == 1) {
        this.evenCCN = "true";
      } else if (this.$store.state.curso.Cursos[0].semestreInicial == 2) {
        this.evenCCN = "false";
      }

      if (this.$store.state.curso.Cursos[1].semestreInicial == 1) {
        this.evenEC = "true";
      } else if (this.$store.state.curso.Cursos[1].semestreInicial == 2) {
        this.evenEC = "false";
      }

      if (this.$store.state.curso.Cursos[2].semestreInicial == 1) {
        this.evenSI = "true";
      } else if (this.$store.state.curso.Cursos[2].semestreInicial == 2) {
        this.evenSI = "false";
      }

      if (this.$store.state.curso.Cursos[3].semestreInicial == 1) {
        this.evenCCD = "true";
      } else if (this.$store.state.curso.Cursos[3].semestreInicial == 2) {
        this.evenCCD = "false";
      }

      //CC Diurno
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 4) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 4) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.CCD[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //CC Noturno
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 1) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 1) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.CCN[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //SI
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 3) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 3) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.SI[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Engenharia Computacional
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (let t in this.$store.state.pedido.Pedidos) {
        for (let pedido in this.$store.state.pedido.Pedidos[t]) {
          if (this.$store.state.pedido.Pedidos[t][pedido].Curso === 2) {
            pedidos.push(this.$store.state.pedido.Pedidos[t][pedido]);
          }
        }
      }
      pedidosExternos = [];
      for (let t in this.$store.state.pedidoExterno.Pedidos) {
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]) {
          if (this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso === 2) {
            pedidosExternos.push(
              this.$store.state.pedidoExterno.Pedidos[t][pedido]
            );
          }
        }
      }
      for (let i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i === 0) inicio = 1;
        else inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 *
              (parseInt(anoAtual, 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(semestreAtual, 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        else
          fim =
            inicio -
            1 +
            2 *
              (parseInt(grades[i - 1].periodoInicio.slice(0, 4), 10) -
                parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (parseInt(grades[i - 1].periodoInicio.slice(5, 6), 10) -
              parseInt(grades[i].periodoInicio.slice(5, 6), 10)) /
              2;
        for (let k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (let j = 0; j < turmas.length; j++) {
              if (turmas[j].Disciplina == disciplinaGrades[k].Disciplina) {
                for (let p = 0; p < pedidos.length; p++) {
                  if (
                    pedidos[p].vagasPeriodizadas > 0 &&
                    pedidos[p].Turma == turmas[j].id
                  ) {
                    this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                      turmas[j]
                    );
                  }
                }
              }
            }
            for (let j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo == 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (let p = 0; p < pedidosExternos.length; p++) {
                  if (
                    pedidosExternos[p].vagasPeriodizadas > 0 &&
                    pedidosExternos[p].Turma == turmasExternas[j].id
                  ) {
                    this.ativos2.EC[disciplinaGrades[k].periodo - 1].push(
                      turmasExternas[j]
                    );
                  }
                }
              }
            }
          }
        }
      }

      //Eletivas
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (let d = 0; d < disciplinaGrades.length; d++) {
          if (turmas[t].Disciplina === disciplinaGrades[d].Disciplina) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos2.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }

      this.$store.commit("redefinirAtivas2", {
        Ativas: this.ativos2,
      });
    },

    horarioVazio(curso) {
      if (curso.length != 0) return true;
      else return false;
    },

    checkPeriodo(turma, periodo) {
      for (
        var g = 0;
        g < this.$store.state.disciplinaGrade.DisciplinaGrades.length;
        g++
      ) {
        if (
          this.$store.state.disciplinaGrade.DisciplinaGrades[g].Disciplina ==
            turma &&
          this.$store.state.disciplinaGrade.DisciplinaGrades[g].periodo ==
            periodo
        ) {
          return true;
        }
      }
    },

    updateHorarios() {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < this.ativos1.CCD[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.CCD[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.ativos1.CCN[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.CCN[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.ativos1.EC[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.EC[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.EC[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.ativos1.SI[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos1.SI[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos1.SI[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas: this.ativos1,
      });

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < this.ativos2.CCD[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.CCD[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.ativos2.CCN[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.CCN[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.ativos2.EC[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.EC[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.EC[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.ativos2.SI[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos2.SI[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos2.SI[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas2: this.ativos2,
      });

      this.$store.commit("redefinirAtivas2", {
        Ativas: this.ativos2,
      });
    },
    pdf() {
      var pdfMake = require("pdfmake/build/pdfmake.js");
      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var tables = [];
      var disciplinas = this.$store.state.disciplina.Disciplinas;
      var periodosCCD1 = this.ativos1.CCD;
      var periodosCCN1 = this.ativos1.CCN;
      var periodosEC1 = this.ativos1.EC;
      var periodosSI1 = this.ativos1.SI;
      var eletivas1 = this.ativos1.Eletivas;
      var seg = "",
        ter = "",
        qua = "",
        qui = "",
        sex = "";
      var vazio = 0;
      tables.push({
        text: "1º Semestre",
        bold: false,
        margin: [0, 10, 0, 5],
        fontSize: 20,
      });
      tables.push({
        text: "Ciência da Computação Diurno",
        bold: false,
        margin: [0, 10, 0, 5],
        fontSize: 20,
      });

      for (let i = 0; i < 10; i++) {
        if (periodosCCD1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: false,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 0; d < 4; d++) {
            for (let j = 0; j < periodosCCD1[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCD1[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD1[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Ciência da Computação Noturno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      for (let i = 0; i < 10; i++) {
        if (periodosCCN1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 4; d < 6; d++) {
            for (let j = 0; j < periodosCCN1[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCN1[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN1[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Engenharia Computacional",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      for (let i = 0; i < 10; i++) {
        if (periodosEC1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 0; d < 4; d++) {
            for (let j = 0; j < periodosEC1[i].length; j++) {
              if (this.checkTurmaHorario(periodosEC1[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC1[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Sistemas de Informação",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      for (let i = 0; i < 10; i++) {
        if (periodosSI1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 4; d < 6; d++) {
            for (let j = 0; j < periodosSI1[i].length; j++) {
              if (this.checkTurmaHorario(periodosSI1[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI1[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI1[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI1[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Eletivas",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      if (eletivas1.length === 0) {
        vazio = vazio + 1;
      } else {
        tables.push({
          table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            headerRows: 1,
            color: "#426",
            body: [
              [
                {
                  text: "Hora",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  bold: true,
                },
              ],
            ],
          },
        });
        for (let d = 0; d < 8; d++) {
          for (let j = 0; j < eletivas1.length; j++) {
            if (
              this.checkTurmaHorario(
                eletivas1[j],
                (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas1[j],
                (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas1[j],
                (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas1[j],
                (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas1[j],
                (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
          }
          switch (d) {
            case 0:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "08 - 10",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 1:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "10 - 12",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 2:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "14 - 16",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 3:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "16 - 18",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 4:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "17 - 19",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 5:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "18 - 20",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 6:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "19 - 21",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 7:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "21 - 23",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
          }
          seg = ter = qua = qui = sex = "";
        }
      }

      var periodosCCD2 = this.ativos2.CCD;
      var periodosCCN2 = this.ativos2.CCN;
      var periodosEC2 = this.ativos2.EC;
      var periodosSI2 = this.ativos2.SI;
      var eletivas2 = this.ativos2.Eletivas;

      tables.push({
        text: "2º Semestre",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });
      tables.push({
        text: "Ciência da Computação Diurno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
      });

      for (let i = 0; i < 10; i++) {
        if (periodosCCD2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 0; d < 4; d++) {
            for (let j = 0; j < periodosCCD2[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCD2[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCD2[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCD2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCD2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Ciência da Computação Noturno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      for (let i = 0; i < 10; i++) {
        if (periodosCCN2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 4; d < 6; d++) {
            for (let j = 0; j < periodosCCN2[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCN2[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosCCN2[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosCCN2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosCCN2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Engenharia Computacional",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      for (let i = 0; i < 10; i++) {
        if (periodosEC2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 0; d < 4; d++) {
            for (let j = 0; j < periodosEC2[i].length; j++) {
              if (this.checkTurmaHorario(periodosEC2[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosEC2[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosEC2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosEC2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Sistemas de Informação",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      for (let i = 0; i < 10; i++) {
        if (periodosSI2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5],
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  {
                    text: "Hora",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Terça",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Quinta",
                    alignment: "center",
                    bold: true,
                  },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true,
                  },
                ],
              ],
            },
          });
          for (let d = 4; d < 6; d++) {
            for (let j = 0; j < periodosSI2[i].length; j++) {
              if (this.checkTurmaHorario(periodosSI2[i][j], 1 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (seg !== "") seg = seg + " ";
                    seg =
                      seg +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 7 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (ter != "") ter = ter + " ";
                    ter =
                      ter +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 13 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (qua != "") qua = qua + " ";
                    qua =
                      qua +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 19 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (qui != "") qui = qui + " ";
                    qui =
                      qui +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
              if (this.checkTurmaHorario(periodosSI2[i][j], 25 + d)) {
                for (let k = 0; k < disciplinas.length; k++) {
                  if (periodosSI2[i][j].Disciplina === disciplinas[k].id) {
                    if (sex != "") sex = sex + " ";
                    sex =
                      sex +
                      disciplinas[k].codigo +
                      " " +
                      periodosSI2[i][j].letra;
                  }
                }
              }
            }

            switch (d) {
              case 0:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "08 - 10",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 1:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 2:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 3:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 4:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
              case 5:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center",
                  },
                  {
                    text: seg,
                    alignment: "center",
                  },
                  {
                    text: ter,
                    alignment: "center",
                  },
                  {
                    text: qua,
                    alignment: "center",
                  },
                  {
                    text: qui,
                    alignment: "center",
                  },
                  {
                    text: sex,
                    alignment: "center",
                  },
                ]);
                break;
            }
            seg = ter = qua = qui = sex = "";
          }
        }
      }

      tables.push({
        text: "Eletivas",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20,
        pageBreak: "before",
      });

      if (eletivas2.length === 0) {
        vazio = vazio + 1;
      } else {
        tables.push({
          table: {
            widths: ["*", "*", "*", "*", "*", "*"],
            headerRows: 1,
            color: "#426",
            body: [
              [
                {
                  text: "Hora",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Segunda",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Terça",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Quarta",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Quinta",
                  alignment: "center",
                  bold: true,
                },
                {
                  text: "Sexta",
                  alignment: "center",
                  bold: true,
                },
              ],
            ],
          },
        });
        for (let d = 0; d < 8; d++) {
          for (let j = 0; j < eletivas2.length; j++) {
            if (
              this.checkTurmaHorario(
                eletivas2[j],
                (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas2[j],
                (d === 4 || d === 5 ? 30 : 7) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas2[j],
                (d === 4 || d === 5 ? 32 : 13) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas2[j],
                (d === 4 || d === 5 ? 34 : 19) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (
              this.checkTurmaHorario(
                eletivas2[j],
                (d === 4 || d === 5 ? 36 : 25) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (let k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
          }
          switch (d) {
            case 0:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "08 - 10",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 1:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "10 - 12",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 2:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "14 - 16",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 3:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "16 - 18",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 4:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "17 - 19",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 5:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "18 - 20",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 6:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "19 - 21",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
            case 7:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "21 - 23",
                  alignment: "center",
                },
                {
                  text: seg,
                  alignment: "center",
                },
                {
                  text: ter,
                  alignment: "center",
                },
                {
                  text: qua,
                  alignment: "center",
                },
                {
                  text: qui,
                  alignment: "center",
                },
                {
                  text: sex,
                  alignment: "center",
                },
              ]);
              break;
          }
          seg = ter = qua = qui = sex = "";
        }
      }

      var docDefinition = {
        content: tables,
        header: {
          text: new Date(Date.now()).toLocaleString(),
          margin: [40, 20, 0, 0],
          fontSize: 10,
        },
      };
      pdfMake.createPdf(docDefinition).open();
    },
  },

  computed: {
    Cursos_Modal_Filtred() {
      return _.orderBy(
        this.options_Cursos,
        this.ordemCursos.order,
        this.ordemCursos.type
      );
    },
    Grades() {
      return this.$store.state.grade.Grades;
    },

    Cursos() {
      return this.$store.state.curso.Cursos;
    },

    Turmas() {
      return this.$store.state.turma.Turmas;
    },

    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },

    DisciplinaGrades() {
      return this.$store.state.disciplinaGrade.DisciplinaGrades;
    },

    GradesCCD() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
    },

    GradesCCN() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
    },
    GradesSI() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
    },

    GradesEC() {
      return _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
    },

    activeCCD() {
      return _.indexOf(this.cursos, 1) > -1;
    },

    activeCCN() {
      return _.indexOf(this.cursos, 2) > -1;
    },

    activeSI() {
      return _.indexOf(this.cursos, 3) > -1;
    },

    activeEC() {
      return _.indexOf(this.cursos, 4) > -1;
    },

    activeEletivas() {
      return _.indexOf(this.cursos, 5) > -1;
    },

    CursosSelecionados() {
      return this.cursos.length;
    },
  },

  watch: {
    Turmas(newTurmas, oldTurmas) {
      this.updateHorarios();
    },

    CursosSelecionados: function() {
      if (this.cursos.length === 5) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    },
  },
};
</script>

<style scoped>
.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

h4 {
  width: 100%;
  text-align: start !important;
  font-size: 12px !important;
  font-weight: bold !important;
}
h3 {
  font-weight: bold;
  font-size: 20px;
  text-align: center !important;
}
.title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
  font-weight: bold;
  font-size: 18px;
}

.form-inline {
  width: auto;
}
.listas {
  line-height: 30px;
  font-size: 12px;
  text-align: justify;
  line-height: inherit;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
}
strong {
  color: #007bff;
}

/* BOTOÕES */
.btn-df {
  font-size: 12px;
  height: 25px;
  min-width: -webkit-max-content;
  min-width: -moz-max-content;
  min-width: max-content;
  max-width: -webkit-max-content;
  max-width: -moz-max-content;
  max-width: max-content;
  padding: 0 5px 0 5px;
}
.btn-azul {
  background-color: #718de0 !important;
  border-color: #9ab3ff !important;
}
.btn-azul:hover {
  background-color: rgb(74, 101, 190) !important;
  border-color: #82a0ff !important;
}

.btn-azul:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(122, 128, 124, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}

.btn-cinza {
  background-color: #999999 !important;
  border-color: #c3c3c3 !important;
}

.btn-cinza:hover {
  background-color: #747474 !important;
  border-color: #aaaaaa !important;
}

.btn-cinza:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
  box-shadow: 0 0 0 0.2rem rgba(116, 124, 119, 0.74) !important;
}

.btn-verde {
  background-color: #70b670 !important;
  border-color: #a0e7a0 !important;
}

.btn-verde:hover {
  background-color: #4c8a4c !important;
  border-color: #77dd77 !important;
}

.btn-verde:focus {
  -webkit-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  -moz-box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
  box-shadow: 0 0 0 0.2rem rgba(108, 166, 127, 0.5) !important;
}

i.fas,
i.far {
  font-size: 25px;
}

.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
  float: right;
}

.relatbtn:hover {
  color: #82a0ff !important;
  background-color: white;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}

button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: 32px !important;
  margin-left: 4px;
  margin-right: 4px;
  margin-top: 0px;
  line-height: 50%;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  text-align: center !important;
}
.addbtn {
  background-color: white;
  color: #a0e7a0;
}

.addbtn:hover {
  background-color: white;
  color: #77dd77;
}

.addbtn:focus {
  color: #77dd77;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #2fbf53;
}

.cancelbtn {
  background-color: white;
  color: #cfcfc4;
}

.cancelbtn:hover {
  background-color: white;
  color: #b8b4a8;
}

.cancelbtn:focus {
  background-color: white;
  color: #b8b8a8;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #ada89a;
}

.flex-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-pack: space-evenly;
  -webkit-justify-content: space-evenly;
  -moz-box-pack: space-evenly;
  -ms-flex-pack: space-evenly;
  justify-content: space-evenly;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}
.form-group {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 0;
}

.sticky {
  display: block !important;
  overflow: hidden !important;
  height: 20px !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}

/* ==== MODAL TABLE ==== */
.modal-table {
  display: block !important;
  overflow-y: auto !important;
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
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
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

.nav-link {
  color: #007bff !important;
  user-select: none; /* supported by Chrome and Opera */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none;
}
.clickable {
  cursor: pointer;
}
.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default;
}
@media screen and (max-width: 499px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>
