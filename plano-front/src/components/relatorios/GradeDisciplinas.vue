<template>
  <div class="GradesDisciplinas row pr-2">
    <!-- Titulo -->
    <div
      class="div-titulo col-12 d-flex center-content-between flex-wrap flex-md-nowrap p-0 mb-0"
      style="height: 38px;"
    >
      <div class="form-inline col-12 pl-0 mb-1 pr-1">
        <h1 class="titulo col-xl-3 col-lg-3 col-md-4 col-sm-5 col-6 px-0 pr-1">
          Grades Disciplinas
        </h1>
        <div
          class="form-group col-xl-9 col-lg-9 col-md-8 col-sm-7 col-6 mb-0 p-0"
          style="justify-content: flex-end !important;"
        >
          <div class="input-group m-0 mr-3 ml-auto p-0">
            <div class="input-group-prepend">
              <label class="input-group-text">Ano</label>
            </div>
            <select
              v-model="novoAno"
              class="form-control"
              v-on:change="runNovoAno()"
            >
              <option
                v-for="i in Array.from(Array(11), (e, i) => i - 5)"
                :key="i"
                :value="AnoAtual + i"
                >{{ AnoAtual + i }}</option
              >
            </select>
          </div>
          <div class="d-flex">
            <b-button v-b-modal.modalFiltros title="Cursos" class="cancelbtn">
              <i class="fas fa-list-ul"></i>
            </b-button>
            <b-button v-b-modal.modalAjuda title="Ajuda" class="relatbtn">
              <i class="fas fa-question"></i>
            </b-button>
          </div>
        </div>
      </div>
    </div>

    <div class="w-100 mb-2 border-bottom"></div>

    <div class="divTable p-0">
      <table class="main-table table table-sm table-hover table-bordered">
        <thead class="thead-light">
          <tr class="sticky">
            <div style="font-size:11px!important" class="max-content">
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width:80px"
                  @click="toggleOrdMainPerfis()"
                >
                  Perfil

                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      ordemMainTablePerfis.order == 'perfil_nome'
                        ? ordemMainTablePerfis.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 100px;"
                  @click="toggleOrdMain('codigo')"
                >
                  Cód.
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      ordemMainTable.order == 'codigo'
                        ? ordemMainTable.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col">
                <p
                  class="p-header clickable"
                  style="width: 380px; text-align: start;"
                  @click="toggleOrdMain('nome')"
                >
                  Disciplina
                  <i
                    style="font-size: 0.6rem; text-align: right;"
                    :class="
                      ordemMainTable.order == 'nome'
                        ? ordemMainTable.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                        : 'fas fa-arrow-down fa-sm low-opacity'
                    "
                  ></i>
                </p>
              </th>
              <th scope="col" v-if="activeSI">
                <p
                  class="p-header"
                  style="width: 140px;"
                  title="Sistemas de informação"
                >
                  76A
                </p>
              </th>
              <th scope="col" v-if="activeCCN">
                <p
                  class="p-header"
                  style="width: 140px;"
                  title="Ciência da Computação Noturno"
                >
                  35A
                </p>
              </th>
              <th scope="col" v-if="activeCCD">
                <p
                  class="p-header"
                  style="width: 140px;"
                  title="Ciência da Computação Noturno"
                >
                  65C
                </p>
              </th>
              <th scope="col" v-if="activeEC">
                <p
                  class="p-header"
                  style="width: 140px;"
                  title="Engenharia da Computação"
                >
                  65B
                </p>
              </th>
            </div>
          </tr>
        </thead>
        <tbody>
          <template v-for="disciplina in Disciplinas_Filtred">
            <tr :key="disciplina.id">
              <div class="max-content">
                <td v-bind:style="{ backgroundColor: disciplina.cor }">
                  <p style="width: 80px ">
                    {{ disciplina.perfil_nome }}
                  </p>
                </td>

                <td>
                  <p style="width: 100px;">{{ disciplina.codigo }}</p>
                </td>
                <td>
                  <p style="width: 380px; text-align: start;">
                    {{ disciplina.nome }}
                  </p>
                </td>
                <!-- 76A-  -->
                <td v-if="activeSI">
                  <p style="width: 140px">
                    <template
                      v-if="disciplinasGrades[disciplina.id][2][0].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][2][0]"
                        >1º Semestre: {{ d }}º Período</template
                      >
                    </template>
                    <template
                      v-if="disciplinasGrades[disciplina.id][2][1].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][2][1]"
                        >2º Semestre: {{ d }}º Período</template
                      >
                    </template>
                  </p>
                </td>
                <!-- 35A-  -->
                <td v-if="activeCCN">
                  <p style="width: 140px">
                    <template
                      v-if="disciplinasGrades[disciplina.id][0][0].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][0][0]"
                        >1º Semestre: {{ d }}º Período</template
                      >
                    </template>
                    <template
                      v-if="disciplinasGrades[disciplina.id][0][1].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][0][1]"
                        >2º Semestre: {{ d }}º Período</template
                      >
                    </template>
                  </p>
                </td>
                <!-- 65C -->
                <td v-if="activeCCD">
                  <p style="width: 140px">
                    <template
                      v-if="disciplinasGrades[disciplina.id][3][0].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][3][0]"
                        >1º Semestre: {{ d }}º Período</template
                      >
                    </template>
                    <template
                      v-if="disciplinasGrades[disciplina.id][3][1].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][3][1]"
                        >2º Semestre: {{ d }}º Período</template
                      >
                    </template>
                  </p>
                </td>
                <!-- 65B -->
                <td v-if="activeEC">
                  <p style="width: 140px">
                    <template
                      v-if="disciplinasGrades[disciplina.id][1][0].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][1][0]"
                        >1º Semestre: {{ d }}º Período</template
                      >
                    </template>
                    <template
                      v-if="disciplinasGrades[disciplina.id][1][1].length !== 0"
                    >
                      <template
                        v-for="d in disciplinasGrades[disciplina.id][1][1]"
                        >2º Semestre: {{ d }}º Período</template
                      >
                    </template>
                  </p>
                </td>
              </div>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- MODAL FILTROS -->
    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      scrollable
      size="md"
      title="Filtros"
    >
      <div class="p-0 m-0" style="height: 30px; width: 465px;">
        <ul
          class="nav nav-tabs card-header-tabs m-0"
          style="font-size: 11px !important; height: 30px;"
        >
          <li class="nav-item" @click="nav_ativo = 'perfis'">
            <a
              class="nav-link border border-right-0"
              :class="[
                {
                  active: nav_ativo == 'perfis'
                },
                'clickable'
              ]"
              >Perfis</a
            >
          </li>
          <li class="nav-item" @click="nav_ativo = 'cursos'">
            <a
              class="nav-link border"
              :class="[
                {
                  active: nav_ativo == 'cursos'
                },
                'clickable'
              ]"
              >Cursos</a
            >
          </li>
        </ul>
      </div>
      <div
        class="col m-0 p-0"
        style="width: max-content; height: 450px !important;"
      >
        <!-- TABLE PERFIS -->
        <table
          v-if="nav_ativo == 'perfis'"
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light">
            <tr class="sticky">
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    @click="toggleOrdPerfis()"
                    style="width: 435px; text-align: start;"
                  >
                    Nome
                    <i
                      style="font-size: 0.6rem; text-align: right;"
                      :class="
                        ordemPerfis.type == 'asc'
                          ? 'fas fa-arrow-down fa-sm'
                          : 'fas fa-arrow-up fa-sm'
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="perfil in Perfis_Modal_Filtred"
              :key="'perfil-id' + perfil.id"
            >
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="PerfisSelecionados"
                      :value="perfil"
                      class="form-check-input position-static m-0"
                    />
                  </div>
                </td>
                <td>
                  <p style="width: 435px; text-align: start;">
                    {{ perfil.nome }}
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
          <thead class="thead-light">
            <tr class="sticky">
              <div style="font-size: 11px !important;" class=" max-content">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
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
                          : ''
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
                          : ''
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
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
                  <p style="width: 50px; text-align: center;">
                    {{ curso.codigo.toUpperCase() }}
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
          <template v-if="nav_ativo == 'perfis'">
            <b-button
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="selectAllPerfis()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="selectNonePerfis()"
              >Desmarcar Todos</b-button
            >
          </template>

          <template v-else>
            <b-button
              class="btn-azul btn-df mr-2"
              variant="success"
              @click="selectAllCursos()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-df mr-2"
              variant="secondary"
              @click="selectNoneCursos()"
              >Desmarcar Todos</b-button
            >
          </template>
        </div>
        <b-button
          variant="success"
          v-on:click="btnOK()"
          class="btn-verde btn-df mr-2"
          style="padding-right: 15px !important; padding-left: 15px !important;"
          >OK</b-button
        >
      </div>
    </b-modal>
    <!-- modal de ajuda -->
    <b-modal id="modalAjuda" ref="ajudaModal" scrollable title="Ajuda">
      <div class="modal-body">
        <ul class="listas list-group">
          <li class="list-group-item">
            <strong>Para exibir conteúdo na Tabela:</strong> Clique em Perfis
            <i
              class="fas fa-list-ul cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            e marque quais deseja mostrar, depois clique em OK. Logo após,
            escolha os Cursos
            <i
              class="fas fa-graduation-cap cancelbtn px-1"
              style="font-size: 12px;"
            ></i>
            que quer ver, confirmando a seleção em OK. Caso queira ver todos
            basta clicar em Selecionar Todos.
          </li>
        </ul>
      </div>
      <div slot="modal-footer" style="display: none;"></div>
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "GradeDisciplinas",

  data() {
    return {
      error: undefined,
      ano: undefined,
      novoAno: undefined,
      disciplinasGrades: {},
      grades: {
        1: undefined, //CCN
        2: undefined, //EC
        3: undefined, //SI
        4: undefined //CCD
      },
      gradesAtivas: {
        1: [], //CCN
        2: [], //EC
        3: [], //SI
        4: [] //CCD
      },
      PerfisSelecionados: [],
      PerfisAtivados: [],
      cursosSelecionados: [],
      cursosAtivados: [],
      options_Cursos: [
        {
          nome: "SISTEMAS DE INFORMAÇÃO",
          value: 3,
          codigo: "76A"
        },
        {
          nome: "CIÊNCIA DA COMPUTAÇÃO NOTURNO",
          value: 2,
          codigo: "35A"
        },
        {
          nome: "CIÊNCIA DA COMPUTAÇÃO DIURNO",
          value: 1,
          codigo: "65C"
        },
        {
          nome: "ENGENHARIA DA COMPUTAÇÃO",
          value: 4,
          codigo: "65B"
        }
      ],
      showCurso: undefined,
      nav_ativo: "perfis",
      ordemPerfis: { order: "nome", type: "asc" },
      ordemCursos: { order: "codigo", type: "asc" },
      ordemMainTable: { order: "codigo", type: "asc" },
      ordemMainTablePerfis: { order: "perfil_nome", type: "asc" }
    };
  },

  beforeMount: function() {
    this.ano = this.$store.state.plano.Plano[0].ano;
    this.novoAno = this.ano;
    this.runAll();
  },

  methods: {
    btnOK() {
      //Somente atualiza perfis ativados quando o botão OK for clickado
      this.PerfisAtivados = [...this.PerfisSelecionados];
      //Somente atualiza cursos se alterar
      this.cursosAtivados = [...this.cursosSelecionados];
      this.nav_ativo = "perfis";
      this.$refs.modalFiltros.hide();
    },
    toggleOrdMainPerfis() {
      this.ordemMainTablePerfis.type =
        this.ordemMainTablePerfis.type == "asc" ? "desc" : "asc";
    },
    toggleOrdPerfis() {
      this.ordemPerfis.type = this.ordemPerfis.type == "asc" ? "desc" : "asc";
    },
    toggleOrdCursos(ord) {
      if (this.ordemCursos.order != ord) {
        this.ordemCursos.order = ord;
        this.ordemCursos.type = "asc";
      } else {
        this.ordemCursos.type = this.ordemCursos.type == "asc" ? "desc" : "asc";
      }
    },
    toggleOrdMain(ord) {
      if (this.ordemMainTable.order != ord) {
        this.ordemMainTable.order = ord;
        this.ordemMainTable.type = "asc";
      } else {
        this.ordemMainTable.type =
          this.ordemMainTable.type == "asc" ? "desc" : "asc";
      }
    },
    //PERFIS SELECTIONS
    selectAllPerfis() {
      if (this.PerfisSelecionados != []) this.PerfisSelecionados = [];
      for (var i = 0; i < this.$store.state.perfil.Perfis.length; i++)
        this.PerfisSelecionados.push(this.$store.state.perfil.Perfis[i]);
    },
    selectNonePerfis() {
      this.PerfisSelecionados = [];
    },
    //CURSOS SELECTIONS
    selectNoneCursos() {
      if (this.cursosSelecionados.length !== 0) {
        this.cursosSelecionados = [];
      }
    },
    selectAllCursos() {
      if (this.cursosSelecionados.length !== 5)
        this.cursosSelecionados = [1, 2, 3, 4, 5];
    },

    runNovoAno: function() {
      //executa runAll, modificando o ano
      if (this.ano != this.novoAno) {
        this.ano = this.novoAno;
        this.runAll();
        this.novoAno = 0;
        this.novoAno = this.ano;
      }
    },

    runAll: function() {
      //cria objeto para armazenar os períodos das disciplinas e chama as funções que a populam
      this.$store.state.disciplina.Disciplinas.forEach(d => {
        this.disciplinasGrades[d.id] = [
          [[], []],
          [[], []],
          [[], []],
          [[], []]
        ]; //inisializa os períodos em 0 [Primeiro Semestre, Segundo Semestre]
      });
      this.getGrades();
      this.get1Periodo();
      this.get2Periodo();
    },

    getGrades: function() {
      //popula as grades disponíveis de cada curso em um objeto
      for (let i = 1; i <= 4; i++) {
        this.grades[i] = _.orderBy(
          _.filter(this.$store.state.grade.Grades, ["Curso", i]),
          "periodoInicio",
          "desc"
        );
      }
    },

    get1Periodo: function() {
      //Armazena os períodos de cada disciplina no primeiro semestre
      //retorna lista com os ids das disciplinas
      let disciplinas = Object.keys(this.disciplinasGrades);
      //marca o último período em que uma grade é válida
      this.gradesAtivas = {
        1: [], //CCN
        2: [], //EC
        3: [], //SI
        4: [] //CCD
      };
      for (let i = 1; i <= 4; i++) {
        this.grades[i].forEach(g => {
          let fim =
            1 +
            2 * (this.ano - parseInt(g.periodoInicio.slice(0, 4), 10)) +
            (1 - parseInt(g.periodoInicio.slice(5, 6), 10)) / 2;
          if (fim > 10) {
            fim = 10;
          }
          this.gradesAtivas[i].push({ grade: g, fim: fim });
        });
        if (this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim !== 10) {
          this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim = 10;
        }
      }

      disciplinas.forEach(d => {
        for (let i = 1; i <= 4; i++) {
          //ids dos cursos de computação
          let gradedisciplina;
          let curso = _.find(this.$store.state.curso.Cursos, ["id", i]);
          for (let j = 0; j < this.gradesAtivas[i].length; j++) {
            //itera pelas grades de um curso, começando da mais recente (lista ordenada)
            gradedisciplina = _.find(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              {
                Disciplina: parseInt(d, 10),
                Grade: this.gradesAtivas[i][j].grade.id
              }
            ); //Encontra a disciplina nas grades da computação, começando pela mais recente. Caso não encontre, retorna undefined
            if (gradedisciplina !== undefined) {
              //verifica se a disciplina está na grade procurada
              if (gradedisciplina.periodo <= this.gradesAtivas[i][j].fim) {
                //verifica se essa grade está sendo usada para essa disciplina(limite superior)
                if (
                  (j > 0 &&
                    this.gradesAtivas[i][j - 1].fim <
                      gradedisciplina.periodo) ||
                  j === 0
                )
                  //verifica se a disciplina não deveria estar incluída na grade anterior, ou se essa é a grade mais recente(limite inferior)
                  break;
                //caso essa seja a grade correta, encerra o loop nas grades
                else gradedisciplina = undefined; //necessário caso seja a última iteração do loop
              }
            }
          }
          if (gradedisciplina !== undefined) {
            if (
              (curso.semestreInicial === 1 || curso.semestreInicial === 3) &&
              gradedisciplina.periodo % 2 === 1
            )
              //tem entrada de alunos no 1º semestre ou no 3º semestre -> terá períodos ímpares no primeiro semestre
              this.disciplinasGrades[parseInt(d, 10)][i - 1][0].push(
                gradedisciplina.periodo
              );
            if (
              (curso.semestreInicial === 2 || curso.semestreInicial === 3) &&
              gradedisciplina.periodo % 2 === 0
            )
              //tem entrada de alunos no 2º semestre ou no 3º semestre -> terá períodos pares no primeiro semestre
              this.disciplinasGrades[parseInt(d, 10)][i - 1][0].push(
                gradedisciplina.periodo
              );
          }
        }
      });
    },

    get2Periodo: function() {
      //Armazena os períodos de cada disciplina no segundo semestre
      //retorna lista com os ids das disciplinas
      let disciplinas = Object.keys(this.disciplinasGrades);
      //marca o último período em que uma grade é válida
      this.gradesAtivas = {
        1: [], //CCN
        2: [], //EC
        3: [], //SI
        4: [] //CCD
      };
      for (let i = 1; i <= 4; i++) {
        this.grades[i].forEach(g => {
          let fim =
            1 +
            2 * (this.ano - parseInt(g.periodoInicio.slice(0, 4), 10)) +
            (3 - parseInt(g.periodoInicio.slice(5, 6), 10)) / 2;
          if (fim > 10) {
            fim = 10;
          }
          this.gradesAtivas[i].push({ grade: g, fim: fim });
        });
        if (this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim !== 10) {
          this.gradesAtivas[i][this.gradesAtivas[i].length - 1].fim = 10;
        }
      }

      disciplinas.forEach(d => {
        for (let i = 1; i <= 4; i++) {
          //ids dos cursos de computação
          let gradedisciplina;
          let curso = _.find(this.$store.state.curso.Cursos, ["id", i]);
          for (let j = 0; j < this.gradesAtivas[i].length; j++) {
            //itera pelas grades de um curso, começando da mais recente (lista ordenada)
            gradedisciplina = _.find(
              this.$store.state.disciplinaGrade.DisciplinaGrades,
              {
                Disciplina: parseInt(d, 10),
                Grade: this.gradesAtivas[i][j].grade.id
              }
            ); //Encontra a disciplina nas grades da computação, começando pela mais recente. Caso não encontre, retorna undefined
            if (gradedisciplina !== undefined) {
              //verifica se a disciplina está na grade procurada
              if (gradedisciplina.periodo <= this.gradesAtivas[i][j].fim) {
                //verifica se essa grade está sendo usada para essa disciplina(limite superior)
                if (
                  (j > 0 &&
                    this.gradesAtivas[i][j - 1].fim <
                      gradedisciplina.periodo) ||
                  j === 0
                )
                  //verifica se a disciplina não deveria estar incluída na grade anterior, ou se essa é a grade mais recente(limite inferior)
                  break;
                //caso essa seja a grade correta, encerra o loop nas grades
                else gradedisciplina = undefined; //necessário caso seja a última iteração do loop
              }
            }
          }
          if (gradedisciplina !== undefined) {
            if (
              (curso.semestreInicial === 1 || curso.semestreInicial === 3) &&
              gradedisciplina.periodo % 2 === 0
            )
              //tem entrada de alunos no 1º semestre ou no 3º semestre -> terá períodos pares no segundo semestre
              this.disciplinasGrades[parseInt(d, 10)][i - 1][1].push(
                gradedisciplina.periodo
              );
            if (
              (curso.semestreInicial === 2 || curso.semestreInicial === 3) &&
              gradedisciplina.periodo % 2 === 1
            )
              //tem entrada de alunos no 2º semestre ou no 3º semestre -> terá períodos ímpares no segundo semestre
              this.disciplinasGrades[parseInt(d, 10)][i - 1][1].push(
                gradedisciplina.periodo
              );
          }
        }
      });
    },
    inPerfil: function(perfil, todasDisciplinas) {
      //Verifica se uma disciplina faz parte de um perfil
      return todasDisciplinas.filter(disciplina => {
        return disciplina.Perfil === perfil.id;
      });
    },
    DisciplinaComPerfil() {
      // let result = this.Disciplinas;
      // this.PerfisAtivados.forEach((perfil) => {
      //   result.filter((disciplina) => {
      //     if (disciplina.Perfil === perfil.id) {
      //       disciplinas.perfil_nome = perfil.nome;
      //       return true;
      //     }
      //     return false;
      //   });
      // });
      // return result;
    }
  },
  computed: {
    Disciplinas_Filtred() {
      let result = [];

      this.PerfisAtivados.forEach(perfil => {
        result = this.Disciplinas;
        result.filter(disciplina => {
          if (disciplina.Perfil === perfil.id) {
            disciplina.perfil_nome = perfil.abreviacao;
            disciplina.cor = perfil.cor;
            return true;
          }
          return false;
        });
      });
      return _.orderBy(
        result,
        [this.ordemMainTablePerfis.order, this.ordemMainTable.order],
        [this.ordemMainTablePerfis.type, this.ordemMainTable.type]
      );
    },

    Cursos_Modal_Filtred() {
      return _.orderBy(
        this.options_Cursos,
        this.ordemCursos.order,
        this.ordemCursos.type
      );
    },
    Perfis_Modal_Filtred() {
      return _.orderBy(
        this.$store.state.perfil.Perfis,
        this.ordemPerfis.order,
        this.ordemPerfis.type
      );
    },
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis, "nome");
    },
    activeCCD() {
      return _.indexOf(this.cursosAtivados, 1) > -1;
    },

    activeCCN() {
      return _.indexOf(this.cursosAtivados, 2) > -1;
    },

    activeSI() {
      return _.indexOf(this.cursosAtivados, 3) > -1;
    },

    activeEC() {
      return _.indexOf(this.cursosAtivados, 4) > -1;
    },
    Cursos() {
      return _.orderBy(this.$store.state.curso.Cursos, "posicao");
    },
    CursosAtivos() {
      return this.$store.state.curso.Ativos;
    },

    Disciplinas() {
      // return _.orderBy(
      //   this.$store.state.disciplina.Disciplinas,
      //   this.ordemMainTable.order,
      //   this.ordemMainTable.type
      // );
      return this.$store.state.disciplina.Disciplinas;
    },
    Docentes() {
      return _.orderBy(
        _.filter(this.$store.state.docente.Docentes, ["ativo", true]),
        "apelido"
      );
    },

    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },

    Salas() {
      return _.orderBy(this.$store.state.sala.Salas, "nome");
    },

    Turmas() {
      return _.orderBy(
        _.orderBy(
          _.filter(this.$store.state.turma.Turmas, function(t) {
            return t.Disciplina !== null;
          }),
          "letra"
        ),
        "Disciplina"
      );
    },

    Deletar() {
      return this.$store.state.turma.Deletar;
    },

    Pedidos() {
      return this.$store.state.pedido.Pedidos;
    },

    isLoading() {
      return this.$store.state.isLoading;
    },

    AnoAtual() {
      return this.$store.state.plano.Plano[0].ano;
    }
  },
  watch: {
    CursosSelecionados: function() {
      if (this.cursos.length === 5) {
        this.selectAll = true;
      } else {
        this.selectAll = false;
      }
    }
  }
};
</script>
<style scoped>
.GradesDisciplinas {
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

/* main-table */
.divTable {
  overflow: hidden;
  height: -webkit-max-content;
  height: -moz-max-content;
  height: max-content;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}
.main-table {
  display: block !important;
  overflow-y: scroll !important;
  overflow-x: auto !important;
  font-size: 11px !important;
  font-weight: normal !important;
  background-color: white;
  margin: 0 !important;
  height: -webkit-calc(100vh - 95px);
  height: -moz-calc(100vh - 95px);
  height: calc(100vh - 95px);
}
.main-table .p-header {
  height: 18px;
}
.main-table p {
  padding: 0 5px 0 5px !important;
  margin: 0 !important;
  font-size: 11px !important;
  text-align: center;
}
tbody {
  max-height: 100% !important;
  width: 100% !important;
}
.main-table td {
  text-align: center;
  vertical-align: middle !important;
  padding: 0 !important;
  height: 22px !important;
}
.main-table tr thead {
  display: block !important;
}
.main-table thead th {
  padding: 0 !important;
  font-size: 14px;
  text-align: center;
  height: 18px !important;
}
.main-table input[type="checkbox"] {
  width: 13px !important;
  height: 13px !important;
  text-align: center !important;
  margin: 0 !important;
  margin-top: 4px !important;
}
/* fim table */

.sticky {
  display: block !important;
  overflow: hidden !important;
  position: sticky !important;
  position: -webkit-sticky !important;
  top: 0 !important;
  display: block !important;
  overflow: hidden !important;
  z-index: 3;
}
/* ============================================ */
/* Formularios no topo da tela */
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
  max-width: 50px;
  min-width: 50px;
  height: 25px !important;
  margin-left: -5px;
  padding-left: 15px;
  font-size: 12px !important;
}
.form-inline .input-group {
  width: auto;
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
.form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 0px 5px !important;
  width: 60px !important;
  text-align: center;
}
/* =========================== */
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
/* ====== BOTÕES ====== */
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
.relatbtn {
  background-color: white;
  color: #9ab3ff !important;
}

.relatbtn:hover {
  background-color: white;
  color: #82a0ff !important;
}

.relatbtn:focus {
  color: #82a0ff;
  background-color: white;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #698dff;
}
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
  cursor: pointer;
}
.nav-link:hover {
  text-decoration: underline;
}
.active {
  background-color: #e9ecef !important;
  color: #495057 !important;
  cursor: default;
  text-decoration: none !important;
}

@media screen and (max-width: 519px) {
  .div-titulo {
    height: 70px !important;
  }
}
</style>
