<template>
  <div class="main-component row">
    <PageTitle :title="'Grades Disciplinas'">
      <template #aside>
        <div class="input-group d-flex align-items-center m-0 mx-2 ml-auto p-0">
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
        <BaseButton
          title="Filtros"
          :type="'icon'"
          :color="'gray'"
          @click="openAsideModal('filtros')"
        >
          <i class="fas fa-list-ul"></i>
        </BaseButton>

        <BaseButton
          title="Ajuda"
          :type="'icon'"
          :color="'lightblue'"
          @click="openAsideModal('ajuda')"
        >
          <i class="fas fa-question"></i>
        </BaseButton>
      </template>
    </PageTitle>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <th
            style="width:80px"
            class="clickable"
            @click="toggleOrder(ordenacaoPerfisMain, setFixedOrderPerfil)"
          >
            <div class="d-flex justify-content-between align-items-center">
              <i
                class="fas fa-thumbtack"
                :class="ordenacaoPerfisMain.order === null ? 'low-opacity' : ''"
              ></i>
              <span>
                Perfil
              </span>

              <i
                :class="setIconByOrder(ordenacaoPerfisMain, 'perfilAbreviacao')"
              ></i>
            </div>
          </th>
          <th
            class="clickable"
            style="width: 100px;"
            @click="toggleOrder(ordenacaoDisciplinasMain, 'codigo')"
          >
            Cód.
            <i :class="setIconByOrder(ordenacaoDisciplinasMain, 'codigo')"></i>
          </th>
          <th
            class="t-start clickable"
            style="width: 380px"
            @click="toggleOrder(ordenacaoDisciplinasMain, 'nome')"
          >
            Disciplina
            <i :class="setIconByOrder(ordenacaoDisciplinasMain, 'nome')"></i>
          </th>
          <th
            title="Sistemas de informação"
            v-if="activeSI"
            class="clickable"
            style="width: 140px;"
            @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeSI')"
          >
            76A
            <i :class="setIconByOrder(ordenacaoDisciplinasMain, 'gradeSI')"></i>
          </th>
          <th
            title="Ciência da Computação Noturno"
            v-if="activeCCN"
            class="clickable"
            style="width: 140px;"
            @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeCCN')"
          >
            35A
            <i
              :class="setIconByOrder(ordenacaoDisciplinasMain, 'gradeCCN')"
            ></i>
          </th>
          <th
            title="Ciência da Computação Noturno"
            v-if="activeCCD"
            class="clickable"
            style="width: 140px;"
            @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeCCD')"
          >
            65C
            <i
              :class="setIconByOrder(ordenacaoDisciplinasMain, 'gradeCCD')"
            ></i>
          </th>
          <th
            title="Engenharia Computacional"
            v-if="activeEC"
            class="clickable"
            style="width: 140px;"
            @click="toggleOrder(ordenacaoDisciplinasMain, 'gradeEC')"
          >
            65B
            <i :class="setIconByOrder(ordenacaoDisciplinasMain, 'gradeEC')"></i>
          </th>
        </template>
        <template #tbody>
          <tr v-for="disciplina in DisciplinasOrderedMain" :key="disciplina.id">
            <td
              style="width: 80px"
              :style="'backgroundColor:' + disciplina.perfilCor"
            >
              {{ disciplina.perfilAbreviacao }}
            </td>

            <td style="width: 100px">
              {{ disciplina.codigo }}
            </td>
            <td style="width: 380px" class="t-start">
              {{ disciplina.nome }}
            </td>
            <!-- 76A-  -->
            <td v-if="activeSI" style="width: 140px">
              {{
                disciplina.gradeSI.semestre1.length !== 0
                  ? `${disciplina.gradeSI.semestre1}º Período: 1º Semestre`
                  : ""
              }}
              {{
                disciplina.gradeSI.semestre2.length !== 0
                  ? `${disciplina.gradeSI.semestre2}º Período: 2º Semestre`
                  : ""
              }}
            </td>
            <!-- 35A-  -->
            <td v-if="activeCCN" style="width: 140px">
              {{
                disciplina.gradeCCN.semestre1.length !== 0
                  ? `${disciplina.gradeCCN.semestre1}º Período: 1º Semestre`
                  : ""
              }}
              {{
                disciplina.gradeCCN.semestre2.length !== 0
                  ? `${disciplina.gradeCCN.semestre2}º Período: 2º Semestre`
                  : ""
              }}
            </td>
            <!-- 65C -->
            <td v-if="activeCCD" style="width: 140px">
              {{
                disciplina.gradeCCD.semestre1.length !== 0
                  ? `${disciplina.gradeCCD.semestre1}º Período: 1º Semestre`
                  : ""
              }}
              {{
                disciplina.gradeCCD.semestre2.length !== 0
                  ? `${disciplina.gradeCCD.semestre2}º Período: 2º Semestre`
                  : ""
              }}
            </td>
            <!-- 65B -->
            <td v-if="activeEC" style="width: 140px">
              {{
                disciplina.gradeEC.semestre1.length !== 0
                  ? `${disciplina.gradeEC.semestre1}º Período: 1º Semestre`
                  : ""
              }}
              {{
                disciplina.gradeEC.semestre2.length !== 0
                  ? `${disciplina.gradeEC.semestre2}º Período: 2º Semestre`
                  : ""
              }}
            </td>
          </tr>

          <tr v-show="!DisciplinasOrderedMain.length">
            <td style="width:1120px">
              <b>Nenhuma disciplina encontrada.</b> Clique no botão de filtros
              <i class="fas fa-list-ul mx-1"></i> para selecioná-las.
            </td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <!-- MODAL FILTROS -->
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
          :allTabs="['Perfis', 'Disciplinas', 'Cursos']"
          @change-tab="tabAtivaModal = $event"
        />

        <div class="div-table">
          <BaseTable v-show="tabAtivaModal === 'Perfis'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th
                class="t-start clickable"
                @click="toggleOrder(ordenacaoPerfisModal, 'nome')"
                style="width: 425px"
              >
                Nome
                <i :class="setIconByOrder(ordenacaoPerfisModal, 'nome')"></i>
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="perfil in PerfisOrderedModal"
                :key="'MdPerfil' + perfil.id"
                @click="toggleItemInArray(perfil, filtroPerfis.selecionados)"
              >
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    v-model="filtroPerfis.selecionados"
                    :value="perfil"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 425px" class="t-start">
                  {{ perfil.nome }}
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable
            v-show="tabAtivaModal === 'Disciplinas'"
            :type="'modal'"
            :hasSearchBar="true"
          >
            <template #thead-search>
              <input
                type="text"
                class="form-control input-search"
                placeholder="Pesquise o nome ou código de uma disciplina..."
                v-model="searchDisciplinas"
              />
              <button @click="searchDisciplinas = ''" class="btn btn-search">
                <i class="fas fa-times"></i>
              </button>
            </template>
            <template #thead>
              <th style="width: 25px"></th>
              <th
                title="Clique para ordenar por código"
                class="t-start clickable"
                style="width: 70px"
                @click="toggleOrder(ordenacaoDisciplinasModal, 'codigo')"
              >
                Cód.
                <i
                  :class="setIconByOrder(ordenacaoDisciplinasModal, 'codigo')"
                ></i>
              </th>
              <th
                title="Clique para ordenar por nome"
                class="t-start clickable"
                style="width: 270px"
                @click="toggleOrder(ordenacaoDisciplinasModal, 'nome')"
              >
                Nome
                <i
                  :class="setIconByOrder(ordenacaoDisciplinasModal, 'nome')"
                ></i>
              </th>
              <th
                title="Clique para ordenar por nome"
                class="t-start clickable"
                style="width: 85px"
                @click="
                  toggleOrder(ordenacaoDisciplinasModal, 'perfilAbreviacao')
                "
              >
                Perfil
                <i
                  :class="
                    setIconByOrder(
                      ordenacaoDisciplinasModal,
                      'perfilAbreviacao'
                    )
                  "
                ></i>
              </th>
            </template>
            <template #tbody>
              <tr
                v-for="disciplina in DisciplinasOrderedModal"
                :key="'MdDisciplinas' + disciplina.id"
                @click="
                  toggleItemInArray(disciplina, filtroDisciplinas.selecionados)
                "
              >
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    class="form-check-input position-static m-0"
                    v-model="filtroDisciplinas.selecionados"
                    :value="disciplina"
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
              <tr v-show="!DisciplinasOrderedModal.length">
                <td style="width:450px">
                  NENHUMA DISCIPLINA ENCONTRADA.
                </td>
              </tr>
            </template>
          </BaseTable>

          <BaseTable v-show="tabAtivaModal === 'Cursos'" :type="'modal'">
            <template #thead>
              <th style="width: 25px"></th>
              <th
                class="t-start clickable"
                style="width: 50px; text-align: center;"
                @click="toggleOrder(ordenacaoCursosModal, 'codigo')"
              >
                Cód.
                <i :class="setIconByOrder(ordenacaoCursosModal, 'codigo')"></i>
              </th>
              <th
                class="clickable t-start"
                style="width: 375px;"
                @click="toggleOrder(ordenacaoCursosModal, 'nome')"
              >
                Nome
                <i :class="setIconByOrder(ordenacaoCursosModal, 'nome')"></i>
              </th>
            </template>

            <template #tbody>
              <tr
                v-for="curso in CursosOrderedModal"
                :key="'MdCursos' + curso.codigo"
                @click="toggleItemInArray(curso, filtroCursos.selecionados)"
              >
                <td style="width: 25px">
                  <input
                    type="checkbox"
                    :value="curso"
                    v-model="filtroCursos.selecionados"
                    class="form-check-input position-static m-0"
                  />
                </td>
                <td style="width: 50px" class="t-start">
                  {{ curso.codigo.toUpperCase() }}
                </td>
                <td style="width: 375px" class="t-start">
                  {{ curso.nome }}
                </td>
              </tr>
            </template>
          </BaseTable>
        </div>
      </template>
    </BaseModal>

    <!-- MODAL AJUDA -->
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
            <b>Para exibir conteúdo na tabela:</b> Clique no ícone filtros
            <i class="fas fa-list-ul cancelbtn"></i> no cabeçalho da página e na
            janela que será aberta utilize as abas para navegar entre os tipos
            de filtros. Marque em suas respectivas tabelas quais informações
            deseja visualizar, selecione o ano do plano no cabeçalho e para
            finalizar clique no botão OK.
          </li>
        </ul>
      </template>
    </BaseModal>
  </div>
</template>

<script>
import _ from "lodash";
import { toggleItemInArray, toggleOrdination } from "@/mixins/index.js";
import {
  BaseButton,
  BaseTable,
  PageTitle,
  BaseModal,
  NavTab,
} from "@/components/index.js";
const allCursosDCC = [
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
    nome: "ENGENHARIA COMPUTACIONAL",
    codigo: "65B",
  },
];

export default {
  name: "GradeDisciplinas",
  mixins: [toggleItemInArray, toggleOrdination],
  components: { PageTitle, BaseTable, BaseModal, NavTab, BaseButton },
  data() {
    return {
      tabAtivaModal: "Perfis",
      searchDisciplinas: "",
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
      filtroDisciplinas: {
        ativados: [],
        selecionados: [],
      },
      filtroCursos: {
        ativados: [],
        selecionados: [],
      },
      filtroPerfis: {
        selecionados: [],
      },
      modalSelectAll: {
        Perfis: () => {
          this.filtroPerfis.selecionados = [...this.Perfis];
        },
        Disciplinas: () => {
          this.filtroDisciplinas.selecionados = [...this.DisciplinasInPerfis];
        },
        Cursos: () => {
          this.filtroCursos.selecionados = [...allCursosDCC];
        },
      },
      modalSelectNone: {
        Perfis: () => {
          this.filtroPerfis.selecionados = [];
        },
        Disciplinas: () => {
          this.filtroDisciplinas.selecionados = [];
        },
        Cursos: () => {
          this.filtroCursos.selecionados = [];
        },
      },
      ordenacaoPerfisModal: { order: "nome", type: "asc" },
      ordenacaoDisciplinasModal: { order: "codigo", type: "asc" },
      ordenacaoCursosModal: { order: "codigo", type: "asc" },
      ordenacaoDisciplinasMain: { order: "codigo", type: "asc" },
      ordenacaoPerfisMain: { order: "perfilAbreviacao", type: "asc" },
    };
  },
  mounted() {
    this.ano = _.find(this.$store.state.plano.Plano, {
      id: parseInt(localStorage.getItem("Plano"), 10),
    }).ano;
    this.novoAno = this.ano;
    this.runAll();
    //ativa todos filtros
    this.modalSelectAll.Cursos();
    this.modalSelectAll.Disciplinas();
    this.modalSelectAll.Perfis();
    this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
    this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
  },
  methods: {
    openAsideModal(modalName) {
      if (modalName === "filtros") {
        this.$refs.modalFiltros.toggle();
        this.$refs.modalAjuda.close();
      } else if (modalName === "ajuda") {
        this.$refs.modalAjuda.toggle();
        this.$refs.modalFiltros.close();
      }
    },
    btnOkFiltros() {
      this.filtroDisciplinas.ativados = [
        ...this.filtroDisciplinas.selecionados,
      ];
      this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
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
        this.disciplinasGrades[d.id] = [[[], []], [[], []], [[], []], [[], []]]; //inicializa os períodos em 0 [Primeiro Semestre, Segundo Semestre]
      });
      this.getGrades();
      this.get1Periodo();
      this.get2Periodo();
      this.disciplinasGrades = Object.assign({}, this.disciplinasGrades);
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
    normalizeText(text) {
      return text
        .toUpperCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
    },
  },
  computed: {
    Disciplinas() {
      return this.$store.state.disciplina.Disciplinas;
    },
    DisciplinasInPerfis() {
      let disciplinasResult = this.Disciplinas;

      disciplinasResult.forEach((disciplina) => {
        _.find(this.Perfis, (perfil) => {
          if (disciplina.Perfil === perfil.id) {
            disciplina.perfilAbreviacao = perfil.abreviacao;
            disciplina.perfilCor = perfil.cor;
            return true;
          }
        });
      });
      return disciplinasResult;
    },
    DisciplinasFiltredMain() {
      let disciplinaResult = this.filtroDisciplinas.ativados;

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
      if (this.searchDisciplinas === "") return this.DisciplinasInPerfis;

      const searchNormalized = this.normalizeText(this.searchDisciplinas);

      return _.filter(this.DisciplinasInPerfis, (disciplina) => {
        const disciplinaNome = this.normalizeText(disciplina.nome);
        const disciplinaCodigo = this.normalizeText(disciplina.codigo);

        return (
          disciplinaNome.match(searchNormalized) ||
          disciplinaCodigo.match(searchNormalized)
        );
      });
    },
    setFixedOrderPerfil() {
      if (this.ordenacaoPerfisMain.type === "desc") return null;
      else return "perfilAbreviacao";
    },
    DisciplinasOrderedModal() {
      return _.orderBy(
        this.DisciplinasFiltredModal,
        this.ordenacaoDisciplinasModal.order,
        this.ordenacaoDisciplinasModal.type
      );
    },
    CursosOrderedModal() {
      return _.orderBy(
        allCursosDCC,
        this.ordenacaoCursosModal.order,
        this.ordenacaoCursosModal.type
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
      return this.$store.state.perfil.Perfis;
    },
    Horarios() {
      return _.orderBy(this.$store.state.horario.Horarios, "horario");
    },
    AnoAtual() {
      return _.find(this.$store.state.plano.Plano, {
        id: parseInt(localStorage.getItem("Plano"), 10),
      }).ano;
    },
    activeCCD() {
      return (
        _.find(
          this.filtroCursos.ativados,
          (curso) => curso.codigo === "65C"
        ) !== undefined
      );
    },
    activeCCN() {
      return (
        _.find(
          this.filtroCursos.ativados,
          (curso) => curso.codigo === "35A"
        ) !== undefined
      );
    },
    activeSI() {
      return (
        _.find(
          this.filtroCursos.ativados,
          (curso) => curso.codigo === "76A"
        ) !== undefined
      );
    },
    activeEC() {
      return (
        _.find(
          this.filtroCursos.ativados,
          (curso) => curso.codigo === "65B"
        ) !== undefined
      );
    },
  },
  watch: {
    filtroPerfis: {
      handler(perfis) {
        this.modalSelectNone.Disciplinas();
        const disciplinasResultantes = [];

        this.DisciplinasInPerfis.forEach((disciplina) => {
          const perfilFounded = _.find(
            perfis.selecionados,
            (perfil) => perfil.id === disciplina.Perfil
          );

          if (perfilFounded) disciplinasResultantes.push(disciplina);
        });
        this.filtroDisciplinas.selecionados = [...disciplinasResultantes];
      },
      deep: true,
    },
  },
};
</script>
<style scoped></style>
