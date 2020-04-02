<template>
  <!-- // COMPONENTE DESABILITADO -->
  <div class="DashboardHorariosResumo row pr-2">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-2 col-md-2 col-sm-2 col-3 px-0 pr-1">
          Horários
        </h1>

        <div
          class="form-group col-xl-10 col-md-10 col-sm-10 col-9 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <div class="input-group mr-3 ml-auto mb-0 mt-0 p-0">
            <select class="form-control form-control-sm" v-model="periodo">
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text">Semestre</label>
            </div>
          </div>

          <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
            <i class="fas fa-question"></i>
          </b-button>

          <button
            type="button"
            class="relatbtn"
            title="Relatório"
            v-on:click.prevent="pdf"
          >
            <i class="far fa-file-alt"></i>
          </button>
        </div>
      </div>

      <!-- <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-4 col-md-4 col-sm-5 col-6 px-0 pr-1">Horários - Resumo</h1>

        <div
          class="form-group col-xl-8 col-md-8 col-sm-7 col-6 mb-0 p-0"
          style="justify-content: flex-end!important;"
        >
          <div class="input-group mr-3 ml-auto mb-0 mt-0 p-0">
            <select class="form-control form-control-sm" v-model="periodo">
              <option value="1">Primeiro</option>
              <option value="2">Segundo</option>
              <option value="3">Ambos</option>
            </select>
            <div class="input-group-append">
              <label class="input-group-text">Semestre</label>
            </div>
          </div>
          <div class="d-flex p-0 m-0 mt-1">
            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>

            <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
              <i class="far fa-file-alt"></i>
            </button>
          </div>
        </div>
      </div>-->
    </div>

    <div class="w-100 mb-2 border-bottom"></div>
    <!-- GRID -->
    <div class="row m-0 w-100">
      <div
        class="col p-0 pl-1 marg mr-2 scroll-bar-custom"
        style="overflow-y:auto;  height: -webkit-calc(100vh - 85px); height: -moz-calc(100vh - 85px); height: calc(100vh - 85px);"
      >
        <template v-if="false">
          <!-- ----------------------------------------------------------------------------------------------- -->
          <div
            class="title"
            style="text-align:center !important;max-width: 1278px !important;"
          >
            <h3>1º SEMESTRE</h3>
          </div>

          <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->

          <div class="title">
            <h4 style="font-weight: bold; font-size: 12px;">
              <span style=" border-bottom: 1px solid #cccccc"
                >Ciência da Computação Diurno</span
              >
            </h4>
          </div>

          <curso-diurno :Curso="ativos1.CCD"></curso-diurno>
          <!------------------------------------------------- EC ------------------------------------------------->
          <div class="title">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Engenharia Computacional</span
              >
            </h4>
          </div>

          <curso-diurno :Curso="ativos1.EC"></curso-diurno>

          <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
          <div class="title">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Ciência da Computação Noturno</span
              >
            </h4>
          </div>

          <curso-noturno :Curso="ativos1.CCN"></curso-noturno>

          <!-- -------------------------------------------- SI ----------------------------------------- -->

          <div class="title">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Sistemas de Informação</span
              >
            </h4>
          </div>

          <curso-noturno :Curso="ativos1.SI"></curso-noturno>

          <div class="title">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc">Eletivas</span>
            </h4>
          </div>

          <horario-eletivas
            style="padding-left: 15px !important"
            :Eletivas="ativos1.Eletivas"
          ></horario-eletivas>
          <!-- ----------------------------------------------------------------------------------------------- -->
          <div class="title" style="text-align:center;">
            <h3>2º SEMESTRE</h3>
          </div>
          <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
          <div class="title">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Ciência da Computação Diurno</span
              >
            </h4>
          </div>

          <curso-diurno :Curso="ativos2.CCD"></curso-diurno>

          <!---------------------------------------- EC ---------------------------------------->

          <div class="title title-hide">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Engenharia Computacional</span
              >
            </h4>
          </div>

          <curso-diurno :Curso="ativos2.EC"></curso-diurno>

          <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
          <div class="title title-hide">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Ciência da Computação Noturno</span
              >
            </h4>
          </div>

          <curso-noturno :Curso="ativos2.CCN"></curso-noturno>

          <!-- -------------------------------------------- SI ----------------------------------------- -->

          <div class="title">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc"
                >Sistemas de Informação</span
              >
            </h4>
          </div>

          <curso-noturno :Curso="ativos2.SI"></curso-noturno>

          <div class="title title-hide">
            <h4>
              <span style=" border-bottom: 1px solid #cccccc">Eletivas</span>
            </h4>
          </div>

          <horario-eletivas
            style="padding-left: 15px !important"
            :Eletivas="ativos2.Eletivas"
          ></horario-eletivas>
        </template>
      </div>

      <div class="col-5 col-sm-4 col-md-4 col-lg-2 col-xl-2 p-0 mt-0 mb-2">
        <div class="card col p-0 ml-auto mr-3">
          <!-- <div class="div-card p-0 mt-0 mb-2 col-lg-6 col-md-6 col-sm-12 col-12">
          <div class="card ml-auto mr-3">-->
          <div class="card-header">
            <h1 class="card-title">Definir Grades</h1>
          </div>
          <div class="card-body">
            <form>
              <div class="row mb-2 mx-0">
                <div class="form-group col m-0 px-0">
                  <div
                    class="form-group col m-0 px-0 border rounded-top"
                    style="border-color: rgba(0,0,0,0.125);"
                  >
                    <table class="table table-sm">
                      <tr class="thead-light">
                        <div class="sticky border" style="width:max-contet;">
                          <th
                            scope="col"
                            class="border-0 p-header"
                            style="width:25px"
                          >
                            <input
                              type="checkbox"
                              v-model="selectAll"
                              v-on:change="toggleAll"
                            />
                          </th>
                          <th
                            scope="col"
                            class="border-0 p-header"
                            style="width:140px; text-align:start!important"
                          >
                            Cursos
                          </th>
                        </div>
                      </tr>

                      <tbody>
                        <tr
                          v-for="curso in options"
                          :key="
                            'curso-id-' +
                              curso.id +
                              curso.nome +
                              '-' +
                              curso.value
                          "
                        >
                          <div style="width: max-contet">
                            <td style="padding:0;broder:0;margin:0!important">
                              <div style="width:25px;">
                                <input
                                  type="checkbox"
                                  :value="curso.value"
                                  v-on:change.capture="defineSelectAll"
                                  v-model="cursos"
                                  class="form-check-input position-static m-0"
                                />
                              </div>
                            </td>
                            <td>
                              <p style="width:140px; text-align:start">
                                {{ curso.text }}
                              </p>
                            </td>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!--
                <b-form-checkbox v-model="selectAll" v-on:change="toggleAll">Selecionar Tudo</b-form-checkbox>
                <b-form-checkbox-group
                  stacked
                  v-model="cursos"
                  name="cursosCheck"
                  :options="options"
                  v-on:change.capture="defineSelectAll"
                  style="display: block;"
                ></b-form-checkbox-group>
                  -->
                </div>
              </div>

              <div class="form-group row">
                <div style="display: flex; margin-right: 0; margin-left: auto">
                  <button
                    v-on:click="createHorarios"
                    title="Confirmar"
                    type="button"
                    class="addbtn"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Ajuda -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para gerar relatório:</strong> Clique no botão Relatório
            <i
              class="far fa-file-alt relatbtn px-1"
              style="font-size: 12px"
            ></i>
            e aguarde para fazer download do mesmo.
          </li>
          <li class="list-group-item">
            <strong>Observação:</strong> Ao passar o mouse por cima do código de
            uma matéria em qualquer tabela será mostrado o nome da mesma e, se
            aplicável, o professor alocado para tal.
          </li>
        </ul>
      </div>

      <div slot="modal-footer" style="display: none"></div>
    </b-modal>
  </div>
</template>

<script>
/*
import _ from "lodash";
import cursoDiurno from "./HorarioCursoDiurno.vue";
import cursoNoturno from "./HorarioCursoNoturno.vue";
import horarioEletivas from "./HorarioEletivas.vue";

export default {
  name: "DashboardHorariosResumo",

  data() {
    return {
      error: undefined,
      options: [
        { text: "CC Diurno", value: 1 },
        { text: "CC Noturno", value: 2 },
        { text: "SI", value: 3 },
        { text: "Eng. Comp.", value: 4 },
        { text: "Eletivas", value: 5 }
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
        Eletivas: []
      },

      ativos2: {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      }
    };
  },

  components: {
    cursoDiurno,
    cursoNoturno,
    horarioEletivas
  },

  beforeMount: function() {
    let anoAtual = _.isEmpty(this.$store.state.plano.Plano)
      ? 2019
      : this.$store.state.plano.Plano[0].ano;
    this.createHorarios1(anoAtual, 1);
    this.createHorarios2(anoAtual, 3);
  },

  methods: {
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
        fontSize: 20
      });
      tables.push({
        text: "Ciência da Computação Diurno",
        bold: false,
        margin: [0, 10, 0, 5],
        fontSize: 20
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCD1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: false,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosCCD1[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCD1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[3 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCN1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosCCN1[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCN1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[24 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosEC1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosEC1[i].length; j++) {
              if (this.checkTurmaHorario(periodosEC1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[45 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosSI1[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosSI1[i].length; j++) {
              if (this.checkTurmaHorario(periodosSI1[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[66 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
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
                { text: "Hora", alignment: "center", bold: true },
                {
                  text: "Segunda",
                  alignment: "center",
                  bold: true
                },
                { text: "Terça", alignment: "center", bold: true },
                {
                  text: "Quarta",
                  alignment: "center",
                  bold: true
                },
                { text: "Quinta", alignment: "center", bold: true },
                {
                  text: "Sexta",
                  alignment: "center",
                  bold: true
                }
              ]
            ]
          }
        });
        for (var d = 0; d < 8; d++) {
          for (var j = 0; j < eletivas1.length; j++) {
            if (
              this.checkTurmaHorario(
                eletivas1[j],
                (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (var k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 1:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "10 - 12",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 2:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "14 - 16",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 3:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "16 - 18",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 4:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "17 - 19",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 5:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "18 - 20",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 6:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "19 - 21",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 7:
              tables[86 - 2 * vazio].table.body.push([
                {
                  text: "21 - 23",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });
      tables.push({
        text: "Ciência da Computação Diurno",
        bold: true,
        margin: [0, 10, 0, 5],
        fontSize: 20
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCD2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosCCD2[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCD2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[90 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosCCN2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosCCN2[i].length; j++) {
              if (this.checkTurmaHorario(periodosCCN2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[111 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosEC2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 0; d < 4; d++) {
            for (var j = 0; j < periodosEC2[i].length; j++) {
              if (this.checkTurmaHorario(periodosEC2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[132 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
      });

      for (var i = 0; i < 10; i++) {
        if (periodosSI2[i].length === 0) {
          vazio = vazio + 1;
        } else {
          tables.push({
            text: i + 1 + "º Período",
            bold: true,
            margin: [0, 5, 0, 5]
          });
          tables.push({
            table: {
              widths: ["*", "*", "*", "*", "*", "*"],
              headerRows: 1,
              color: "#426",
              body: [
                [
                  { text: "Hora", alignment: "center", bold: true },
                  {
                    text: "Segunda",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Terça", alignment: "center", bold: true },
                  {
                    text: "Quarta",
                    alignment: "center",
                    bold: true
                  },
                  { text: "Quinta", alignment: "center", bold: true },
                  {
                    text: "Sexta",
                    alignment: "center",
                    bold: true
                  }
                ]
              ]
            }
          });
          for (var d = 4; d < 6; d++) {
            for (var j = 0; j < periodosSI2[i].length; j++) {
              if (this.checkTurmaHorario(periodosSI2[i][j], 1 + d)) {
                for (var k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                for (k = 0; k < disciplinas.length; k++) {
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
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 1:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "10 - 12",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 2:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "14 - 16",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 3:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "16 - 18",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 4:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "19 - 21",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
                ]);
                break;
              case 5:
                tables[153 + 2 * (i - vazio)].table.body.push([
                  {
                    text: "21 - 23",
                    alignment: "center"
                  },
                  { text: seg, alignment: "center" },
                  { text: ter, alignment: "center" },
                  {
                    text: qua,
                    alignment: "center"
                  },
                  { text: qui, alignment: "center" },
                  { text: sex, alignment: "center" }
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
        pageBreak: "before"
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
                { text: "Hora", alignment: "center", bold: true },
                {
                  text: "Segunda",
                  alignment: "center",
                  bold: true
                },
                { text: "Terça", alignment: "center", bold: true },
                {
                  text: "Quarta",
                  alignment: "center",
                  bold: true
                },
                { text: "Quinta", alignment: "center", bold: true },
                {
                  text: "Sexta",
                  alignment: "center",
                  bold: true
                }
              ]
            ]
          }
        });
        for (var d = 0; d < 8; d++) {
          for (var j = 0; j < eletivas2.length; j++) {
            if (
              this.checkTurmaHorario(
                eletivas2[j],
                (d === 4 || d === 5 ? 28 : 1) + (d > 5 ? d - 2 : d)
              )
            ) {
              for (var k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
              for (k = 0; k < disciplinas.length; k++) {
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
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 1:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "10 - 12",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 2:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "14 - 16",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 3:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "16 - 18",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 4:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "17 - 19",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 5:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "18 - 20",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 6:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "19 - 21",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
              ]);
              break;
            case 7:
              tables[173 - 2 * vazio].table.body.push([
                {
                  text: "21 - 23",
                  alignment: "center"
                },
                { text: seg, alignment: "center" },
                { text: ter, alignment: "center" },
                {
                  text: qua,
                  alignment: "center"
                },
                { text: qui, alignment: "center" },
                { text: sex, alignment: "center" }
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
          fontSize: 10
        }
      };
      pdfMake.createPdf(docDefinition).open();
    },

    isEven(number) {
      if (number % 2 === 0) return "true";
      else return "false";
    },

    emptyTurmas1() {
      this.ativos1 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      };
    },

    emptyTurmas2() {
      this.ativos2 = {
        CCD: [[], [], [], [], [], [], [], [], [], []],
        CCN: [[], [], [], [], [], [], [], [], [], []],
        EC: [[], [], [], [], [], [], [], [], [], []],
        SI: [[], [], [], [], [], [], [], [], [], []],
        Eletivas: []
      };
    },

    createHorarios1: function(ano, semestre) {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = this.$store.state.turma.Turmas;
      var turmasExternas = this.$store.state.turmaExterna.Turmas;

      if (semestre === 1) {
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
      } else {
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
      }
      this.emptyTurmas1();

      //CC Diurno
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //CC Noturno está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //SI está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //Engenharia Computacional está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 1 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 1 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //Eletivas está selecionado:
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (var d = 0; d < disciplinaGrades.length; d++) {
          if (
            turmas[t].periodo != 1 ||
            turmas[t].Disciplina === disciplinaGrades[d].Disciplina
          ) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos1.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }
    },

    createHorarios2: function(ano, semestre) {
      var grade;
      var grades;
      var inicio = 1;
      var fim;
      var pedidos;
      var pedidosExternos;
      var disciplinaGrades = this.$store.state.disciplinaGrade.DisciplinaGrades;
      var turmas = this.$store.state.turma.Turmas;
      var turmasExternas = this.$store.state.turmaExterna.Turmas;

      if (semestre === 1) {
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
      } else {
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
      }
      this.emptyTurmas2();

      //CC Diurno está selecionado

      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 4]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCD &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //CC Noturno está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 1]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenCCN &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //SI está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 3]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenSI &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //Engenharia Computacional está selecionado
      grades = _.filter(this.$store.state.grade.Grades, ["Curso", 2]);
      grades = _.orderBy(grades, "periodoInicio", "desc");
      pedidos = [];
      for (var t in this.$store.state.pedido.Pedidos) {
        for (var pedido in this.$store.state.pedido.Pedidos[t]) {
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
      inicio = 1;
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
        //grade
        grade = grades[i].id;
        //inicio
        if (i !== 0) inicio = fim + 1;
        //fim
        if (i + 1 === grades.length) fim = 10;
        else if (i == 0)
          fim =
            1 +
            2 * (ano - parseInt(grades[i].periodoInicio.slice(0, 4), 10)) +
            (semestre - parseInt(grades[i].periodoInicio.slice(5, 6), 10)) / 2;
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
        for (var k = 0; k < disciplinaGrades.length; k++) {
          if (
            disciplinaGrades[k].Grade == grade &&
            this.isEven(disciplinaGrades[k].periodo) == this.evenEC &&
            disciplinaGrades[k].periodo >= parseInt(inicio, 10) &&
            disciplinaGrades[k].periodo <= parseInt(fim, 10)
          ) {
            for (var j = 0; j < turmas.length; j++) {
              if (
                turmas[j].periodo === 3 &&
                turmas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidos.length; p++) {
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
            for (var j = 0; j < turmasExternas.length; j++) {
              if (
                turmasExternas[j].periodo === 3 &&
                turmasExternas[j].Disciplina == disciplinaGrades[k].Disciplina
              ) {
                for (var p = 0; p < pedidosExternos.length; p++) {
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

      //Eletivas está selecionado:
      var eletiva = true;
      for (var t = 0; t < turmas.length; t++) {
        for (var d = 0; d < disciplinaGrades.length; d++) {
          if (
            turmas[t].periodo != 3 ||
            turmas[t].Disciplina === disciplinaGrades[d].Disciplina
          ) {
            eletiva = false;
          }
        }
        if (eletiva) {
          this.ativos2.Eletivas.push(turmas[t]);
        } else {
          eletiva = true;
        }
      }
    },

    horarioVazio(curso) {
      if (curso.length != 0) return true;
      else return false;
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
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < this.ativos.CCD[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.CCD[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.CCD[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos.CCN[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.CCN[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.CCN[i].splice(
                j,
                1,
                this.$store.state.turma.Turmas[k]
              );
            }
          }
        for (var j = 0; j < this.ativos.EC[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.EC[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.EC[i].splice(j, 1, this.$store.state.turma.Turmas[k]);
            }
          }
        for (var j = 0; j < this.ativos.SI[i].length; j++)
          for (var k = 0; k < this.$store.state.turma.Turmas.length; k++) {
            if (
              this.ativos.SI[i][j].id == this.$store.state.turma.Turmas[k].id
            ) {
              this.ativos.SI[i].splice(j, 1, this.$store.state.turma.Turmas[k]);
            }
          }
      }

      this.$store.commit("redefinirAtivas", { Ativas: this.ativos });
    }
  },

  computed: {
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
    }
  },

  watch: {
    Turmas(newTurmas, oldTurmas) {
      this.updateHorarios();
    }
  }
};
*/
</script>

<style scoped>
/* prefixed by https://autoprefixer.github.io (PostCSS: v7.0.23, autoprefixer: v9.7.3) */

.DashboardHorariosResumo {
  max-width: 100%;
  overflow: hidden;
  margin: 0;
}

.titulo {
  font-size: 25px;
  font-weight: normal;
  padding-left: 0;
  margin: 0 !important;
}

.title {
  clear: both;
  display: block;
  padding-top: 0px;
  text-align: start !important;
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
i.fas,
i.far {
  font-size: 25px;
}

.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
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
button {
  padding: 0;
  border: none;
  background: none;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  margin-right: 15px;
  margin-top: 5px;
  margin-bottom: 0px;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}

h3 {
  font-weight: bold;
  font-size: 20px;
  text-align: center !important;
}
h4 {
  font-size: 12px !important;
  font-weight: bold !important;
}
h5 {
  font-size: 12px;
  font-weight: normal;
}

@media screen and (min-width: 576px) {
  .title {
    text-align: start !important;
  }
}
@media screen and (max-width: 575px) {
  .title {
    text-align: center !important;
  }
}
/* CARD */

.div-card {
  margin-left: auto;
}
.card-title {
  font-size: 16px;
  font-weight: normal;
  padding-left: 0;
  margin: 0;
  text-align: center;
}
.card {
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
  -webkit-box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  -moz-box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.15);
  margin-left: auto;
}
.card-body {
  font-size: 12px;
  padding-top: 15px;
}

.card label {
  margin: 0;
}
.selectMaior2 {
  width: 300px;
  text-align: start;
}
input {
  height: 25px !important;
  padding: 0px 5px 0px 5px !important;
  font-size: 11px !important;
  text-align: start;
}
.inputMenor {
  width: 60px;
  text-align: center;
}
.inputMenor2 {
  width: 40px;
  margin-right: 10px;
  text-align: center;
}
.inputMaior {
  width: 250px;
  text-align: start;
}

.input-group-text {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  -ms-flex-pack: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -moz-box-pack: center;
  justify-content: center;
  margin-bottom: 0;
  /*===*/
  max-width: 70px;
  min-width: 70px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 0px 0px 0px 5px !important;
  min-width: 100px;
  max-width: 100px;
  text-align: start;
}
.form-group {
  display: -ms-flexbox;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: flex;
  -ms-flex: 0 0 auto;
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  -moz-box-flex: 0;
  flex: 0 0 auto;
  -ms-flex-flow: row wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-flow: row wrap;
  -moz-box-orient: horizontal;
  -moz-box-direction: normal;
  flex-flow: row wrap;
  -ms-flex-align: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -moz-box-align: center;
  align-items: center;
  margin-bottom: 0;
}
.form-inline .input-group,
.form-inline {
  width: auto;
}

.tabelas {
  overflow-y: auto;
  overflow-x: hidden;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
table {
  display: block !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
}
tbody {
  max-height: 100%;
  width: 100%;
}
table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  font-size: 10px !important;
  height: 20px;
}
tr thead {
  display: block;
}
th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center !important;
  height: 20px !important;
  vertical-align: middle !important;
}
.p-header {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
table p {
  margin-bottom: 0 !important;
  text-align: center;
  padding-right: 5px !important;
  padding-left: 5px !important;
  font-size: 10px !important;
}
table input[type="checkbox"] {
  height: 13px !important;
  margin-left: 0 !important;
  margin-top: 3.5px !important;
}
.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
}

.scroll-bar-custom ::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}
.scroll-bar-custom::-webkit-scrollbar {
  width: 6px;
  background: #f4f4f4;
}
.scroll-bar-custom::-webkit-scrollbar-thumb {
  background: #666;
}
</style>
