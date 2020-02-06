<template>
  <div class="DashboardHorariosResumo row pr-2">
    <!-- Titulo -->
    <div
      class="col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height:38px;"
    >
      <div class="form-inline col-11 pl-0 mb-1 pr-1">
          <h1 class="col-12 titulo">Horários - Resumo</h1>
      </div>
      <div class="col-1">
        <button type="button" class="relatbtn" title="Relatório" v-on:click.prevent="pdf">
          <i class="far fa-file-alt"></i>
        </button>
      </div>
    </div>

      <div class="w-100 mb-2 border-bottom"></div>
		<div class="col-12 p-0 marg" style="padding-left: 15px !important;">
      <!-- ----------------------------------------------------------------------------------------------- -->
      <div class="title" style="text-align:center !important;">
        <h3>1º SEMESTRE</h3>
      </div>
      
      <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->

      <div class="title">
        <h4 style="font-weight: bold; font-size: 12px;">
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Diurno</span>
        </h4>
      </div>
    
      <curso-diurno :Curso="ativos1.CCD"></curso-diurno>
      <!------------------------------------------------- EC ------------------------------------------------->
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Engenharia Computacional</span>
        </h4>
      </div>

      <curso-diurno :Curso="ativos1.EC"></curso-diurno>

      <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Noturno</span>
        </h4>
      </div>

      <curso-noturno :Curso="ativos1.CCN"></curso-noturno>

      <!-- -------------------------------------------- SI ----------------------------------------- -->

      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Sistemas de Informação</span>
        </h4>
      </div>

      <curso-noturno :Curso="ativos1.SI"></curso-noturno>

      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Eletivas</span>
        </h4>
      </div>

      <horario-eletivas style="padding-left: 15px !important" :Eletivas="ativos1.Eletivas"></horario-eletivas>
      <!-- ----------------------------------------------------------------------------------------------- -->
      <div class="title" style="text-align:center;">
        <h3>2º SEMESTRE</h3>
      </div>
      <!-- -------------------------------------------- CC Diurno ----------------------------------------- -->
      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Diurno</span>
        </h4>
      </div>

      <curso-diurno :Curso="ativos2.CCD"></curso-diurno>
        
        <!---------------------------------------- EC ---------------------------------------->
        
      <div class="title title-hide">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Engenharia Computacional</span>
        </h4>
      </div>

      <curso-diurno :Curso="ativos2.EC"></curso-diurno>
     
      <!-- -------------------------------------------- CC Noturno ----------------------------------------- -->
      <div class="title title-hide">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Ciência da Computação Noturno</span>
        </h4>
      </div>

      <curso-noturno :Curso="ativos2.CCN"></curso-noturno>

      <!-- -------------------------------------------- SI ----------------------------------------- -->

      <div class="title">
        <h4>
          <span style=" border-bottom: 1px solid #cccccc">Sistemas de Informação</span>
        </h4>
      </div>

      <curso-noturno :Curso="ativos2.SI"></curso-noturno>

      <div class="title title-hide">
          <h4>
            <span style=" border-bottom: 1px solid #cccccc">Eletivas</span>
          </h4>
        </div>

      <horario-eletivas style="padding-left: 15px !important" :Eletivas="ativos2.Eletivas"></horario-eletivas>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import cursoDiurno from './HorarioCursoDiurno.vue'
import cursoNoturno from './HorarioCursoNoturno.vue'
import horarioEletivas from './HorarioEletivas.vue'

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
    console.log([anoAtual, _.isEmpty(this.$store.state.plano.Plano)]);
    this.createHorarios1(anoAtual, 1);
    console.log(this.ativos1);
    this.createHorarios2(anoAtual, 3);
    console.log(this.ativos2);
    console.log(this.horarioVazio(this.ativos1.CCD[0]));
    console.log(this.ativos1.CCD[0]);
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
            if (this.checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 28 : 1) + ((d > 5) ? d - 2 : d))) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 30 : 7) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 32 : 13) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 34 : 19) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas1[j], ((d === 4 || d === 5) ? 36 : 25) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas1[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + eletivas1[j].letra;
                }
              }
            }
          }
          console.log([seg, ter, qua, qui, sex]);
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
            if (this.checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 28 : 1) + ((d > 5) ? d - 2 : d))) {
              for (var k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (seg !== "") seg = seg + " ";
                  seg = seg + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 30 : 7) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (ter != "") ter = ter + " ";
                  ter = ter + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 32 : 13) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (qua != "") qua = qua + " ";
                  qua = qua + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j], ((d === 4 || d === 5) ? 34 : 19) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (qui != "") qui = qui + " ";
                  qui = qui + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
            if (this.checkTurmaHorario(eletivas2[j],  ((d === 4 || d === 5) ? 36 : 25) + ((d > 5) ? d - 2 : d))) {
              for (k = 0; k < disciplinas.length; k++) {
                if (eletivas2[j].Disciplina === disciplinas[k].id) {
                  if (sex != "") sex = sex + " ";
                  sex = sex + disciplinas[k].codigo + " " + eletivas2[j].letra;
                }
              }
            }
          }
          console.log([seg, ter, qua, qui, sex]);
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

    filterTurmas: function(t) {
      var check = false;
      for (var turma in this.ativos1.CCN) {
        if (turma.id === t.id) check = true;
      }
      return check;
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

      console.log(this.$store.state.curso.Cursos);

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
      console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC]);
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===4){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      console.log(grades.length);

      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===1){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===3){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===2){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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

      console.log(this.$store.state.curso.Cursos);

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
      console.log([this.evenCCD, this.evenCCN, this.evenSI, this.evenEC]);
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===4){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      console.log(grades.length);

      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===1){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===3){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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
      pedidosExternos = pedidosExternos = []
      for (let t in this.$store.state.pedidoExterno.Pedidos){
        for (let pedido in this.$store.state.pedidoExterno.Pedidos[t]){
          if(this.$store.state.pedidoExterno.Pedidos[t][pedido].Curso===2){
            pedidosExternos.push(this.$store.state.pedidoExterno.Pedidos[t][pedido])
          }
        }
      }
      for (var i = 0; i < grades.length && inicio <= 10; i++) {
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

.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
  float: right;
}

.relatbtn:hover {
  color: #82a0ff !important;
}

.relatbtn:focus {
  color: #82a0ff;
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

</style>