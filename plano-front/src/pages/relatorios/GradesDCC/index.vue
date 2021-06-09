<template>
  <div class="main-component row">
    <portal to="page-header">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">Ano</span>
        </div>
        <select class="form-control" v-model="novoAno" @change="runNovoAno">
          <option v-for="ano in AnosDoPlano" :key="'ano' + ano" :value="ano">
            {{ ano }}
          </option>
        </select>
      </div>

      <BaseButton template="filtros" @click="toggleAsideModal('filtros')" />
      <BaseButton template="ajuda" @click="toggleAsideModal('ajuda')" />
    </portal>

    <div class="div-table">
      <BaseTable>
        <template #thead>
          <v-th-ordination
            :orderFixed="true"
            :currentOrder="ordenacaoMain.perfis"
            orderToCheck="perfil.abreviacao"
            width="80"
          >
            Perfil
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="codigo"
            width="100"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="nome"
            width="380"
            align="start"
          >
            Disciplina
          </v-th-ordination>
          <v-th-ordination
            v-if="cursosAtivados.CCN"
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="gradeCCN"
            width="140"
            title="Ciência da Computação Diurno"
          >
            35A
          </v-th-ordination>
          <v-th-ordination
            v-if="cursosAtivados.CCD"
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="gradeCCD"
            width="140"
            title="Ciência da Computação Noturno"
          >
            65C
          </v-th-ordination>
          <v-th-ordination
            v-if="cursosAtivados.EC"
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="gradeEC"
            width="140"
            title="Engenharia Computacional"
          >
            65B
          </v-th-ordination>
          <v-th-ordination
            v-if="cursosAtivados.SI"
            :currentOrder="ordenacaoMain.disciplinas"
            orderToCheck="gradeSI"
            width="140"
            title="Sistemas de informação"
          >
            76A
          </v-th-ordination>
        </template>

        <template #tbody>
          <DisciplinaRow
            v-for="disciplina in DisciplinasOrderedMain"
            :key="disciplina.id"
            :disciplina="disciplina"
            :cursosAtivados="cursosAtivados"
          />

          <tr v-if="!DisciplinasOrderedMain.length">
            <v-td width="1120">
              <b>Nenhuma disciplina encontrada.</b>
              Clique no botão de filtros
              <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
              para selecioná-las.
            </v-td>
          </tr>
        </template>
      </BaseTable>
    </div>

    <ModalFiltros
      ref="modalFiltros"
      :callbacks="modalFiltrosCallbacks"
      :tabsOptions="modalFiltrosTabs"
    >
      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Perfis'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.perfis"
            orderToCheck="nome"
            width="425"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="perfil in PerfisOptionsOrdered"
            :key="perfil.id + perfil.nome"
            @click="selectPerfis(perfil)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroPerfis.selecionados"
                :value="perfil"
                :indeterminate.prop="perfil.halfChecked"
                @click.stop="selectPerfis(perfil)"
              />
            </v-td>
            <v-td width="425" align="start">{{ perfil.nome }}</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable
        type="modal"
        v-show="modalFiltrosTabs.current === 'Disciplinas'"
        :hasSearchBar="true"
      >
        <template #thead-search>
          <VInputSearch
            v-model="searchDisciplinas"
            placeholder="Pesquise nome ou codigo de uma disciplina..."
          />
        </template>
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="codigo"
            width="70"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="nome"
            width="270"
            align="start"
          >
            Nome
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.disciplinas"
            orderToCheck="perfil.abreviacao"
            width="85"
            align="start"
          >
            Perfil
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="disciplina in DisciplinasOptionsOrdered"
            :key="disciplina.id + disciplina.nome"
            @click="selectDisciplina(disciplina)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input
                type="checkbox"
                v-model="filtroDisciplinas.selecionados"
                :value="disciplina"
                @click.stop="selectDisciplina(disciplina)"
              />
            </v-td>
            <v-td width="70" align="start">{{ disciplina.codigo }}</v-td>
            <v-td align="start" width="270" :title="disciplina.nome">
              {{ disciplina.nome }}
            </v-td>
            <v-td width="85" align="start">{{ disciplina.perfil.abreviacao }}</v-td>
          </tr>

          <tr v-if="!DisciplinasOptionsOrdered.length">
            <v-td colspan="3" width="450">NENHUMA DISCIPLINA ENCONTRADA.</v-td>
          </tr>
        </template>
      </BaseTable>

      <BaseTable type="modal" v-show="modalFiltrosTabs.current === 'Cursos'">
        <template #thead>
          <v-th width="25" />
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="codigo"
            width="70"
            align="start"
          >
            Código
          </v-th-ordination>
          <v-th-ordination
            :currentOrder="ordenacaoModal.cursos"
            orderToCheck="nome"
            width="355"
            align="start"
          >
            Nome
          </v-th-ordination>
        </template>

        <template #tbody>
          <tr
            v-for="curso in CursosOptionsOrdered"
            :key="curso.id + curso.codigo"
            @click="toggleItemInArray(curso, filtroCursos.selecionados)"
            v-prevent-click-selection
          >
            <v-td width="25" type="content">
              <input type="checkbox" v-model="filtroCursos.selecionados" :value="curso" />
            </v-td>
            <v-td width="70" align="start">{{ curso.codigo.toUpperCase() }}</v-td>
            <v-td width="355" align="start">{{ curso.nome }}</v-td>
          </tr>

          <tr v-if="!CursosOptionsOrdered.length">
            <v-td width="450" colspan="3">NENHUM CURSO ENCONTRADO.</v-td>
          </tr>
        </template>
      </BaseTable>
    </ModalFiltros>

    <ModalAjuda ref="modalAjuda">
      <li class="list-group-item">
        <b>Visualizar conteúdo:</b>
        Clique no ícone filtros
        <font-awesome-icon :icon="['fas', 'list-ul']" class="icon-gray" />
        . Em seguida, utilize as abas para navegar entre os filtros. Selecione as informações que
        deseja visualizar, incluindo o ano do plano departamental, e clique em OK.
      </li>
      <li class="list-group-item">
        <b>Alterar ano:</b>
        Utilizando o componente de ano no cabeçalho da página é possivel alterar o ano de
        visualização das grades. Com isso pode-se observar a transição entre diferentes grades com o
        passar dos anos.
      </li>
    </ModalAjuda>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { union, difference, find, some, filter, orderBy } from "lodash-es";
import { normalizeText } from "@/common/utils";
import {
  toggleItemInArray,
  toggleAsideModal,
  conectaFiltroPerfisEDisciplinas,
  preventClickSelection,
} from "@/common/mixins";
import { VInputSearch } from "@/components/ui";
import { ModalAjuda, ModalFiltros } from "@/components/modals";
import DisciplinaRow from "./DisciplinaRow";

export default {
  name: "GradesDCC",
  components: { VInputSearch, ModalAjuda, ModalFiltros, DisciplinaRow },
  mixins: [
    toggleItemInArray,
    toggleAsideModal,
    conectaFiltroPerfisEDisciplinas,
    preventClickSelection,
  ],
  data() {
    return {
      searchDisciplinas: "",
      asideModalsRefs: ["modalFiltros", "modalAjuda"],
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
      modalFiltrosTabs: {
        current: "Perfis",
        array: ["Perfis", "Disciplinas", "Cursos"],
      },
      modalFiltrosCallbacks: {
        selectAll: {
          Perfis: () => {
            this.filtroDisciplinas.selecionados = [...this.DisciplinasOptions];
            this.filtroPerfis.selecionados = [...this.PerfisOptions];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = union(
              this.DisciplinasOptionsFiltered,
              this.filtroDisciplinas.selecionados
            );
            this.conectaDisciplinasEmPerfis();
          },
          Cursos: () => {
            this.filtroCursos.selecionados = [...this.PrincipaisCursosDCC];
          },
        },
        selectNone: {
          Perfis: () => {
            this.filtroPerfis.selecionados = [];
            this.filtroDisciplinas.selecionados = [];
          },
          Disciplinas: () => {
            this.filtroDisciplinas.selecionados = difference(
              this.filtroDisciplinas.selecionados,
              this.DisciplinasOptionsFiltered
            );
            this.conectaDisciplinasEmPerfis();
          },
          Cursos: () => {
            this.filtroCursos.selecionados = [];
          },
        },
        btnOk: () => {
          this.filtroDisciplinas.ativados = [...this.filtroDisciplinas.selecionados];
          this.filtroCursos.ativados = [...this.filtroCursos.selecionados];
        },
      },
      ordenacaoModal: {
        cursos: { order: "codigo", type: "asc" },
        perfis: { order: "nome", type: "asc" },
        disciplinas: { order: "codigo", type: "asc" },
      },
      ordenacaoMain: {
        disciplinas: { order: "codigo", type: "asc" },
        perfis: { order: "perfil.abreviacao", type: "asc" },
      },
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
    };
  },

  beforeMount() {
    this.ano = this.currentPlano.ano;
    this.novoAno = this.ano;
    this.runAll();

    this.modalFiltrosCallbacks.selectAll.Cursos();
    this.modalFiltrosCallbacks.selectAll.Perfis();
    this.modalFiltrosCallbacks.selectAll.Disciplinas();
    this.modalFiltrosCallbacks.btnOk();
  },

  methods: {
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
        this.disciplinasGrades[d.id] = [
          [[], []],
          [[], []],
          [[], []],
          [[], []],
        ]; //inicializa os períodos em 0 [Primeiro Semestre, Segundo Semestre]
      });
      this.getGrades();
      this.get1Periodo();
      this.get2Periodo();
      this.disciplinasGrades = Object.assign({}, this.disciplinasGrades);
    },
    getGrades() {
      //popula as grades disponíveis de cada curso em um objeto
      for (let i = 1; i <= 4; i++) {
        this.grades[i] = orderBy(
          filter(this.$store.state.grade.Grades, ["Curso", i]),
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
          let curso = find(this.$store.state.curso.Cursos, ["id", i]);
          for (let j = 0; j < this.gradesAtivas[i].length; j++) {
            //itera pelas grades de um curso, começando da mais recente (lista ordenada)
            gradedisciplina = find(this.$store.state.disciplinaGrade.DisciplinaGrades, {
              Disciplina: parseInt(d, 10),
              Grade: this.gradesAtivas[i][j].grade.id,
            }); //Encontra a disciplina nas grades da computação, começando pela mais recente. Caso não encontre, retorna undefined
            if (gradedisciplina !== undefined) {
              //verifica se a disciplina está na grade procurada
              if (gradedisciplina.periodo <= this.gradesAtivas[i][j].fim) {
                //verifica se essa grade está sendo usada para essa disciplina(limite superior)
                if ((j > 0 && this.gradesAtivas[i][j - 1].fim < gradedisciplina.periodo) || j === 0)
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
              this.disciplinasGrades[parseInt(d, 10)][i - 1][0].push(gradedisciplina.periodo);
            if (
              (curso.semestreInicial === 2 || curso.semestreInicial === 3) &&
              gradedisciplina.periodo % 2 === 0
            )
              //tem entrada de alunos no 2º semestre ou no 3º semestre -> terá períodos pares no primeiro semestre
              this.disciplinasGrades[parseInt(d, 10)][i - 1][0].push(gradedisciplina.periodo);
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
          let curso = find(this.$store.state.curso.Cursos, ["id", i]);
          for (let j = 0; j < this.gradesAtivas[i].length; j++) {
            //itera pelas grades de um curso, começando da mais recente (lista ordenada)
            gradedisciplina = find(this.$store.state.disciplinaGrade.DisciplinaGrades, {
              Disciplina: parseInt(d, 10),
              Grade: this.gradesAtivas[i][j].grade.id,
            }); //Encontra a disciplina nas grades da computação, começando pela mais recente. Caso não encontre, retorna undefined
            if (gradedisciplina !== undefined) {
              //verifica se a disciplina está na grade procurada
              if (gradedisciplina.periodo <= this.gradesAtivas[i][j].fim) {
                //verifica se essa grade está sendo usada para essa disciplina(limite superior)
                if ((j > 0 && this.gradesAtivas[i][j - 1].fim < gradedisciplina.periodo) || j === 0)
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
              this.disciplinasGrades[parseInt(d, 10)][i - 1][1].push(gradedisciplina.periodo);
            if (
              (curso.semestreInicial === 2 || curso.semestreInicial === 3) &&
              gradedisciplina.periodo % 2 === 1
            )
              //tem entrada de alunos no 2º semestre ou no 3º semestre -> terá períodos ímpares no segundo semestre
              this.disciplinasGrades[parseInt(d, 10)][i - 1][1].push(gradedisciplina.periodo);
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
    ...mapGetters(["PrincipaisCursosDCC", "AllDisciplinas", "AllPerfis", "AnosDoPlano"]),

    DisciplinasOrderedMain() {
      let disciplinasResult = this.DisciplinasFiltredMain;

      if (this.ordenacaoMain.disciplinas.order.includes("grade")) {
        disciplinasResult = orderBy(
          disciplinasResult,
          (disciplina) => {
            return this.somaPeriodos(
              disciplina[this.ordenacaoMain.disciplinas.order].semestre1,
              disciplina[this.ordenacaoMain.disciplinas.order].semestre2
            );
          },
          this.ordenacaoMain.disciplinas.type
        );
      } else {
        disciplinasResult = orderBy(
          disciplinasResult,
          this.ordenacaoMain.disciplinas.order,
          this.ordenacaoMain.disciplinas.type
        );
      }

      if (this.ordenacaoMain.perfis.order != null) {
        disciplinasResult = orderBy(
          disciplinasResult,
          this.ordenacaoMain.perfis.order,
          this.ordenacaoMain.perfis.type
        );
      }
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
    cursosAtivados() {
      return {
        CCD: some(this.filtroCursos.ativados, ["codigo", "65C"]),
        CCN: some(this.filtroCursos.ativados, ["codigo", "35A"]),
        SI: some(this.filtroCursos.ativados, ["codigo", "76A"]),
        EC: some(this.filtroCursos.ativados, ["codigo", "65B"]),
      };
    },
    //Modal Options
    DisciplinasOptionsOrdered() {
      return orderBy(
        this.DisciplinasOptionsFiltered,
        this.ordenacaoModal.disciplinas.order,
        this.ordenacaoModal.disciplinas.type
      );
    },
    DisciplinasOptionsFiltered() {
      if (this.searchDisciplinas === "") return this.DisciplinasOptions;

      const searchNormalized = normalizeText(this.searchDisciplinas);

      return filter(this.DisciplinasOptions, (disciplina) => {
        const nome = normalizeText(disciplina.nome);
        const codigo = normalizeText(disciplina.codigo);

        return nome.match(searchNormalized) || codigo.match(searchNormalized);
      });
    },
    DisciplinasOptions() {
      return this.AllDisciplinas;
    },
    PerfisOptionsOrdered() {
      return orderBy(
        this.PerfisOptions,
        this.ordenacaoModal.perfis.order,
        this.ordenacaoModal.perfis.type
      );
    },
    PerfisOptions() {
      return this.AllPerfis.map((perfil) => {
        const todasDisciplinasDoPerfil = filter(this.DisciplinasOptions, ["Perfil", perfil.id]);
        const disciplinasSelecionadas = filter(this.filtroDisciplinas.selecionados, [
          "Perfil",
          perfil.id,
        ]);

        let halfChecked = false;
        if (todasDisciplinasDoPerfil.length === disciplinasSelecionadas.length) {
          halfChecked = false;
        } else if (disciplinasSelecionadas.length > 0) {
          halfChecked = true;
        }

        return {
          ...perfil,
          halfChecked,
        };
      });
    },
    CursosOptionsOrdered() {
      return orderBy(
        this.PrincipaisCursosDCC,
        this.ordenacaoModal.cursos.order,
        this.ordenacaoModal.cursos.type
      );
    },
  },
};
</script>
