<template>
  <div class="main-component row">
    <PageTitle :title="'Grades Disciplinas'">
      <template #aside>
        <div class="input-group m-0 mr-3 ml-auto p-0">
          <div class="input-group-prepend">
            <label class="input-group-text">Ano</label>
          </div>
          <select
            v-model="novoAno"
            class="form-control form-control-top"
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
        <b-button
          v-b-modal.modalFiltros
          title="Filtros"
          class="btn-custom btn-icon cancelbtn"
        >
          <i class="fas fa-list-ul"></i>
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

    <div class="row w-100 m-0 p-0">
      <div class="div-table p-0">
        <table class="main-table table table-sm table-hover table-bordered">
          <thead class="thead-light max-content sticky">
            <tr>
              <div style="font-size:11px!important" class="max-content sticky">
                <th @click="setFixedOrderPerfil()">
                  <p
                    class="p-header clickable d-flex justify-content-between align-items-center"
                    style="width:80px"
                  >
                    <i
                      class="fas fa-thumbtack"
                      :class="
                        ordenacaoPerfisMain.order === null ? 'low-opacity' : ''
                      "
                    ></i>
                    Perfil
                    <i
                      :class="setIconByOrder(ordenacaoPerfisMain, 'perfilNome')"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 100px;"
                    @click="toggleOrder(ordenacaoDisciplinasMain, 'codigo')"
                  >
                    Cód.
                    <i
                      :class="
                        setIconByOrder(ordenacaoDisciplinasMain, 'codigo')
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 380px; text-align: start;"
                    @click="toggleOrder(ordenacaoDisciplinasMain, 'nome')"
                  >
                    Disciplina
                    <i
                      :class="setIconByOrder(ordenacaoDisciplinasMain, 'nome')"
                    ></i>
                  </p>
                </th>
                <th
                  v-if="activeSI"
                  class="clickable"
                  @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeSI')"
                >
                  <p
                    class="p-header"
                    style="width: 140px;"
                    title="Sistemas de informação"
                  >
                    76A
                    <i
                      :class="
                        setIconByOrder(ordenacaoDisciplinasMain, 'gradeSI')
                      "
                    ></i>
                  </p>
                </th>
                <th
                  v-if="activeCCN"
                  class="clickable"
                  @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeCCN')"
                >
                  <p
                    class="p-header"
                    style="width: 140px;"
                    title="Ciência da Computação Noturno"
                  >
                    35A
                    <i
                      :class="
                        setIconByOrder(ordenacaoDisciplinasMain, 'gradeCCN')
                      "
                    ></i>
                  </p>
                </th>
                <th
                  v-if="activeCCD"
                  class="clickable"
                  @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeCCD')"
                >
                  <p
                    class="p-header"
                    style="width: 140px;"
                    title="Ciência da Computação Noturno"
                  >
                    65C
                    <i
                      :class="
                        setIconByOrder(ordenacaoDisciplinasMain, 'gradeCCD')
                      "
                    ></i>
                  </p>
                </th>
                <th
                  v-if="activeEC"
                  class="clickable"
                  @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeEC')"
                >
                  <p
                    class="p-header"
                    style="width: 140px;"
                    title="Engenharia da Computação"
                  >
                    65B
                    <i
                      :class="
                        setIconByOrder(ordenacaoDisciplinasMain, 'gradeEC')
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <template v-for="disciplina in DisciplinasOrderedMain">
              <tr :key="disciplina.id">
                <div class="max-content">
                  <td v-bind:style="{ backgroundColor: disciplina.cor }">
                    <p style="width: 80px ">
                      {{ disciplina.perfilNome }}
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
                      {{
                        disciplina.gradeSI.semestre1.length !== 0
                          ? `${
                              disciplina.gradeSI.semestre1
                            }º Período: 1º Semestre`
                          : ""
                      }}
                      {{
                        disciplina.gradeSI.semestre2.length !== 0
                          ? `${
                              disciplina.gradeSI.semestre2
                            }º Período: 2º Semestre`
                          : ""
                      }}
                    </p>
                  </td>
                  <!-- 35A-  -->
                  <td v-if="activeCCN">
                    <p style="width: 140px">
                      {{
                        disciplina.gradeCCN.semestre1.length !== 0
                          ? `${
                              disciplina.gradeCCN.semestre1
                            }º Período: 1º Semestre`
                          : ""
                      }}
                      {{
                        disciplina.gradeCCN.semestre2.length !== 0
                          ? `${
                              disciplina.gradeCCN.semestre2
                            }º Período: 2º Semestre`
                          : ""
                      }}
                    </p>
                  </td>
                  <!-- 65C -->
                  <td v-if="activeCCD">
                    <p style="width: 140px">
                      {{
                        disciplina.gradeCCD.semestre1.length !== 0
                          ? `${
                              disciplina.gradeCCD.semestre1
                            }º Período: 1º Semestre`
                          : ""
                      }}
                      {{
                        disciplina.gradeCCD.semestre2.length !== 0
                          ? `${
                              disciplina.gradeCCD.semestre2
                            }º Período: 2º Semestre`
                          : ""
                      }}
                    </p>
                  </td>
                  <!-- 65B -->
                  <td v-if="activeEC">
                    <p style="width: 140px">
                      {{
                        disciplina.gradeEC.semestre1.length !== 0
                          ? `${
                              disciplina.gradeEC.semestre1
                            }º Período: 1º Semestre`
                          : ""
                      }}
                      {{
                        disciplina.gradeEC.semestre2.length !== 0
                          ? `${
                              disciplina.gradeEC.semestre2
                            }º Período: 2º Semestre`
                          : ""
                      }}
                    </p>
                  </td>
                </div>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <!-- MODAL FILTROS -->
    <b-modal
      id="modalFiltros"
      ref="modalFiltros"
      scrollable
      size="md"
      title="Filtros"
    >
      <NavTab
        :currentTab="tabAtivaModal"
        :allTabs="['Perfis', 'Disciplinas', 'Cursos']"
        @change-tab="tabAtivaModal = $event"
      />
      <div
        class="col m-0 p-0"
        style="width: max-content; height: 450px !important;"
      >
        <!-- TABLE PERFIS -->
        <table
          v-show="tabAtivaModal === 'Perfis'"
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div
                style="font-size: 11px !important;"
                class=" max-content sticky"
              >
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    @click="toggleOrder(ordenacaoPerfisModal, 'nome')"
                    style="width: 435px; text-align: start;"
                  >
                    Nome
                    <i
                      :class="setIconByOrder(ordenacaoPerfisModal, 'nome')"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="perfil in PerfisOrderedModal"
              :key="'perfil-id' + perfil.id"
            >
              <div style="width: max-content;">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      v-model="perfisAtivados"
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
        <!-- TABLE DISCIPLINAS -->
        <table
          v-show="tabAtivaModal === 'Disciplinas'"
          class="table table-sm modal-table table-bordered table-hover"
          style="max-height: 450px !important; overflow-y: auto !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div
                style="font-size: 11px !important;"
                class="max-content sticky"
              >
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
                      v-model="searchDisciplinas"
                    />
                    <div
                      class="input-group-append"
                      @click="searchDisciplinas = ''"
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
              <div class="max-content sticky2">
                <th>
                  <p style="width: 25px" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 70px; text-align: start;"
                    @click="toggleOrder(modalOrdenacaoDisciplinas, 'codigo')"
                    title="Clique para ordenar por código"
                  >
                    Cód.
                    <i
                      :class="
                        setIconByOrder(modalOrdenacaoDisciplinas, 'codigo')
                      "
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 280px; text-align: start;"
                    @click="toggleOrder(modalOrdenacaoDisciplinas, 'nome')"
                    title="Clique para ordenar por nome"
                  >
                    Nome
                    <i
                      :class="setIconByOrder(modalOrdenacaoDisciplinas, 'nome')"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 85px; text-align: start;"
                    @click="
                      toggleOrder(modalOrdenacaoDisciplinas, 'perfilNome')
                    "
                    title="Clique para ordenar por nome"
                  >
                    Perfil
                    <i
                      :class="
                        setIconByOrder(modalOrdenacaoDisciplinas, 'perfilNome')
                      "
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="disciplina in DisciplinasOrderedModal"
              :key="'disciplina' + disciplina.id"
              value="disciplina.id"
            >
              <div class="max-content">
                <td>
                  <div style="width: 25px; height: inherit;" class="px-1">
                    <input
                      type="checkbox"
                      class="form-check-input position-static m-0"
                      v-model="disciplinasSelecionadas"
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
                    {{ disciplina.perfilNome }}
                  </p>
                </td>
              </div>
            </tr>
            <tr v-if="DisciplinasOrderedModal.length === 0">
              <td colspan="3" style="width:465px">
                NENHUMA DISCIPLINA ENCONTRADA.
              </td>
            </tr>
          </tbody>
        </table>
        <!-- TABLE CURSOS -->
        <table
          v-show="tabAtivaModal === 'Cursos'"
          class="table table-sm modal-table table-bordered"
          style="max-height: 450px !important;"
        >
          <thead class="thead-light sticky">
            <tr>
              <div class="max-content sticky">
                <th>
                  <p style="width: 25px;" class="p-header"></p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 50px; text-align: center;"
                    @click="toggleOrder(modalOrdenacaoCursos, 'codigo')"
                  >
                    Cód.
                    <i
                      :class="setIconByOrder(modalOrdenacaoCursos, 'codigo')"
                    ></i>
                  </p>
                </th>
                <th>
                  <p
                    class="p-header clickable"
                    style="width: 385px;"
                    @click="toggleOrder(modalOrdenacaoCursos, 'nome')"
                  >
                    Nome
                    <i
                      :class="setIconByOrder(modalOrdenacaoCursos, 'nome')"
                    ></i>
                  </p>
                </th>
              </div>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="curso in CursosOrderedModal"
              :key="'curso-codigo' + curso.codigo"
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

      <div slot="modal-footer" class="w-100 m-0 d-flex">
        <div class="w-100">
          <template v-if="tabAtivaModal === 'Disciplinas'">
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllDisciplinas()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNoneDisciplinas()"
              >Desmarcar Todos</b-button
            >
          </template>
          <template v-else-if="tabAtivaModal === 'Perfis'">
            <b-button
              class="btn-azul btn-custom btn-modal"
              variant="success"
              @click="selectAllPerfis()"
              >Selecionar Todos</b-button
            >
            <b-button
              class="btn-cinza btn-custom btn-modal"
              variant="secondary"
              @click="selectNonePerfis()"
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
          v-on:click="btnOK()"
          class="btn-verde btn-custom btn-modal btn-ok-modal"
          >OK</b-button
        >
      </div>
    </b-modal>
    <!-- modal de ajuda -->
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
    </b-modal>
  </div>
</template>

<script>
import _ from "lodash";
import PageTitle from "@/components/PageTitle";
import NavTab from "@/components/NavTab";

export default {
  name: "GradeDisciplinas",
  components: { PageTitle, NavTab },
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
        4: undefined, //CCD
      },
      gradesAtivas: {
        1: [], //CCN
        2: [], //EC
        3: [], //SI
        4: [], //CCD
      },
      perfisAtivados: [],
      disciplinasSelecionadas: [],
      disciplinasAtivadas: [],
      cursosSelecionados: [],
      cursosAtivados: [],
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
      ],
      tabAtivaModal: "Perfis",
      searchDisciplinas: "",
      ordenacaoPerfisModal: { order: "nome", type: "asc" },
      modalOrdenacaoDisciplinas: { order: "codigo", type: "asc" },
      modalOrdenacaoCursos: { order: "codigo", type: "asc" },
      ordenacaoDisciplinasMain: { order: "codigo", type: "asc" },
      ordenacaoPerfisMain: { order: "perfilNome", type: "asc" },
    };
  },

  beforeMount() {
    this.ano = this.$store.state.plano.Plano[0].ano;
    this.novoAno = this.ano;
    this.runAll();

    this.selectAllCursos();
    this.selectAllDisciplinas();
    this.disciplinasAtivadas = [...this.disciplinasSelecionadas];
    this.cursosAtivados = [...this.cursosSelecionados];
  },
  methods: {
    btnOK() {
      this.disciplinasAtivadas = [...this.disciplinasSelecionadas];
      this.cursosAtivados = [...this.cursosSelecionados];
      this.tabAtivaModal = "Perfis";
      this.$refs.modalFiltros.hide();
    },
    setFixedOrderPerfil() {
      if (this.ordenacaoPerfisMain.type === "desc") {
        this.toggleOrder(this.ordenacaoPerfisMain, null);
      } else {
        this.toggleOrder(this.ordenacaoPerfisMain, "perfilNome");
      }
    },
    toggleOrder(currentOrder, newOrder, type = "asc") {
      if (currentOrder.order != newOrder) {
        currentOrder.order = newOrder;
        currentOrder.type = type;
      } else {
        currentOrder.type = currentOrder.type == "asc" ? "desc" : "asc";
      }
    },
    setIconByOrder(currentOrder, orderToCheck) {
      if (currentOrder.order === orderToCheck) {
        return currentOrder.type === "asc"
          ? "fas fa-arrow-down fa-sm"
          : "fas fa-arrow-up fa-sm";
      } else {
        return "fas fa-arrow-down fa-sm low-opacity";
      }
    },
    selectAllPerfis() {
      this.perfisAtivados = [...this.Perfis];
    },
    selectNonePerfis() {
      if (this.perfisAtivados.length !== 0) this.perfisAtivados = [];
    },
    selectAllCursos() {
      this.cursosSelecionados = [...this.allCursosOptions];
    },
    selectNoneCursos() {
      if (this.cursosSelecionados.length !== 0) this.cursosSelecionados = [];
    },
    selectAllDisciplinas() {
      this.disciplinasSelecionadas = [...this.DisciplinasComPerfil];
    },
    selectNoneDisciplinas() {
      if (this.disciplinasSelecionadas.length !== 0)
        this.disciplinasSelecionadas = [];
    },
    runNovoAno() {
      //executa runAll, modificando o ano
      if (this.ano != this.novoAno) {
        this.ano = this.novoAno;
        this.runAll();
        this.novoAno = 0;
        this.novoAno = this.ano;
      }
    },
    runAll() {
      //cria objeto para armazenar os períodos das disciplinas e chama as funções que a populam
      this.$store.state.disciplina.Disciplinas.forEach((d) => {
        this.disciplinasGrades[d.id] = [[[], []], [[], []], [[], []], [[], []]]; //inisializa os períodos em 0 [Primeiro Semestre, Segundo Semestre]
      });
      this.getGrades();
      this.get1Periodo();
      this.get2Periodo();
    },
    getGrades() {
      //popula as grades disponíveis de cada curso em um objeto
      for (let i = 1; i <= 4; i++) {
        this.grades[i] = _.orderBy(
          _.filter(this.$store.state.grade.Grades, ["Curso", i]),
          "periodoInicio",
          "desc"
        );
      }
    },
    get1Periodo() {
      //Armazena os períodos de cada disciplina no primeiro semestre
      //retorna lista com os ids das disciplinas
      let disciplinas = Object.keys(this.disciplinasGrades);
      //marca o último período em que uma grade é válida
      this.gradesAtivas = {
        1: [], //CCN
        2: [], //EC
        3: [], //SI
        4: [], //CCD
      };
      for (let i = 1; i <= 4; i++) {
        this.grades[i].forEach((g) => {
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
      disciplinas.forEach((d) => {
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
                Grade: this.gradesAtivas[i][j].grade.id,
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
    get2Periodo() {
      //Armazena os períodos de cada disciplina no segundo semestre
      //retorna lista com os ids das disciplinas
      let disciplinas = Object.keys(this.disciplinasGrades);
      //marca o último período em que uma grade é válida
      this.gradesAtivas = {
        1: [], //CCN
        2: [], //EC
        3: [], //SI
        4: [], //CCD
      };
      for (let i = 1; i <= 4; i++) {
        this.grades[i].forEach((g) => {
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

      disciplinas.forEach((d) => {
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
                Grade: this.gradesAtivas[i][j].grade.id,
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
    somaPeriodos(periodo1, periodo2) {
      const periodo1Number = periodo1.length ? periodo1[0] : 100;
      const periodo2Number = periodo2.length ? periodo2[0] : 100;

      return periodo1Number + periodo2Number;
    },
  },
  computed: {
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
    DisciplinasComPerfil() {
      //Todas disciplinas não só do DCC, com perfilNome e cor
      let disciplinasResult = this.Disciplinas;

      disciplinasResult.forEach((disciplina) => {
        _.find(this.Perfis, (perfil) => {
          if (disciplina.Perfil === perfil.id) {
            disciplina.perfilNome = perfil.abreviacao;
            disciplina.cor = perfil.cor;
            return true;
          }
        });
      });
      return disciplinasResult;
    },
    DisciplinasFiltredMain() {
      let disciplinaResult = this.disciplinasAtivadas;

      disciplinaResult.forEach((disciplina) => {
        disciplina.gradeSI = {
          semestre1: this.disciplinasGrades[disciplina.id][2][0],
          semestre2: this.disciplinasGrades[disciplina.id][2][1],
        };
        disciplina.gradeCCN = {
          semestre1: this.disciplinasGrades[disciplina.id][0][0],
          semestre2: this.disciplinasGrades[disciplina.id][0][1],
        };
        disciplina.gradeCCD = {
          semestre1: this.disciplinasGrades[disciplina.id][3][0],
          semestre2: this.disciplinasGrades[disciplina.id][3][1],
        };
        disciplina.gradeEC = {
          semestre1: this.disciplinasGrades[disciplina.id][1][0],
          semestre2: this.disciplinasGrades[disciplina.id][1][1],
        };
      });
      return disciplinaResult;
    },
    DisciplinasOrderedMain() {
      let disciplinasResult = this.DisciplinasFiltredMain;

      if (this.ordenacaoDisciplinasMain.order.includes("grade")) {
        disciplinasResult = _.orderBy(
          disciplinasResult,
          (disciplina) => {
            return this.somaPeriodos(
              disciplina[this.ordenacaoDisciplinasMain.order].semestre1,
              disciplina[this.ordenacaoDisciplinasMain.order].semestre2
            );
          },
          this.ordenacaoDisciplinasMain.type
        );
      } else {
        disciplinasResult = _.orderBy(
          disciplinasResult,
          this.ordenacaoDisciplinasMain.order,
          this.ordenacaoDisciplinasMain.type
        );
      }

      if (this.ordenacaoPerfisMain.order != null) {
        disciplinasResult = _.orderBy(
          disciplinasResult,
          this.ordenacaoPerfisMain.order,
          this.ordenacaoPerfisMain.type
        );
      }
      return disciplinasResult;
    },
    DisciplinasFiltredModal() {
      let result = this.DisciplinasComPerfil;
      if (this.searchDisciplinas != "") {
        let searchUpperCase = this.searchDisciplinas
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
      }
      return result;
    },
    DisciplinasOrderedModal() {
      return _.orderBy(
        this.DisciplinasFiltredModal,
        this.modalOrdenacaoDisciplinas.order,
        this.modalOrdenacaoDisciplinas.type
      );
    },
    CursosOrderedModal() {
      return _.orderBy(
        this.allCursosOptions,
        this.modalOrdenacaoCursos.order,
        this.modalOrdenacaoCursos.type
      );
    },
    PerfisOrderedModal() {
      return _.orderBy(
        this.Perfis,
        this.ordenacaoPerfisModal.order,
        this.ordenacaoPerfisModal.type
      );
    },
    Perfis() {
      return _.orderBy(this.$store.state.perfil.Perfis);
    },
    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    AnoAtual() {
      return this.$store.state.plano.Plano[0].ano;
    },
    activeCCD() {
      return (
        _.find(this.cursosAtivados, (curso) => curso.codigo === "65C") !==
        undefined
      );
    },
    activeCCN() {
      return (
        _.find(this.cursosAtivados, (curso) => curso.codigo === "35A") !==
        undefined
      );
    },
    activeSI() {
      return (
        _.find(this.cursosAtivados, (curso) => curso.codigo === "76A") !==
        undefined
      );
    },
    activeEC() {
      return (
        _.find(this.cursosAtivados, (curso) => curso.codigo === "65B") !==
        undefined
      );
    },
  },
  watch: {
    perfisAtivados() {
      //Apaga todas disciplinas selecionadas sempre que um novo perfil é selecionado
      this.selectNoneDisciplinas();

      this.perfisAtivados.forEach((perfil) => {
        this.DisciplinasComPerfil.forEach((discip) => {
          if (
            discip.Perfil == perfil.id &&
            !this.disciplinasSelecionadas.includes(discip)
          ) {
            this.disciplinasSelecionadas.push(discip);
          }
        });
      });
    },
  },
};
</script>
<style scoped>
.div-table {
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
.search-form-control {
  height: 25px !important;
  font-size: 12px !important;
  padding: 2px 5px 2px 5px !important;
  text-align: start;
}
.search-text:hover {
  color: rgb(102, 102, 102);
  background-color: #dddddd;
}
.search-text {
  background-color: #ffffff;
  border-left: none;
}
</style>
