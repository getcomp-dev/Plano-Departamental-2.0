<template>
  <div class="main-component row">
    <PageTitle :title="'Horários - Cursos'">
      <template #aside>
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
        </b-button>
        <button
          type="button"
          class="btn-custom btn-icon relatbtn"
          v-on:click.prevent="pdf"
          title="Relatório"
        >
          <i class="far fa-file-pdf"></i>
        </button>
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
      <div v-show="semestre1IsActived" class="w-100">
        <h2
          v-show="CursosWithHorarios.length"
          class="semestre-title w-100 px-1 bg-custom"
        >
          1º SEMESTRE
        </h2>

        <template v-for="curso in CursosWithHorarios">
          <h3 class="curso-title pl-1" :key="'s1-title' + curso.nome">
            {{ curso.nome }}
          </h3>
          <TablesHorarios
            :HorariosCurso="curso.horarios1Semestre"
            :turno="curso.turno"
            :key="'s1-table' + curso.nome"
          />
        </template>

        <template v-if="EletivasIsSelected">
          <h3 class="curso-title pl-1">Eletivas</h3>
          <TableEletivas :Eletivas="horariosAtivos1.Eletivas" />
        </template>
      </div>

      <div v-show="semestre2IsActived" class="w-100">
        <h2
          v-show="CursosWithHorarios.length"
          class="semestre-title w-100 px-1 bg-custom"
        >
          2º SEMESTRE
        </h2>

        <template v-for="curso in CursosWithHorarios">
          <h3 class="curso-title pl-1" :key="'s2-title' + curso.nome">
            {{ curso.nome }}
          </h3>
          <TablesHorarios
            :HorariosCurso="curso.horarios2Semestre"
            :turno="curso.turno"
            :key="'s2-table' + curso.nome"
          />
        </template>
        <template v-if="EletivasIsSelected">
          <h3 class="curso-title pl-1">Eletivas</h3>
          <TableEletivas :Eletivas="horariosAtivos2.Eletivas" />
        </template>
      </div>
    </div>

    <!-- MODAL FILTROS -->
    <b-modal id="modalFiltros" ref="modalFiltros" scrollable title="Filtros">
      <NavTab
        :currentTab="modalTabAtiva"
        :allTabs="['Cursos', 'Semestre']"
        v-on:change-tab="modalTabAtiva = $event"
      />
      <div class="col m-0 p-0 max-content" style="height: 450px !important;">
        <table
          v-show="modalTabAtiva === 'Semestre'"
          class="table table-bordered table-sm modal-table"
        >
          <thead class="thead-light sticky">
            <tr>
              <div
                style="font-size: 11px !important;"
                class="max-content sticky"
              >
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
                      v-model="semestresAtivos.primeiro"
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
                      v-model="semestresAtivos.segundo"
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
          v-show="modalTabAtiva === 'Cursos'"
          class="table table-sm modal-table table-bordered"
        >
          <thead class="thead-light sticky">
            <tr>
              <div class="max-content sticky">
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
            <tr
              v-for="curso in CursosModalOrdered"
              :key="'curso-id-' + curso.codigo"
            >
              <div style="width: max-content; height: 22px !important;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      :value="curso"
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
          <template v-if="modalTabAtiva == 'Semestre'">
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
              @click="selectAllCursos()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneCursos()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>

        <b-button
          variant="success"
          @click="btnOK()"
          class="btn-verde btn-custom btn-modal px-3"
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
import TableEletivas from "./TableEletivas.vue";
import TablesHorarios from "./TablesHorarios.vue";
import PageTitle from "@/components/PageTitle.vue";
import NavTab from "@/components/NavTab.vue";

export default {
  name: "DashboardHorarios",
  components: {
    TablesHorarios,
    TableEletivas,
    PageTitle,
    NavTab,
  },
  data() {
    return {
      error: undefined,
      cursosAtivados: [],
      cursosSelecionados: [],
      modalTabAtiva: "Cursos",
      ordemCursos: { order: "codigo", type: "asc" },
      evenCCN: "false",
      evenCCD: "false",
      evenEC: "false",
      evenSI: "false",
      semestreAtual: 3,
      semestresAtivos: {
        primeiro: true,
        segundo: true,
      },
      allCursosOptions: [
        {
          nome: "SISTEMAS DE INFORMAÇÃO",
          codigo: "76A",
        },
        {
          nome: "CIÊNCIA DA COMPUTAÇÃO NOTURNO",
          codigo: "35A",
        },
        {
          nome: "CIÊNCIA DA COMPUTAÇÃO DIURNO",
          codigo: "65C",
        },
        {
          nome: "ENGENHARIA DA COMPUTAÇÃO",
          codigo: "65B",
        },
        {
          nome: "ELETIVAS",
          codigo: "-",
        },
      ],
      horariosAtivos1: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },
      horariosAtivos2: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: [],
      },
    };
  },
  beforeMount() {
    this.createHorarios1();
    this.createHorarios2();

    this.selectAllCursos();
    this.cursosAtivados = [...this.cursosSelecionados];
  },
  methods: {
    btnOK() {
      this.btnOKSemestre();
      this.cursosAtivados = [...this.cursosSelecionados];
      this.modalTabAtiva = "Cursos";
      this.$refs.modalFiltros.hide();
    },
    btnOKSemestre() {
      if (this.semestresAtivos.primeiro && !this.semestresAtivos.segundo) {
        this.semestreAtual = 1;
      } else if (
        this.semestresAtivos.segundo &&
        !this.semestresAtivos.primeiro
      ) {
        this.semestreAtual = 2;
      } else if (
        this.semestresAtivos.primeiro &&
        this.semestresAtivos.segundo
      ) {
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
      this.semestresAtivos.primeiro = true;
      this.semestresAtivos.segundo = true;
    },
    selectNoneSemestre() {
      this.semestresAtivos.primeiro = false;
      this.semestresAtivos.segundo = false;
    },
    selectNoneCursos() {
      if (this.cursosSelecionados.length !== 0) this.cursosSelecionados = [];
    },
    selectAllCursos() {
      this.cursosSelecionados = [...this.allCursosOptions];
    },
    isEven(number) {
      if (number % 2 === 0) return "true";
      else return "false";
    },
    checkTurmaHorario(turma, horario) {
      if (turma.Horario1 == horario || turma.Horario2 == horario) {
        return true;
      } else return false;
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
        for (let j = 0; j < this.horariosAtivos1.CCD[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos1.CCD[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos1.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos1.CCN[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos1.CCN[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos1.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos1.EC[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos1.EC[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos1.EC[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos1.SI[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos1.SI[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos1.SI[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas: this.horariosAtivos1,
      });

      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < this.horariosAtivos2.CCD[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos2.CCD[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos2.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos2.CCN[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos2.CCN[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos2.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos2.EC[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos2.EC[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos2.EC[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (let j = 0; j < this.horariosAtivos2.SI[i].length; j++)
          for (let k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.horariosAtivos2.SI[i][j].id ==
              this.$store.state.turma.Turmas[k].id
            ) {
              this.horariosAtivos2.SI[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas2: this.horariosAtivos2,
      });

      this.$store.commit("redefinirAtivas2", {
        Ativas: this.horariosAtivos2,
      });
    },
    createHorarios1() {
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
                    this.horariosAtivos1.CCD[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos1.CCD[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
                    this.horariosAtivos1.CCN[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos1.CCN[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
                    this.horariosAtivos1.SI[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos1.SI[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
                    this.horariosAtivos1.EC[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos1.EC[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
          this.horariosAtivos1.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }

      this.$store.commit("redefinirAtivas1", {
        Ativas: this.horariosAtivos1,
      });
    },
    createHorarios2() {
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
                    this.horariosAtivos2.CCD[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos2.CCD[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
                    this.horariosAtivos2.CCN[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos2.CCN[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
                    this.horariosAtivos2.SI[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos2.SI[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
                    this.horariosAtivos2.EC[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmas[j]);
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
                    this.horariosAtivos2.EC[
                      disciplinaGrades[k].periodo - 1
                    ].push(turmasExternas[j]);
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
          this.horariosAtivos2.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }

      this.$store.commit("redefinirAtivas2", {
        Ativas: this.horariosAtivos2,
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
      var periodosCCD1 = this.horariosAtivos1.CCD;
      var periodosCCN1 = this.horariosAtivos1.CCN;
      var periodosEC1 = this.horariosAtivos1.EC;
      var periodosSI1 = this.horariosAtivos1.SI;
      var eletivas1 = this.horariosAtivos1.Eletivas;
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

      var periodosCCD2 = this.horariosAtivos2.CCD;
      var periodosCCN2 = this.horariosAtivos2.CCN;
      var periodosEC2 = this.horariosAtivos2.EC;
      var periodosSI2 = this.horariosAtivos2.SI;
      var eletivas2 = this.horariosAtivos2.Eletivas;

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
    semestre1IsActived() {
      return this.semestreAtual === 1 || this.semestreAtual === 3;
    },
    semestre2IsActived() {
      return this.semestreAtual === 2 || this.semestreAtual === 3;
    },
    CursosModalOrdered() {
      return _.orderBy(
        this.allCursosOptions,
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
    CursosWithHorarios() {
      const cursosResult = [
        {
          isSelected: _.find(
            this.cursosAtivados,
            (curso) => curso.codigo === "65C"
          ),
          nome: "Ciência da computação Diurno",
          turno: "Diurno",
          codigo: "65C",
          value: 1,
          horarios1Semestre: this.horariosAtivos1.CCD,
          horarios2Semestre: this.horariosAtivos2.CCD,
        },
        {
          isSelected: _.find(
            this.cursosAtivados,
            (curso) => curso.codigo === "35A"
          ),
          nome: "Ciência da computação Noturno",
          codigo: "35A",
          value: 2,
          turno: "Noturno",
          horarios1Semestre: this.horariosAtivos1.CCN,
          horarios2Semestre: this.horariosAtivos2.CCN,
        },
        {
          isSelected: _.find(
            this.cursosAtivados,
            (curso) => curso.codigo === "76A"
          ),
          nome: "Sistemas de Informação",
          codigo: "76A",
          value: 3,
          turno: "Noturno",
          horarios1Semestre: this.horariosAtivos1.SI,
          horarios2Semestre: this.horariosAtivos2.SI,
        },
        {
          isSelected: _.find(
            this.cursosAtivados,
            (curso) => curso.codigo === "65B"
          ),
          nome: "Engenharia da Computação",
          codigo: "65B",
          value: 4,
          turno: "Diurno",
          horarios1Semestre: this.horariosAtivos1.EC,
          horarios2Semestre: this.horariosAtivos2.EC,
        },
      ];
      return _.filter(cursosResult, (curso) => curso.isSelected);
    },

    DisciplinaGrades() {
      return this.$store.state.disciplinaGrade.DisciplinaGrades;
    },

    EletivasIsSelected() {
      return _.find(this.cursosAtivados, (curso) => curso.codigo === "-");
    },
  },

  watch: {
    Turmas() {
      this.updateHorarios();
    },
  },
};
</script>

<style scoped>
.semestre-title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
  font-weight: bold;
  font-size: 18px;
  padding-top: 5px !important;
  padding-bottom: 5px !important;
}
.curso-title {
  width: 100%;
  text-align: start !important;
  font-size: 12px !important;
  font-weight: bold !important;
}

::v-deep .container-horarios .div-table .periodo-title {
  font-size: 12px;
  font-weight: normal;
}

::v-deep .container-horarios .div-table .tg {
  border-collapse: collapse;
  border-spacing: 0;
  border-color: #ccc;
  margin-right: 5px !important;
  margin-bottom: 20px !important;
}
::v-deep .container-horarios .div-table .tg td {
  font-family: Arial, sans-serif;
  font-size: 11px;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: break-word;
  border-color: rgba(189, 189, 189, 0.644);
  color: #333;
  background-color: #fff;
}
::v-deep .container-horarios .div-table .tg th,
::v-deep .container-horarios .div-table .tg-hor {
  font-family: Arial, sans-serif;
  font-size: 11px;
  font-weight: bold;
  padding: 0px;
  border-style: solid;
  border-width: 1px;
  overflow: hidden;
  word-break: normal;
  border-color: rgba(189, 189, 189, 0.623);
  color: #333;
  background-color: #e9ecef !important;
}
::v-deep .container-horarios .div-table .tg .tg-0lax {
  vertical-align: center;
  text-align: center;
  height: 22px;
  min-width: 50px !important;
}
::v-deep .container-horarios td p {
  min-width: 48px !important;
  padding-right: 1px !important;
  padding-left: 1px !important;
  margin: 0 !important;
}
</style>
